// KAMUS BAHASA (I18N)
const translations = {
    id: {
        splash_creator: "Dibuat oleh XoXo Team",
        tutorial_badge: "Panduan Ringkas",
        welcome_title: "Selamat Datang di XoXo",
        welcome_desc: "Aplikasi manajemen inventaris ruangan mandiri berbasis Progressive Web App (PWA).",
        step1_title: "Kelola Data & Foto",
        step1_desc: "Kode otomatis dibuat dan cerdas mengisi ulang slot kosong. Tambahkan ruangan melalui tombol khusus.",
        step2_title: "Kamera Pemindai QR",
        step2_desc: "Gunakan tombol kamera di navigasi bawah untuk mencari barang secara instan di gudang.",
        step3_title: "Bekerja Tanpa Internet",
        step3_desc: "Data aman di memori perangkat. Lakukan backup berkala di menu Pengaturan.",
        login_header: "Akses Petugas",
        login_caption: "Masukkan kata sandi untuk masuk",
        password_label: "Kata Sandi",
        btn_login: "Buka Aplikasi",
        nav_dashboard: "Dasbor",
        nav_items: "Barang",
        nav_loans: "Pinjam",
        nav_history: "Riwayat",
        nav_report: "Laporan",
        stat_val: "Total Valuasi Aset",
        stat_unit: "Total Unit Barang",
        stat_good: "Kondisi Baik",
        stat_bad: "Total Rusak",
        stat_loan: "Sedang Dipinjam",
        chart_title: "Proporsi Kondisi Barang",
        form_title_add: "Tambah Data Barang",
        form_title_edit: "Edit Data Barang",
        btn_add_room: "+ Ruangan",
        btn_open_form: "Buka Form",
        btn_close_form: "Tutup Form",
        col_code: "Kode Inventaris (Otomatis)",
        col_name: "Nama Barang",
        col_room: "Pilih Ruangan",
        col_qty: "Jumlah Unit",
        col_price: "Harga Satuan (Rp)",
        col_cond: "Kondisi Barang",
        col_photo: "Foto Dokumentasi Fisik",
        btn_save_item: "Simpan Barang",
        btn_cancel_edit: "Batal Edit",
        btn_batch_move: "Mutasi Ruangan",
        btn_batch_del: "Hapus Massal",
        item_list_title: "Daftar Barang",
        select_all: "Pilih Semua",
        empty_state: "Tidak ada data inventaris ditemukan.",
        loan_form_title: "Catat Peminjaman Barang",
        loan_choose_item: "Pilih Barang",
        loan_borrower: "Nama Peminjam",
        loan_due: "Tenggat Pengembalian",
        btn_save_loan: "Simpan Transaksi Pinjam",
        loan_table_title: "Status Peminjaman Aktif",
        log_title: "Log Riwayat Aktivitas",
        btn_clear_log: "Bersihkan Log",
        report_title: "Cetak Berita Acara & Rekap Aset",
        report_filter_room: "Filter Berdasarkan Ruangan",
        report_filter_cond: "Kondisi Barang",
        btn_print_pdf: "Cetak Laporan / PDF",
        setting_title: "Pengaturan",
        setting_caption: "Kelola sistem, tampilan, dan preferensi aplikasi",
        tab_theme: "Tema Tampilan",
        tab_lang: "Bahasa",
        tab_account: "Akun & Keamanan",
        tab_data: "Data & Cadangan",
        tab_about: "Tentang Aplikasi & S&K",
        tab_snk: "Syarat & Ketentuan",
        menu_theme_desc: "Mode Terang, Gelap, atau Otomatis HP",
        menu_lang_desc: "Pilih Bahasa Indonesia atau English",
        menu_acc_desc: "Ganti kata sandi akses aplikasi",
        menu_data_desc: "Ekspor, impor, cadangkan data JSON",
        menu_about_desc: "Informasi versi, developer, lisensi",
        menu_snk_desc: "Kebijakan privasi dan data lokal",
        theme_mode_title: "Mode Tampilan Visual",
        theme_mode_desc: "Pilih skema warna antarmuka yang paling sesuai dengan kenyamanan Anda.",
        theme_auto: "Otomatis (Sistem HP)",
        lang_setting_title: "Pengaturan Bahasa",
        lang_setting_desc: "Pilih bahasa pengantar antarmuka aplikasi.",
        acc_title: "Keamanan & Kata Sandi",
        acc_desc: "Ubah kata sandi lokal untuk mengamankan akses aplikasi di perangkat ini.",
        acc_curr_pw: "Kata Sandi Sekarang",
        acc_new_pw: "Kata Sandi Baru",
        acc_btn_update: "Perbarui Kata Sandi",
        export_import_title: "Ekspor & Impor Inventaris",
        btn_import_json: "Impor Berkas JSON",
        backup_title: "Cadangan Penuh (Full Backup)",
        backup_desc: "Unduh seluruh berkas konfigurasi, data ruangan, riwayat, dan transaksi untuk dipindahkan ke HP lain.",
        btn_backup: "Unduh Cadangan",
        btn_restore: "Pulihkan Cadangan",
        about_desc: "Aplikasi manajemen inventaris barang dan ruangan berbasis Progressive Web App (PWA). Berjalan mandiri tanpa database eksternal, dengan penyimpanan media foto di IndexedDB dan data di LocalStorage.",
        snk_title: "Syarat & Ketentuan Penggunaan",
        snk_1_title: "1. Penyimpanan Data Lokal:",
        snk_1_desc: "Seluruh data barang, riwayat, dan foto inventaris disimpan sepenuhnya di memori browser perangkat pengguna. Aplikasi tidak mengirim data ke server mana pun.",
        snk_2_title: "2. Risiko Penghapusan Cache:",
        snk_2_desc: "Menghapus cache browser (*Clear Data*) dapat menghilangkan data yang tersimpan jika pengguna tidak memiliki cadangan. Pengguna disarankan rutin mengunduh cadangan JSON melalui tab Data & Backup.",
        snk_3_title: "3. Akses Kamera:",
        snk_3_desc: "Fitur pemindai QR Code memerlukan izin akses kamera perangkat secara lokal dan hanya aktif saat pemindaian dilakukan.",
        snk_4_title: "4. Penggunaan Offline:",
        snk_4_desc: "Aplikasi dapat diinstal ke layar utama (*Home Screen*) dan dibuka kapan saja tanpa memerlukan kuota internet aktif."
    },
    en: {
        splash_creator: "Created by XoXo Team",
        tutorial_badge: "Quick Guide",
        welcome_title: "Welcome to XoXo",
        welcome_desc: "Standalone room inventory management app built on Progressive Web App (PWA).",
        step1_title: "Manage Items & Photos",
        step1_desc: "Codes auto-generate and reuse freed slots. Add rooms via the dedicated button.",
        step2_title: "QR Scanner Camera",
        step2_desc: "Use the camera button in the bottom dock to scan items instantly in your warehouse.",
        step3_title: "Works Completely Offline",
        step3_desc: "Data is stored safely on this device. Back up regularly via Settings.",
        login_header: "Staff Access",
        login_caption: "Enter your password to proceed",
        password_label: "Password",
        btn_login: "Open Application",
        nav_dashboard: "Dashboard",
        nav_items: "Items",
        nav_loans: "Loans",
        nav_history: "History",
        nav_report: "Reports",
        stat_val: "Total Asset Value",
        stat_unit: "Total Item Units",
        stat_good: "Good Condition",
        stat_bad: "Total Damaged",
        stat_loan: "Currently Loaned",
        chart_title: "Item Condition Proportion",
        form_title_add: "Add Item Data",
        form_title_edit: "Edit Item Data",
        btn_add_room: "+ Room",
        btn_open_form: "Open Form",
        btn_close_form: "Close Form",
        col_code: "Inventory Code (Auto)",
        col_name: "Item Name",
        col_room: "Select Room",
        col_qty: "Quantity",
        col_price: "Unit Price (Rp)",
        col_cond: "Condition",
        col_photo: "Photo Evidence",
        btn_save_item: "Save Item",
        btn_cancel_edit: "Cancel Edit",
        btn_batch_move: "Batch Move Room",
        btn_batch_del: "Batch Delete",
        item_list_title: "Item List",
        select_all: "Select All",
        empty_state: "No inventory items found.",
        loan_form_title: "Record Item Loan",
        loan_choose_item: "Select Item",
        loan_borrower: "Borrower Name",
        loan_due: "Due Date",
        btn_save_loan: "Save Loan Record",
        loan_table_title: "Active Loan Records",
        log_title: "Activity Audit Logs",
        btn_clear_log: "Clear Logs",
        report_title: "Print Minutes & Asset Summary",
        report_filter_room: "Filter by Room",
        report_filter_cond: "Condition",
        btn_print_pdf: "Print Report / PDF",
        setting_title: "Settings",
        setting_caption: "Manage system, appearance, and application preferences",
        tab_theme: "Theme & Display",
        tab_lang: "Language",
        tab_account: "Account & Security",
        tab_data: "Data & Backup",
        tab_about: "About & Terms",
        tab_snk: "Terms & Conditions",
        menu_theme_desc: "Light, Dark, or System Auto",
        menu_lang_desc: "Choose Indonesian or English",
        menu_acc_desc: "Change application access password",
        menu_data_desc: "Export, import, and backup JSON data",
        menu_about_desc: "Version, developer, and license info",
        menu_snk_desc: "Privacy and local storage policy",
        theme_mode_title: "Display Mode",
        theme_mode_desc: "Choose an interface color scheme that fits your environment.",
        theme_auto: "Automatic (Device OS)",
        lang_setting_title: "Language Settings",
        lang_setting_desc: "Choose your preferred interface language.",
        acc_title: "Security & Password",
        acc_desc: "Change local password to protect inventory data on this device.",
        acc_curr_pw: "Current Password",
        acc_new_pw: "New Password",
        acc_btn_update: "Update Password",
        export_import_title: "Export & Import Inventory",
        btn_import_json: "Import JSON File",
        backup_title: "Full Backup & Restore",
        backup_desc: "Download complete configuration, rooms, history, and transaction files to migrate devices.",
        btn_backup: "Download Backup",
        btn_restore: "Restore Backup",
        about_desc: "Room and item inventory manager built as a Progressive Web App (PWA). Functions without external databases using IndexedDB for media and LocalStorage for records.",
        snk_title: "Terms & Conditions",
        snk_1_title: "1. Local Data Storage:",
        snk_1_desc: "All inventory data, logs, and photos are stored entirely in your device's browser storage. No data is sent to external servers.",
        snk_2_title: "2. Cache Clearing Risk:",
        snk_2_desc: "Clearing browser data may erase local records if not backed up. Users are advised to download JSON backups regularly via the Data & Backup tab.",
        snk_3_title: "3. Camera Access:",
        snk_3_desc: "QR scanner features require local camera access permission and are only active during scanning.",
        snk_4_title: "4. Offline Use:",
        snk_4_desc: "The app can be added to your Home Screen and opened anytime without an active internet connection."
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

// INDEXEDDB ENGINE
const DB_NAME = "XoXoInventoryMediaDB";
const DB_VERSION = 1;
const STORE_NAME = "item_photos";

function bukaDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id" });
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function simpanFotoDB(id, base64) {
    if (!base64) return;
    const db = await bukaDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        store.put({ id, image: base64 });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function ambilFotoDB(id) {
    const db = await bukaDB();
    return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result ? req.result.image : null);
        req.onerror = () => resolve(null);
    });
}

