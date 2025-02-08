const closeMenuElement = document.querySelector('.header__close-burger');
const navigationMenuElement = document.querySelector('.header__nav');
const burgerMenuElement = document.querySelector('.header__burger-menu');

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
