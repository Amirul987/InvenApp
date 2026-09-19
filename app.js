// KAMUS BAHASA (I18N)
const translations = {
    id: {
        splash_creator: "Dibuat oleh XoXo Team",
        nav_dashboard: "Dasbor",
        nav_items: "Barang",
        nav_loans: "Pinjam",
        nav_history: "Riwayat",
        nav_report: "Laporan",
        setting_title: "Pengaturan"
    },
    en: {
        splash_creator: "Created by XoXo Team",
        nav_dashboard: "Dashboard",
        nav_items: "Items",
        nav_loans: "Loans",
        nav_history: "History",
        nav_report: "Reports",
        setting_title: "Settings"
    }
};

// STATE DATA
let inventoryData = JSON.parse(localStorage.getItem("xoxo_inventory")) || [
    { id: 1, kode: "INV-001", nama: "Kursi Ergonomis", kategori: "Furnitur", ruangan: "Ruang Rapat", jumlah: 12, minStok: 3, harga: 850000, kondisi: "Baik", servis: "", history: ["Didaftarkan awal di Ruang Rapat"] },
    { id: 2, kode: "INV-002", nama: "Proyektor HD", kategori: "Elektronik", ruangan: "Aula", jumlah: 1, minStok: 2, harga: 4500000, kondisi: "Rusak Ringan", servis: "2026-10-15", history: ["Didaftarkan awal di Aula"] },
    { id: 3, kode: "INV-003", nama: "AC Split 1.5 PK", kategori: "Elektronik", ruangan: "Server", jumlah: 2, minStok: 1, harga: 3800000, kondisi: "Baik", servis: "2026-11-01", history: ["Didaftarkan awal di Server"] }
];

let masterRuangan = JSON.parse(localStorage.getItem("xoxo_rooms")) || ["Ruang Rapat", "Aula", "Server", "Gudang"];
let masterPrefix = localStorage.getItem("xoxo_prefix") || "INV";
let profilInstansi = JSON.parse(localStorage.getItem("xoxo_instansi")) || {
    nama: "PT XoXo Corp Indonesia",
    alamat: "Gedung Cyber 2 Lantai 10, Jakarta Selatan",
    pj: "Budi Santoso, M.Kom",
    petugas: "Ahmad Fauzi"
};
let settingsFeedback = JSON.parse(localStorage.getItem("xoxo_feedback")) || { haptic: true, beep: true };

let loanData = JSON.parse(localStorage.getItem("xoxo_loans")) || [];
let activityLogs = JSON.parse(localStorage.getItem("xoxo_logs")) || [];
let selectedItemIds = new Set();
let currentUser = sessionStorage.getItem("xoxo_auth_session") === "true";
let systemTheme = "auto";
let systemLang = localStorage.getItem("xoxo_lang") || "id";
let selectedLangCandidate = systemLang;
let html5QrScanner = null;
let currentCompressedFoto = "";
let currentLabelData = null;

// INDEXEDDB ENGINE
const DB_NAME = "XoXoInventoryMediaDB";
const DB_VERSION = 1;
const STORE_NAME = "item_photos";

function bukaDB() {
    return new Promise((resolve, reject) => {
        try {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: "id" });
                }
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        } catch (e) {
            reject(e);
        }
    });
}

async function simpanFotoDB(id, base64) {
    if (!base64) return;
    try {
        const db = await bukaDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readwrite");
            const store = tx.objectStore(STORE_NAME);
            store.put({ id, image: base64 });
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    } catch {}
}

async function ambilFotoDB(id) {
    try {
        const db = await bukaDB();
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, "readonly");
            const store = tx.objectStore(STORE_NAME);
            const req = store.get(id);
            req.onsuccess = () => resolve(req.result ? req.result.image : null);
            req.onerror = () => resolve(null);
        });
    } catch {
        return null;
    }
}

async function hapusFotoDB(id) {
    try {
        const db = await bukaDB();
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, "readwrite");
            tx.objectStore(STORE_NAME).delete(id);
            tx.oncomplete = () => resolve();
        });
    } catch {}
}

// BEEP & HAPTIK
function triggerScannerBeep() {
    if (!settingsFeedback.beep) return;
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch {}
}

function triggerHapticFeedback() {
    if (settingsFeedback.haptic && navigator.vibrate) {
        try { navigator.vibrate(25); } catch {}
    }
}

// SMART AUTO-INCREMENT KODE
function generateSmartKodeInventaris() {
    const regex = new RegExp(`^${masterPrefix}-(\\d+)$`);
    const existingNums = inventoryData
        .map(item => {
            const match = (item.kode || "").match(regex);
            return match ? parseInt(match[1], 10) : null;
        })
        .filter(n => n !== null)
        .sort((a, b) => a - b);

    let candidate = 1;
    for (let num of existingNums) {
        if (num === candidate) candidate++;
        else if (num > candidate) break;
    }
    return `${masterPrefix}-${String(candidate).padStart(3, "0")}`;
}

// FORMAT RUPIAH
function formatRupiah(num) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num || 0);
}

// TOAST & CONFIRM MODAL
function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "toastOut 0.3s forwards";
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

function showConfirm(title, message) {
    return new Promise((resolve) => {
        const modal = document.getElementById("custom-confirm-modal");
        if (!modal) return resolve(confirm(message));

        document.getElementById("confirm-title").innerText = title;
        document.getElementById("confirm-message").innerText = message;
        modal.classList.remove("hidden");

        const btnOk = document.getElementById("btn-confirm-ok");
        const btnCancel = document.getElementById("btn-confirm-cancel");

        const cleanUp = (result) => {
            modal.classList.add("hidden");
            btnOk.replaceWith(btnOk.cloneNode(true));
            btnCancel.replaceWith(btnCancel.cloneNode(true));
            resolve(result);
        };

        document.getElementById("btn-confirm-ok").addEventListener("click", () => cleanUp(true));
        document.getElementById("btn-confirm-cancel").addEventListener("click", () => cleanUp(false));
    });
}

// I18N
function pilihOpsiBahasa(lang) {
    selectedLangCandidate = lang;
    updateIndikatorPilihanBahasa(lang);
}

function updateIndikatorPilihanBahasa(lang) {
    const btnId = document.getElementById("btn-lang-id");
    const btnEn = document.getElementById("btn-lang-en");
    if (!btnId || !btnEn) return;

    if (lang === "id") {
        btnId.classList.add("btn-primary");
        btnId.classList.remove("btn-outline");
        btnEn.classList.add("btn-outline");
        btnEn.classList.remove("btn-primary");
    } else {
        btnEn.classList.add("btn-primary");
        btnEn.classList.remove("btn-outline");
        btnId.classList.add("btn-outline");
        btnId.classList.remove("btn-primary");
    }
}

function simpanPengaturanBahasa() {
    systemLang = selectedLangCandidate;
    localStorage.setItem("xoxo_lang", systemLang);
    terapkanBahasa(systemLang);
    showToast(systemLang === "id" ? "Bahasa berhasil disimpan!" : "Language successfully saved!", "success");
}

function terapkanBahasa(lang) {
    const dict = translations[lang] || translations.id;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.innerText = dict[key];
    });

    const activePage = document.querySelector(".page-view.active");
    if (activePage) {
        const titles = {
            "page-dashboard": dict.nav_dashboard,
            "page-inventaris": dict.nav_items,
            "page-peminjaman": dict.nav_loans,
            "page-log": dict.nav_history,
            "page-laporan": dict.nav_report,
            "page-setting": dict.setting_title
        };
        const titleEl = document.getElementById("page-current-title");
        if (titleEl && titles[activePage.id]) titleEl.innerText = titles[activePage.id];
    }

    updateIndikatorPilihanBahasa(lang);
}

// JAM LIVE & TANGGAL
function jalankanJamRealtime() {
    const updateTime = () => {
        const now = new Date();
        const clockEl = document.getElementById("dash-live-clock");
        const dateEl = document.getElementById("dash-date-string");
        const greetingEl = document.getElementById("dash-greeting");

        if (clockEl) {
            clockEl.innerText = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        }
        if (dateEl) {
            dateEl.innerText = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        }
        if (greetingEl) {
            const hr = now.getHours();
            if (hr < 11) greetingEl.innerText = "Selamat Pagi, Petugas!";
            else if (hr < 15) greetingEl.innerText = "Selamat Siang, Petugas!";
            else if (hr < 18) greetingEl.innerText = "Selamat Sore, Petugas!";
            else greetingEl.innerText = "Selamat Malam, Petugas!";
        }
    };
    updateTime();
    setInterval(updateTime, 1000);
}

