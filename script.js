// Fungsi minta izin notifikasi
function mintaIzinNotifikasi() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function(permission) {
      if (permission === "granted") {
        alert("✅ Notifikasi berhasil diaktifkan!");
      } else {
        alert("❌ Notifikasi tidak diizinkan.");
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
      icon: "https://example.com/icon.png" // optional
    });
  }
}

// Fungsi hitung risiko
function hitungRisiko() {
  let gelombang = parseFloat(document.getElementById("gelombang").value);
  let arus = parseFloat(document.getElementById("arus").value);
  let pasut = parseFloat(document.getElementById("pasut").value);

  let risiko = gelombang + arus + pasut; // Contoh perhitungan sederhana

  let hasil = document.getElementById("hasil");
  let banner = document.getElementById("banner-notif");

  if (risiko > 3) {
    hasil.innerHTML = "⚠ Risiko Abrasi: TINGGI";
    banner.style.display = "block"; 
    kirimNotifikasiRisiko(); // Notifikasi ke HP
  } else {
    hasil.innerHTML = "✅ Risiko Abrasi: Rendah";
    banner.style.display = "none";
  }
}

// Leaflet map (contoh)
var map = L.map('map').setView([-0.7893, 113.9213], 5); // Koordinat Indonesia
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);
