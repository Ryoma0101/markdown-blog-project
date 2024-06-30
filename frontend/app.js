document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const submitButton = document.getElementById('submit-button');
    const outputDiv = document.getElementById('output');

    submitButton.addEventListener('click', () => {
        const markdownText = markdownInput.value;
        const outputHtml = marked.parse(markdownText);
        outputDiv.innerHTML = outputHtml;

        fetch('http://localhost:5001/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: markdownText }),
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });
});