// =========================================================
// INISIALISASI UTAMA & PENUTUP SPLASH SCREEN ANTI-STUCK
// =========================================================
window.addEventListener("DOMContentLoaded", () => {
    try {
        initTheme();

        systemLang = localStorage.getItem("xoxo_lang") || "id";
        selectedLangCandidate = systemLang;
        terapkanBahasa(systemLang);

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("service-worker.js").catch(() => {});
        }

        if (!localStorage.getItem("xoxo_password")) {
            localStorage.setItem("xoxo_password", "admin");
        }

        // Sinkronkan input pengaturan
        const elPrefix = document.getElementById("custom-prefix-input");
        if (elPrefix) elPrefix.value = masterPrefix;

        const elPrevPrefix = document.getElementById("preview-prefix-format");
        if (elPrevPrefix) elPrevPrefix.innerText = `${masterPrefix}-001`;

        const elNama = document.getElementById("instansi-nama");
        if (elNama) elNama.value = profilInstansi.nama || "";

        const elAlamat = document.getElementById("instansi-alamat");
        if (elAlamat) elAlamat.value = profilInstansi.alamat || "";

        const elPj = document.getElementById("instansi-pj");
        if (elPj) elPj.value = profilInstansi.pj || "";

        const elPetugas = document.getElementById("instansi-petugas");
        if (elPetugas) elPetugas.value = profilInstansi.petugas || "";

        const elHaptic = document.getElementById("toggle-haptic");
        if (elHaptic) elHaptic.checked = !!settingsFeedback.haptic;

        const elBeep = document.getElementById("toggle-beep");
        if (elBeep) elBeep.checked = !!settingsFeedback.beep;

        jalankanJamRealtime();
    } catch (err) {
        console.error("Inisialisasi warning:", err);
    } finally {
        // TEPAT DIJALANKAN: TUTUP SPLASH SCREEN (TIDAK AKAN PERNAH STUCK LAGI)
        setTimeout(() => {
            const splash = document.getElementById("splash-screen");
            if (splash) {
                splash.classList.add("fade-out");
                setTimeout(() => {
                    splash.style.display = "none";
                    cekStatusLogin();
                }, 400);
            } else {
                cekStatusLogin();
            }
        }, 1200);
    }
});

// SPA NAVIGATION
function navigasiKe(pageId, navButton) {
    triggerHapticFeedback();

    document.querySelectorAll(".page-view").forEach(p => p.classList.remove("active"));
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove("hidden");
        target.classList.add("active");
    }

    document.querySelectorAll(".dock-btn").forEach(item => item.classList.remove("active"));
    if (navButton) navButton.classList.add("active");

    const dict = translations[systemLang] || translations.id;
    const titles = {
        "page-dashboard": dict.nav_dashboard,
        "page-inventaris": dict.nav_items,
        "page-peminjaman": dict.nav_loans,
        "page-log": dict.nav_history,
        "page-laporan": dict.nav_report,
        "page-setting": dict.setting_title,
        "page-setting-theme": "Tema Tampilan",
        "page-setting-lang": "Bahasa",
        "page-setting-instansi": "Profil Instansi",
        "page-setting-prefix": "Format Kode",
        "page-setting-haptic": "Getar & Suara",
        "page-setting-storage": "Penyimpanan",
        "page-setting-acc": "Kata Sandi",
        "page-setting-data": "Data & Cadangan",
        "page-setting-reset": "Reset Pabrik",
        "page-setting-about": "Tentang Aplikasi"
    };
    const titleEl = document.getElementById("page-current-title");
    if (titleEl) titleEl.innerText = titles[pageId] || "Inventaris";

    if (pageId === "page-dashboard") updateStatistik();
    if (pageId === "page-inventaris") siapkanKodeInventarisBaru();
    if (pageId === "page-peminjaman") renderPeminjamanView();
    if (pageId === "page-log") renderLogAktivitas();
    if (pageId === "page-laporan") renderLaporanPreview();
    if (pageId === "page-setting-storage") hitungKapasitasMemori();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function bukaSubHalamanSetting(subPageId) {
    navigasiKe(subPageId, null);
}

function filterHanyaBarangRusak() {
    navigasiKe("page-inventaris", document.querySelectorAll(".dock-btn")[1]);
    const filterKondisi = document.getElementById("filter-kondisi");
    if (filterKondisi) {
        filterKondisi.value = "Rusak Ringan";
        filterData();
        showToast("Memfilter barang kondisi rusak", "info");
    }
}

// AUTH
function cekStatusLogin() {
    if (currentUser) {
        tampilkanAplikasiUtama();
    } else {
        const loginView = document.getElementById("login-view");
        if (loginView) loginView.classList.remove("hidden");
    }
}

function prosesLogin() {
    const inputPass = document.getElementById("login-pass").value;
    const savedPass = localStorage.getItem("xoxo_password");

    if (inputPass === savedPass) {
        sessionStorage.setItem("xoxo_auth_session", "true");
        currentUser = true;
        document.getElementById("login-view").classList.add("hidden");
        tampilkanAplikasiUtama();
        document.getElementById("login-pass").value = "";
        showToast("Berhasil masuk ke sistem", "success");
    } else {
        showToast("Kata sandi salah! Bawaan: admin", "error");
    }
}

async function logout() {
    const yakin = await showConfirm("Keluar Akun", "Apakah Anda yakin ingin keluar?");
    if (yakin) {
        sessionStorage.removeItem("xoxo_auth_session");
        currentUser = false;
        document.getElementById("main-app").classList.add("hidden");
        document.getElementById("login-view").classList.remove("hidden");
        showToast("Anda telah keluar", "info");
    }
}

function gantiPassword() {
    const lama = document.getElementById("pw-lama").value;
    const baru = document.getElementById("pw-baru").value;
    const savedPass = localStorage.getItem("xoxo_password");

    if (lama !== savedPass) {
        showToast("Kata sandi saat ini tidak cocok!", "error");
        return;
    }
    if (baru.length < 4) {
        showToast("Sandi baru minimal 4 karakter!", "error");
        return;
    }

    localStorage.setItem("xoxo_password", baru);
    catatLog("Keamanan", "Mengubah kata sandi akses");
    showToast("Kata sandi berhasil diperbarui!", "success");
    document.getElementById("pw-lama").value = "";
    document.getElementById("pw-baru").value = "";
}

// TEMA
function initTheme() {
    systemTheme = localStorage.getItem("xoxo_theme") || "auto";
    terapkanTema(systemTheme);

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (systemTheme === "auto") {
            document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
            updateStatistik();
        }
    });
}

function gantiTema(tema) {
    systemTheme = tema;
    localStorage.setItem("xoxo_theme", tema);
    terapkanTema(tema);
}

function terapkanTema(tema) {
    document.querySelectorAll(".btn-theme").forEach(btn => btn.classList.remove("active"));
    const btn = document.getElementById(`btn-theme-${tema}`);
    if (btn) btn.classList.add("active");

    if (tema === "auto") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    } else {
        document.documentElement.setAttribute("data-theme", tema);
    }
    try { updateStatistik(); } catch {}
}

// SETTING TAMBAHAN
function simpanProfilInstansi() {
    profilInstansi = {
        nama: document.getElementById("instansi-nama").value.trim(),
        alamat: document.getElementById("instansi-alamat").value.trim(),
        pj: document.getElementById("instansi-pj").value.trim(),
        petugas: document.getElementById("instansi-petugas").value.trim()
    };
    localStorage.setItem("xoxo_instansi", JSON.stringify(profilInstansi));
    showToast("Profil instansi berhasil disimpan!", "success");
}

function simpanPrefixKode() {
    const val = document.getElementById("custom-prefix-input").value.trim().toUpperCase();
    if (!val) {
        showToast("Awalan prefix tidak boleh kosong!", "error");
        return;
    }
    masterPrefix = val;
    localStorage.setItem("xoxo_prefix", masterPrefix);
    document.getElementById("preview-prefix-format").innerText = `${masterPrefix}-001`;
    siapkanKodeInventarisBaru();
    showToast(`Format penomoran diubah ke ${masterPrefix}-XXX`, "success");
}

