let card = [];
let like =JSON.parse(localStorage.getItem('favorite')) || [];
const bugerMenu = document.getElementById('burger-menu');
const menu = document.getElementById('menu');
const container = document.getElementById('container');
const fullHeart = "./img/icons/corazonF.svg";
const heart = "./img/icons/corazon.svg";

// Burger Menu
bugerMenu.addEventListener('click',()=> {
  menu.classList.toggle('hide');
});

// if()
fetch("./products.json")
  .then((response) => response.json())
  .then((data) =>{
    showCards(data);
  })
  .catch(error => console.log(error));

//showArticles
function showCards(data){
  data.forEach(article => {
    const card = document.createElement('div');
    card.classList.add('cards__container__card');
    card.innerHTML += `
      <img class= "cards__container__img" src="${article.img}" alt="${article.name}">
      <div class="cards__container__description">
        <h3>${article.name}</h3>
        <p>Tamaño: ${article.size}</p>
        <p>${article.price} €</p>
        <div class="cards__container__btn">
          <button class="cards__container__btn__styles" id="button-${article.id}"><p>Agregar</p></button>
            <button id="favorite-${article.id}"><img id="img${article.id}" class="favorite__icon" src="${like.includes(article.id)?fullHeart:heart}" alt="Favorito"></button>
        </div>
      </div>
    `
    container.appendChild(card);
    const button = document.getElementById(`button-${article.id}`);
    const favoriteBtn = document.getElementById(`favorite-${article.id}`);
    
    button.addEventListener("click", ()=>{
      addToCart(article.id);
      Toastify({
        text: "Producto agregado",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #48a9c5, #0077c8)",
        }
        }).showToast();
    });

    //favorite
    favoriteBtn.addEventListener("click", ()=>{
      addFavodites(article.id);
    });
  });

  const addToCart =(id)=>{
    const articleInCar = card.find(product => product.id === id);
    if(articleInCar){
      articleInCar.count++;
    }
    else {
      const product = data.find(product => product.id === id);
      card.push(product);
    }
    localStorage.setItem('Cart',JSON.stringify(card));
  };

  const addFavodites = (id)=>{
    const favoriteImg = document.getElementById(`img${id}`);
    console.log({like})
    if(like.includes(id)){
      const index = like.indexOf(id);
      like.splice(index,1);
      favoriteImg.src = heart;
      console.log({like})
      localStorage.setItem('favorite',JSON.stringify(like));
    }
    else {
      favoriteImg.src = fullHeart;
      like.push(id)
      console.log({like})
    }
    localStorage.setItem('favorite',JSON.stringify(like));
  };
};
