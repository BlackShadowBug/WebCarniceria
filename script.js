const swiper = new Swiper('.mySwiper', {
  spaceBetween: 30,
  slidesPerView: 2,
  loopFillGroupWithBlank: true,

  // Optional parameters
  direction: 'horizontal',
  loop: true,



  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 1
    },
    320: {
      slidesPerView: 1
    },
    650: {
      slidesPerView: 2
    },
    950: {
      slidesPerView: 4
    }

  }


});



const carrito = document.getElementById('carrito');
const elementos = document.getElementById('lista');
const elementos2 = document.getElementById('lista-2');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
  elementos.addEventListener('click', comprarElemento);
  elementos2.addEventListener('click', comprarElemento);
  carrito.addEventListener('click', eliminarElemento);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const elemento = e.target.parentElement.parentElement;
    const infoElemento = obtenerDatosElemento(elemento);
    insertarCarrito(infoElemento);
    guardarElementosLocalStorage(infoElemento);
  }
}

function obtenerDatosElemento(elemento) {
  const imagen = elemento.querySelector('img').src;
  const titulo = elemento.querySelector('h3').textContent;
  const precio = elemento.querySelector('.precio').textContent;
  const id = elemento.querySelector('a').getAttribute('data-id');
  return { imagen, titulo, precio, id };
}

function insertarCarrito(elemento) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src="${elemento.imagen}" width="100" />
    </td>
    <td>${elemento.titulo}</td>
    <td>${elemento.precio}</td>
    <td>
      <a href="#" class="borrar" data-id="${elemento.id}">X</a>
    </td>
  `;
  lista.appendChild(row);
}

function eliminarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains('borrar')) {
    const elementoId = e.target.getAttribute('data-id');
    eliminarElementoLocalStorage(elementoId);
    e.target.parentElement.parentElement.remove();
  }
}

function vaciarCarrito() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  vaciarLocalStorage();
}

function guardarElementosLocalStorage(elemento) {
  let elementos;
  if (localStorage.getItem('elementos') === null) {
    elementos = [];
  } else {
    elementos = JSON.parse(localStorage.getItem('elementos'));
  }
  elementos.push(elemento);
  localStorage.setItem('elementos', JSON.stringify(elementos));
}

function leerLocalStorage() {
  let elementos;
  if (localStorage.getItem('elementos') !== null) {
    elementos = JSON.parse(localStorage.getItem('elementos'));
    elementos.forEach((elemento) => insertarCarrito(elemento));
  }
}

function eliminarElementoLocalStorage(elementoId) {
  let elementos;
  if (localStorage.getItem('elementos') !== null) {
    elementos = JSON.parse(localStorage.getItem('elementos'));
    elementos = elementos.filter((elemento) => elemento.id !== elementoId);
    localStorage.setItem('elementos', JSON.stringify(elementos));
  }
}

function vaciarLocalStorage() {
  localStorage.removeItem('elementos');
}
