
const usuario = 25801
const forms = document.querySelectorAll('form');
const tarjeta = document.querySelector("#tarjeta");
const transferencia = document.querySelector("#transferenciaBancaria");
const numeroCuenta = document.querySelector("#numeroCuenta");
const numeroTarjeta = document.querySelector("#numeroTarjeta");
const codigoSeg = document.querySelector("#codigoSeg");
const vencimiento = document.querySelector("#vencimiento");
const btnComprar = document.querySelector("#btn-comprar");
const btnModalPaiments = document.querySelector("#btn-link-terms")
const divMustAcceptTerms = document.querySelector("#div-must-accept-terms")


/* verify paiment */
const verifyRadioState = () => {
  if (!tarjeta.checked && !transferencia.checked) {
    btnModalPaiments.classList.add("link-danger");
    divMustAcceptTerms.classList.add("d-inline");
  } else if (!numeroCuenta.checkValidity()) {
    btnModalPaiments.classList.add("link-danger");
    divMustAcceptTerms.classList.add("d-inline");
  } else if (!numeroTarjeta.checkValidity()) {
    btnModalPaiments.classList.add("link-danger");
    divMustAcceptTerms.classList.add("d-inline");
  } else if (!codigoSeg.checkValidity()) {
    btnModalPaiments.classList.add("link-danger");
    divMustAcceptTerms.classList.add("d-inline");
  } else if (!vencimiento.checkValidity()) {
    btnModalPaiments.classList.add("link-danger");
    divMustAcceptTerms.classList.add("d-inline");
  }
  else {
    btnModalPaiments.classList.remove("link-danger");
    divMustAcceptTerms.classList.remove("d-inline");
  }
};


/* summit all forms */
frmsSbmt = (forms) => {
  console.log(forms);
  forms.forEach((form) => {

    form.onchange = (frmSbmt) => {
      if (!form.checkValidity()) {
        frmSbmt.preventDefault();
        frmSbmt.stopPropagation();
      }
    };
    form.classList.add("was-validated");
  });
};



btnComprar.onclick = () => {
  frmsSbmt(forms);
  verifyRadioState();
  
};

let form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Compra exitosa");
});

tarjeta.onclick = () => {
  transferencia.checked = false;
  numeroCuenta.disabled = true
  vencimiento.disabled = false
  codigoSeg.disabled = false
  numeroTarjeta.disabled = false
  transferencia.required = false
};

transferencia.onclick = () => {
  tarjeta.checked = false;
  vencimiento.disabled = true
  codigoSeg.disabled = true
  numeroTarjeta.disabled = true
  numeroCuenta.disabled = false
  tarjeta.required = false
};



function getHTML(article) {
  return ` 
   <tr>
   <th scope="row"> <img src="${article.image}" class="img-fluid" alt="" height="70" width="70"></th>
   <td>${article.name}</td>
   <td>${article.currency}${article.unitCost}</td>
   <td>  
     <div class="col-2">
       <input type="number" value="1" class= "form-control" id="input-cantidad" min="1" required >
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
          valorPorcentaje = parseFloat(radioButton.value);
          console.log(valorPorcentaje)
          break;
        }
      }
    });




    /*--- actualizando valores   --- */
    document.addEventListener("change", () => {

      var input = document.getElementById("input-cantidad");
      var valor = input.value;
      if (input <= 0) {
        input.classList.add("link-danger");
      }


      if (valor >= 0) {
        document.getElementById("subtotal").innerHTML = array.currency + valor * array.unitCost

        subtotalGeneral.innerHTML = array.currency + valor * array.unitCost
        const costoEnvio = document.querySelector('#costoEnvio');
        costoEnvio.innerHTML = array.currency + ((valor * array.unitCost) * valorPorcentaje)
        const totalPagar = document.querySelector('#totalPagar');
        totalPagar.innerHTML = array.currency + ((valor * array.unitCost) * valorPorcentaje + valor * array.unitCost)

      }


    });



  })




});

