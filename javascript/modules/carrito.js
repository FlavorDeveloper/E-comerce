export function carrito () {
// Selectores y variables.
    const carrito = document.getElementById("carrito");
    const listaProductos = document.querySelectorAll('#lista-productos');
    const limpiarCarritoBtn = document.querySelector('#limpiar-carrito');
    let productosCarrito = [];
// Eventos e iteraciones.

    listaProductos.forEach(articulo => {
        articulo.addEventListener('click', agregarProducto);
    });

    limpiarCarritoBtn.addEventListener('click', () => {
        limpiarHtml();
        productosCarrito = [];
    });

// Funciones.
    function agregarProducto (e) {
        e.preventDefault();
        if (e.target.classList.contains('add-to-cart')){
            const productoSeleccionado = e.target.parentElement.parentElement;
            datosProducto(productoSeleccionado);
        };
        
    };
// Contruir el html del elemento al que dimos click.
    function datosProducto (producto) {
// crear objeto.
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            nombre: producto.querySelector('h2').textContent,
            descripcion: producto.querySelector('p.product-description').textContent,
            precio: producto.querySelector('p.product-price').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1,
        };
// Agregar productos al carrito.
        productosCarrito = [...productosCarrito,infoProducto];

// Limpiar HTML.
        limpiarHtml();

        productosCarrito.forEach(article => {
            const imgHTML = document.createElement('img');
            imgHTML.classList.add('img-HTML');
            imgHTML.src = article.imagen;

            const nombreHTML = document.createElement('h2');
            nombreHTML.classList.add('nombre-HTML');
            nombreHTML.textContent = article.nombre;

            const descripcionHTML = document.createElement('p');
            descripcionHTML.classList.add('descripcion-HTML');
            descripcionHTML.textContent = article.descripcion;

            const precioHTML = document.createElement('p');
            precioHTML.classList.add('precio-HTML');
            precioHTML.textContent = article.precio;

            const cantidadHTML = document.createElement('p');
            cantidadHTML.classList.add('cantidad-HTML');
            cantidadHTML.textContent = article.cantidad;

            carrito.prepend(imgHTML,nombreHTML,descripcionHTML,precioHTML,cantidadHTML);
        });
    };

    function limpiarHtml() {    
        // Guardar el botón temporalmente
        carrito.innerHTML = ''; // Borra todo el contenido
        carrito.appendChild(limpiarCarritoBtn); // Vuelve a agregar el botón
    };
};