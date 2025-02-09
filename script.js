const closeMenuElement = document.querySelector('.header__close-burger');
const navigationMenuElement = document.querySelector('.header__nav');
const burgerMenuElement = document.querySelector('.header__burger-menu');
const dropDownElement = document.querySelector('.header__drop-down');
const selectNewsElement = document.querySelector('.news-select');
const newsListElements = document.querySelectorAll('[data-category]');


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
