function loadPage(page) {
    const contentArea = document.getElementById('content-area');
    fetch(page)
        .then(response => response.text())
        .then(html => {
            contentArea.innerHTML = html;
        })
        .catch(error => {
            contentArea.innerHTML = '<h2>Error loading page</h2><p>Please try again later.</p>';
        });
}

// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    const mainContent = document.querySelector('.main-content');

    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        mainContent.innerHTML = `
            <div class="modal-overlay" id="signup-overlay">
                <div class="modal-content">
                    <button class="close-modal" id="close-modal">&times;</button>
                    <iframe src="signup.html" frameborder="0"></iframe>
                </div>
            </div>
        `;
        document.body.classList.add('modal-open');
        document.getElementById('close-modal').addEventListener('click', () => {
            document.body.classList.remove('modal-open');
            mainContent.innerHTML = `
                <nav class="side-nav">
                    <ul>
                        <li><a href="content/question-paper.html" target="content-frame">Question Paper</a></li>
                        <li><a href="content/get-questions.html" target="content-frame">Get Questions</a></li>
                        <li><a href="content/text-summarization.html" target="content-frame">Text Summarization</a></li>
                        <li><a href="content/developers.html" target="content-frame">Developers</a></li>
                        <li><a href="content/extract-text.html" target="content-frame">Extract Text</a></li>
                    </ul>
                </nav>
                <iframe class="content-area" name="content-frame" src="home.html"></iframe>
            `;
        });
    });
});


