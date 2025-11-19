window.onload = function() {
  document.getElementById("splash-screen").style.opacity = 0;
  setTimeout(function() {
    document.getElementById("splash-screen").style.display = "none";
  }, 1000); 
};



const dabar = [
    { id : 1, nabar: "Faith Industries \"Dark Determination\" Pullover Hoodie Zipp Navy", harga: 475000 , category: "jacket" , img: "jaket1.webp"},
    { id : 2, nabar: "Faith Industries \"Excalibur\" Black Tshirt", harga: 195000 , category: "baju" , img: "baju1.jpg"},
    { id : 3, nabar: "Faith Industries \"The Fallen King of Knights\" Dark Navy Crewneck", harga: 385000 , category: "crewneck" , img: "crew2.webp"},
    { id : 4, nabar: 'Faith Industries BTR "We, United" Black Hoodie', harga: 399000 , category: "jacket" , img: "jaket3.jpg"},
    { id : 5, nabar: 'Faith Industries "Cyberlucid" Tracktop', harga: 499000 , category: "jacket" , img: "jaket2.jpg"},
    { id : 6, nabar: 'Faith Industries "Sun Moon" Crewneck Black', harga: 435000 , category: "crewneck" , img: "crew1.webp"},
    { id : 7, nabar: 'Faith Industries BTR "Seishun Complex" Double Sleeve', harga: 215000 , category: "baju" , img: "baju2.jpg"},
    { id : 8, nabar: 'Faith Industries BTR "Bocchizilla" Black Tshirt', harga: 199000 , category: "baju" , img: "baju3.webp"},
    { id : 9, nabar: 'Faith Industries "The Skull Knight" Leather Jacket Black', harga: 775000 , category: "jacket" , img: "jaket5.webp"},
    { id : 10, nabar: 'Faith Industries "The Devil Survivor"', harga: 215000 , category: "baju" , img: "baju4.webp"},
    { id : 11, nabar: 'Faith Industries "Neo Tokyo is About to Explode" Black Acid Wash Tshirt', harga: 125000 , category: "baju" , img: "baju5.webp"},
    { id : 12, nabar: 'FTH x Isyana "Menarilah dengan Jiwamu" Vest', harga: 340000 , category: "vest" , img: "vest1.webp"},
]

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-left",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "2000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

const Key_Fav = "FAVFAV"
const favorites = JSON.parse(localStorage.getItem(Key_Fav)) || [];
const carsect = document.getElementsByClassName("card_sect")[0]
const openFav = document.getElementById("open_fav");
const closeFav = document.getElementById("close_fav");
const fav = document.getElementById("fav");
let currentCategory = 'all';

      window.addEventListener("scroll", function () {
        var navbar = document.querySelector("nav");
        if (window.scrollY > 50) {
          navbar.classList.add("nav-trans");
        } else {
          navbar.classList.remove("nav-trans");
        }
      });

function renderCard(){
const favorites = JSON.parse(localStorage.getItem(Key_Fav)) || [];
let card = ''
let data
if (currentCategory === 'all'){
    data = dabar
} else {
    data = dabar.filter(item => item.category.toLowerCase() === currentCategory.toLowerCase());
}

data.forEach(item => { 

    const CheckLike = favorites.includes(item.id);
    const iconLiked = CheckLike ? 'fa-solid' : 'fa-regular';
    card += `<div data-aos="flip-up" class="card">
                <div class="hover">
                    <button id="fav_add" onclick="favToggle(${item.id}, this)"><i class="${iconLiked} fa-heart"></i></button>
                </div>
                <div class = "card_isi">
                    <img src="img/${item.img}" alt="Product 1">
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
    currentCategory = category;
    document.querySelectorAll('.filter_but').forEach(btn => {btn.classList.remove('active')});
    element.classList.add('active');
    renderCard()
}


openFav.addEventListener("click", () => {
    fav.style.display = "flex";
    fav.style.opacity = 1;
    fav.style.transition = "0.5s all ease-in-out";
})

closeFav.addEventListener("click", () => {
    fav.style.display = "none";
    fav.style.opacity = 0;
    fav.style.transition = "0.5s all ease-in-out";
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
                <img src="img/${item.img}" alt="Product 1">
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
        toastr["success"]("Berhasil menambahkan item ke favorite!!", "Succes!")
    } else {
        favorites.splice(index, 1);
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        toastr["success"]("Berhasil menghapus item dari favorite!!", "Succes!")
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
        toastr["success"]("Berhasil menghapus item dari favorite!!", "Succes!")
    }
}

    var swiper = new Swiper(".mySwiper", {
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
    });

renderFav()
renderCard()
AOS.init();