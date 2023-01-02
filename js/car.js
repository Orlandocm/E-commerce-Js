const containerProducts = document.getElementById('container-products');
const carCleaner = document.getElementById('car-cleaner');
const htmlCleaner = ()=> {
  while(containerProducts.firstChild){
    containerProducts.removeChild(containerProducts.firstChild);
  }
};

if (localStorage.getItem("Car")){
   recoveredCar = JSON.parse(localStorage.getItem('Car'));
}


const showProduct = ()=> {
  htmlCleaner();
  recoveredCar.forEach(article => {
    const card = document.createElement('div');
      card.classList.add('card-container__products');
      card.innerHTML = `
        <div class="card" id="card${article.id}">
          <img src=".${article.img}" alt="${article.name}">
          <div class="card__description">
            <h3>${article.name}</h3> 
            <span>${article.count}</span> 
            <p>${article.price} €</p>
            <div class="card-buttons">
              <button class="card-buttons__styles" id="delete${article.id}">Quitar</button>
              <img class="favorite-icon" src="../img/icons/corazon.svg" alt="Favorito">
            </div>
          </div>
        </div>
        `
      containerProducts.appendChild(card);
      const button = document.getElementById(`delete${article.id}`);
      button.addEventListener("click", ()=>{
        deleteToCar(article.id);
      });
  });
};
showProduct();

const deleteToCar =(id)=>{
  const deleteProduct = recoveredCar.find(product => product.id === id);
  console.log(deleteProduct);
  console.log(recoveredCar)
  const index = recoveredCar.indexOf(deleteProduct);
  recoveredCar.splice(index,1);
  showProduct();
  localStorage.setItem("Car",JSON.stringify(car));
};

carCleaner.addEventListener('click', ()=>{
  htmlCleaner();
  localStorage.setItem("Car",JSON.stringify(car));
});