class Pendaftar {
    constructor(nama, umur, uangSangu) {
      this.nama = nama;
      this.umur = umur;
      this.uangSangu = uangSangu;
    }
  }
  
  let pendaftarList = [];
  
  document.getElementById('form-registrasi').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nama = document.getElementById('nama').value;
    const umur = parseInt(document.getElementById('umur').value);
    const uangSanguInput = document.getElementById('uangSangu').value;
    const uangSangu = parseInt(uangSanguInput.replace(/[^,\d]/g, '')); // Menghapus format selain angka
  
    if (nama.length >= 10 && umur >= 25 && uangSangu >= 100000 && uangSangu <= 1000000) {
      const pendaftarBaru = new Pendaftar(nama, umur, uangSangu);
      pendaftarList.push(pendaftarBaru);
      updateTabel();
    } else {
      alert("Form tidak valid");
    }
  });
  
  async function updateTabel() {
    const tbody = document.querySelector('#list-pendaftar tbody');
    tbody.innerHTML = ''; // Clear the table
  
    let totalUmur = 0;
    let totalUangSangu = 0;
  
    for (const pendaftar of pendaftarList) {
      const row = `<tr><td>${pendaftar.nama}</td><td>${pendaftar.umur}</td><td>${formatRupiah(pendaftar.uangSangu.toString())}</td></tr>`;
      tbody.innerHTML += row;
      totalUmur += pendaftar.umur;
      totalUangSangu += pendaftar.uangSangu;
    }
  
    const rataRataUmur = (totalUmur / pendaftarList.length).toFixed(1);
    const rataRataUangSangu = (totalUangSangu / pendaftarList.length);
  
    document.getElementById('resume').innerHTML = `Rata-rata pendaftar memiliki uang sangu sebesar ${formatRupiah(rataRataUangSangu.toString())} dengan rata-rata umur ${rataRataUmur} tahun`;
  }
  
  function formatRupiah(angka, prefix = 'Rp') {
    const numberString = angka.replace(/[^,\d]/g, '').toString();
    const split = numberString.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  
    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
  
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix + ' ' + rupiah;
  }
  
  // Format input langsung ke dalam format Rupiah saat mengetik
  document.getElementById('uangSangu').addEventListener('input', function(e) {
    e.target.value = formatRupiah(e.target.value, 'Rp');
  });
  