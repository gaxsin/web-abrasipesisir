// ==========================
// PETA LOKASI
// ==========================
let map = L.map('map').setView([-0.1, 109.3], 9);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

L.marker([-0.1, 109.3]).addTo(map)
 .bindPopup("Lokasi Pantai Rawan Abrasi");

// ==========================
// NOTIFIKASI
// ==========================
function aktifkanNotifikasi() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
  Notification.requestPermission();
}

// ==========================
// HITUNG RISIKO ABRASI
// ==========================
function hitungRisiko() {
  let gelombang = parseFloat(document.getElementById("gelombang").value);
  let arus = parseFloat(document.getElementById("arus").value);
  let pasut = parseFloat(document.getElementById("pasut").value);

  let hasil = document.getElementById("hasil");

  if (isNaN(gelombang) || isNaN(arus) || isNaN(pasut)) {
    hasil.innerHTML = "⚠️ Lengkapi semua data!";
    hasil.style.color = "black";
    return;
  }

  let skor = gelombang * arus * pasut;

  if (skor < 0.5) {
    hasil.innerHTML = "🟢 Risiko Rendah";
    hasil.style.color = "green";
  }
  else if (skor < 1.5) {
    hasil.innerHTML = "🟡 Risiko Sedang";
    hasil.style.color = "orange";
  }
  else {
    hasil.innerHTML = "🔴 Risiko Tinggi – POTENSI ABRASI!";
    hasil.style.color = "red";

    if (Notification.permission === "granted") {
      new Notification("⚠️ Peringatan Dini Abrasi", {
        body: "Gelombang, arus, dan pasut tinggi terdeteksi!",
        vibrate: [200, 100, 200]
      });
    }
  }
}