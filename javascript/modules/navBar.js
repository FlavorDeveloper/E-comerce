export function navBar() {
    // Elementos existentes
    const listButtons = document.querySelectorAll('.list-button--click');
    const body = document.querySelector('body');
    const listShow = document.querySelectorAll('.list-show');
    const navbar = document.querySelector('.nav');
    const navBtn = document.querySelector('.nav-btn');
    const listItems = document.querySelectorAll('.list-item');
    const mediaQuery = window.matchMedia('(max-width: 900px)');

    let scrollTimeout;

    // Función para cerrar el menú móvil
    const closeMobileMenu = () => {
        if (mediaQuery.matches) {
            listItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    };

    // Función para alternar menú
    const toggleMobileMenu = () => {
        if (mediaQuery.matches) {
            listItems.forEach(item => {
                item.classList.toggle('active');
            });
        }
    };

    const hideNavbar = () => {
        navbar.style.opacity = '0';
        navbar.style.transition = 'opacity 0.3s ease';
    };

    const showNavbar = () => {
        navbar.style.opacity = '1';
        navbar.style.transition = 'opacity 0.3s ease';
    };

    // Evento de scroll
    window.addEventListener('scroll', () => {
        hideNavbar();
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(showNavbar, 200);
    });

    // Evento click del botón menú
    navBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Impedir la propagación del evento
        toggleMobileMenu();
    });

    // Comportamiento submenús
    listButtons.forEach(button => {
        const rightArrow = button.querySelector('i.fa-caret-right');
        const submenu = button.nextElementSibling;
        let isSubmenuVisible = false;

        button.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return;
            isSubmenuVisible = !isSubmenuVisible;
            
            rightArrow.style.transform = isSubmenuVisible ? 'rotate(90deg)' : 'rotate(0deg)';
            submenu.style.display = isSubmenuVisible ? 'block' : 'none';
            submenu.style.opacity = isSubmenuVisible ? 1 : 0;
            
            e.stopPropagation();
        });
    });

    // Cerrar menús al hacer click en el body (MODIFICADO)
    body.addEventListener('click', () => {
        // Cerrar submenús
        listShow.forEach(nodo => {
            nodo.style.display = 'none';
            nodo.style.opacity = 0;
        });

        // Cerrar menú móvil
        closeMobileMenu();

        // Resetear flechas
        listButtons.forEach(button => {
            const rightArrow = button.querySelector('i.fa-caret-right');
            rightArrow.style.transform = 'rotate(0deg)';
        });
    });
}