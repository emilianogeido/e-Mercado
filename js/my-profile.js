
 if (localStorage.getItem('emailkey') == null) {

    window.location = "index.html"

}

else {

document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");
    const primerNombre = document.querySelector("#primerNombre");
    const segundoNombre = document.querySelector("#segundoNombre");
    const primerApellido = document.querySelector("#primerApellido");
    const segundoApellido = document.querySelector("#segundoApellido");
    const email = document.querySelector("#email");
    const telefono = document.querySelector("#telefono");
    const btnGuardar = document.querySelector("#guardar");

   
    

        frmsSbmt = (forms) => {
            console.log(forms);
            forms.forEach((form) => {
                form.submit();
                form.onsubmit = (frmSbmt) => {
                    if (!form.checkValidity()) {
                        frmSbmt.preventDefault();
                        frmSbmt.stopPropagation();
                    }
                };
                form.classList.add("was-validated");
            });
        };

        btnGuardar.onclick = () => {
            frmsSbmt(forms);
            if (primerNombre.value !== ""  &&  primerApellido.value !== "") {
            localStorage.setItem('primerNombre', primerNombre.value);
            localStorage.setItem('segundoNombre', segundoNombre.value);
            localStorage.setItem('primerApellido', primerApellido.value);
            localStorage.setItem('segundoApellido', segundoApellido.value);
            localStorage.setItem('telefono', telefono.value);
            }
            
        };


        email.value = localStorage.getItem('emailkey')
        primerNombre.value = localStorage.getItem('primerNombre')
        segundoNombre.value = localStorage.getItem('segundoNombre')
        primerApellido.value = localStorage.getItem('primerApellido')
        segundoApellido.value = localStorage.getItem('segundoApellido')
        telefono.value = localStorage.getItem('telefono')

 



})

}