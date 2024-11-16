document.querySelectorAll('.dropdown').forEach(function(dropdown) {
    dropdown.addEventListener('mouseenter', function() {
        clearTimeout(dropdown.hideTimeout);
        dropdown.classList.add('show');
    });
    dropdown.addEventListener('mouseleave', function() {
        dropdown.hideTimeout = setTimeout(function() {
            dropdown.classList.remove('show');
        }, 300);
    });
    dropdown.querySelector('.dropcontent').addEventListener('mouseenter', function() {
        clearTimeout(dropdown.hideTimeout);
    });
    dropdown.querySelector('.dropcontent').addEventListener('mouseleave', function() {
        dropdown.hideTimeout = setTimeout(function() {
            dropdown.classList.remove('show');
        }, 300);
    });
});