$( () => {
	
	//On Scroll Functionality
	$(window).scroll( () => {
		var windowTop = $(window).scrollTop();
		windowTop > 100 ? $('nav').addClass('navShadow') : $('nav').removeClass('navShadow');
		windowTop > 100 ? $('ul').css('top','100px') : $('ul').css('top','160px');
	});
	
	//Click Logo To Scroll To Top
	$('#logo').on('click', () => {
		$('html,body').animate({
			scrollTop: 0
		},500);
	});
	
	//Smooth Scrolling Using Navigation Menu
	$('a[href*="#"]').on('click', function(e){
		$('html,body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 100
		},500);
		e.preventDefault();
	});
	
	//Toggle Menu
	$('#menu-toggle').on('click', () => {
		$('#menu-toggle').toggleClass('closeMenu');
		$('ul').toggleClass('showMenu');
		
		$('li').on('click', () => {
			$('ul').removeClass('showMenu');
			$('#menu-toggle').removeClass('closeMenu');
		});
	});

	
	
});


const input = document.querySelector(".finder__input");
const finder = document.querySelector(".finder");
const form = document.querySelector("form");

input.addEventListener("focus", () => {
  finder.classList.add("active");
});

input.addEventListener("blur", () => {
  if (input.value.length === 0) {
    finder.classList.remove("active");
  }
});

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  finder.classList.add("processing");
  finder.classList.remove("active");
  input.disabled = true;
  setTimeout(() => {
    finder.classList.remove("processing");
    input.disabled = false;
    if (input.value.length > 0) {
      finder.classList.add("active");
    }
  }, 1000);
});

//----------------------------api---------------------------------------

const productCardTemplate = document.querySelector("[data-product-template]")
const productCardContainer = document.querySelector("[data-product-cards-container]")
const searchInput = document.querySelector("[data-search]")

let products = []

input.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  products.forEach(product => {
    const isVisible =
      product.name.toLowerCase().includes(value)
    product.element.classList.toggle("hide", !isVisible)
  })
})


function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toLowerCase() == button.innerText.toLowerCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
  //select all cards
  //let elements = document.querySelectorAll(".card");
  //loop through all cards
  products.forEach((product) => {
    //display all cards on 'all' button click
    if (value == "all") {
      product.element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (product.category.toLowerCase() == value) {
        //display element based on category
        product.element.classList.remove("hide");
      } else {
        //hide other elements
        product.element.classList.add("hide");
      }
    }
  });
}








/*

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    products = data.map(product => {
      const card = productCardTemplate.content.cloneNode(true).children[0]
	  const img = card.querySelector("[data-img]")
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
	  img.src = product.image
      header.textContent = product.title
      body.textContent = "$"+product.price
      productCardContainer.append(card)
      return { title: product.title, price: product.price, element: card }
    })
  })

*/
/*
*/


function GetSortOrder(prop) {    
  return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
}    



fetch("https://claudiorigollet.cl/api/products")
  .then(res => res.json())
  .then(data => {
    products = data['products'].sort(function(a, b) {
      return parseFloat(a.quantity) - parseFloat(b.quantity);
  }).map(product => {
      const card = productCardTemplate.content.cloneNode(true).children[0]
      const img = card.querySelector("[data-img]")
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      const body2 = card.querySelector("[data-body2]")
      const body3 = card.querySelector("[data-body3]")
      header.textContent = product.name
      body.textContent = product.description
	    body2.textContent = "$"+product.price
      body3.textContent = product.subcategory_id
      img.textContent = "Stock: "+product.quantity
      productCardContainer.append(card)
      return { name: product.name, category: product.subcategory_id, element: card }
    })
  });






function adquisicionProducto() {

  const name2 = document.getElementById('x1').value;
  const slug2 = name2.replace(/\s+/, '-');
  const description2 = document.getElementById('x2').value;
  const price2 = document.getElementById('x3').value;
  const quantity2 = document.getElementById('x4').value;
  const subcategory_id2 = document.getElementById('x5').value;

  let adquisicion = {
    data: [
      {
        name: name2,
        slug: slug2,
        description: description2,
        subcategory_id: subcategory_id2,
        quantity: quantity2,
        price: price2       
      }
    ],
  };

  console.log(adquisicion)

  const data = adquisicion;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://claudiorigollet.cl/api/products");
  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader("X-CSRF-TOKEN", "");

  xhr.send(data);

};



  
function actualizaciónProducto() {

  const id3 = document.getElementById('y0').value;
  const name3 = document.getElementById('y1').value;
  const slug3 = name3.replace(/\s+/, '-');
  const description3 = document.getElementById('y2').value;
  const price3 = document.getElementById('y3').value;
  const quantity3 = document.getElementById('y4').value;

  let actualizacion = {
    data: [
      {
        name: name3,
        slug: slug3,
        description: description3,
        quantity: quantity3,
        price: price3       
      }
    ],
  };

  console.log(actualizacion)

  const data = actualizacion;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("PUT", "https://claudiorigollet.cl/api/products/"+id3);
  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader("X-CSRF-TOKEN", "");
  
  xhr.send(data);



};