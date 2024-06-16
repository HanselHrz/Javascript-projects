( function () {

    const listadoClientes = document.querySelector ('#listado-clientes');

    document.addEventListener('DOMContentLoaded', ()=>{

        crearDB();

        if ( window.indexedDB.open('crm',1)) {
            obtenerClientes();
        }
        listadoClientes.addEventListener('click', eliminiarCliente);

    });

    function eliminiarCliente( e ){

        if ( e.target.classList.contains('eliminar') ){

            const idClienteEliminar = Number(e.target.dataset.cliente);

            Swal.fire({
                title: '¿Desea eliminar este cliente?',
                text: "¡Esta acción no puede ser revertida!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, eliminalo!'
            }).then((result) => {

                if (result.isConfirmed) {     
                    
                    const transaction = DB.transaction( ['crm'], 'readwrite' );
                    const objectStore = transaction.objectStore('crm');

                    objectStore.delete( idClienteEliminar );
            
                    transaction.onerror = function( error ) {

                        Swal.fire({
                            icon: 'error',
                            title: '¡Error - No se puedo eliminar!',
                            toast: true,
                        });                        
                    };

                    transaction.oncomplete = function( event ) {

                        console.log('Transacción Completada - Cliente Eliminado');

                        e.target.parentElement.parentElement.remove();
                        
                        Swal.fire(
                            '¡Eliminado!',
                            'El cliente ha sido eliminado',
                            'success'
                        )
                    };                    
                }
            });
        }
    }

    function crearDB ( ) {
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = function () {

            console.log( 'Hubo un error al crear la BD' );

        }
        crearDB.onsuccess = function (){

            DB = crearDB.result;

        }

        // Schema
        crearDB.onupgradeneeded = function( e ) {
        
            const db = e.target.result;

            const objectStore = db.createObjectStore( 'crm', { 
                keyPath: 'id',  // Indice
                autoIncrement: true
            });

            objectStore.createIndex('nombre', 'nombre', { unique: false } );
            objectStore.createIndex('email', 'email', { unique: true } );
            objectStore.createIndex('telefono', 'telefono', { unique: false } );
            objectStore.createIndex('empresa', 'empresa', { unique: false } );
            objectStore.createIndex('id', 'id', { unique: true } );

            console.log( 'BD creada y lista' );

        }
    }

    function obtenerClientes (){

        const abrirConexionBD = window.indexedDB.open('crm', 1);

        abrirConexionBD.onerror = function () {

            console.log( 'Hubo un error al Abrir la BD' );

        };

        abrirConexionBD.onsuccess = function (){

            DB = abrirConexionBD.result;

            const objectStore = DB.transaction( 'crm' ).objectStore('crm');

            objectStore.openCursor().onsuccess =  function( event ) {

                const cursor = event.target.result;

                if ( cursor ){

                    const { nombre, telefono, email, empresa, id } = cursor.value;

                    listadoClientes.innerHTML += `
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                            <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-700">${telefono}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                            <p class="text-gray-600">${empresa}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                        </td>
                    </tr>`;
                    
                    cursor.continue();

                }else{

                    console.log( 'No hay mas resultados' );
                }            

            };        
        };
    }


})();



                    


 