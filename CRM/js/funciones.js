let DB;

const formulario = document.querySelector ('#formulario');


function conectarDB(){

    const abrirConexionBD = window.indexedDB.open('crm', 1);

    abrirConexionBD.onerror = function () {

        console.log( 'Hubo un error al abrir la conexion a la BD' );

    };

    abrirConexionBD.onsuccess = function () {

        DB = abrirConexionBD.result;

    }

}


function imprimirAlerta( mensaje, tipoMensaje ) {
    
    const alerta = document.querySelector ('.alerta');

    if ( !alerta ) {


        const divMensaje = document.createElement ('DIV');

        divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

        if ( tipoMensaje === 'error' ) {

            divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            
        }else{

            divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');

        }

        
        divMensaje.textContent = mensaje;
        formulario.appendChild( divMensaje );

        setInterval(() => {
            
            divMensaje.remove();

        }, 3000);
    }
}

