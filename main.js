"use strict";
import images from "./images.js";

const list = document.querySelector('.js-gallery');
const markup = createHTML(images);
const overlay = document.querySelector('.js-lightbox');
const originalImg = document.querySelector('.lightbox__image');
const overlayContent = document.querySelector('.lightbox__content');
const closeButton = document.querySelector('button[data-action="close-lightbox"]');
let index = 0;

list.insertAdjacentHTML('afterbegin', markup);

function createHTML (images) {
    return images.map(image=>createGalleryMarkup(image)).join('');
}

function createGalleryMarkup({preview, original, description}) {
    return `<li class="gallery__item">
  <a class="gallery__link"  href=${original}>
    <img class="gallery__image" src=${preview} data-source=${original} alt=${description}/>
  </a>
</li>`;
}

list.addEventListener('click', openModalWindow);
overlay.addEventListener('click', handleOverlayClick);
function setAttribute(original) {
    originalImg.src= `${original}`;
}

function openModalWindow(e) {
e.preventDefault();
window.addEventListener('keydown', closeByEsc);
    window.addEventListener('keydown', arrowCarousel);
if(e.target === e.currentTarget) {
    return;
}
overlay.classList.add('is-open');
const original = e.target.dataset.source;
setAttribute(original);
}

function handleOverlayClick(e) {
    if (e.target === overlayContent || e.target === closeButton){
        window.removeEventListener('keydown', closeByEsc);
        window.removeEventListener('keydown', arrowCarousel);
        overlay.classList.remove('is-open');
        originalImg.src = '';
    }
}

function closeByEsc(e) {
    if(e.code === 'Escape'){
        overlay.classList.remove('is-open');
        window.removeEventListener('keydown', closeByEsc);
        window.removeEventListener('keydown', arrowCarousel);
    }
}

function arrowCarousel(e) {
    const arrOfSrc = [];
    const arrayOfOriginalImg = document.querySelectorAll('.gallery__link');
    arrayOfOriginalImg.forEach(src=>{
        arrOfSrc.push(src.href);
    });
   for(let i = 0; i < arrOfSrc.length; i++){
        if(originalImg.src === arrOfSrc[i]){
            index = i;
        }
    }
    if (e.code === 'ArrowRight'){
        originalImg.src = arrOfSrc[index+=1];
        if(index >= arrOfSrc.length){
            originalImg.src = arrOfSrc[0];
        }
    }
    if (e.code === 'ArrowLeft'){
        originalImg.src = arrOfSrc[index-=1];
        if (index < 0) {
            originalImg.src = arrOfSrc[8];
        }
    }
}