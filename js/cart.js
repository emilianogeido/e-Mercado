
const usuario = 25801

function getHTML(article) {
   return ` 
   <tr>
   <th scope="row"> <img src="${article.image}" class="img-fluid" alt="" height="70" width="70"></th>
   <td>${article.name}</td>
   <td>USD${article.unitCost}</td>
   <td>  
     <div class="col-2">
       <input type="number" class= "form-control" id="input-cantidad"  >
   </div>
 </td>
   <td>${article.unitCost}</td>
 </tr>
 `;

}

document.addEventListener("DOMContentLoaded", async function () {
    const listado = document.querySelector('#tBody-Carrito');
    const Json = await getJSONData(CART_INFO_URL + usuario + EXT_TYPE);
    console.log(Json)
    let array = Json.data.articles
    console.log(array)
    array.forEach(array => {
          listado.innerHTML += getHTML(array);
    })

    var input = document.getElementById("input-cantidad");

    document.addEventListener(click , () => {
    
      var input = document.getElementById("input-cantidad");
      var valor = input.value;
    
      alert("El valor del campo es:"+ valor);
      
    });
 });