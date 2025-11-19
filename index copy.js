const dabar = [
    { id : 1, nabar: "sepatu 1", harga: 10000 , category: "sepatu"},
    { id : 2, nabar: "sepatu 2", harga: 10000 , category: "sepatu"},
    { id : 3, nabar: "Jacket", harga: 10000 , category: "jacket"},
    { id : 4, nabar: "sepatu 4", harga: 10000 , category: "sepatu"},
    { id : 5, nabar: "Baju", harga: 10000 , category: "baju"},
    { id : 6, nabar: "sepatu 6", harga: 10000 , category: "sepatu"},
    { id : 7, nabar: "sepatu 7", harga: 10000 , category: "sepatu"},
]

const Key_Fav = "FAVFAV"
const favorites = JSON.parse(localStorage.getItem(Key_Fav)) || [];
const carsect = document.getElementsByClassName("card_sect")[0]
const openFav = document.getElementById("open_fav");
const closeFav = document.getElementById("close_fav");
const fav = document.getElementById("fav");

function renderCard(render){
const favorites = JSON.parse(localStorage.getItem(Key_Fav)) || [];
let card = ''
render.forEach(item => { 

    const CheckLike = favorites.includes(item.id);
    const iconLiked = CheckLike ? 'fa-solid' : 'fa-regular';
    card += `<div class="card">
                <div class="hover">
                    <button id="fav_add" onclick="favToggle(${item.id}, this)"><i class="${iconLiked} fa-heart"></i></button>
                </div>
                <div class = "card_isi">
                    <img src="img/sepatu.png" alt="Product 1">
                    <p class="name">${item.nabar}</p>
                    <p class="price">Rp. ${item.harga.toLocaleString('id-ID')}</p>
                </div>
            </div>`
});

if (carsect){
    carsect.innerHTML = card
}
}

function filterCategory(category, element){
    document.querySelectorAll('.filter_but').forEach(btn => {btn.classList.remove('active')});
    element.classList.add('active');

    if (category === 'ALL'){
        renderCard(dabar)
    } else {
        const filtered = dabar.filter(item => item.category.toLowerCase() === category.toLowerCase());
        renderCard(filtered)
    }
}





openFav.addEventListener("click", () => {
    fav.style.display = "flex";
})

closeFav.addEventListener("click", () => {
    fav.style.display = "none";
})

function renderFav(){
    const favsect = document.getElementsByClassName("fav_card_sect")[0]
    const favorites = JSON.parse(localStorage.getItem(Key_Fav)) || [];
    favsect.innerHTML = ''
    let favCard = ''

    if (favorites.length === 0) {
        favCard = '<p class="fav_kosong">Favorite anda masih kosong nihh</p>'
    }   


    favorites.forEach(favId => {
        const item = dabar.find(produk => produk.id === favId)

        if (item) {
            favCard += `<div class="fav_card">
                <img src="img/sepatu.png" alt="Product 1">
                <div class="fav_card_isi">
                    <p class="nama">${item.nabar}</p>
                    <p class="harga">Rp. ${item.harga.toLocaleString('id-ID')}</p>
                </div>
                <div class="opsi">
                    <button onclick="removeFav(${item.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>`
        }
    })
    favsect.innerHTML = favCard;
}


function favToggle(id, elementButton) {
    let favorites = JSON.parse(localStorage.getItem(Key_Fav)) || [];
    const index = favorites.indexOf(id);
    const icon = elementButton.querySelector(".fa-heart");

    if (index === -1) {
        favorites.push(id);
        icon.classList.remove('fa-regular'); 
        icon.classList.add('fa-solid');
    } else {
        favorites.splice(index, 1);
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    }

    localStorage.setItem(Key_Fav, JSON.stringify(favorites));
    renderFav()
}

function removeFav(id) {
    let favorites = JSON.parse(localStorage.getItem(Key_Fav)) || [];
    const index = favorites.indexOf(id);
    if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem(Key_Fav, JSON.stringify(favorites));
        renderFav();
        renderCard()
    }
}



renderFav()
renderCard(dabar)