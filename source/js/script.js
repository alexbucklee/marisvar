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

    breakpoints: {
        768: {
            loop: 'true',
            loopedSlides: 2,
        },
        1024: {
            loop: 'true',
            loopedSlides: 2,
            navigation: {
                nextEl: '.swiper-button-next',
            }
        }
    }
    
});

// anchor

let pageIndex = document.querySelector('.page-index');
const anchors = pageIndex.querySelectorAll('a[href*="#"]');

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
        map.insertAdjacentHTML('afterbegin', '<iframe tabindex="-1" src="https://yandex.ru/map-widget/v1/?um=constructor%3Af12312a285cd6098f401e5e5ea4587b05d1cc7e8f27f035c07dfb8d927011d40&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>');
        document.removeEventListener('scroll', showmap);
    }
}

document.addEventListener('scroll', showmap);

// photoswipe

var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            
            bgOpacity: 0.85,
            fullscreenEl: false,
            shareEl: false,

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');