document.getElementById('random-link').addEventListener('click', function() {
    fetch('/docs/zh/articles/pages.json')
        .then(response => response.json())
        .then(pages => {
            if (pages.length > 0) {
                const randomPage = pages[Math.floor(Math.random() * pages.length)];
                const baseUrl = window.location.origin; // 获取当前页面的基础 URL
                const relativePath = randomPage.replace('/docs/zh/articles/', ''); // 去掉 /docs/zh/articles/ 部分
                const newUrl = `${baseUrl}/docs/zh/index.html#/./articles/${relativePath}`;
                window.location.href = newUrl;
            } else {
                alert('没有找到文章');
            }
        })
        .catch(error => {
            console.error('Error fetching pages:', error);
        });
});