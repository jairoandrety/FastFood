let items = [];

fetch("./data.json")
.then(response => {
    return response.json();
})
.then(function (data){
    for(var i=0; i <data.products.length; i++){
        //document.getElementById("data").innerHTML += data.products[i].name + "<br>";
        check = data.products[i].enabled;
        if(check == true){
          items.push(CreateItem(data.products[i].name, data.products[i].description, data.products[i].image));
        }
    }

    if(items.length == 0){
      console.debug("No hay productos disponibles");
    }
    //CreateItem(data.products[0].name, data.products[0].description, data.products[0].image);
})

function CreateItem(name, description, image)
{
    let div = document.createElement("div");
    div.className = "item";

    let title = document.createElement("h2");
    title.className = "name";
    title.innerHTML = name;
    div.appendChild(title);

    let img = document.createElement("img");
    img.src = image;
    div.appendChild(img);
    
    let text = document.createElement("p");
    text.innerHTML = description;
    div.appendChild(text);

    let button = document.createElement("button");
    button.className = "button";
    button.innerHTML = "ver todos los productos";
    div.appendChild(button);

    let products = document.querySelector(".Products");
    products.appendChild(div);
}