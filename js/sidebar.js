document.addEventListener('mousemove', function(e) {
    const toggleContainer = document.getElementById('toggle-container');
    if (e.clientX < 100 && e.clientY < 100) {
        toggleContainer.style.opacity = '1';
    } else {
        toggleContainer.style.opacity = '0';
    }
});