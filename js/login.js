document.addEventListener('DOMContentLoaded', () =>{
    
    const boton = document.querySelector('#button-login');
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        const inputs = document.getElementsByClassName('form-control');
        const emailconst = document.querySelector('#form2Example18');
        const password = document.querySelector('form2Example28');
        if (Array.from(inputs).some (input => { return input.value == ''})  ) {
           alert ("email o contraseña incorrecta") 
        }else{
            localStorage.setItem('emailkey', emailconst.value);
            window.location = "index2.html";
           
        }
        
    })

 
});

