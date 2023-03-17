let pageSelected = 0;

CreateHeader();

function CreateHeader()
{
    if(localStorage.getItem('PageSelected')){
        pageSelected = localStorage.getItem('PageSelected');
        console.debug(pageSelected);
    }

    let logoContainer = document.createElement("div");
    logoContainer.className = "LogoHome";

    let img = document.createElement("img");
    img.src = "Images/ComboHamburguesa.png";
    logoContainer.appendChild(img);

    let title = document.createElement("h1");
    title.innerHTML = "Comidas Rápidas";
    logoContainer.appendChild(title);

    let text = document.createElement("p");
    text.innerHTML = "Proyecto de Jairo Andrés Pinzón<br>Interfaces<br>FET";
    logoContainer.appendChild(text);

    let headerPage = document.querySelector(".HeaderPage");
    headerPage.appendChild(logoContainer);

    let menu = document.createElement("nav");
    menu.className = "menu";

    let menuList = document.createElement("ul");
    menu.appendChild(menuList);

    let buttonHome = document.createElement("li");
    menuList.appendChild(buttonHome);

    let buttonHomeLink = document.createElement("a");
    buttonHomeLink.innerHTML = "Inicio";
    buttonHomeLink.href = "index.html";
    buttonHomeLink.onclick = function(){
        localStorage.setItem('PageSelected', 0);
    }
    buttonHome.appendChild(buttonHomeLink);

    let buttonAbout = document.createElement("li");
    menuList.appendChild(buttonAbout);

    let buttonAboutLink = document.createElement("a");
    buttonAboutLink.innerHTML = "Acerca de nosotros";
    buttonAboutLink.href = "about.html";
    buttonAboutLink.onclick = function(){
        localStorage.setItem('PageSelected', 1);
    }
    buttonAbout.appendChild(buttonAboutLink);

    let buttonShoppingCart = document.createElement("li");
    menuList.appendChild(buttonShoppingCart);
    
    let buttonShoppingCartLink = document.createElement("a");
    buttonShoppingCartLink.innerHTML = "Carrito de compras";
    buttonShoppingCartLink.href = "shoppingcart.html";
    buttonShoppingCartLink.onclick = function(){
        localStorage.setItem('PageSelected', 2);
    }

    buttonShoppingCart.appendChild(buttonShoppingCartLink);
    headerPage.appendChild(menu);

    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks[pageSelected].classList.add("active");
}