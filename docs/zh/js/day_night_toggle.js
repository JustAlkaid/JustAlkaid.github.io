document.getElementById('themetoggleday').addEventListener('click', function() {
    document.body.classList.remove('night');
    document.body.classList.add('day');
    document.getElementById('theme-style').setAttribute('href', '//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css');
});

document.getElementById('themetogglenight').addEventListener('click', function() {
    document.body.classList.remove('day');
    document.body.classList.add('night');
    document.getElementById('theme-style').setAttribute('href', '//cdn.jsdelivr.net/npm/docsify/themes/dark.css');
});