let like = JSON.parse(localStorage.getItem('favorite')) || [];
const containerProducts = document.getElementById('container');
const fullHeart = "../img/icons/corazonF.svg";
const heart = "../img/icons/corazon.svg";


fetch("../products.json")
  .then((response) => response.json())
  .then((products) =>{
    showFavorite(products);
  })
  .catch(error => console.log(error));

const showFavorite = (products) =>{
  console.log(products)
  products.forEach(product => {
    if(like.includes(product.id)){
      const card = document.createElement('div');
      card.classList.add('favorite__conainer__card')
      card.innerHTML += `
        <img src=".${product.img}" alt="${product.name}">
        <div class="favorite__conainer__description">
          <h3>${product.name}</h3>
          <div class="count__Container">
          <p id="price${product.id}">${product.price} €</p>
          <p>Tamaño: ${product.size}</p>
          <button id="favorite-${product.id}"><img id="img${product.id}" class="favorite__icon" src="${like.includes(product.id)?fullHeart:heart}" alt="Favorito"></button>
        </div>
      `
      containerProducts.appendChild(card);
      const favoriteBtn = document.getElementById(`favorite-${product.id}`);
      favoriteBtn.addEventListener("click", ()=>{
        addFavodites(product.id);
      });
    }
  });
};

//Favorite
const addFavodites = (id)=>{
  const favoriteImg = document.getElementById(`img${id}`);
  console.log({like})
  if(like.includes(id)){
    const index = like.indexOf(id);
    like.splice(index,1);
    favoriteImg.src = heart;
    localStorage.setItem('favorite',JSON.stringify(like));
  }
  else {
    favoriteImg.src = fullHeart;
  }
  localStorage.setItem('favorite',JSON.stringify(like));
};