function simpanPengaturanHaptik() {
    settingsFeedback = {
        haptic: document.getElementById("toggle-haptic").checked,
        beep: document.getElementById("toggle-beep").checked
    };
    localStorage.setItem("xoxo_feedback", JSON.stringify(settingsFeedback));
    showToast("Pengaturan suara & getar diperbarui", "info");
}

async function hitungKapasitasMemori() {
    let totalChars = 0;
    for (let x in localStorage) {
        if (localStorage.hasOwnProperty(x)) {
            totalChars += (localStorage[x].length + x.length) * 2;
        }
    }
    const elSize = document.getElementById("storage-local-size");
    if (elSize) elSize.innerText = `~ ${(totalChars / 1024).toFixed(1)} KB`;

    try {
        const db = await bukaDB();
        const tx = db.transaction(STORE_NAME, "readonly");
        const countReq = tx.objectStore(STORE_NAME).count();
        countReq.onsuccess = () => {
            const elCount = document.getElementById("storage-media-count");
            if (elCount) elCount.innerText = `${countReq.result} Berkas Foto`;
        };
    } catch {}
}

async function bersihkanCacheFoto() {
    const yakin = await showConfirm("Bersihkan Foto", "Hapus seluruh dokumentasi foto dari memori?");
    if (yakin) {
        try {
            const db = await bukaDB();
            const tx = db.transaction(STORE_NAME, "readwrite");
            tx.objectStore(STORE_NAME).clear();
            tx.oncomplete = () => {
                hitungKapasitasMemori();
                filterData();
                showToast("Semua berkas foto telah dibersihkan!", "info");
            };
        } catch {}
    }
}

async function eksekusiResetPabrik() {
    const yakin = await showConfirm("RESET TOTAL PABRIK", "PERINGATAN: Semua data barang, ruangan, foto, dan histori akan dihapus permanen. Lanjutkan?");
    if (yakin) {
        localStorage.clear();
        try {
            const db = await bukaDB();
            const tx = db.transaction(STORE_NAME, "readwrite");
            tx.objectStore(STORE_NAME).clear();
        } catch {}
        sessionStorage.clear();
        alert("Aplikasi berhasil direset total ke setelan pabrik.");
        location.reload();
    }
}

// MANAJEMEN RUANGAN
function bukaModalTambahRuangan() {
    document.getElementById("modal-tambah-ruangan").classList.remove("hidden");
    document.getElementById("nama-ruangan-baru").value = "";
}

function tutupModalTambahRuangan() {
    document.getElementById("modal-tambah-ruangan").classList.add("hidden");
}

function prosesSimpanRuanganBaru() {
    const namaRuang = document.getElementById("nama-ruangan-baru").value.trim();
    if (!namaRuang) {
        showToast("Nama ruangan tidak boleh kosong!", "error");
        return;
    }
    if (masterRuangan.includes(namaRuang)) {
        showToast("Ruangan tersebut sudah ada!", "warning");
        return;
    }

    masterRuangan.push(namaRuang);
    localStorage.setItem("xoxo_rooms", JSON.stringify(masterRuangan));
    renderRuanganDropdown();
    document.getElementById("item-ruangan-select").value = namaRuang;
    tutupModalTambahRuangan();
    catatLog("Ruangan", `Menambahkan master ruangan baru: ${namaRuang}`);
    showToast(`Ruangan "${namaRuang}" berhasil ditambahkan!`, "success");
}

function renderRuanganDropdown() {
    const selectForm = document.getElementById("item-ruangan-select");
    const selectFilter = document.getElementById("filter-ruangan");
    const selectLaporan = document.getElementById("laporan-filter-ruang");
    const selectBatch = document.getElementById("ruangan-tujuan-massal-select");
    const selectPinjam = document.getElementById("pinjam-barang");

    const listSemua = [...new Set([...masterRuangan, ...inventoryData.map(i => i.ruangan)])].filter(Boolean);

    if (selectForm) selectForm.innerHTML = `<option value="">-- Pilih Ruangan --</option>`;
    if (selectBatch) selectBatch.innerHTML = `<option value="">-- Pilih Ruangan Tujuan --</option>`;
    if (selectFilter) selectFilter.innerHTML = `<option value="">Semua Ruangan</option>`;
    if (selectLaporan) selectLaporan.innerHTML = `<option value="">Semua Ruangan</option>`;

    listSemua.forEach(r => {
        if (selectForm) selectForm.innerHTML += `<option value="${r}">${r}</option>`;
        if (selectBatch) selectBatch.innerHTML += `<option value="${r}">${r}</option>`;
        if (selectFilter) selectFilter.innerHTML += `<option value="${r}">${r}</option>`;
        if (selectLaporan) selectLaporan.innerHTML += `<option value="${r}">${r}</option>`;
    });

    if (selectPinjam) {
        selectPinjam.innerHTML = `<option value="">-- Pilih Barang --</option>`;
        inventoryData.forEach(item => {
            selectPinjam.innerHTML += `<option value="${item.id}">${item.nama} (${item.kode}) - Stok:${item.jumlah}</option>`;
        });
    }
}

// INVENTARIS FORM & AUTO KODE
function siapkanKodeInventarisBaru() {
    const elKode = document.getElementById("item-kode");
    const elId = document.getElementById("item-id");
    if (elKode && (!elId || !elId.value)) {
        elKode.value = generateSmartKodeInventaris();
    }
}

function tampilkanAplikasiUtama() {
    const mainApp = document.getElementById("main-app");
    if (mainApp) mainApp.classList.remove("hidden");
    renderRuanganDropdown();
    filterData();
    updateStatistik();
}

function toggleFormInventaris() {
    const form = document.getElementById("form-inventaris");
    const btn = document.getElementById("btn-toggle-form");
    if (!form || !btn) return;

    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        btn.innerText = "Tutup Form";
        siapkanKodeInventarisBaru();
    } else {
        form.classList.add("hidden");
        btn.innerText = "Buka Form";
    }
}

function handleFotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const max = 450;
            let w = img.width;
            let h = img.height;
            if (w > h && w > max) { h *= max / w; w = max; }
            else if (h > max) { w *= max / h; h = max; }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h);
            currentCompressedFoto = canvas.toDataURL("image/jpeg", 0.75);

            document.getElementById("foto-preview").src = currentCompressedFoto;
            document.getElementById("foto-preview-wrapper").classList.remove("hidden");
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function hapusPreviewFoto() {
    document.getElementById("item-foto").value = "";
    currentCompressedFoto = "";
    document.getElementById("foto-preview-wrapper").classList.add("hidden");
}

async function simpanData() {
    const id = document.getElementById("item-id").value;
    const kode = document.getElementById("item-kode").value.trim();
    const nama = document.getElementById("item-nama").value.trim();
    const kategori = document.getElementById("item-kategori").value;
    const ruangan = document.getElementById("item-ruangan-select").value;
    const jumlah = parseInt(document.getElementById("item-jumlah").value, 10);
    const minStok = parseInt(document.getElementById("item-min-stok").value, 10) || 0;
    const harga = parseInt(document.getElementById("item-harga").value, 10) || 0;
    const kondisi = document.getElementById("item-kondisi").value;
    const servis = document.getElementById("item-servis").value;

    if (!kode || !nama || !ruangan || isNaN(jumlah)) {
        showToast("Harap lengkapi semua kolom wajib!", "error");
        return;
    }

    if (id) {
        const numericId = parseInt(id, 10);
        inventoryData = inventoryData.map(item => {
            if (item.id === numericId) {
                const logs = item.history || [];
                if (item.ruangan !== ruangan) {
                    logs.push(`Dimutasi dari ${item.ruangan} ke ${ruangan} (${new Date().toLocaleDateString("id-ID")})`);
                }
                return { ...item, kode, nama, kategori, ruangan, jumlah, minStok, harga, kondisi, servis, history: logs };
            }
            return item;
        });
        if (currentCompressedFoto) {
            await simpanFotoDB(numericId, currentCompressedFoto);
        }
        catatLog("Perubahan", `Memperbarui barang: ${nama} (${kode})`);
        showToast("Data barang berhasil diubah", "success");
    } else {
        const newId = Date.now();
        const itemBaru = {
            id: newId, kode, nama, kategori, ruangan, jumlah, minStok, harga, kondisi, servis,
            history: [`Didaftarkan di ${ruangan} (${new Date().toLocaleDateString("id-ID")})`]
        };
        inventoryData.unshift(itemBaru);
        if (currentCompressedFoto) {
            await simpanFotoDB(newId, currentCompressedFoto);
        }
        catatLog("Penambahan", `Menambah barang: ${nama} (${kode})`);
        showToast("Barang baru berhasil ditambahkan", "success");
    }

    simpanKeLocalStorage();
    resetForm();
    renderRuanganDropdown();
    filterData();
}

