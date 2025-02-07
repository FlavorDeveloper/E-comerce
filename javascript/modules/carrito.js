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

    carrito.addEventListener('click',eraseProducto);

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
// Actualizar cantidad.
        const existe = productosCarrito.some(articulo => articulo.id === infoProducto.id);
        
        if (existe){
            const producto = productosCarrito.map(producto => {
                if (producto.id === infoProducto.id){
                    producto.cantidad++;
                    return producto;
                }else{
                    return producto;
                }
            });
            productosCarrito = [...producto];
        }else{
            productosCarrito = [...productosCarrito,infoProducto];
        }

// Limpiar HTML.
        limpiarHtml();

        productosCarrito.forEach(article => {
            const {imagen,nombre,precio,cantidad,id} = article;
            const obj = document.createElement('div');
            obj.innerHTML = `
                <div class = "productos-item">
                    <img class="item-img" src="${imagen}">
                    <p class="item-nombre">${nombre}</p> 
                    <p class="item-precio">${precio}</p> 
                    <p class="item-cantidad">${cantidad} U</p> 
                    <p class="item-erase" data-id = "${id}">✖︎</p> 
                </div>
            `;

            carrito.prepend(obj);
        });
    };

    function limpiarHtml() {
        carrito.innerHTML = ''; 
        carrito.appendChild(limpiarCarritoBtn);
    };

    function eraseProducto(e) {
        e.stopPropagation();
        if (e.target.classList.contains('item-erase')) {
            const productoId = e.target.getAttribute('data-id');
    
            // Eliminar el producto del array
            productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);
    
            // Limpiar el HTML y volver a renderizar los productos
            limpiarHtml();
            productosCarrito.forEach(article => {
                const { imagen, nombre, precio, cantidad, id } = article;
                const obj = document.createElement('div');
                obj.innerHTML = `
                    <div class="productos-item">
                        <img class="item-img" src="${imagen}">
                        <p class="item-nombre">${nombre}</p> 
                        <p class="item-precio">${precio}</p> 
                        <p class="item-cantidad">${cantidad} U</p> 
                        <p class="item-erase" data-id="${id}">✖︎</p> 
                    </div>
                `;
    
                carrito.prepend(obj);
            });
        }
    }
};