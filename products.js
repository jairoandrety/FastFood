let newOrder = new Order("order");
let item = new ItemOrder();

let dataset = "";

let products = [];
let section = 0;
section = parseInt(localStorage.getItem('SectionSelected'));
console.debug(section);

fetch("./dataset.json")
.then(response => {
    return response.json();
})
.then(function (data){
    for(var i=0; i <data.products[section].items.length; i++){
        
      dataset = data;
      check = data.products[section].items[i].enabled;
      if(check == true){
        id = i;
        CreateItem(i, data.products[section].items[i].name, data.products[section].items[i].description, data.products[section].items[i].price, data.products[section].items[i].image);
      }
    }

    console.debug(products);

    let orderSummary = document.getElementsByClassName("Products");
    let orderEmpty = document.getElementById("Empty");

    if(products.length > 0){
      orderSummary[0].style.display = "block";
      orderEmpty.style.display = "none";
    }
    else{
      orderSummary[0].style.display = "none";
      orderEmpty.style.display = "block";
    }

    orderLoaded = "";
    if(localStorage.getItem('OrderSaved')){
      orderLoaded = localStorage.getItem('OrderSaved');
      orderData = JSON.parse(orderLoaded);
      newOrder.items = orderData.items;
    }

    console.debug(newOrder);
    localStorage.setItem('OrderSaved', JSON.stringify(newOrder));
})

function CreateItem(id, name, description, price, image)
{
    let item = document.createElement("div");
    item.className = "item";

    let data = document.createElement("div");
    data.className = "data";
    item.appendChild(data);

    let title = document.createElement("h2");
    title.className = "name";
    title.innerHTML = name;
    data.appendChild(title);

    let img = document.createElement("img");
    img.src = image;
    data.appendChild(img);
    
    let text = document.createElement("p");
    text.innerHTML = description;
    data.appendChild(text);

    let button = document.createElement("button");
    button.className = "button";
    button.innerHTML = "Añadir al carrito";
    button.onclick = function(){
      BuyItem(id);
    }

    item.appendChild(button);
    let productsContainer = document.querySelector(".Products .container");
    productsContainer.appendChild(item);

    products.push(item);    
}

function BuyItem(id){
  itemSelected = newOrder.items.find(item => item.id === id && item.section === section);

  if(itemSelected != null){
    itemSelected.amount += 1;
  }
  else{
    item = new ItemOrder(section, id, dataset.products[section].items[id].price, 1);
    newOrder.AddItem(item);
  }
  //newOrder.items = [];
  localStorage.setItem('OrderSaved', JSON.stringify(newOrder));
  console.debug(newOrder);
}