async function hapusFotoDB(id) {
    const db = await bukaDB();
    return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => resolve();
    });
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
        navigator.vibrate(25);
    }
}

// SMART AUTO-INCREMENT KODE
function generateSmartKodeInventaris() {
    const regex = new RegExp(`^${masterPrefix}-(\\d+)$`);
    const existingNums = inventoryData
        .map(item => {
            const match = item.kode.match(regex);
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

// LOGIKA PILIH & SIMPAN BAHASA (DENGAN TOMBOL SIMPAN)
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
        if (dict[key]) {
            el.innerText = dict[key];
        }
    });

    const activePage = document.querySelector(".page-view.active");
    if (activePage) {
        const titles = {
            "page-dashboard": dict.nav_dashboard,
            "page-inventaris": dict.nav_items,
            "page-peminjaman": dict.nav_loans,
            "page-log": dict.nav_history,
            "page-laporan": dict.nav_report,
            "page-setting": dict.setting_title,
            "page-setting-theme": dict.tab_theme,
            "page-setting-lang": dict.tab_lang,
            "page-setting-instansi": "Profil Instansi",
            "page-setting-prefix": "Format Kode",
            "page-setting-haptic": "Getar & Suara",
            "page-setting-storage": "Penyimpanan",
            "page-setting-acc": dict.tab_account,
            "page-setting-data": dict.tab_data,
            "page-setting-reset": "Reset Pabrik",
            "page-setting-about": dict.tab_about
        };
        const titleEl = document.getElementById("page-current-title");
        if (titleEl && titles[activePage.id]) {
            titleEl.innerText = titles[activePage.id];
        }
    }

    updateIndikatorPilihanBahasa(lang);
}

