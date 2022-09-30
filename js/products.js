const ORDER_ASC_BY_COST = "CostAsc";
const ORDER_DESC_BY_COST = "CostDesc";
const ORDER_BY_SOLD_COUNT = "Relevancia";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let categoria = localStorage.getItem("catID")



function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let Product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(Product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(Product.cost) <= maxCount))){

            htmlContentToAppend +=` 
            <div onclick="setProdID(${Product.id})" class="cursor-active row shadow p-0 rounded overflow-hidden mb-3 bg-white">
            <div class="col-3 p-0">
              <img class="img-fluid" src="${Product.image}" alt="">
            </div>
            <div class="col-9 d-flex flex-column justify-content-between">
              <div class="productoBody">
                <h3>${Product.name}</h3>
                <p>${Product.description}</p>
              </div>
              <div class="productoFooter d-flex justify-content-between">
                <p>cantidad vendidos <span class="cant">${Product.soldCount}</span></p>
                <div class="precio">
                  <span class="moneda">${Product.currency}</span>
                  <span class="precio">${Product.cost}</span>
                </div>
              </div>
            </div>
          </div>
          `;             
        }

        document.getElementById("contenedorParaOrdenar").innerHTML = htmlContentToAppend;


    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
      currentProductsArray = categoriesArray;
    }

    currentProductsArray = sortCategories(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  
    getJSONData(PRODUCTS_URL + categoria + EXT_TYPE ).then(function(resultObj){
        if (resultObj.status === "ok"){
          currentProductsArray = resultObj.data.products
            showList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showList();

    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showList();
    });
});




/*

----antigua manera---

function getHTML(producto) {
  return `    
  
  <div id="divProducto" class="row shadow p-0 rounded overflow-hidden mb-3 bg-white data-id="${producto.id}">
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
</div>


`;         

}

document.addEventListener("DOMContentLoaded", async function() {
  
  
  
  const listado = document.querySelector('.product-list');
 

    const listadoProductos = await getJSONData(PRODUCTS_URL + categoria + EXT_TYPE);
    console.log(listadoProductos)
    
    listadoProductos.data.products.forEach(producto => {
        listado.innerHTML += getHTML(producto);
        
      

      
        
    })
               
    
});

*/