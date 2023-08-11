console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +26\n 2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n На ширине экрана 768рх реализовано адаптивное меню +12\n Общая оценка 50 баллов')

function showMenu(){
  
  document.getElementById('mobile-menu').classList.remove('header__nav-block-close');
}
function closeMenu(){
  document.getElementById('mobile-menu').classList.toggle('header__nav-block-close');
}

