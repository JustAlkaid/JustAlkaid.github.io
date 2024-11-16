document.getElementById('themetoggleday').addEventListener('click', function() {
    document.body.classList.remove('night');
    document.body.classList.add('day');
});
document.getElementById('themetogglenight').addEventListener('click', function() {
    document.body.classList.remove('day');
    document.body.classList.add('night');
});