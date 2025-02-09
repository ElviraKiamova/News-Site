const closeMenuElement = document.querySelector('.header__close-burger');
const navigationMenuElement = document.querySelector('.header__nav');
const burgerMenuElement = document.querySelector('.header__burger-menu');
const dropDownElement = document.querySelector('.header__drop-down');
const selectNewsElement = document.querySelector('.news-select');
const newsListElements = document.querySelectorAll('[data-category]');
const imageNewsElements = document.querySelectorAll('.news__card-img');


const uploadImages = (image) => {
    const srcImage = image.getAttribute('data-src');
    if (srcImage) {
    image.src = srcImage;
    image.addEventListener('load', () => {
      image.style.opacity = 1;
    });
    image.addEventListener('error', () => {
      console.error(`Ошибка: ${srcImage}`);
      image.alt = 'Изображение не доступно';
    });
    image.removeAttribute('data-src');
    }
  };

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        uploadImages(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  imageNewsElements.forEach((image) => {
    observer.observe(image);
  });
});




const onOpenNewsList = () => {
  dropDownElement.classList.add('header__drop-down_opened');
}
selectNewsElement.addEventListener('mouseenter', onOpenNewsList);

newsListElements.forEach(item => {
    item.addEventListener('click', () => {
        if (item.style.backgroundColor === 'rgb(253, 199, 13)') {
            item.style.backgroundColor = '';
        } else {
            item.style.backgroundColor = 'rgb(253, 199, 13)';
        }
    });
});

document.addEventListener("click", function(event) {
  if (!dropDownElement.contains(event.target)) {
    dropDownElement.classList.remove('header__drop-down_opened');
    newsListElements.forEach(item => {
        item.style.backgroundColor = '';
    });
  }
});



const onOpenBurgerMenu = (event) => {
  event.stopPropagation();
  navigationMenuElement.classList.add('header__nav_opened');
}
burgerMenuElement.addEventListener('click', onOpenBurgerMenu);
  
const onCloseBurgerMenu = () => {
  navigationMenuElement.classList.remove('header__nav_opened');
}
closeMenuElement.addEventListener('click', onCloseBurgerMenu);

document.addEventListener("click", function(event) {
  if (!navigationMenuElement.contains(event.target)) {
      onCloseBurgerMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    onCloseBurgerMenu();
  }
});