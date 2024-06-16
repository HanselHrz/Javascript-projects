( function(){

    let idCliente;

    const nombreInput   = document.querySelector ('#nombre');
    const emailInput    = document.querySelector ('#email');
    const telefonoInput = document.querySelector ('#telefono');
    const empresaInput  = document.querySelector ('#empresa');


    document.addEventListener('DOMContentLoaded', ()=>{

        conectarDB();
        
        formulario.addEventListener('submit', actualizarCliente);

        const parametrosURL = new URLSearchParams( window.location.search );

        idCliente = parametrosURL.get("id");

        if ( idCliente ){

            setTimeout(() => {

                obtenerCliente( idCliente );
                
            }, 100);
        }
    });

    function actualizarCliente( e ) {

        e.preventDefault();

        if ( nombreInput. value === '' || emailInput. value === '' || telefonoInput. value === '' || empresaInput. value === '' ){

          imprimirAlerta('Todos los campos son obligatorios', 'error');

          return;            

        }

        const clienteActualizado = {
            
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente), 

        }

        const transaction = DB.transaction( ['crm'], 'readwrite' );

        const objectStore = transaction.objectStore('crm');

        objectStore.put( clienteActualizado );
 
        transaction.onerror = function( error ) {

            imprimirAlerta('Hubo un error en la transacción al Actualizar', 'error');
            console.log( error );

        };

        transaction.oncomplete = function( event ) {

            console.log('Transacción Completada - Cliente Actualizado');

            imprimirAlerta('Se actualizo el Cliente correctamente');   

            setTimeout(() => {
                
                window.location.href = 'index.html';

            }, 3000);
        };
    }

    function obtenerCliente( id ){

        const objectStore = DB.transaction( 'crm' ).objectStore('crm');

        objectStore.openCursor().onsuccess =  function( event ) {

            const cursor = event.target.result;

            if ( cursor ){            
                
                if ( cursor.value.id === Number( id ) ){

                    llenarFormulario( cursor.value );

                }
                cursor.continue();

            }
        }
    }

    function llenarFormulario ( datosCliente ){

        const { nombre, email, telefono, empresa } = datosCliente;

        nombreInput.value   = nombre;
        nombreInput.value   = nombre;
        emailInput.value    = email;
        telefonoInput.value = telefono;
        empresaInput.value  = empresa;

    }
     
})();
