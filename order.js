class ItemOrder {
  constructor(section, id, price, amount) {
    this.section = section;
    this.id = id;
    this.price = price;
    this.amount = amount;
  }
  
  calculateTotalPrice() {
    return this.precio * this.cantidad;
  }
}

class Order{
    constructor(id){
        this.id = id;
        this.items = [];
    }

    AddItem(item){
        this.items.push(item);
    }

    RemoveItem(item){
      const index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    }

    AddAmount(index, amount){
      item = this.items.find(item => item.id === index);
      if(item == null){
        console.debug("No se encontro el item");
        return;
      }

      item.amount += amount;    
    }

    RemoveAmount(index, amount){
      item = this.items.find(item => item.id === index);
      if(item == null){
        console.debug("No se encontro el item");
        return;
      }

      item.amount -= amount;
      if(item.amount <= 0){
        this.RemoveItem(item);
      }
    }

    CalculateTotalPrice(){
        let total = 0;
        this.items.forEach(item => {
        total += item.price * item.amount;
        });
        return total;
    }

    ClearOrder(){
      this.items = [];
    }
}

window.order = Order;
window.itemOrder = ItemOrder;