const bugerMenu = document.getElementById('burger-menu');
const menu = document.getElementById('menu');
const container = document.getElementById('container');

bugerMenu.addEventListener('click',()=> {
    menu.classList.toggle('hide');
});

//intems car
class article{
  constructor(id,name,price,size,img){
    this.id = id;
    this.name = name;
    this.price = price;
    this.size = size;
    this.img = img;
    this.count = 1;
  };
};
const trodad11 = new article(4911,"Trodad 4911", 25, "38 x 14 mm","./img/products/PR_4911.jpg");
const trodad12 = new article(4912,"Trodad 4912", 30, "47 x 18 mm","./img/products/PR_4912.jpg");
const trodad13 = new article(4913,"Trodad 4913", 35, "58 x 22 mm","./img/products/PR_4913.jpg");
const trodad14 = new article(4914,"Trodad 4914", 25, "64 x 26 mm","./img/products/PR_4914.jpg");
const trodad15 = new article(4915,"Trodad 4915", 25, "70 x 25 mm","./img/products/PR_4915.jpg");
let articles = [trodad11,trodad12,trodad13,trodad14,trodad15];
let car = [];

const showCards = () => {
 articles.forEach(article => {
    const card = document.createElement('div');
    card.classList.add('card-container__products');
    card.innerHTML = `
      <div class="card">
        <img src="${article.img}" alt="${article.name}">
        <div class="card__description">
          <h3>${article.name}</h3>
          <p>${article.price} €</p>
          <div class="card-buttons">
            <button class="card-buttons__styles" id="button${article.id}">Agregar</button>
            <img class="favorite-icon" src="./img/icons/corazon.svg" alt="Favorito">
          </div>
        </div>
      </div>
      `
    container.appendChild(card);
    const button = document.getElementById(`button${article.id}`);
    button.addEventListener("click", ()=>{
      addToCar(article.id);
    });
 });
}
showCards();

const addToCar =(id)=>{
  const articleInCar = car.find(product => product.id === id);
  if(articleInCar){
    articleInCar.count++;
  }
  else {
    const product = articles.find(product => product.id === id);
    car.push(product);
  }
  localStorage.setItem("Car",JSON.stringify(car));
};