async function editItem(id) {
    const item = inventoryData.find(d => d.id === id);
    if (!item) return;

    document.getElementById("item-id").value = item.id;
    document.getElementById("item-kode").value = item.kode;
    document.getElementById("item-nama").value = item.nama;
    document.getElementById("item-kategori").value = item.kategori || "Elektronik";
    document.getElementById("item-ruangan-select").value = item.ruangan;
    document.getElementById("item-jumlah").value = item.jumlah;
    document.getElementById("item-min-stok").value = item.minStok || 0;
    document.getElementById("item-harga").value = item.harga || 0;
    document.getElementById("item-kondisi").value = item.kondisi;
    document.getElementById("item-servis").value = item.servis || "";

    const foto = await ambilFotoDB(item.id);
    if (foto) {
        currentCompressedFoto = foto;
        document.getElementById("foto-preview").src = foto;
        document.getElementById("foto-preview-wrapper").classList.remove("hidden");
    } else {
        hapusPreviewFoto();
    }

    document.getElementById("form-heading").innerText = "Edit Data Barang";
    document.getElementById("btn-cancel").classList.remove("hidden");
    document.getElementById("form-inventaris").classList.remove("hidden");
    document.getElementById("btn-toggle-form").innerText = "Tutup Form";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

async function hapusItem(id) {
    const item = inventoryData.find(d => d.id === id);
    if (!item) return;

    const yakin = await showConfirm("Hapus Barang", `Yakin ingin menghapus ${item.nama} (${item.kode})?`);
    if (yakin) {
        inventoryData = inventoryData.filter(d => d.id !== id);
        await hapusFotoDB(id);
        selectedItemIds.delete(id);
        catatLog("Penghapusan", `Menghapus barang: ${item.nama} (${item.kode})`);
        simpanKeLocalStorage();
        renderRuanganDropdown();
        filterData();
        siapkanKodeInventarisBaru();
        showToast(`Barang ${item.kode} dihapus. Kodenya akan dipakai untuk penambahan selanjutnya.`, "info");
    }
}

function resetForm() {
    document.getElementById("item-id").value = "";
    document.getElementById("form-inventaris").reset();
    hapusPreviewFoto();
    document.getElementById("form-heading").innerText = "Tambah Data Barang";
    document.getElementById("btn-cancel").classList.add("hidden");
    siapkanKodeInventarisBaru();
}

function simpanKeLocalStorage() {
    localStorage.setItem("xoxo_inventory", JSON.stringify(inventoryData));
    try { updateStatistik(); } catch {}
}

// RIWAYAT LOKASI MUTASI
function bukaRiwayatItem(id) {
    const item = inventoryData.find(d => d.id === id);
    if (!item) return;

    document.getElementById("history-item-title").innerText = `Riwayat: ${item.nama} (${item.kode})`;
    const container = document.getElementById("item-history-list");
    container.innerHTML = "";

    const history = item.history || [`Terdaftar di ${item.ruangan}`];
    history.forEach((h, idx) => {
        const div = document.createElement("div");
        div.className = "timeline-item";
        div.innerHTML = `
            <span class="timeline-time">Langkah #${idx + 1}</span>
            <div>${h}</div>
        `;
        container.appendChild(div);
    });

    document.getElementById("modal-item-history").classList.remove("hidden");
}

function tutupModalRiwayatItem() {
    document.getElementById("modal-item-history").classList.add("hidden");
}

// BATCH ACTIONS
function toggleSelectCard(id, checkbox) {
    if (checkbox.checked) selectedItemIds.add(id);
    else selectedItemIds.delete(id);
    updateBatchUI();
}

function toggleSelectAll(masterCheckbox) {
    const visibleCards = document.querySelectorAll(".card-select-checkbox");
    visibleCards.forEach(cb => {
        const id = parseInt(cb.getAttribute("data-id"), 10);
        cb.checked = masterCheckbox.checked;
        if (masterCheckbox.checked) selectedItemIds.add(id);
        else selectedItemIds.delete(id);
    });
    updateBatchUI();
}

function updateBatchUI() {
    const bar = document.getElementById("batch-action-bar");
    const count = document.getElementById("selected-count");
    if (selectedItemIds.size > 0) {
        if (bar) bar.classList.remove("hidden");
        if (count) count.innerText = `${selectedItemIds.size} dipilih`;
    } else {
        if (bar) bar.classList.add("hidden");
        const masterCb = document.getElementById("select-all-checkbox");
        if (masterCb) masterCb.checked = false;
    }
    document.querySelectorAll(".inv-card").forEach(card => {
        const id = parseInt(card.getAttribute("data-id"), 10);
        if (selectedItemIds.has(id)) card.classList.add("selected");
        else card.classList.remove("selected");
    });
}

function bukaModalMutasiMassal() {
    document.getElementById("modal-mutasi-massal").classList.remove("hidden");
}

function tutupModalMutasiMassal() {
    document.getElementById("modal-mutasi-massal").classList.add("hidden");
}

async function prosesMutasiMassal() {
    const tujuan = document.getElementById("ruangan-tujuan-massal-select").value;
    if (!tujuan) {
        showToast("Pilih ruangan tujuan!", "error");
        return;
    }

    inventoryData = inventoryData.map(item => {
        if (selectedItemIds.has(item.id)) {
            const logs = item.history || [];
            logs.push(`Dimutasi massal ke ${tujuan} (${new Date().toLocaleDateString("id-ID")})`);
            return { ...item, ruangan: tujuan, history: logs };
        }
        return item;
    });

    catatLog("Mutasi", `Memindahkan ${selectedItemIds.size} item ke${tujuan}`);
    simpanKeLocalStorage();
    selectedItemIds.clear();
    tutupModalMutasiMassal();
    renderRuanganDropdown();
    filterData();
    showToast("Mutasi barang berhasil dilakukan", "success");
}

async function hapusMassal() {
    const yakin = await showConfirm("Hapus Massal", `Hapus permanen ${selectedItemIds.size} barang terpilih?`);
    if (yakin) {
        for (let id of selectedItemIds) {
            await hapusFotoDB(id);
        }
        inventoryData = inventoryData.filter(item => !selectedItemIds.has(item.id));
        catatLog("Penghapusan", `Menghapus massal ${selectedItemIds.size} barang`);
        selectedItemIds.clear();
        simpanKeLocalStorage();
        renderRuanganDropdown();
        filterData();
        siapkanKodeInventarisBaru();
        showToast("Barang terpilih berhasil dihapus", "info");
    }
}

// RENDER DAFTAR BARANG
async function renderData(data) {
    const container = document.getElementById("cards-container");
    const empty = document.getElementById("empty-state");
    const countBadge = document.getElementById("data-count");
    if (!container) return;
    container.innerHTML = "";

    if (countBadge) countBadge.innerText = `${data.length} Barang`;

    if (data.length === 0) {
        if (empty) empty.classList.remove("hidden");
        updateBatchUI();
        return;
    }
    if (empty) empty.classList.add("hidden");

    for (const item of data) {
        let badgeClass = "badge-baik";
        if (item.kondisi === "Rusak Ringan") badgeClass = "badge-ringan";
        if (item.kondisi === "Rusak Berat") badgeClass = "badge-berat";

        const isLowStock = item.minStok && item.jumlah <= item.minStok;
        const lowStockBadge = isLowStock ? `<span class="badge badge-warning">Stok Kritis</span>` : ``;
        const servisBadge = item.servis ? `<span class="badge">Servis: ${item.servis}</span>` : ``;

        const foto = await ambilFotoDB(item.id);
        const thumb = foto
            ? `<img src="${foto}" class="card-thumb" alt="Foto">`
            : `<div class="card-thumb" style="display:flex;align-items:center;justify-content:center;"><svg class="ui-icon" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg></div>`;

        const isChecked = selectedItemIds.has(item.id) ? "checked" : "";
        const card = document.createElement("div");
        card.className = `inv-card ${isChecked ? "selected" : ""}`;
        card.setAttribute("data-id", item.id);
        card.innerHTML = `
            <div class="card-header-meta">
                <input type="checkbox" class="card-select-checkbox" data-id="${item.id}" ${isChecked} onchange="toggleSelectCard(${item.id}, this)">
                ${thumb}
                <div class="card-info">
                    <div class="card-title">${item.nama}</div>
                    <div class="card-code">${item.kode} • ${item.ruangan} • <em>${item.kategori || 'Elektronik'}</em></div>
                    <div class="card-price">${formatRupiah(item.harga)}</div>
                </div>
            </div>
            <div class="card-badges">
                <span class="badge ${badgeClass}">${item.kondisi}</span>
                <span class="badge">Stok: ${item.jumlah}</span>
                ${lowStockBadge}
                ${servisBadge}
            </div>
            <div class="card-actions">
                <button class="btn btn-outline" onclick="bukaRiwayatItem(${item.id})" title="Riwayat Mutasi">
                    <svg class="ui-icon" viewBox="0 0 24 24"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/></svg>
                </button>
                <button class="btn btn-outline" onclick="tampilkanQRWatermark('${item.kode}', '${item.nama}')" title="Label QR">
                    <svg class="ui-icon" viewBox="0 0 24 24"><path d="M4 4h6v6H4zm16 0h-6v6h6zm-6 16h6v-6h-6zM4 20h6v-6H4zm2-14h2v2H6zm12 0h2v2h-2zm-2 12h2v2h-2zm-10 0h2v2H6zm3-7h2v2H9zm4 0h2v2h-2zm-2 2h2v2h-2zm0-4h2v2h-2zm-2-2h2v2H9z"/></svg>
                </button>
                <button class="btn btn-secondary" onclick="editItem(${item.id})" title="Edit">
                    <svg class="ui-icon" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </button>
                <button class="btn btn-outline" onclick="hapusItem(${item.id})" title="Hapus">
                    <svg class="ui-icon" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
            </div>
        `;
        container.appendChild(card);
    }
    updateBatchUI();
}

function filterData() {
    const q = (document.getElementById("search-input")?.value || "").toLowerCase();
    const kat = document.getElementById("filter-kategori")?.value || "";
    const ruang = document.getElementById("filter-ruangan")?.value || "";
    const kondisi = document.getElementById("filter-kondisi")?.value || "";

    const filtered = inventoryData.filter(item => {
        const matchNama = (item.nama || "").toLowerCase().includes(q);
        const matchKode = (item.kode || "").toLowerCase().includes(q);
        const matchKat = kat === "" || (item.kategori || "Elektronik") === kat;
        const matchRuang = ruang === "" || item.ruangan === ruang;
        const matchKondisi = kondisi === "" || item.kondisi === kondisi;
        return (matchNama || matchKode) && matchKat && matchRuang && matchKondisi;
    });

    renderData(filtered);
}

function mulaiVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showToast("Pencarian suara tidak didukung browser ini", "error");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = systemLang === "id" ? "id-ID" : "en-US";
    const btn = document.getElementById("btn-voice-search");

    recognition.onstart = () => {
        if (btn) btn.classList.add("listening");
        showToast("Silakan berbicara...", "info");
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.value = transcript;
        filterData();
        showToast(`Mencari: "${transcript}"`, "success");
    };

    recognition.onerror = () => btn && btn.classList.remove("listening");
    recognition.onend = () => btn && btn.classList.remove("listening");
    recognition.start();
}

