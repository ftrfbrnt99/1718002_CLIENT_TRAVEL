
const baseUrl = "http://localhost/CI_travel/index.php/";
const token = "API-TOKEN=123456";
const PelangganUrl = `${baseUrl}Pelanggan?${token}`;
const TransaksiUrl = `${baseUrl}Transaksi?${token}`
const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");


function getListData() {
    title.innerHTML = "Daftar Pelanggan"
    fetch(PelangganUrl)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let  data = "";
            resJson.data.forEach(Data => {
                data += `
                <li class="collection-item avatar">
                <span class="title">${Data.id}</span>
                    <p>Nama   :   ${Data.nama}</p>
                    <p>Alamat : ${Data.alamat}</p>
                    <p>Asal   : ${Data.asal}</p>
                    <p>Tujuan : ${Data.tujuan}</p> 
                    <a href="#!" class="secondary-content"><i class="material-icons">info</i></a>
                </li>
                    `
                });
                contents.innerHTML = '<ul class="collection">' + data +'</ul>'
               
            }).catch(err => {
                console.error(err);
            })
}

function getListTransaksi() {
    title.innerHTML = "Daftar Transaksi"
    fetch(TransaksiUrl)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.transaksi);
            let  transaksi = "";
            resJson.data.forEach(Data => {
                transaksi += `
                <li class="collection-item avatar">
                <span class="title">${Data.id}</span>
                    <p>Nama   :   ${Data.nama}</p>
                    <p>Kendaraan : ${Data.kendaraan}</p>
                    <p>Tujuan   : ${Data.tujuan}</p>
                    <p>Biaya : ${Data.biaya}</p> 
                    <a href="#!" class="secondary-content"><i class="material-icons">info</i></a>
                </li>
                    `
                });
                contents.innerHTML = '<ul class="collection">' + transaksi +'</ul>'
               
            }).catch(err => {
                console.error(err);
            })
}
function loadPage(page) {
    switch (page) {
        case "data":
            getListData();
            break;
        case "transaksi":
            getListTransaksi();
            break;    
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "data";
    loadPage(page);
});
