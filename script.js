const closeMenuElement = document.querySelector('.header__close-burger');
const navigationMenuElement = document.querySelector('.header__nav');
const burgerMenuElement = document.querySelector('.header__burger-menu');
const dropDownElement = document.querySelector('.header__drop-down');
const selectNewsElement = document.querySelector('.news-select');
const newsListElements = document.querySelectorAll('[data-category]');
const imageNewsElements = document.querySelectorAll('.news__card-img');
const formElement = document.querySelector('.form');

// работа с формой
document.addEventListener('DOMContentLoaded', () => {
  const formElement = document.querySelector('.form');
  if (formElement) {
    const fileInputElement = formElement.querySelector('.form__files');
    const fileListElement = formElement.querySelector('.form__file-list');
    const modalElement = formElement.querySelector('.form__modal');
    const closeModalElement = formElement.querySelector('.form__close-modal');

    fileListElement.style.display = 'none';

    fileInputElement.addEventListener('change', () => {
      const filesElement = Array.from(fileInputElement.files);
      
      if (filesElement.length > 0) {
        fileListElement.style.display = 'block';
        filesElement.forEach(file => {
          const checkDuplicateFiles = [...fileListElement.children].some(item => item.textContent.includes(file.name));
          if (!checkDuplicateFiles) {
            const itemElement = document.createElement('li');
            itemElement.className = 'form__file-item';

            const spanElement = document.createElement('span');
            spanElement.className = 'form__added-files';
            spanElement.textContent = file.name;

            const removeButtonElement = document.createElement('button');
            removeButtonElement.className = 'form__remove-files';

            removeButtonElement.addEventListener('click', () => {
              itemElement.remove();
              if (fileListElement.children.length === 0) {
                fileListElement.style.display = 'none';
              }
            });

            itemElement.appendChild(spanElement);
            itemElement.appendChild(removeButtonElement);
            fileListElement.appendChild(itemElement);
          }
        });
      }
    });

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      if (formElement.checkValidity()) {
        formElement.reset();
        fileListElement.innerHTML = '';
        fileListElement.style.display = 'none';
        modalElement.style.display = 'block';
      }
    });

    closeModalElement.addEventListener('click', () => {
      modalElement.style.display = 'none';
    });
  } 
});


// медлення загрузка изображений
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



// выпадающий список
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


// бургер меню
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