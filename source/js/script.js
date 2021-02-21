// menu

let navToggle = document.querySelector('.main-nav__toggle');
let navMain = document.querySelector('.main-nav__wrapper');
let navHamb = document.querySelector('.main-nav__toggle--hamburger');
let navClose = document.querySelector('.main-nav__toggle--close');
let pageOverlay = document.querySelector('.page__overlay');
let pageBody = document.querySelector('.page__body');

navToggle.addEventListener('click', function() {
    navMain.classList.toggle('main-nav__display-none');
    pageOverlay.classList.toggle('page__overlay--show');
    navHamb.classList.toggle('display-none');
    navClose.classList.toggle('display-none');
    pageBody.classList.toggle('overflow-hidden');
});

pageOverlay.addEventListener('click', function () {
    navMain.classList.toggle('main-nav__display-none');
    pageOverlay.classList.toggle('page__overlay--show');
    navHamb.classList.toggle('display-none');
    navClose.classList.toggle('display-none');
    pageBody.classList.toggle('overflow-hidden');
});

// expand reviews


let reviewsExpand = document.querySelectorAll('.reviews__button-expand');

for (let i = 0; i < reviewsExpand.length; i++) {
    reviewsExpand[i].addEventListener('click', function () {
        reviewsExpand[i].querySelector('.reviews__button-expand--open').classList.toggle('display-none');
        reviewsExpand[i].querySelector('.reviews__button-expand--close').classList.toggle('display-none');
        let reviewsText = this.previousElementSibling;
        if (reviewsText.style.maxHeight) {
            reviewsText.style.maxHeight = null;
        } else {
            reviewsText.style.maxHeight = reviewsText.scrollHeight + 'px'
        }
        reviewsText.querySelector('.reviews__text-overlay').classList.toggle('display-none');
    })
}

// swiper

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    pagination: {
        el: '.swiper-pagination',
        
    },

    loop: 'true',
    loopedSlides: 2,

    breakpoints: {
        1024: {
            navigation: {
                nextEl: '.swiper-button-next',
            }
        }
    }
    
});