// Fungsi minta izin notifikasi
function mintaIzinNotifikasi() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function(permission) {
      if (permission === "granted") {
        alert("✅ Notifikasi berhasil diaktifkan!");
      } else if (permission === "denied") {
        alert("❌ Notifikasi ditolak. Kamu harus mengizinkan notifikasi di browser.");
      } else {
        alert("⚠ Notifikasi belum diizinkan.");
      }
    });
  } else {
    alert("Browser kamu tidak mendukung notifikasi");
  }
}

// Fungsi kirim notifikasi ke HP (browser)
function kirimNotifikasiRisiko() {
  if (Notification.permission === "granted") {
    new Notification("⚠ Risiko Abrasi Tinggi!", {
      body: "Gelombang atau arus tinggi terdeteksi, harap waspada!",
      icon: "https://example.com/icon.png" // ganti sesuai icon kamu
    });
  }
}

// Fungsi hitung risiko
function hitungRisiko() {
  let gelombang = document.getElementById("gelombang").value;
  let arus = document.getElementById("arus").value;
  let pasut = document.getElementById("pasut").value;

  // ✅ Validasi input lengkap
  if (gelombang === "" || arus === "" || pasut === "") {
    alert("⚠ Harap lengkapi semua data (Gelombang, Arus, Pasang Surut)!");
    document.getElementById("banner-notif").style.display = "none";
    document.getElementById("hasil").innerHTML = "";
    return;
  }

  gelombang = parseFloat(gelombang);
  arus = parseFloat(arus);
  pasut = parseFloat(pasut);

  // Contoh logika risiko: jika salah satu nilai tinggi
  let risiko = (gelombang > 2 || arus > 1.5 || pasut > 1.5) ? "Tinggi" : "Rendah";

  let hasil = document.getElementById("hasil");
  let banner = document.getElementById("banner-notif");

  if (risiko === "Tinggi") {
    hasil.innerHTML = "⚠ Risiko Abrasi: TINGGI";
    banner.style.display = "block";
    kirimNotifikasiRisiko();
  } else {
    hasil.innerHTML = "✅ Risiko Abrasi: Rendah";
    banner.style.display = "none";
  }
}

// Leaflet map
var map = L.map('map').setView([-0.7893, 113.9213], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);