// INISIALISASI
window.addEventListener("DOMContentLoaded", () => {
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

    document.getElementById("custom-prefix-input").value = masterPrefix;
    document.getElementById("preview-prefix-format").innerText = `${masterPrefix}-001`;
    document.getElementById("instansi-nama").value = profilInstansi.nama;
    document.getElementById("instansi-alamat").value = profilInstansi.alamat;
    document.getElementById("instansi-pj").value = profilInstansi.pj;
    document.getElementById("instansi-petugas").value = profilInstansi.petugas;
    document.getElementById("toggle-haptic").checked = settingsFeedback.haptic;
    document.getElementById("toggle-beep").checked = settingsFeedback.beep;

    setTimeout(() => {
        const splash = document.getElementById("splash-screen");
        splash.classList.add("fade-out");
        setTimeout(() => {
            splash.style.display = "none";
            cekStatusLogin();
        }, 500);
    }, 1800);
});

// SPA NAVIGATION UTAMA
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
        "page-setting-theme": dict.tab_theme,
        "page-setting-lang": dict.tab_lang,
        "page-setting-instansi": "Profil Instansi",
        "page-setting-prefix": "Format Kode",
        "page-setting-haptic": "Getar & Suara",
        "page-setting-storage": "Penyimpanan",
        "page-setting-acc": dict.tab_account,
        "page-setting-data": dict.tab_data,
        "page-setting-reset": "Reset Pabrik",
        "page-setting-about": dict.tab_about
    };
    document.getElementById("page-current-title").innerText = titles[pageId] || "Inventaris";

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

