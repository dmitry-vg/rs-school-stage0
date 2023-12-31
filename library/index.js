console.log('Полностью сделан 1 этап и часть 2 этапа, всего 76 баллов')

//анимация меню
const BURGER_MENU = document.getElementById('mobile-menu');
const ICON_PROFILE = document.querySelector('#header__profile-pic');
const ICON_PROFILE_MOBILE = document.querySelector('#header__profile-pic-mobile');
const AUTH_MENU = document.querySelector('.menu__no__auth');
function showMenu(){
  
  BURGER_MENU.classList.remove('header__nav-block-close');
  AUTH_MENU.classList.add('header__nav-block-close'); // закрыть меню авторизации
}


//закрытие открытие меню авторизации

ICON_PROFILE.addEventListener('click', function(){
  AUTH_MENU.classList.toggle('header__nav-block-close');
  });
AUTH_MENU.addEventListener('click', function(){
  AUTH_MENU.classList.toggle('header__nav-block-close');
  });
ICON_PROFILE_MOBILE.addEventListener('click', function(){
  AUTH_MENU.classList.toggle('header__nav-block-close');
  BURGER_MENU.classList.toggle('header__nav-block-close');
  });


// function closeMenu(){
//   BURGER_MENU.classList.toggle('header__nav-block-close');
  
// }
// BURGER_MENU.addEventListener('click', function(){
//   BURGER_MENU.classList.toggle('header__nav-block-close');
//   });


//анимация слайдера
const SLIDER = document.querySelector('#carousel');
const LEFT_ARROW = document.querySelector('.carret__left');
const RIGHT_ARROW = document.querySelector('.carret__right');
const INDICATOR_LIST = document.querySelector('.pagination__list');

let sectionIndex = 0;

document.querySelectorAll('.pagination__list li').forEach(function(indicator, ind){
  indicator.addEventListener('click', function(){
    sectionIndex = ind;
    document.querySelector('.pagination__list .btn_active').classList.remove('btn_active');
    indicator.classList.add('btn_active');
    SLIDER.style.transform = 'translate(' + (sectionIndex) * -465 + 'px)';

  });
});

LEFT_ARROW.addEventListener('click', function(){
  sectionIndex = (sectionIndex > 0) ? sectionIndex - 1: 0;
  document.querySelector('.pagination__list .btn_active').classList.remove('btn_active');
  INDICATOR_LIST.children[sectionIndex].classList.add('btn_active')
  SLIDER.style.transform = 'translate(' + (sectionIndex) * -465 + 'px)';
})
RIGHT_ARROW.addEventListener('click', function(){
  sectionIndex = (sectionIndex < 4) ? sectionIndex + 1: 4;
  document.querySelector('.pagination__list .btn_active').classList.remove('btn_active');
  INDICATOR_LIST.children[sectionIndex].classList.add('btn_active')
  SLIDER.style.transform = 'translate(' + (sectionIndex) * -465 + 'px)';
})


//анимация выбора книг


const FILTER = document.querySelectorAll('[data-tab]');
const LIST_BOOK = document.querySelectorAll('[data-tab-content]');
FILTER.forEach(function(item){

  item.addEventListener('click',function(){
    LIST_BOOK.forEach(function(item){
      item.classList.remove('hide__list-book');
      item.classList.add('hide-zero__list-book');
      setTimeout(() => item.classList.add('none__list-book'), 1900)
      setTimeout(() => item.classList.remove('block__list-book'), 2000);
    });
      const SELECT_BOOK = document.querySelector('#' + this.dataset.tab);
      setTimeout(() => SELECT_BOOK.classList.add('block__list-book'), 2000);
      setTimeout(() => SELECT_BOOK.classList.add('hide__list-book'), 2500);
  })
})

//модальное окно регистрации

const REGISTER_BUTTON = document.querySelectorAll('[data-modal-button = "register"]');
const MODAL = document.querySelector('[data-modal-register]');
const BUTTON_CLOSE = document.querySelector('[data-modal-close]');

REGISTER_BUTTON.forEach(function(item){
  item.addEventListener('click', function(){
    MODAL.classList.remove('hidden');
    BUTTON_CLOSE.addEventListener('click', function(){
      MODAL.classList.add('hidden');
    })
  })
})
MODAL.addEventListener('click', function(){
  MODAL.classList.add('hidden');
})
MODAL.querySelector('.modal__window').addEventListener('click', function(event){
  event.stopPropagation(); //блокируем передачу события клик дочерним элементам
})






// function showMenu(){
  
//   document.getElementById('header__profile-pic').classList.remove('header__nav-block-close');
// }
// function closeMenu(){
//   document.getElementById('header__profile-pic').classList.toggle('header__nav-block-close');
// }

// const LIST_BOOK = document.querySelectorAll('.favorites__list-book');
// const FILTER = document.querySelectorAll('.favorites__list input');

// FILTER[1].addEventListener('click', function () {
//   LIST_BOOK[0].classList.remove('hide__list-book');
//   LIST_BOOK[0].classList.add('hide-zero__list-book');

