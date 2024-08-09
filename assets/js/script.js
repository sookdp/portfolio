const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
    navbar.classList.toggle("active");
    mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.card__content');
    const leftButton = document.querySelector('.carousel__button--left');
    const rightButton = document.querySelector('.carousel__button--right');

    // Clone the first and last items
    const firstItem = carousel.firstElementChild.cloneNode(true);
    const lastItem = carousel.lastElementChild.cloneNode(true);

    // Append/prepend the clones to the carousel
    carousel.appendChild(firstItem);
    carousel.insertBefore(lastItem, carousel.firstElementChild);

    let scrollAmount = document.querySelector('.card__article').offsetWidth + 20;
    let currentIndex = 1; // Start at the first original item

    // Initial transform to show the first original item
    carousel.style.transform = `translateX(-${scrollAmount}px)`;

    const updateCarousel = () => {
        carousel.style.transition = 'transform 0.5s ease';
        carousel.style.transform = `translateX(-${currentIndex * scrollAmount}px)`;
    };

    leftButton.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
        if (currentIndex === 0) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = carousel.children.length - 2; // Jump to the last original item
                carousel.style.transform = `translateX(-${currentIndex * scrollAmount}px)`;
            }, 500);
        }
    });

    rightButton.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
        if (currentIndex === carousel.children.length - 1) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = 1; // Jump to the first original item
                carousel.style.transform = `translateX(-${scrollAmount}px)`;
            }, 500);
        }
    });

    // For mobile touch support
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = scrollAmount * currentIndex;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 3; // Adjust for scrolling speed
        scrollAmount = scrollLeft - walk;
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = scrollAmount * currentIndex;
    });

    carousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 3;
        scrollAmount = scrollLeft - walk;
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });

    carousel.addEventListener('transitionend', () => {
        if (carousel.children[currentIndex].isEqualNode(firstItem) || carousel.children[currentIndex].isEqualNode(lastItem)) {
            carousel.style.transition = 'none';
            currentIndex = currentIndex === 0 ? carousel.children.length - 2 : 1;
            carousel.style.transform = `translateX(-${currentIndex * scrollAmount}px)`;
        }
    });
});

let mybutton = document.getElementById("back-to-top");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

mybutton.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};