const produk = [
  { id: 1, nama: "Reseller Panel", harga: 5000, gambar: "https://via.placeholder.com/200?text=Produk+1" },
  { id: 2, nama: "Admin Panel", harga: 10000, gambar: "https://via.placeholder.com/200?text=Produk+2" },
  { id: 3, nama: "Jasa Penambahan Fitur Script ", harga: 13000, gambar: "https://via.placeholder.com/200?text=Produk+3" },
  { id: 4, nama: "Script Bot", harga: 10000 - 45000, gambar: "https://via.placeholder.com/200?text=Produk+4" },
  { id: 5, nama: "Reseller Simpel Bot V4", harga: 25000, gambar: "https://via.placeholder.com/200?text=Produk+5" },
  { id: 6, nama: "Reseller Script Simpel Bot V7", harga: 30000, gambar: "https://via.placeholder.com/200?text=Produk+6" },
  { id: 7, nama: "Reseller Script Bot Store V3", harga: 20000, gambar: "https://via.placeholder.com/200?text=Produk+7" },
  { id: 8, nama: "Jasa Pembuatan Website", harga: 35000, gambar: "https://via.placeholder.com/200?text=Produk+8" },
  { id: 9, nama: "Jasa Rename Script", harga: 10000 - 20000, gambar: "https://via.placeholder.com/200?text=Produk+9" },
  { id: 10, nama: "Produk 10", harga: 55000, gambar: "https://via.placeholder.com/200?text=Produk+10" },
  { id: 11, nama: "Panel Pterodactyl", harga: 1000 - 10000, gambar: "https://via.placeholder.com/200?text=Produk+11" },
  { id: 12, nama: "Jasa Pembuatan Script Bot ( Only Pushkontak , Cpanel , Jaga Grup )", harga: 15000 - 35000, gambar: "https://via.placeholder.com/200?text=Produk+12" },
];

let keranjang = [];
let total = 0;

function tampilkanProduk() {
  const container = document.getElementById("daftarProduk");
  container.innerHTML = "";
  produk.forEach(p => {
    container.innerHTML += `
      <div class="produk">
        <img src="${p.gambar}" alt="${p.nama}" />
        <h2>${p.nama}</h2>
        <p>Harga: Rp${p.harga.toLocaleString()}</p>
        <button onclick="tambahKeKeranjang(${p.id})">Tambah ke Keranjang</button>
      </div>
    `;
  });
}

function tambahKeKeranjang(id) {
  const produkDipilih = produk.find(p => p.id === id);
  if (produkDipilih) {
    keranjang.push(produkDipilih);
    total += produkDipilih.harga;
    updateKeranjang();
  }
}

function updateKeranjang() {
  const daftar = document.getElementById("daftarKeranjang");
  daftar.innerHTML = "";
  keranjang.forEach((item, i) => {
    daftar.innerHTML += `<li>${item.nama} - Rp${item.harga.toLocaleString()}</li>`;
  });
  document.getElementById("totalHarga").innerText = `Rp${total.toLocaleString()}`;

  const btnBayar = document.getElementById("btnBayar");
  if (keranjang.length > 0) {
    btnBayar.style.display = "inline-block";
  } else {
    btnBayar.style.display = "none";
    document.getElementById("pembayaranContainer").classList.add("hidden");
  }
}

function tampilkanPembayaran() {
  document.getElementById("pembayaranContainer").classList.remove("hidden");
  window.scrollTo(0, document.body.scrollHeight);
}

function copy(text) {
  navigator.clipboard.writeText(text);
  alert("Nomor Dana disalin: " + text);
}

function kirimWA() {
  const catatan = document.getElementById("catatan").value;
  const bukti = document.getElementById("buktiTransfer").files[0];
  const nomorAdmin = "6281936513894"; // Ganti dengan nomor admin kamu

  if (!bukti) {
    alert("Mohon upload bukti transfer terlebih dahulu.");
    return;
  }

  let pesanStruk = `Struk Pembelian:\nTanggal: ${new Date().toLocaleString()}\n\n`;
  keranjang.forEach(item => {
    pesanStruk += `${item.nama} - Rp${item.harga.toLocaleString()}\n`;
  });
  pesanStruk += `\nTotal: Rp${total.toLocaleString()}\nCatatan: ${catatan}\n\nSaya sudah transfer dan mengirimkan bukti transfer.`;

  const pesanWA = encodeURIComponent(pesanStruk);
  window.open(`https://wa.me/${nomorAdmin}?text=${pesanWA}`, "_blank");
}

window.onload = () => {
  tampilkanProduk();
  updateKeranjang();
};