// PEMINJAMAN
function catatPeminjaman() {
    const barangId = parseInt(document.getElementById("pinjam-barang").value, 10);
    const peminjam = document.getElementById("pinjam-nama").value.trim();
    const jumlah = parseInt(document.getElementById("pinjam-jumlah").value, 10);
    const tglKembali = document.getElementById("pinjam-tgl-kembali").value;

    const item = inventoryData.find(d => d.id === barangId);
    if (!item) {
        showToast("Pilih barang yang sah!", "error");
        return;
    }
    if (jumlah > item.jumlah) {
        showToast("Jumlah pinjam melebihi sisa unit!", "error");
        return;
    }

    item.jumlah -= jumlah;
    simpanKeLocalStorage();

    const transaksi = {
        id: Date.now(),
        barangId: item.id,
        namaBarang: item.nama,
        kodeBarang: item.kode,
        peminjam,
        jumlah,
        tglPinjam: new Date().toISOString().slice(0, 10),
        tglKembali
    };

    loanData.unshift(transaksi);
    localStorage.setItem("xoxo_loans", JSON.stringify(loanData));
    catatLog("Peminjaman", `${peminjam} meminjam ${jumlah} unit ${item.nama}`);

    document.getElementById("pinjam-nama").value = "";
    document.getElementById("pinjam-jumlah").value = "1";
    document.getElementById("pinjam-tgl-kembali").value = "";

    renderRuanganDropdown();
    renderPeminjamanView();
    filterData();
    showToast("Transaksi peminjaman disimpan", "success");
}

async function kembalikanBarang(loanId) {
    const pinjam = loanData.find(l => l.id === loanId);
    if (!pinjam) return;

    const yakin = await showConfirm("Kembalikan", `Proses pengembalian ${pinjam.namaBarang} oleh ${pinjam.peminjam}?`);
    if (yakin) {
        const item = inventoryData.find(d => d.id === pinjam.barangId);
        if (item) {
            item.jumlah += pinjam.jumlah;
            simpanKeLocalStorage();
        }

        loanData = loanData.filter(l => l.id !== loanId);
        localStorage.setItem("xoxo_loans", JSON.stringify(loanData));
        catatLog("Pengembalian", `${pinjam.peminjam} mengembalikan ${pinjam.jumlah} unit ${pinjam.namaBarang}`);

        renderRuanganDropdown();
        renderPeminjamanView();
        filterData();
        showToast("Barang telah dikembalikan ke stok", "success");
    }
}

