const API = 'https://api.unsplash.com/search/photos?client_id=VdP4INOcEBYpHt6diPVAyZt4yTvsvuwe2TBxpABgzqg&orientation=squarish&per_page=12&query=';
let query = 'belarus';

let submit = document.getElementById('submit');
let inputText = document.getElementById('query');
let clearButton = document.getElementById('clear');
let url = API + query;





let galleryContainer = document.getElementById('gallery');
function showData(data) {
  //напоняем массив урл изображений
  let srcImg = [];
  // if (data.results.length == 0){
  //   galleryContainer.insertAdjacentHTML('beforeend', '<div class="errorMessage"><p>Попробуйте найти что-то другое</p>');
  // }
  for (let index = 0; index < data.results.length; index++) {
    const element = data.results[index].urls.small;
    srcImg.push(element);
  }

  //добавляем подобранные изображения на страницу
  srcImg.map(function (src) {
    const img = `<div class="hidden"><img class="gallery-img" src="` + src + `" alt="image"></div>`;
    galleryContainer.insertAdjacentHTML('beforeend', img);
  })
}



async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);

}

//очищаем значение поля

clearButton.addEventListener('click', function(){
  inputText.value = "";
})

//подбираем по нажатию энтер
inputText.addEventListener('keypress', function(event){
  if (event.keyCode === 13){
    event.preventDefault(); //останавливаем выполнение всех функций
    submit.click(); //вызываем нажатие кнопки 
    }
 });

//ищем изображения по нажатию кнопки
function submitQuery(){

  let imgAll = document.querySelectorAll('.hidden');
  for(let i=0; i<imgAll.length; i++) { //удаляем предыдущую подборку
    imgAll[i].parentNode.removeChild(imgAll[i]);
    } 

  query = inputText.value;
  url = API + query
  getData();
}





getData();
