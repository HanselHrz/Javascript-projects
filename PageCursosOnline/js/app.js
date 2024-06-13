const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const listaCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
let articulosCarrito = [];

CargarListeners();
function CargarListeners(){
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        agregarCarrito();
    });

    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarCursos();
    });
}


function agregarCurso(e){
    //Previniendo acciones por defecto
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        agregarCarrito();
    }
}

function leerDatos(curso){
    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1
    }

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id  );
    if(existe){
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos]
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    agregarCarrito();
}

function agregarCarrito(){

    limpiarCursos();

    articulosCarrito.forEach(curso => {

        const { imagen, titulo, precio, cantidad, id } = curso
        
        const row = document.createElement('tr');
        row.innerHTML = `
         <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">x</a>
        </td>
        `;
        listaCarrito.appendChild(row)
    });

    storage();

}

function storage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


function limpiarCursos(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
}