
const usuario = 25801

function getHTML(article) {
  return ` 
   <tr>
   <th scope="row"> <img src="${article.image}" class="img-fluid" alt="" height="70" width="70"></th>
   <td>${article.name}</td>
   <td>${article.currency}${article.unitCost}</td>
   <td>  
     <div class="col-2">
       <input type="number" value="1" class= "form-control" id="input-cantidad"  >
   </div>
 </td>
   <td id="subtotal">${article.currency}${article.unitCost}</td>
 </tr>
 `;

}



document.addEventListener("DOMContentLoaded", async function () {
  const listado = document.querySelector('#tBody-Carrito');
  const Json = await getJSONData(CART_INFO_URL + usuario + EXT_TYPE);
  var array = Json.data.articles
  
  array.forEach(array => {
    listado.innerHTML += getHTML(array);
    
    /*---  poner subtotal general   --- */
    const subtotalGeneral = document.querySelector('#subtotalGeneral');
    subtotalGeneral.innerHTML = array.currency + array.unitCost

    /*---  Ver que radio seleciona   --- */
    const radioButtons = document.querySelectorAll('input[name="flexRadioDefault"]');
    var valorPorcentaje;
    document.addEventListener("change", () => {
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
              valorPorcentaje = parseFloat(radioButton.value) ;
               console.log(valorPorcentaje)
                break;
            }
        }
      });

      
      

      /*--- actualizando valores   --- */
    document.addEventListener("change", () => {

      var input = document.getElementById("input-cantidad");
      var valor = input.value;
    
      if (valor >= 0) {
        document.getElementById("subtotal").innerHTML = array.currency + valor * array.unitCost
        
        subtotalGeneral.innerHTML = array.currency + valor * array.unitCost
        const costoEnvio = document.querySelector('#costoEnvio');
        costoEnvio.innerHTML = array.currency + (( valor * array.unitCost) * valorPorcentaje)
        const totalPagar = document.querySelector('#totalPagar');
        totalPagar.innerHTML = array.currency + (( valor * array.unitCost) * valorPorcentaje + valor * array.unitCost )
        
      }


    });

  

  })

  


});