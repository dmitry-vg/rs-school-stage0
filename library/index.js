console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +26\n 2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n На ширине экрана 768рх реализовано адаптивное меню +12\n Общая оценка 50 баллов')

function showMenu(){
  
  document.getElementById('mobile-menu').classList.remove('header__nav-block-close');
}
function closeMenu(){
  document.getElementById('mobile-menu').classList.toggle('header__nav-block-close');
}
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
