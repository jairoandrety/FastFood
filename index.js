let newOrder = new Order("order");
let selected = 0;
let products = [];

fetch("./dataset.json")
.then(response => {
    return response.json();
})
.then(function (data){
    for(var i=0; i <data.products.length; i++){
        //document.getElementById("data").innerHTML += data.products[i].name + "<br>";
        check = data.products[i].enabled;
        if(check == true){
          let id = i;
          products.push(CreateItem(i, data.products[i].name, data.products[i].description, data.products[i].image));
        }
    }

    if(products.length == 0){
      console.debug("No hay productos disponibles");
    }
    //CreateItem(data.products[0].name, data.products[0].description, data.products[0].image);

    console.debug(newOrder);
    
    orderLoaded = "";
    if(localStorage.getItem('OrderSaved')){
      orderLoaded = localStorage.getItem('OrderSaved');
      let lol = JSON.parse(orderLoaded);
      newOrder.items = lol.items;
    }

    console.debug(newOrder);
})

function CreateItem(id, name, description, image)
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
  button.innerHTML = "ver todos los productos";
  button.onclick = function(){
    localStorage.setItem('OrderSaved', JSON.stringify(newOrder));
    ShowAllProducts(id);
  } 

  item.appendChild(button);

  let products = document.querySelector(".Products .container");
  products.appendChild(item);
}

function ShowAllProducts(id){
  section = id;
  localStorage.setItem('SectionSelected', section);
  window.location.href = "products.html";
}