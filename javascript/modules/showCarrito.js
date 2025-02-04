export function showCarrito () {
// Selectores y variables.
    const carritoBtn = document.querySelector('.car-btn');
    const carritoContainer = document.querySelector('.shop-conatiner');
    const body = document.querySelector('body');
// Eventos.
    carritoBtn.addEventListener('click', mostrarCarrito);
    body.addEventListener('click', cerrarCarrito);
// Funciones.
    function mostrarCarrito (e) {
        e.stopPropagation();
        carritoContainer.classList.toggle('shop-conatiner--active')
    };

    function cerrarCarrito (e) {
        e.stopPropagation();
        carritoContainer.classList.remove('shop-conatiner--active');
    };
};