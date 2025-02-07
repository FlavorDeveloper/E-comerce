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
            const obj = document.createElement('div');
            obj.innerHTML = `
                <div class = "productos-item">
                    <img class="item-img" src="${article.imagen}">
                    <p class="item-nombre">${article.nombre}</p> 
                    <p class="item-precio">${article.precio}</p> 
                    <p class="item-cantidad">${article.cantidad} U</p> 
                    <p class="item-erase">✖︎</p> 
                </div>
            `;

            carrito.prepend(obj);
        });
    };

    function limpiarHtml() {    
        // Guardar el botón temporalmente
        carrito.innerHTML = ''; // Borra todo el contenido
        carrito.appendChild(limpiarCarritoBtn); // Vuelve a agregar el botón
    };
};