
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

let categoria = localStorage.getItem("catID")

document.addEventListener("DOMContentLoaded", async function() {
  
  
  const listado = document.querySelector('.product-list');

    const listadoProductos = await getJSONData(PRODUCTS_URL + categoria + EXT_TYPE);
    console.log(listadoProductos)

    listadoProductos.data.products.forEach(producto => {
        listado.innerHTML += getHTML(producto);
        
        
    })

        
   
    
});

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
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

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

            htmlContentToAppend +=` 
            <div class="row shadow p-0 rounded overflow-hidden mb-3 bg-white data-id="${category.id}">
            <div class="col-3 p-0">
              <img class="img-fluid" src="${category.image}" alt="">
            </div>
            <div class="col-9 d-flex flex-column justify-content-between">
              <div class="productoBody">
                <h3>${category.name}</h3>
                <p>${category.description}</p>
              </div>
              <div class="productoFooter d-flex justify-content-between">
                <p>cantidad vendidos <span class="cant">${category.soldCount}</span></p>
                <div class="precio">
                  <span class="moneda">${category.currency}</span>
                  <span class="precio">${category.cost}</span>
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
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  
    getJSONData(PRODUCTS_URL + categoria + EXT_TYPE ).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data.products
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
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

        showCategoriesList();
    });
});