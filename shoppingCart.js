let newOrder = new Order("order");
let item = new ItemOrder();

let currrent=0;
let items = [];

ShowItems();

function ShowItems()
{
    fetch("./dataset.json")
    .then(response => {
        return response.json();
    })
    .then(function (data){
        orderLoaded = "";
        if(localStorage.getItem('OrderSaved')){
        orderLoaded = localStorage.getItem('OrderSaved');
        orderData = JSON.parse(orderLoaded);
        newOrder.items = orderData.items;
        }

        for(var i=0; i<newOrder.items.length; i++){

            item = new ItemOrder(newOrder.items[i].section, newOrder.items[i].id, newOrder.items[i].price, newOrder.items[i].amount);
            console.debug(item);

            section = item.section;
            id = item.id;
            itemName = data.products[section].name + " " + data.products[section].items[id].name;
            itemDescription = data.products[section].items[id].description;
            itemPrice = data.products[section].items[id].price;
            itemImage = data.products[section].items[id].image;
            amount = item.amount;
            CreateItem(id, itemName, itemDescription, itemPrice, itemImage, amount);
        }

        let buttonClearOrder = document.getElementById("ClearOrder");
        buttonClearOrder.onclick = function(){
            ClearOrder();
        }

        let buttonCBuyOrder = document.getElementById("BuyOrder");
        buttonCBuyOrder.onclick = function(){
            ClearOrder();
        }        

        let subtotal = document.getElementById("subtotal");
        subtotal.innerHTML = newOrder.CalculateTotalPrice().toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) + " COP";    

        let delivery = document.getElementById("delivery");
        deliveryValue = 5000;
        delivery.innerHTML = deliveryValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) + " COP";

        let total = document.getElementById("total");
        totalValue = newOrder.CalculateTotalPrice() + deliveryValue;
        total.innerHTML = totalValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) + " COP";
        console.debug(items);

        console.debug(newOrder);
        localStorage.setItem('OrderSaved', JSON.stringify(newOrder));

        let orderSummary = document.getElementById("OrderSummary");
        let orderEmpty = document.getElementById("OrderEmpty");

        if(newOrder.items.length > 0){      
            orderSummary.style.display = "block";
            orderEmpty.style.display = "none";
        }
        else{
            orderSummary.style.display = "none";
            orderEmpty.style.display = "block";
        }
    })    
}

function CreateItem(id, name, description, price, image)
{
    //left
    let row = document.createElement("div");
    row.className = "Row";

    let columnLeft = document.createElement("div");
    columnLeft.className = "Column";
    row.appendChild(columnLeft);

    let img = document.createElement("img");
    img.src = image;
    columnLeft.appendChild(img);

    //center
    let columnCenter = document.createElement("div");
    columnCenter.className = "Column";
    row.appendChild(columnCenter);

    let ItemName = document.createElement("h3");
    ItemName.innerHTML = name;
    columnCenter.appendChild(ItemName);

    let ItemDescription = document.createElement("p");
    ItemDescription.innerHTML = description;
    columnCenter.appendChild(ItemDescription);
    
    //right
    let columnRight = document.createElement("div");
    columnRight.className = "ColumnRight";
    row.appendChild(columnRight);

    let ItemPrice = document.createElement("h3");
    ItemPrice.innerHTML = price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) + " COP";
    columnRight.appendChild(ItemPrice);

    let itemOrderButtons = document.createElement("div");
    itemOrderButtons.className = "ItemOrderButtons";
    columnRight.appendChild(itemOrderButtons);
    
    let buttonRemove = document.createElement("button");
    buttonRemove.className = "button";
    buttonRemove.innerHTML = "-";
    buttonRemove.onclick = function(){
        newOrder.RemoveAmount(id, 1);
        localStorage.setItem('OrderSaved', JSON.stringify(newOrder));
        console.debug(newOrder);
        //window.location.href = "shoppingcart.html";
        ClearItems();
        ShowItems();
    }
    itemOrderButtons.appendChild(buttonRemove);

    let ItemAmount = document.createElement("h4");
    ItemAmount.innerHTML = amount;
    itemOrderButtons.appendChild(ItemAmount);

    let buttonAdd = document.createElement("button");
    buttonAdd.className = "button";
    buttonAdd.innerHTML = "+";
    buttonAdd.onclick = function(){
        newOrder.AddAmount(id, 1);
        localStorage.setItem('OrderSaved', JSON.stringify(newOrder));
        console.debug(newOrder);
        //window.location.href = "shoppingcart.html";
        ClearItems();
        ShowItems();
    }
    itemOrderButtons.appendChild(buttonAdd);

    let orderList = document.querySelector(".OrderList .List");
    orderList.appendChild(row);

    items.push(row);
}

function ClearOrder(){
    newOrder.ClearOrder();
    localStorage.setItem('OrderSaved', JSON.stringify(newOrder));
    ClearItems();
    ShowItems();
}

function ClearItems(){
    items.forEach(item => {
        item.remove();
    });

    items = [];
}