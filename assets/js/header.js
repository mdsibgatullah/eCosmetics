const menuIcon = document.querySelector('#menuIcon');
const menu = document.querySelector('#menu');
menuIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
    event.stopPropagation();
});
const searchMenu = document.querySelector('#searchMenu');
const search = document.querySelector('#search');
searchMenu.addEventListener('click', () => {
    search.classList.add('active');
    event.stopPropagation();
});
const searchIcon = document.querySelector('#searchIcon');
searchIcon.addEventListener('click', () => {
    search.classList.remove('active');
});
document.addEventListener('click', (event) => {
    if (!search.contains(event.target)) {
        search.classList.remove('active');
    }
    if (!menu.contains(event.target)) {
        menu.classList.remove('active');
    }
});
const searchInput = document.getElementById("searchInput");
const suggProduct = document.getElementById("suggProduct");
searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() !== "") {
        suggProduct.style.display = "block";
    } else {
        suggProduct.style.display = "none";
    }
});