// AUTH
function cekStatusLogin() {
    if (currentUser) {
        tampilkanAplikasiUtama();
    } else {
        document.getElementById("login-view").classList.remove("hidden");
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
            gambarGrafik();
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
    gambarGrafik();
}

// PENGATURAN TAMBAHAN
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
    document.getElementById("storage-local-size").innerText = `~ ${(totalChars / 1024).toFixed(1)} KB`;

    const db = await bukaDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const countReq = tx.objectStore(STORE_NAME).count();
    countReq.onsuccess = () => {
        document.getElementById("storage-media-count").innerText = `${countReq.result} Berkas Foto`;
    };
}

async function bersihkanCacheFoto() {
    const yakin = await showConfirm("Bersihkan Foto", "Hapus seluruh dokumentasi foto dari memori?");
    if (yakin) {
        const db = await bukaDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).clear();
        tx.oncomplete = () => {
            hitungKapasitasMemori();
            filterData();
            showToast("Semua berkas foto telah dibersihkan!", "info");
        };
    }
}

async function eksekusiResetPabrik() {
    const yakin = await showConfirm("RESET TOTAL PABRIK", "PERINGATAN: Semua barang, ruangan, foto, dan histori akan dihapus permanen. Lanjutkan?");
    if (yakin) {
        localStorage.clear();
        const db = await bukaDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).clear();
        tx.oncomplete = () => {
            sessionStorage.clear();
            alert("Aplikasi berhasil direset total ke setelan pabrik.");
            location.reload();
        };
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

    selectForm.innerHTML = `<option value="">-- Pilih Ruangan --</option>`;
    selectBatch.innerHTML = `<option value="">-- Pilih Ruangan Tujuan --</option>`;
    selectFilter.innerHTML = `<option value="">Semua Ruangan</option>`;
    selectLaporan.innerHTML = `<option value="">Semua Ruangan</option>`;

    listSemua.forEach(r => {
        selectForm.innerHTML += `<option value="${r}">${r}</option>`;
        selectBatch.innerHTML += `<option value="${r}">${r}</option>`;
        selectFilter.innerHTML += `<option value="${r}">${r}</option>`;
        selectLaporan.innerHTML += `<option value="${r}">${r}</option>`;
    });

    selectPinjam.innerHTML = `<option value="">-- Pilih Barang --</option>`;
    inventoryData.forEach(item => {
        selectPinjam.innerHTML += `<option value="${item.id}">${item.nama} (${item.kode}) - Stok: ${item.jumlah}</option>`;
    });
}

