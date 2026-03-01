// Load codes.html inside index
fetch("codes.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("codeList").innerHTML = data;
        initFunctions();
    });

function initFunctions() {

    // Accordion
    const headers = document.querySelectorAll('.code-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.code-content');

            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    const codeItems = document.querySelectorAll('.code-item');
    const noResults = document.getElementById('noResults');

    searchInput.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        let hasVisible = false;

        codeItems.forEach(item => {
            const title = item.querySelector('.code-header span').textContent.toLowerCase();
            const code = item.querySelector('code').textContent.toLowerCase();

            if (title.includes(term) || code.includes(term)) {
                item.style.display = 'block';
                hasVisible = true;
            } else {
                item.style.display = 'none';
            }
        });

        noResults.style.display = hasVisible ? 'none' : 'block';
    });
}

// Copy button (global)
function copyCode(e, btn) {
    e.stopPropagation();
    const codeBlock = btn.closest('.code-item').querySelector('code').innerText;

    navigator.clipboard.writeText(codeBlock).then(() => {
        btn.innerText = "Copied!";
        setTimeout(() => btn.innerText = "Copy", 2000);
    });
}