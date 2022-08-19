const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"

function getHTML(producto) {
    return ` 
    <div class="row shadow p-0 rounded overflow-hidden mb-3 bg-white data-id="${producto.id}">
    <div class="col-3 p-0">
      <img class="img-fluid" src="${producto.image}" alt="">
    </div>
    <div class="col-9 d-flex flex-column justify-content-between">
      <div class="productoBody">
        <h3>${producto.name}</h3>
        <p>${producto.description}</p>
      </div>
      <div class="productoFooter d-flex justify-content-between">
        <p>cantidad vendidos <span class="cant">${producto.soldCount}</span></p>
        <div class="precio">
          <span class="moneda">${producto.currency}</span>
          <span class="precio">${producto.cost}</span>
        </div>
      </div>
    </div>
  </div>
  `;             
}


document.addEventListener("DOMContentLoaded", async function() {
    const listado = document.querySelector('.product-list');

    const listadoProductos = await getJSONData(url);
    console.log(listadoProductos)

    listadoProductos.data.products.forEach(producto => {
        listado.innerHTML += getHTML(producto);
    })

        
   
    
});