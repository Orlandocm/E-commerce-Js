let cards;
const containerProducts = document.getElementById('container');
const carCleaner = document.getElementById('cart-cleaner');

const htmlCleaner = ()=> {
  while(containerProducts.firstChild){
    containerProducts.removeChild(containerProducts.firstChild);
  }
};

if (localStorage.getItem("Cart")){
  cards = JSON.parse(localStorage.getItem('Cart'));
}

const showProduct = ()=> {
  htmlCleaner();
  cards.forEach(article => {
    const card = document.createElement('div');
      card.classList.add('cart__container__products');
      card.innerHTML = `
          <div>
            <img src=".${article.img}" alt="${article.name}">
            <div class="cart__description">
              <h3>${article.name}</h3>
              <div class="count__container">
              <p id="price${article.id}">${article.price} €</p>
              <img class="count__Container__btn" id='arrow-left${article.id}' src="../img/icons/caret-left-N.svg" alt="Flecha">
              <span id="count${article.id}">${article.count}</span> 
              <img class="count__Container__btn" id='arrow-right${article.id}' src="../img/icons/caret-right-N.svg" alt="Flecha">
            </div>  
            <div class="card__buttons__card">
              <button class="cards__container__btn__styles" id='delete${article.id}'>Quitar</button>
            </div>
          </div>
        `
      containerProducts.appendChild(card);
      const button = document.getElementById(`delete${article.id}`);
      button.addEventListener("click", ()=>{
        deleteToCar(article.id);
      });
      const arrowLeft = document.getElementById(`arrow-left${article.id}`);
      const arrowRight = document.getElementById(`arrow-right${article.id}`);
      arrowLeft.addEventListener('click', ()=>{
        subtractAmount(article.id);
       });
      arrowRight.addEventListener('click', ()=>{
        addAmount(article.id);
      });
  });
};
showProduct();

//total price
const totalPrice = document.getElementById("total");
const estimatedTotal =()=>{
  let total = 0;
  let totalCount = 0;
  cards.forEach(product =>{
    total += (product.price * product.count);
  })
  cards.forEach(count=>{
    totalCount += count.count
  });
  localStorage.setItem('Total',JSON.stringify(total));
  totalPrice.innerHTML= `TOTAL ( ${totalCount} Productos ): ${total} € `;
  console.log(total)
}; estimatedTotal();


const deleteToCar =(id)=>{
  Swal.fire({
    title: 'Estas Seguro?',
    text: "¡No podrás revertir esto!",
    icon:'warning',
    iconColor:'#48a9c5',
    width:'16rem',
    showCancelButton: true,
    confirmButtonColor: '#48a9c5',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'Su producto ha sido eliminado.',
        'success'
      )
      const deleteProduct = cards.find(product => product.id === id);
      console.log(deleteProduct);
      console.log(cards)
      const index = cards.indexOf(deleteProduct);
      cards.splice(index,1);
      showProduct();
      estimatedTotal();
      console.log(total)
      localStorage.setItem("Cart",JSON.stringify(cards));
    }
    else {
      return;
    }
  })
};

carCleaner.addEventListener('click', ()=>{
  Swal.fire({
    title: 'Estas Seguro?',
    text: "¡No podrás revertir esto!",
    icon:'warning',
    iconColor:'#48a9c5',
    width:'16rem',
    showCancelButton: true,
    confirmButtonColor: '#48a9c5',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'Su producto ha sido eliminado.',
        'success'
      )
      totalPrice.innerHTML= `TOTAL ( 0 Productos ): 0 € `;
      htmlCleaner();
      localStorage.setItem('Cart',JSON.stringify([]));
    }else {
        return;
      }
  });
  estimatedTotal();
});

// chage count 
const subtractAmount =(id)=>{
  const card = cards.find(product => product.id === id);
  if(card.count === 1)return
  const countProduct = document.getElementById(`count${card.id}`);
  card.count --;
  countProduct.innerHTML = card.count;
  estimatedTotal();
  localStorage.setItem("Cart",JSON.stringify(cards));
};

const addAmount =(id)=>{
  const card = cards.find(product => product.id === id);
  const countProduct = document.getElementById(`count${card.id}`);
   card.count ++;
   countProduct.innerHTML=card.count;
   estimatedTotal();
   localStorage.setItem("Cart",JSON.stringify(cards));
};



