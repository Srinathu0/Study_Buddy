document.getElementById('question-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let formData = new FormData(this);

    fetch('/generate', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('questions-output').innerText = data.questions;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