//   setTimeout(() => LIST_BOOK[0].classList.add('none__list-book'), 2000)
//   setTimeout(() => LIST_BOOK[0].classList.remove('block__list-book'), 2000);
//   setTimeout(() => LIST_BOOK[1].classList.add('block__list-book'), 2000);
//   setTimeout(() => LIST_BOOK[1].classList.add('hide__list-book'), 2500);
// })
// FILTER[2].addEventListener('click', function () {
//   LIST_BOOK[1].classList.remove('hide__list-book');
//   LIST_BOOK[1].classList.add('hide-zero__list-book');

//   setTimeout(() => LIST_BOOK[1].classList.add('none__list-book'), 2000)
//   setTimeout(() => LIST_BOOK[1].classList.remove('block__list-book'), 2000);
//   setTimeout(() => LIST_BOOK[2].classList.add('block__list-book'), 2000);
//   setTimeout(() => LIST_BOOK[2].classList.add('hide__list-book'), 2500);
// })
// FILTER[3].addEventListener('click', function () {
//   LIST_BOOK[2].classList.remove('hide__list-book');
//   LIST_BOOK[2].classList.add('hide-zero__list-book');

//   setTimeout(() => LIST_BOOK[2].classList.add('none__list-book'), 2000)
//   setTimeout(() => LIST_BOOK[2].classList.remove('block__list-book'), 2000);
//   setTimeout(() => LIST_BOOK[3].classList.add('block__list-book'), 2000);
//   setTimeout(() => LIST_BOOK[3].classList.add('hide__list-book'), 2500);
// })
// FILTER[0].addEventListener('click', function () {
//   LIST_BOOK[3].classList.remove('hide__list-book');
//   LIST_BOOK[3].classList.add('hide-zero__list-book');

//   setTimeout(() => LIST_BOOK[3].classList.add('none__list-book'), 2000)
//   setTimeout(() => LIST_BOOK[3].classList.remove('block__list-book'), 2000);
//   setTimeout(() => LIST_BOOK[0].classList.add('block__list-book'), 2000);
//   setTimeout(() => LIST_BOOK[0].classList.add('hide__list-book'), 2500);
// })


// анимация замены картинки при клике
//const BTN_LINK_1 = document.querySelector('#link_1');
// const BTN_LINK_2 = document.querySelector('#link_2');
// const BTN_LINK_3 = document.querySelector('#link_3');
// const BTN_LINK_4 = document.querySelector('#link_4');
// const BTN_LINK_5 = document.querySelector('#link_5');

// let imageTimeFirst = '';
// let imageTimeSecond = '';
// let imageOne = document.querySelector("#image_1 > img");
// let imageTwo = document.querySelector("#image_2 > img");
// let imageThree = document.querySelector("#image_3 > img");
// let imageFour = document.querySelector("#image_4 > img");
// let imageFive = document.querySelector("#image_5 > img");



// const CAROUSEL = document.querySelector("#carousel");

// BTN_LINK_1.addEventListener("click", () => {
//   CAROUSEL.classList.add("transition-link_1");
// });

// CAROUSEL.addEventListener("animationend", () => {
  
//   CAROUSEL.classList.remove("transition-link_1");
// })
// BTN_LINK_2.addEventListener("click", () => {
//   CAROUSEL.classList.add("transition-link_2");
// });

// CAROUSEL.addEventListener("animationend", (animationEvent) => {
//   if(animationEvent.animationName === "link_2"){
//     timeFirst = imageOne.getAttribute('src');
//     timeSecond = imageTwo.getAttribute('src');
//     imageOne.removeAttribute('src');
//     imageOne.setAttribute('src', timeSecond);
//     timeSecond = imageFive.getAttribute('src');
//     imageFive.removeAttribute('src');
//     imageFive.setAttribute('src', timeFirst);
//     timeFirst = imageFour.getAttribute('src');
//     imageFour.removeAttribute('src');
//     imageFour.setAttribute('src', timeSecond);
//     timeSecond = imageThree.getAttribute('src');
//     imageThree.removeAttribute('src');
//     imageThree.setAttribute('src',timeFirst);
//     imageTwo.removeAttribute('src');
//     imageTwo.setAttribute('src', timeSecond)

    
//     CAROUSEL.classList.remove("transition-link_2");
//   } else {
//     CAROUSEL.classList.remove("transition-link_3");
//   }
  
// })
// BTN_LINK_3.addEventListener("click", () => {
//   CAROUSEL.classList.add("transition-link_2");
// });

// CAROUSEL.addEventListener("animationend", (animationEvent) => {
//   if(animationEvent.animationName === "link_3"){
//     timeFirst = imageOne.getAttribute('src');
//     timeSecond = imageTwo.getAttribute('src');
//     imageOne.removeAttribute('src');
//     imageOne.setAttribute('src', timeSecond);
//     timeSecond = imageFive.getAttribute('src');
//     imageFive.removeAttribute('src');
//     imageFive.setAttribute('src', timeFirst);
//     timeFirst = imageFour.getAttribute('src');
//     imageFour.removeAttribute('src');
//     imageFour.setAttribute('src', timeSecond);
//     timeSecond = imageThree.getAttribute('src');
//     imageThree.removeAttribute('src');
//     imageThree.setAttribute('src',timeFirst);
//     imageTwo.removeAttribute('src');
//     imageTwo.setAttribute('src', timeSecond)

    
//     CAROUSEL.classList.remove("transition-link_2");
//   }else {
//     CAROUSEL.classList.remove("transition-link_1");
//   }
// })