function renderPeminjamanView() {
    const tbody = document.getElementById("peminjaman-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (loanData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">Tidak ada transaksi pinjaman aktif.</td></tr>`;
        return;
    }

    const hariIni = new Date().toISOString().slice(0, 10);

    loanData.forEach(p => {
        const isOverdue = p.tglKembali < hariIni;
        const statusBadge = isOverdue
            ? `<span class="badge badge-overdue">Terlambat</span>`
            : `<span class="badge badge-baik">Aktif</span>`;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${p.peminjam}</strong></td>
            <td>${p.namaBarang}</td>
            <td>${p.jumlah}</td>
            <td>${p.tglKembali}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="kembalikanBarang(${p.id})">Kembalikan</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// LOGS
function catatLog(tipe, deskripsi) {
    const waktu = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    const tanggal = new Date().toLocaleDateString("id-ID");
    activityLogs.unshift({ tipe, deskripsi, waktu: `${tanggal} ${waktu}` });
    if (activityLogs.length > 50) activityLogs.pop();
    localStorage.setItem("xoxo_logs", JSON.stringify(activityLogs));
}

function renderLogAktivitas() {
    const el = document.getElementById("log-list");
    if (!el) return;
    el.innerHTML = "";

    if (activityLogs.length === 0) {
        el.innerHTML = `<p class="text-caption text-center">Belum ada catatan aktivitas.</p>`;
        return;
    }

    activityLogs.forEach(l => {
        const div = document.createElement("div");
        div.className = "timeline-item";
        div.innerHTML = `
            <span class="timeline-time">${l.waktu}</span>
            <div><strong>[${l.tipe}]</strong> ${l.deskripsi}</div>
        `;
        el.appendChild(div);
    });
}

async function konfirmasiHapusLog() {
    const yakin = await showConfirm("Bersihkan Log", "Hapus semua histori riwayat?");
    if (yakin) {
        activityLogs = [];
        localStorage.removeItem("xoxo_logs");
        renderLogAktivitas();
        showToast("Log aktivitas telah dibersihkan", "info");
    }
}

// =========================================================
// STATISTIK & ANALITIK DASBOR DETAIL (SAFE RENDER)
// =========================================================
function updateStatistik() {
    let total = 0;
    let totalValuasi = 0;
    let baik = 0;
    let rusak = 0;
    let ringan = 0;
    let berat = 0;
    let totalDamagedValue = 0;

    let highestItem = null;
    let maxPrice = -1;

    let categoryCountMap = {};
    let roomValuationMap = {};
    let roomQtyMap = {};

    let lowStockItems = [];
    let upcomingMaintenanceItems = [];

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const in30Days = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);

    inventoryData.forEach(item => {
        const q = item.jumlah || 0;
        const harga = item.harga || 0;
        const subtotal = q * harga;
        total += q;
        totalValuasi += subtotal;

        if (item.minStok && q <= item.minStok) lowStockItems.push(item);
        if (item.servis && item.servis >= todayStr && item.servis <= in30Days) upcomingMaintenanceItems.push(item);

        if (harga > maxPrice) {
            maxPrice = harga;
            highestItem = item;
        }

        if (item.kondisi === "Baik") {
            baik += q;
        } else {
            rusak += q;
            totalDamagedValue += subtotal;
            if (item.kondisi === "Rusak Ringan") ringan += q;
            if (item.kondisi === "Rusak Berat") berat += q;
        }

        const kat = item.kategori || "Elektronik";
        categoryCountMap[kat] = (categoryCountMap[kat] || 0) + q;

        const r = item.ruangan || "Gudang";
        roomValuationMap[r] = (roomValuationMap[r] || 0) + subtotal;
        roomQtyMap[r] = (roomQtyMap[r] || 0) + q;
    });

    let totalDipinjam = 0;
    let overdueLoans = [];
    let borrowFrequency = {};

    loanData.forEach(l => {
        totalDipinjam += l.jumlah;
        if (l.tglKembali && l.tglKembali < todayStr) overdueLoans.push(l);
        borrowFrequency[l.namaBarang] = (borrowFrequency[l.namaBarang] || 0) + 1;
    });

    // Pasang Metrik Angka jika elemen ada
    const elVal = document.getElementById("stat-valuasi");
    if (elVal) elVal.innerText = formatRupiah(totalValuasi);

    const elTotal = document.getElementById("stat-total");
    if (elTotal) elTotal.innerText = total;

    const elBaik = document.getElementById("stat-baik");
    if (elBaik) elBaik.innerText = baik;

    const elRusak = document.getElementById("stat-rusak");
    if (elRusak) elRusak.innerText = rusak;

    const elPinjam = document.getElementById("stat-pinjam");
    if (elPinjam) elPinjam.innerText = totalDipinjam;

    const elLowStock = document.getElementById("stat-low-stock");
    if (elLowStock) elLowStock.innerText = lowStockItems.length;

    const elDamaged = document.getElementById("stat-damaged-val");
    if (elDamaged) elDamaged.innerText = formatRupiah(totalDamagedValue);

    const elHighItem = document.getElementById("stat-highest-item");
    const elHighVal = document.getElementById("stat-highest-val");
    if (highestItem && elHighItem && elHighVal) {
        elHighItem.innerText = highestItem.nama;
        elHighVal.innerText = formatRupiah(highestItem.harga);
    } else if (elHighItem && elHighVal) {
        elHighItem.innerText = "-";
        elHighVal.innerText = "Rp 0";
    }

    try { renderActionableAlerts(lowStockItems, upcomingMaintenanceItems, overdueLoans); } catch {}
    try { gambarGrafik(baik, ringan, berat, total); } catch {}
    try { gambarHealthGauge(baik, total); } catch {}
    try { gambarRoomBarChart(roomValuationMap); } catch {}
    try { renderCategoryBreakdown(categoryCountMap, total); } catch {}
    try { renderRoomDistribution(roomValuationMap, roomQtyMap, totalValuasi); } catch {}
    try { renderSmartInsights(totalValuasi, borrowFrequency, roomQtyMap); } catch {}
    try { renderRecentDashboardActivities(); } catch {}
}

function renderActionableAlerts(lowStock, maintenance, overdue) {
    const container = document.getElementById("dash-action-alerts");
    if (!container) return;
    container.innerHTML = "";

    let hasAlert = false;

    if (overdue.length > 0) {
        hasAlert = true;
        const div = document.createElement("div");
        div.className = "dash-alert-card alert-danger-box";
        div.onclick = () => navigasiKe("page-peminjaman");
        div.innerHTML = `
            <span><strong>${overdue.length} Peminjaman Terlambat (Overdue)</strong> &bull; Perlu tindak lanjut pengembalian.</span>
            <span>Lihat &rsaquo;</span>
        `;
        container.appendChild(div);
    }

    if (lowStock.length > 0) {
        hasAlert = true;
        const div = document.createElement("div");
        div.className = "dash-alert-card alert-warning-box";
        div.onclick = () => navigasiKe("page-inventaris");
        div.innerHTML = `
            <span><strong>${lowStock.length} Barang Mencapai Stok Kritis</strong> &bull; Sisa unit di bawah batas aman.</span>
            <span>Restock &rsaquo;</span>
        `;
        container.appendChild(div);
    }

    if (maintenance.length > 0) {
        hasAlert = true;
        const div = document.createElement("div");
        div.className = "dash-alert-card alert-warning-box";
        div.onclick = () => navigasiKe("page-inventaris");
        div.innerHTML = `
            <span><strong>${maintenance.length} Barang Perlu Servis</strong> &bull; Jadwal jatuh tempo dalam 30 hari.</span>
            <span>Jadwal &rsaquo;</span>
        `;
        container.appendChild(div);
    }

    if (hasAlert) container.classList.remove("hidden");
    else container.classList.add("hidden");
}

function gambarHealthGauge(goodCount, totalCount) {
    const canvas = document.getElementById("healthGaugeChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const score = totalCount > 0 ? Math.round((goodCount / totalCount) * 100) : 100;
    const elPercent = document.getElementById("health-score-percent");
    if (elPercent) elPercent.innerText = `${score}%`;

    const statusBadge = document.getElementById("health-score-status");
    if (statusBadge) {
        if (score >= 80) {
            statusBadge.className = "badge badge-baik";
            statusBadge.innerText = "Prima / Sehat";
        } else if (score >= 50) {
            statusBadge.className = "badge badge-warning";
            statusBadge.innerText = "Cukup Baik";
        } else {
            statusBadge.className = "badge badge-overdue";
            statusBadge.innerText = "Perlu Peremajaan";
        }
    }

    const cx = canvas.width / 2;
    const cy = canvas.height - 15;
    const r = 70;
    const lineWidth = 16;

    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#80808033";
    ctx.lineCap = "round";
    ctx.stroke();

    const endAngle = Math.PI + (score / 100) * Math.PI;
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, endAngle);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = score >= 80 ? "#c7ff2e" : (score >= 50 ? "#f59e0b" : "#ef4444");
    ctx.lineCap = "round";
    ctx.stroke();
}

function gambarRoomBarChart(roomValMap) {
    const canvas = document.getElementById("roomBarChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rooms = Object.keys(roomValMap);
    if (rooms.length === 0) return;

    let maxVal = 0;
    rooms.forEach(r => {
        if (roomValMap[r] > maxVal) maxVal = roomValMap[r];
    });
    if (maxVal === 0) maxVal = 1;

    const padLeft = 40;
    const padBottom = 30;
    const chartW = canvas.width - padLeft - 20;
    const chartH = canvas.height - padBottom - 20;

    const barWidth = Math.min(45, (chartW / rooms.length) - 15);
    const gap = (chartW - (barWidth * rooms.length)) / (rooms.length + 1);

    ctx.beginPath();
    ctx.moveTo(padLeft, canvas.height - padBottom);
    ctx.lineTo(canvas.width - 20, canvas.height - padBottom);
    ctx.strokeStyle = "#80808044";
    ctx.lineWidth = 1;
    ctx.stroke();

    rooms.forEach((room, idx) => {
        const val = roomValMap[room];
        const h = (val / maxVal) * (chartH - 20);
        const x = padLeft + gap + idx * (barWidth + gap);
        const y = canvas.height - padBottom - h;

        ctx.fillStyle = "#c7ff2e";
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, y, barWidth, h, [6, 6, 0, 0]);
        else ctx.rect(x, y, barWidth, h);
        ctx.fill();

        ctx.fillStyle = "#808080";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        const shortName = room.length > 7 ? room.substring(0, 6) + ".." : room;
        ctx.fillText(shortName, x + barWidth / 2, canvas.height - padBottom + 14);

        if (val > 0) {
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 9px sans-serif";
            const shortVal = val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : `${Math.round(val / 1000)}k`;
            ctx.fillText(shortVal, x + barWidth / 2, y - 5);
        }
    });
}

function renderCategoryBreakdown(catMap, totalQty) {
    const container = document.getElementById("dash-category-list");
    if (!container) return;
    container.innerHTML = "";

    const keys = Object.keys(catMap);
    if (keys.length === 0 || totalQty === 0) {
        container.innerHTML = `<p class="text-caption">Belum ada kategori barang terdata.</p>`;
        return;
    }

    keys.sort((a, b) => catMap[b] - catMap[a]);

    keys.forEach(kat => {
        const count = catMap[kat];
        const percentage = Math.round((count / totalQty) * 100);

        const row = document.createElement("div");
        row.className = "progress-item-row";
        row.innerHTML = `
            <div class="progress-info-head">
                <span>${kat}</span>
                <span>${count} Unit (${percentage}%)</span>
            </div>
            <div class="progress-track">
                <div class="progress-fill-bar" style="width: ${percentage}%"></div>
            </div>
        `;
        container.appendChild(row);
    });
}

function renderRoomDistribution(valMap, qtyMap, totalVal) {
    const container = document.getElementById("dash-room-distribution");
    const badge = document.getElementById("dash-total-rooms-badge");
    if (!container) return;
    container.innerHTML = "";

    const rooms = Object.keys(valMap);
    if (badge) badge.innerText = `${rooms.length} Ruangan`;

    if (rooms.length === 0) {
        container.innerHTML = `<p class="text-caption">Belum ada sebaran ruangan.</p>`;
        return;
    }

    rooms.sort((a, b) => valMap[b] - valMap[a]);

    rooms.forEach(room => {
        const val = valMap[room];
        const qty = qtyMap[room] || 0;
        const pct = totalVal > 0 ? Math.round((val / totalVal) * 100) : 0;

        const card = document.createElement("div");
        card.className = "room-dist-card";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong>${room}</strong>
                <span class="badge" style="font-size:10px;">${pct}% Aset</span>
            </div>
            <span>${qty} Total Barang Fisik</span>
            <h4>${formatRupiah(val)}</h4>
        `;
        container.appendChild(card);
    });
}

