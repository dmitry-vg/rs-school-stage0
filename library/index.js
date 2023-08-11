console.log('1. 10;\n2.16;\n3. header 8, welcome 4, about 6, favorites  8, coffeshop 6, contacts 6, LibraryCard 8, <footer> 8 = 54;\n4. 18, не все элементы центрируются при уменьшении экрана\n  Total 98 ')

function showMenu(){
  
  document.getElementById('mobile-menu').classList.remove('header__nav-block-close');
}
function closeMenu(){
  document.getElementById('mobile-menu').classList.toggle('header__nav-block-close');
}

