class Pendaftar {
    constructor(nama, umur, uangSangu){
        this.nama = nama;
        this.umur = umur;
        this.uangSangu = uangSangu;
    }
}

let pendaftarList=[];

document.getElementById('form-registrasi').addEventListener('submit', function(event){
    event.preventDefault();

    const nama = document.getElementById('nama').value;
    const umur = parseInt(document.getElementById('umur'.value));
    const uangSangu =parseInt(document.getElementById(uangSangu).value);

    if (nama.length >= 10 && umur >= 25 && uangSangu >= 100000 && uangSangu <= 1000000){
        const pendaftarBaru = new Pendaftar (nama, umur, uangSangu);
        pendaftarList.push(pendaftarBaru);
        updateTabel();
    }else{
        alert("Form tidak valid");
    }
});

async function updateTabel() {
    const tbody = document.querySelector('#list-pendaftar tbody');
    tbody.innerHTML= '';

    let totalUmur = 0;
    let totalUangSangu = 0;

    for( const pendaftar of pendaftarList){
        const row = `<tr><td>${pendaftar.nama}</td><td>${pendaftar.umur}</td><td>${pendaftar.uangSangu}</td></tr>`;
        tbody.innerHTML += row;
        totalUmur += pendaftar.umur;
        totalUangSangu += pendaftar.uangSangu;
    }

    const rataRataUmur = (totalUmur / pendaftarList.length).toFixed(2);
    const rataRataUangSangu = (totalUangSangu / pendaftarList.length).toFixed(2);
 
    document.getElementById('resume').innerHTML = 'Rata-rata pendaftar memiliki uang sangu sebesar ${rataRataUangSangu} dengan rata-rata umur ${rataRataUmur} tahun'
}