function renderSmartInsights(totalValuasi, borrowFreq, roomQtyMap) {
    const depreciation = Math.round(totalValuasi * 0.10);
    const elDep = document.getElementById("dash-depreciation-val");
    if (elDep) elDep.innerText = formatRupiah(depreciation) + " / thn";

    let maxBorrow = 0;
    let topBorrowedItem = "-";
    for (let item in borrowFreq) {
        if (borrowFreq[item] > maxBorrow) {
            maxBorrow = borrowFreq[item];
            topBorrowedItem = item;
        }
    }
    const elMost = document.getElementById("dash-most-borrowed-item");
    if (elMost) elMost.innerText = topBorrowedItem !== "-" ? `${topBorrowedItem} (${maxBorrow}x)` : "Belum Ada";

    let maxDensity = 0;
    let densestRoom = "-";
    for (let r in roomQtyMap) {
        if (roomQtyMap[r] > maxDensity) {
            maxDensity = roomQtyMap[r];
            densestRoom = r;
        }
    }
    const elDense = document.getElementById("dash-densest-room-badge");
    if (elDense) elDense.innerText = densestRoom !== "-" ? `${densestRoom} (${maxDensity} Unit)` : "-";
}

function renderRecentDashboardActivities() {
    const container = document.getElementById("dash-recent-activities");
    if (!container) return;
    container.innerHTML = "";

    const recent = activityLogs.slice(0, 3);
    if (recent.length === 0) {
        container.innerHTML = `<p class="text-caption">Belum ada aktivitas terbaru.</p>`;
        return;
    }

    recent.forEach(l => {
        const div = document.createElement("div");
        div.className = "timeline-item";
        div.innerHTML = `
            <span class="timeline-time">${l.waktu}</span>
            <div><strong>[${l.tipe}]</strong> ${l.deskripsi}</div>
        `;
        container.appendChild(div);
    });
}

function gambarGrafik(baik = 0, ringan = 0, berat = 0, total = 0) {
    const canvas = document.getElementById("kondisiChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = 64;
    const ir = 38;

    const data = [
        { label: "Baik", count: baik, color: "#10b981" },
        { label: "Rusak Ringan", count: ringan, color: "#f59e0b" },
        { label: "Rusak Berat", count: berat, color: "#ef4444" }
    ];

    let start = -0.5 * Math.PI;
    if (total === 0) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.arc(cx, cy, ir, 2 * Math.PI, 0, true);
        ctx.fillStyle = "#80808033";
        ctx.fill();
    } else {
        data.forEach(d => {
            if (d.count > 0) {
                const slice = (d.count / total) * (2 * Math.PI);
                ctx.beginPath();
                ctx.arc(cx, cy, r, start, start + slice);
                ctx.arc(cx, cy, ir, start + slice, start, true);
                ctx.closePath();
                ctx.fillStyle = d.color;
                ctx.fill();
                start += slice;
            }
        });
    }

    const legendEl = document.getElementById("chart-legend");
    if (legendEl) {
        legendEl.innerHTML = data.map(d => `
            <div class="legend-item">
                <span class="legend-dot" style="background:${d.color}"></span>
                <span>${d.label}: <strong>${d.count}</strong></span>
            </div>
        `).join("");
    }
}

// QR CODE RENDER & WATERMARK
function tampilkanQRWatermark(kode, nama) {
    const item = inventoryData.find(d => d.kode === kode) || {
        kode: kode,
        nama: nama,
        ruangan: "Gudang",
        kategori: "Elektronik"
    };

    currentLabelData = item;
    const elNama = document.getElementById("qr-modal-nama");
    const elKode = document.getElementById("qr-modal-kode");
    if (elNama) elNama.innerText = item.nama;
    if (elKode) elKode.innerText = item.kode;

    const canvas = document.getElementById("qr-watermark-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const encoded = encodeURIComponent(kode);
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encoded}&qzone=1`;

    qrImg.onload = () => {
        ctx.drawImage(qrImg, 0, 0, 220, 220);

        const logo = new Image();
        logo.src = "src/icon/icon.png";
        logo.onload = () => {
            const logoSize = 48;
            const logoX = (canvas.width - logoSize) / 2;
            const logoY = (canvas.height - logoSize) / 2;

            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, (logoSize / 2) + 4, 0, 2 * Math.PI);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#c7ff2e";
            ctx.stroke();

            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        };
        logo.onerror = () => {};
    };

    const modalQR = document.getElementById("modal-qr-detail");
    if (modalQR) modalQR.classList.remove("hidden");
}

function tutupModalQR() {
    const modalQR = document.getElementById("modal-qr-detail");
    if (modalQR) modalQR.classList.add("hidden");
    currentLabelData = null;
}

// CETAK STIKER LABEL FISIK RESMI DENGAN ISOLATED PRINT FRAME
function cetakStikerLabel() {
    if (!currentLabelData) return;

    const canvas = document.getElementById("qr-watermark-canvas");
    if (!canvas) return;
    const qrDataUrl = canvas.toDataURL("image/png");

    const printFrame = document.getElementById("print-frame");
    if (!printFrame) return;
    const doc = printFrame.contentWindow.document;

    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Cetak Label - ${currentLabelData.kode}</title>
            <style>
                @page { size: auto; margin: 4mm; }
                * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
                body { background: #fff; display: flex; justify-content: flex-start; align-items: flex-start; padding: 10px; }
                .inventory-sticker { width: 320px; border: 2px solid #000; border-radius: 8px; padding: 12px; background: #fff; color: #000; }
                .sticker-header { display: flex; align-items: center; gap: 10px; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 10px; }
                .sticker-logo { width: 36px; height: 36px; object-fit: contain; }
                .sticker-org-info h4 { font-size: 13px; font-weight: 800; letter-spacing: 0.5px; line-height: 1.2; }
                .sticker-org-info p { font-size: 9px; font-weight: 600; color: #444; margin-top: 2px; }
                .sticker-body { display: flex; align-items: center; gap: 12px; }
                .sticker-qr-box { width: 105px; height: 105px; border: 1px solid #000; padding: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .sticker-qr-img { width: 100%; height: 100%; object-fit: contain; }
                .sticker-meta-box { flex: 1; display: flex; flex-direction: column; gap: 5px; }
                .meta-label { font-size: 8px; color: #555; text-transform: uppercase; display: block; }
                .meta-code { font-size: 15px; font-weight: 900; letter-spacing: 0.5px; display: block; }
                .meta-val { font-size: 11px; font-weight: 700; line-height: 1.3; display: block; word-break: break-word; }
                .sticker-footer { margin-top: 10px; border-top: 1px solid #000; padding-top: 6px; display: flex; justify-content: space-between; font-size: 8px; font-weight: 700; color: #333; }
            </style>
        </head>
        <body>
            <div class="inventory-sticker">
                <div class="sticker-header">
                    <img src="src/icon/icon.png" class="sticker-logo" alt="Logo" onerror="this.style.display='none'">
                    <div class="sticker-org-info">
                        <h4>${(profilInstansi.nama || "XOXO INVENTORY SYSTEM").toUpperCase()}</h4>
                        <p>LABEL IDENTIFIKASI ASET RESMI</p>
                    </div>
                </div>
                <div class="sticker-body">
                    <div class="sticker-qr-box">
                        <img src="${qrDataUrl}" class="sticker-qr-img" alt="QR">
                    </div>
                    <div class="sticker-meta-box">
                        <div>
                            <span class="meta-label">Kode Barang:</span>
                            <span class="meta-code">${currentLabelData.kode}</span>
                        </div>
                        <div>
                            <span class="meta-label">Nama Barang:</span>
                            <span class="meta-val">${currentLabelData.nama}</span>
                        </div>
                        <div>
                            <span class="meta-label">Ruangan:</span>
                            <span class="meta-val">${currentLabelData.ruangan || "-"}</span>
                        </div>
                        <div>
                            <span class="meta-label">Kategori:</span>
                            <span class="meta-val">${currentLabelData.kategori || "Elektronik"}</span>
                        </div>
                    </div>
                </div>
                <div class="sticker-footer">
                    <span>ASET RESMI RUANGAN</span>
                    <span>Tgl: ${new Date().toLocaleDateString("id-ID")}</span>
                </div>
            </div>
        </body>
        </html>
    `);
    doc.close();

    setTimeout(() => {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
    }, 250);
}

