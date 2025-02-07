export function carrito() {
// Selectores y variables.
    const carrito = document.getElementById("carrito");
    const listaProductos = document.querySelectorAll('#lista-productos');
    const limpiarCarritoBtn = document.querySelector('#limpiar-carrito');
    const carBtn = document.querySelector('.fa-cart-shopping');
    const greenColor = getComputedStyle(document.documentElement).getPropertyValue('--addbtn-color');
    let productosCarrito = [];

// Eventos e iteraciones.
    listaProductos.forEach(articulo => {
        articulo.addEventListener('click', agregarProducto);
    });

    limpiarCarritoBtn.addEventListener('click', () => {
        productosCarrito = [];
        limpiarHtml();
        actualizarColorYMovimiento();  // Actualiza el color y animación al limpiar el carrito.
    });

    carrito.addEventListener('click', eraseProducto);

// Funciones.
    function agregarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('add-to-cart')) {
            const productoSeleccionado = e.target.parentElement.parentElement;
            datosProducto(productoSeleccionado);
        }
    };

// Construir el HTML del elemento al que dimos click.
    function datosProducto(producto) {
        // Crear objeto con la información del producto.
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            nombre: producto.querySelector('h2').textContent,
            descripcion: producto.querySelector('p.product-description').textContent,
            precio: producto.querySelector('p.product-price').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1,
        };

// Verificar si el producto ya existe en el carrito para actualizar la cantidad.
        const existe = productosCarrito.some(articulo => articulo.id === infoProducto.id);
        if (existe) {
            productosCarrito = productosCarrito.map(productoItem => {
                if (productoItem.id === infoProducto.id) {
                    productoItem.cantidad++;
                }
                return productoItem;
            });
        } else {
            productosCarrito = [...productosCarrito, infoProducto];
        }

        limpiarHtml();
        renderCarrito();
        actualizarColorYMovimiento();  // Actualiza el color y animación al agregar un producto.
    };

// Función para limpiar el HTML del carrito.
    function limpiarHtml() {
// Solo elimina los productos, pero deja los botones intactos
        const botonesContainer = document.querySelector('.vaciar-comprar-container');
        carrito.innerHTML = ''; // Vaciamos el carrito, pero no los botones
        carrito.appendChild(botonesContainer); // Aseguramos que los botones se mantengan
    };

// Función para renderizar los productos en el carrito.
    function renderCarrito() {
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
    };

// Función para eliminar un producto del carrito.
    function eraseProducto(e) {
        e.stopPropagation();
        if (e.target.classList.contains('item-erase')) {
            const productoId = e.target.getAttribute('data-id');
            // Eliminar el producto del array.
            productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);
            limpiarHtml();
            renderCarrito();
            actualizarColorYMovimiento();  // Actualiza el color y animación al eliminar un producto.
        }
    };

// Función para actualizar el color del ícono y aplicar la animación.
    function actualizarColorYMovimiento() {
        if (productosCarrito.length > 0) {
            // Cambiar el color del ícono
            carBtn.style.color = greenColor;
            // Agregar la clase para la animación
            carBtn.classList.add('shake');
        } else {
            // Restaurar el color original
            carBtn.style.color = '';
            // Quitar la clase de la animación
            carBtn.classList.remove('shake');
        }
    };
    
// Función para enviar el carrito a WhatsApp
    function enviarCarritoWhatsApp() {
        const numeroWhatsApp = "+584249360393";
        let mensaje = "";

        if (productosCarrito.length === 0) {
            mensaje = "Hola, necesito información.";
        } else {
            mensaje = "Hola! Quiero comprar:\n\n";
            productosCarrito.forEach(producto => {
                mensaje += `• Producto:\n${producto.nombre}\nInfo: ${producto.descripcion}\nPrecio: ${producto.precio}\nCantidad: ${producto.cantidad}\nImagen: ${producto.imagen}\n\n`;
        });
    }
// Codificar mensaje y abrir WhatsApp
    const mensajeCodificado = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, "_blank");
}
// Agregar evento al botón de enviar carrito por WhatsApp
    document.getElementById("enviar-whatsapp").addEventListener("click", enviarCarritoWhatsApp);
    document.getElementById("enviar-whatsapp2").addEventListener("click", enviarCarritoWhatsApp);
};
