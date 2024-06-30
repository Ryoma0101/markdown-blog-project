document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');

    function fetchPosts() {
        fetch('http://localhost:5001/api/posts')
            .then(response => response.json())
            .then(posts => {
                postsContainer.innerHTML = '';
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post';
                    postElement.innerHTML = `
                        <div class="post-content">${marked.parse(post.content)}</div>
                        <button class="edit-button" data-id="${post._id}">編集</button>
                        <button class="delete-button" data-id="${post._id}">削除</button>
                    `;
                    postsContainer.appendChild(postElement);
                });
                addEditListeners();
                addDeleteListeners();
            })
            .catch(error => console.error('Error:', error));
    }

    function addEditListeners() {
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const postId = e.target.getAttribute('data-id');
                const postContent = e.target.previousElementSibling.textContent;
                const newContent = prompt('投稿を編集:', postContent);
                if (newContent !== null) {
                    updatePost(postId, newContent);
                }
            });
        });
    }

    function addDeleteListeners() {
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const postId = e.target.getAttribute('data-id');
                if (confirm('本当にこの投稿を削除しますか？')) {
                    deletePost(postId);
                }
            });
        });
    }

    function updatePost(id, content) {
        fetch(`http://localhost:5001/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: content }),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            fetchPosts();  // 投稿を再取得して表示を更新
        })
        .catch(error => console.error('Error:', error));
    }

    function deletePost(id) {
        fetch(`http://localhost:5001/api/posts/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            fetchPosts();  // 投稿を再取得して表示を更新
        })
        .catch(error => console.error('Error:', error));
    }

    fetchPosts();  // 初期表示時に投稿を取得
});