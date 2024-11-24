document.addEventListener('mousemove', function(e) {
    const toggleContainer = document.getElementById('toggle-container');
    if (e.clientX < 100 && e.clientY < 100) {
        toggleContainer.classList.add('show');
    } else {
        toggleContainer.classList.remove('show');
    }
});