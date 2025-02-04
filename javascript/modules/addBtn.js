export function addBtn () {
// Selectores y variables.
    const addCartBtn  = document.querySelectorAll('.add-to-cart');
    const root        = document.documentElement;
    const textsColor  = getComputedStyle(root).getPropertyValue('--texts-color').trim();
    const textsColor2 = getComputedStyle(root).getPropertyValue('--background-color').trim();
    const textos      = document.querySelector('.add-to-cart').textContent;
    const addBtnColor = getComputedStyle(root).getPropertyValue('--addbtn-color');

// Eventos.
    addCartBtn.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.stopPropagation();
            boton.style.backgroundColor = addBtnColor;
            boton.style.color = textsColor2;
            boton.textContent = 'Añadido ✔';

            setTimeout(() => {
                boton.style.backgroundColor = textsColor;
                boton.style.color = textsColor2;
                boton.textContent = textos;
            }, 2000);
        });
    });
};