// INVENTARIS FORM & AUTO KODE
function siapkanKodeInventarisBaru() {
    if (!document.getElementById("item-id").value) {
        document.getElementById("item-kode").value = generateSmartKodeInventaris();
    }
}

function tampilkanAplikasiUtama() {
    document.getElementById("main-app").classList.remove("hidden");
    renderRuanganDropdown();
    filterData();
    updateStatistik();
}

function toggleFormInventaris() {
    const form = document.getElementById("form-inventaris");
    const btn = document.getElementById("btn-toggle-form");

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

    const dict = translations[systemLang] || translations.id;
    document.getElementById("form-heading").innerText = dict.form_title_edit;
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
    const dict = translations[systemLang] || translations.id;
    document.getElementById("item-id").value = "";
    document.getElementById("form-inventaris").reset();
    hapusPreviewFoto();
    document.getElementById("form-heading").innerText = dict.form_title_add;
    document.getElementById("btn-cancel").classList.add("hidden");
    siapkanKodeInventarisBaru();
}

function simpanKeLocalStorage() {
    localStorage.setItem("xoxo_inventory", JSON.stringify(inventoryData));
    updateStatistik();
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
        bar.classList.remove("hidden");
        count.innerText = `${selectedItemIds.size} dipilih`;
    } else {
        bar.classList.add("hidden");
        document.getElementById("select-all-checkbox").checked = false;
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

    catatLog("Mutasi", `Memindahkan ${selectedItemIds.size} item ke ${tujuan}`);
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
    container.innerHTML = "";

    countBadge.innerText = `${data.length} Barang`;

    if (data.length === 0) {
        empty.classList.remove("hidden");
        updateBatchUI();
        return;
    }
    empty.classList.add("hidden");

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
    const q = document.getElementById("search-input").value.toLowerCase();
    const kat = document.getElementById("filter-kategori").value;
    const ruang = document.getElementById("filter-ruangan").value;
    const kondisi = document.getElementById("filter-kondisi").value;

    const filtered = inventoryData.filter(item => {
        const matchNama = item.nama.toLowerCase().includes(q);
        const matchKode = item.kode.toLowerCase().includes(q);
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
        btn.classList.add("listening");
        showToast("Silakan berbicara...", "info");
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("search-input").value = transcript;
        filterData();
        showToast(`Mencari: "${transcript}"`, "success");
    };

    recognition.onerror = () => btn.classList.remove("listening");
    recognition.onend = () => btn.classList.remove("listening");
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

// STATISTIK & GRAFIK
function updateStatistik() {
    let total = 0;
    let totalValuasi = 0;
    let baik = 0;
    let rusak = 0;
    let ringan = 0;
    let berat = 0;
    let lowStockCount = 0;

    inventoryData.forEach(item => {
        const q = item.jumlah || 0;
        const harga = item.harga || 0;
        total += q;
        totalValuasi += (q * harga);

        if (item.minStok && q <= item.minStok) lowStockCount++;

        if (item.kondisi === "Baik") baik += q;
        if (item.kondisi === "Rusak Ringan") { rusak += q; ringan += q; }
        if (item.kondisi === "Rusak Berat") { rusak += q; berat += q; }
    });

    let totalDipinjam = 0;
    loanData.forEach(l => totalDipinjam += l.jumlah);

    document.getElementById("stat-valuasi").innerText = formatRupiah(totalValuasi);
    document.getElementById("stat-total").innerText = total;
    document.getElementById("stat-baik").innerText = baik;
    document.getElementById("stat-rusak").innerText = rusak;
    document.getElementById("stat-pinjam").innerText = totalDipinjam;
    document.getElementById("stat-low-stock").innerText = lowStockCount;

    gambarGrafik(baik, ringan, berat, total);
}

function gambarGrafik(baik = 0, ringan = 0, berat = 0, total = 0) {
    const canvas = document.getElementById("kondisiChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = 70;
    const ir = 40;

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

    document.getElementById("chart-legend").innerHTML = data.map(d => `
        <div class="legend-item">
            <span class="legend-dot" style="background:${d.color}"></span>
            <span>${d.label}: <strong>${d.count}</strong></span>
        </div>
    `).join("");
}

// QR CODE DENGAN WATERMARK LOGO DI TENGAH
function tampilkanQRWatermark(kode, nama) {
    document.getElementById("qr-modal-nama").innerText = nama;
    document.getElementById("qr-modal-kode").innerText = kode;

    const canvas = document.getElementById("qr-watermark-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const encoded = encodeURIComponent(kode);
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encoded}&qzone=1`;

    qrImg.onload = () => {
        ctx.drawImage(qrImg, 0, 0, 220, 220);

        const logo = new Image();
        logo.src = "icon.png";
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

    document.getElementById("modal-qr-detail").classList.remove("hidden");
}

function tutupModalQR() {
    document.getElementById("modal-qr-detail").classList.add("hidden");
}

function mulaiScanQR() {
    document.getElementById("modal-scanner").classList.remove("hidden");
    if (typeof Html5QrcodeScanner !== "undefined") {
        html5QrScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 220 });
        html5QrScanner.render((decodedText) => {
            triggerScannerBeep();
            triggerHapticFeedback();
            tutupScanQR();
            document.getElementById("search-input").value = decodedText;
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
    document.getElementById("modal-scanner").classList.add("hidden");
}

// LAPORAN BERITA ACARA
function renderLaporanPreview() {
    const ruang = document.getElementById("laporan-filter-ruang").value;
    const kondisi = document.getElementById("laporan-filter-kondisi").value;
    const tbody = document.getElementById("print-table-body");
    tbody.innerHTML = "";

    document.getElementById("print-instansi-name").innerText = profilInstansi.nama || "INSTANSI INVENTARIS";
    document.getElementById("print-instansi-addr").innerText = profilInstansi.alamat || "Alamat Kantor / Gedung Operasional";
    document.getElementById("print-sign-pj").innerText = `( ${profilInstansi.pj || '....................................'} )`;
    document.getElementById("print-sign-petugas").innerText = `( ${profilInstansi.petugas || '....................................'} )`;
    document.getElementById("print-date").innerText = `Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}`;

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

    document.getElementById("print-summary-val").innerText = `Total Nilai Aset: ${formatRupiah(totalSubtotal)}`;
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
        lang: localStorage.getItem("xoxo_lang"),
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

            if (d.lang) {
                systemLang = d.lang;
                selectedLangCandidate = d.lang;
                localStorage.setItem("xoxo_lang", d.lang);
                terapkanBahasa(d.lang);
            }
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