function mulaiScanQR() {
    const modal = document.getElementById("modal-scanner");
    if (modal) modal.classList.remove("hidden");
    if (typeof Html5QrcodeScanner !== "undefined") {
        html5QrScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 220 });
        html5QrScanner.render((decodedText) => {
            triggerScannerBeep();
            triggerHapticFeedback();
            tutupScanQR();
            const searchInput = document.getElementById("search-input");
            if (searchInput) searchInput.value = decodedText;
            navigasiKe("page-inventaris", document.querySelectorAll(".dock-btn")[1]);
            filterData();
            showToast(`Kode QR: ${decodedText}`, "success");
        }, () => {});
    } else {
        showToast("Scanner offline belum siap.", "error");
    }
}

function tutupScanQR() {
    if (html5QrScanner) {
        html5QrScanner.clear();
        html5QrScanner = null;
    }
    const modal = document.getElementById("modal-scanner");
    if (modal) modal.classList.add("hidden");
}

// LAPORAN BERITA ACARA
function renderLaporanPreview() {
    const ruang = document.getElementById("laporan-filter-ruang")?.value || "";
    const kondisi = document.getElementById("laporan-filter-kondisi")?.value || "";
    const tbody = document.getElementById("print-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    const elNama = document.getElementById("print-instansi-name");
    if (elNama) elNama.innerText = profilInstansi.nama || "INSTANSI INVENTARIS";

    const elAddr = document.getElementById("print-instansi-addr");
    if (elAddr) elAddr.innerText = profilInstansi.alamat || "Alamat Kantor / Gedung Operasional";

    const elPj = document.getElementById("print-sign-pj");
    if (elPj) elPj.innerText = `( ${profilInstansi.pj || '....................................'} )`;

    const elPet = document.getElementById("print-sign-petugas");
    if (elPet) elPet.innerText = `( ${profilInstansi.petugas || '....................................'} )`;

    const elDate = document.getElementById("print-date");
    if (elDate) elDate.innerText = `Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}`;

    const filtered = inventoryData.filter(item => {
        const matchRuang = ruang === "" || item.ruangan === ruang;
        let matchKondisi = true;
        if (kondisi === "Baik") matchKondisi = item.kondisi === "Baik";
        if (kondisi === "Rusak") matchKondisi = item.kondisi !== "Baik";
        return matchRuang && matchKondisi;
    });

    let totalSubtotal = 0;

    filtered.forEach((item, index) => {
        const subtotal = (item.harga || 0) * (item.jumlah || 0);
        totalSubtotal += subtotal;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.kode}</td>
            <td>${item.nama}</td>
            <td>${item.kategori || 'Elektronik'}</td>
            <td>${item.ruangan}</td>
            <td>${item.jumlah}</td>
            <td>${formatRupiah(item.harga)}</td>
            <td>${formatRupiah(subtotal)}</td>
            <td>${item.kondisi}</td>
        `;
        tbody.appendChild(tr);
    });

    const elSummary = document.getElementById("print-summary-val");
    if (elSummary) elSummary.innerText = `Total Nilai Aset: ${formatRupiah(totalSubtotal)}`;
}

// EXPORT & BACKUP
function exportData(format) {
    if (inventoryData.length === 0) { showToast("Data masih kosong!", "error"); return; }
    let dataStr = "";
    let name = `inventaris_${Date.now()}`;

    if (format === "json") {
        dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inventoryData, null, 2));
        name += ".json";
    } else {
        let csv = "Kode,Nama Barang,Kategori,Ruangan,Jumlah,Harga Satuan,Kondisi\n";
        inventoryData.forEach(r => csv += `"${r.kode}","${r.nama}","${r.kategori || 'Elektronik'}","${r.ruangan}",${r.jumlah},${r.harga || 0},"${r.kondisi}"\n`);
        dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        name += ".csv";
    }

    const a = document.createElement("a");
    a.href = dataStr;
    a.download = name;
    a.click();
    a.remove();
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const parsed = JSON.parse(e.target.result);
            if (Array.isArray(parsed)) {
                inventoryData = parsed;
                simpanKeLocalStorage();
                renderRuanganDropdown();
                filterData();
                catatLog("Impor", "Mengimpor data JSON");
                showToast("Data inventaris berhasil diimpor!", "success");
            }
        } catch { showToast("Format file JSON rusak!", "error"); }
    };
    reader.readAsText(file);
    event.target.value = "";
}

function backupLocalStorage() {
    const backupObj = {
        inventory: inventoryData,
        rooms: masterRuangan,
        prefix: masterPrefix,
        instansi: profilInstansi,
        feedback: settingsFeedback,
        loans: loanData,
        logs: activityLogs,
        theme: localStorage.getItem("xoxo_theme"),
        password: localStorage.getItem("xoxo_password")
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `backup_penuh_inventaris_${Date.now()}.json`;
    a.click();
    a.remove();
}

function restoreLocalStorage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const d = JSON.parse(e.target.result);
            if (d.inventory) inventoryData = d.inventory;
            if (d.rooms) masterRuangan = d.rooms;
            if (d.prefix) masterPrefix = d.prefix;
            if (d.instansi) profilInstansi = d.instansi;
            if (d.feedback) settingsFeedback = d.feedback;
            if (d.loans) loanData = d.loans;
            if (d.logs) activityLogs = d.logs;
            if (d.password) localStorage.setItem("xoxo_password", d.password);

            localStorage.setItem("xoxo_inventory", JSON.stringify(inventoryData));
            localStorage.setItem("xoxo_rooms", JSON.stringify(masterRuangan));
            localStorage.setItem("xoxo_prefix", masterPrefix);
            localStorage.setItem("xoxo_instansi", JSON.stringify(profilInstansi));
            localStorage.setItem("xoxo_feedback", JSON.stringify(settingsFeedback));
            localStorage.setItem("xoxo_loans", JSON.stringify(loanData));
            localStorage.setItem("xoxo_logs", JSON.stringify(activityLogs));

            if (d.theme) gantiTema(d.theme);

            renderRuanganDropdown();
            filterData();
            updateStatistik();
            siapkanKodeInventarisBaru();
            showToast("Sistem berhasil dipulihkan!", "success");
        } catch { showToast("File backup tidak valid!", "error"); }
    };
    reader.readAsText(file);
    event.target.value = "";
}
