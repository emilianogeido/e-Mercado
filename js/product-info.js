let categoria = localStorage.getItem("catID")
let productoID = localStorage.getItem("prodID")
const estrellaLlena = '<span class="fa fa-star checked"></span>'
const estrellaVacia = '<span class="fa fa-star"></span>'

function getHTML(producto) {
   return ` 
   <div class="card col-sm-6">   
      <h2>${producto.name}</h2>
      <hr>
      <div class="info-producto">
         <p><strong>Precio</strong></p>
         <p>${producto.currency} ${producto.cost}</p>
         <p><strong>Descripción</strong></p>
         <p>${producto.description}</p>
         <p><strong>Categoría</strong></p>
         <p>${producto.description}</p>
         <p><strong>Cantidad de vendidos</strong></p>
         <p>${producto.soldCount}</p>
         <p ></p><p><strong>Imágen ilustrativa</strong></p>
         <img src="${producto.image}" class="img-fluid" alt="" height="250" width="300">
         
      </div>
   </div>
 `;

}

function getHTMLComment(producto) {
   return ` 
   <br>
<div class="card col-sm-6">
   <div class="card-header">
   ${producto.dateTime}
   </div>
   <div class="card-body ">
     <h5 class="card-title">${producto.user}</h5>
     <p class="card-text">${producto.description}</p>
     

   </div>
 </div>
 `;

}

document.addEventListener("DOMContentLoaded", async function () {
   const listado = document.querySelector('.container-product');
   const Json = await getJSONData(PRODUCTS_URL + categoria + EXT_TYPE);
   console.log(Json)
   let array = Json.data.products
   console.log(array)
   array.forEach(array => {
      if ((array.id) == productoID) {
         listado.innerHTML += getHTML(array);
      }
   })
});

document.addEventListener("DOMContentLoaded", async function () {
   const listado = document.querySelector('.comments');
   const listadoCommentarios = await getJSONData(PRODUCT_INFO_COMMENTS_URL + productoID + EXT_TYPE);
   console.log(listadoCommentarios)
   listadoCommentarios.data.forEach(producto => {
      listado.innerHTML += getHTMLComment(producto);

      let puntaje = producto.score
      for (let i = 0; i < puntaje; i++) {
         listado.innerHTML += estrellaLlena

      }
      if (puntaje < 5) {
         for (let i = puntaje; i < 5; i++) {
            listado.innerHTML += estrellaVacia

         }
      }

   })


});





