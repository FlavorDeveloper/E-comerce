export function touchScreen () {
    // Encapsulamos la funcionalidad para que se ejecute de inmediato
(function() {
    // Variables para controlar el gesto
    let initialDistance = null;
    let currentScale = 1;
    const body = document.body;
  
    // Función para calcular la distancia entre dos toques
    function getDistance(touch1, touch2) {
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }
  
    // Al iniciar el toque: si hay dos dedos, guardamos la distancia inicial
    document.addEventListener("touchstart", function(e) {
      if (e.touches.length === 2) {
        initialDistance = getDistance(e.touches[0], e.touches[1]);
        // Eliminamos cualquier transición para que el escalado siga al gesto sin demora
        body.style.transition = "none";
      }
    }, { passive: false });
  
    // Durante el movimiento: si hay dos dedos, calculamos el factor de escala
    document.addEventListener("touchmove", function(e) {
      if (e.touches.length === 2 && initialDistance !== null) {
        const newDistance = getDistance(e.touches[0], e.touches[1]);
        currentScale = newDistance / initialDistance;
        body.style.transform = "scale(" + currentScale + ")";
        // Prevenir el zoom nativo
        e.preventDefault();
      }
    }, { passive: false });
  
    // Al terminar el toque: cuando se suelta uno o ambos dedos, animamos el retorno a la escala original
    document.addEventListener("touchend", function(e) {
      // Si ya no hay dos dedos en la pantalla, reiniciamos
      if (e.touches.length < 2) {
        // Aplicamos una transición para que el retorno sea animado
        body.style.transition = "transform 0.3s ease-out";
        body.style.transform = "scale(1)";
        // Reiniciamos las variables
        initialDistance = null;
        currentScale = 1;
      }
    });
  })();
  
};