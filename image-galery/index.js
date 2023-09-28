const API = 'https://api.unsplash.com/search/photos?client_id=VdP4INOcEBYpHt6diPVAyZt4yTvsvuwe2TBxpABgzqg&query=';
let query = 'dog';
let url = API + query;

galleryContainer = document.getElementById('gallery');
function showData(data) {
  //напоняем массив урл изображений
  let srcImg = [];
  if (data.results.length == 0){
    galleryContainer.insertAdjacentHTML('beforeend', '<p>Попробуйте найти что-то другое</p>');
  }
  for (let index = 0; index < data.results.length; index++) {
    const element = data.results[index].urls.regular;
    srcImg.push(element);
  }

  //добавляем подобранные изображения на страницу
  srcImg.map(function (src) {
    const img = `<img class="gallery-img" src="` + src + `" alt="image">`;
    galleryContainer.insertAdjacentHTML('beforeend', img);
  })
}

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);

}
getData();