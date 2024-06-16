( function () {
    
    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        formulario.addEventListener('submit', validarCliente);

    });
    
    function validarCliente( e ) {
        e.preventDefault();

        const nombre = document.querySelector ('#nombre').value;
        const email = document.querySelector ('#email').value;
        const telefono = document.querySelector ('#telefono').value;
        const empresa = document.querySelector ('#empresa').value;

        if ( nombre === '' || email === '' || telefono === '' || empresa === '' ){

            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;

        }

        const cliente = { nombre, email, telefono, empresa, id: Date.now() };
        crearNuevoCliente( cliente );

    }

    function crearNuevoCliente( cliente ) {

        const transaction = DB.transaction( ['crm'], 'readwrite' );
        const objectStore = transaction.objectStore('crm');

        objectStore.add( cliente );
        transaction.onerror = function( event ) {

            imprimirAlerta('Hubo un error en la transacción al Agregar', 'error');

        };

        transaction.oncomplete = function( event ) {

            imprimirAlerta('Se agrego el Cliente correctamente');   
            
            setTimeout(() => {
                
                window.location.href = 'index.html';

            }, 3000);
        };
    }
})();
