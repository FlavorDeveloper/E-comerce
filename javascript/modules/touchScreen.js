export function touchScreen () {
    document.addEventListener('gestureend', () => {
        document.body.style.transform = 'scale(1)';
        document.body.style.transformOrigin = 'center';
    });
};