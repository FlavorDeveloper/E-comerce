export function carrito() {
    /**
     * 1. DECLARACIÓN DE VARIABLES Y SELECTORES
     * Contiene todos los selectores y variables globales utilizados en el carrito.
     */
    const carrito = document.getElementById("carrito");
    const listaProductos = document.querySelectorAll('#lista-productos');
    const limpiarCarritoBtn = document.querySelector('#limpiar-carrito');
    const carBtn = document.querySelector('.fa-cart-shopping');
    const greenColor = getComputedStyle(document.documentElement).getPropertyValue('--addbtn-color');
    const vacioText = document.querySelector('.carrito-vacio-text');
    let productosCarrito = [];
    let totalPrecio = document.querySelector('#total');

    /**
     * 2. EVENTOS
     * Se registran todos los eventos necesarios para el funcionamiento del carrito.
     */
    listaProductos.forEach(articulo => {
        articulo.addEventListener('click', agregarProducto);
    });
    
    limpiarCarritoBtn.addEventListener('click', limpiarCarrito);
    carrito.addEventListener('click', eraseProducto);
    document.addEventListener('DOMContentLoaded', recuperarCarrito);

    document.getElementById("enviar-whatsapp").addEventListener("click", enviarCarritoWhatsApp);
    document.getElementById("enviar-whatsapp2").addEventListener("click", enviarCarritoWhatsApp);

    /**
     * 3. FUNCIONES PRINCIPALES
     * Contiene las funciones clave para agregar o eliminar productos del carrito.
     */
    function agregarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('add-to-cart')) {
            const productoSeleccionado = e.target.parentElement.parentElement;
            datosProducto(productoSeleccionado);
        }
    }
    
    function eraseProducto(e) {
        e.stopPropagation();
        if (e.target.classList.contains('item-erase')) {
            const productoId = e.target.getAttribute('data-id');
            const producto = productosCarrito.find(producto => producto.id === productoId);
            
            if (producto) {
                producto.cantidad--;
                if (producto.cantidad <= 0) {
                    productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);
                }
                actualizarCarrito();
            }
        }
    }

    function limpiarCarrito() {
        productosCarrito = [];
        actualizarCarrito();
        localStorage.clear();
    }
    
    function recuperarCarrito() {
        const datosCarrito = JSON.parse(localStorage.getItem('carrito')) || { productos: [], total: 0 };
        productosCarrito = datosCarrito.productos;
        actualizarCarrito();
    }

    /**
     * 4. FUNCIONES AUXILIARES
     * Contiene funciones de cálculo de total, renderización, almacenamiento, etc.
     */
    function datosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            nombre: producto.querySelector('h2').textContent,
            descripcion: producto.querySelector('p.product-description').textContent,
            precio: producto.querySelector('p.product-price').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1,
        };
        
        const existe = productosCarrito.some(articulo => articulo.id === infoProducto.id);
        if (existe) {
            productosCarrito = productosCarrito.map(productoItem => {
                if (productoItem.id === infoProducto.id) {
                    productoItem.cantidad++;
                }
                return productoItem;
            });
        } else {
            productosCarrito.push(infoProducto);
        }
        actualizarCarrito();
    }

    function actualizarCarrito() {
        limpiarHtml();
        renderCarrito();
        totalPrice();
        sincronizarStorage();
        actualizarColorYMovimiento();
    }
    
    function limpiarHtml() {
        const botonesContainer = document.querySelector('.vaciar-comprar-container');
        carrito.innerHTML = '';
        carrito.appendChild(botonesContainer);
        carrito.prepend(vacioText);
        vacioText.insertAdjacentElement("afterend", totalPrecio);
    }
    
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
            vacioText.remove();
        });
        sincronizarStorage();
    }
    
    function totalPrice() {
        const total = productosCarrito.reduce((acumulador, producto) => {
            const precio = Number(producto.precio.replace('$', ''));
            return acumulador + (precio * producto.cantidad);
        }, 0);
        totalPrecio.textContent = 'Total $' + total;
        return total;
    }
    
    function sincronizarStorage() {
        const datosCarrito = { productos: productosCarrito, total: totalPrice() };
        localStorage.setItem('carrito', JSON.stringify(datosCarrito));
    }
    
    function actualizarColorYMovimiento() {
        if (productosCarrito.length > 0) {
            carBtn.style.color = greenColor;
            carBtn.classList.add('shake');
        } else {
            carBtn.style.color = '';
            carBtn.classList.remove('shake');
        }
    }
    
    function enviarCarritoWhatsApp() {
        const numeroWhatsApp = "12345678";
        let finalMessage = "";
        
        // Paso 1: Comprobar si el carrito está vacío
        if (productosCarrito.length === 0) {
            // Carrito vacío: se envía un mensaje básico sin datos extra
            finalMessage = "Hola, necesito información.";
        } else {
            // Paso 2: Armar el mensaje completo para un carrito con productos
            let mensaje = "Hola! Quiero comprar:\n\n";
            productosCarrito.forEach(producto => {
                mensaje += `${producto.nombre}\nPrecio: ${producto.precio}\nCantidad: ${producto.cantidad}\n\n`;
            });
            let precio = `${totalPrecio.textContent}\n\n`;
            let datosUsuario = `Nombre:\nTipo de pago:\nDelivery:\n\n`;
            
            // Concatenar todas las partes en el mensaje final
            finalMessage = mensaje + precio + datosUsuario;
        }
        
        // Paso 3: Codificar el mensaje final y abrir WhatsApp
        const finalMessageEncoded = encodeURIComponent(finalMessage);
        window.open(`https://wa.me/${numeroWhatsApp}?text=${finalMessageEncoded}`, "_blank");
    }    
}
