// menu

let navToggle = document.querySelector('.main-nav__toggle');
let navMain = document.querySelector('.main-nav__wrapper');
let navHamb = document.querySelector('.main-nav__toggle--hamburger');
let navClose = document.querySelector('.main-nav__toggle--close');
let pageOverlay = document.querySelector('.page__overlay');
let pageBody = document.querySelector('.page__body');

function openMenu() {
    navMain.classList.toggle('main-nav__display-none');
    pageOverlay.classList.toggle('page__overlay--show');
    navHamb.classList.toggle('display-none');
    navClose.classList.toggle('display-none');
    pageBody.classList.toggle('overflow-hidden');
};

navToggle.addEventListener('click', openMenu);

pageOverlay.addEventListener('click', openMenu);

// expand reviews

let reviewsExpand = document.querySelectorAll('.reviews__button-expand');

for (let i = 0; i < reviewsExpand.length; i++) {
    reviewsExpand[i].addEventListener('click', function() {
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

// anchor

const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) (
    anchor.addEventListener('click', function(event) {
        event.preventDefault();

        
        if (window.innerWidth < 1024) {
            let mobileMenu = document.querySelector('.main-nav__wrapper');
            if (mobileMenu.classList.contains('main-nav__display-none')) {} else {
                openMenu()
            }
        }

        const blockID = anchor.getAttribute('href')
        document.querySelector('' + blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
);

function showmap() {
    // console.log(scrollTop);

    let standards = document.querySelector('.standards');
    let standardsTop = standards.offsetTop;

    if (window.pageYOffset > standardsTop) {
        map.insertAdjacentHTML('afterbegin', '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af12312a285cd6098f401e5e5ea4587b05d1cc7e8f27f035c07dfb8d927011d40&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>');
        document.removeEventListener('scroll', showmap);
    }
}

document.addEventListener('scroll', showmap);