document.addEventListener("DOMContentLoaded", function(ev) {
    ev.preventDefault();
    const form = document.querySelector('.my-form');
    const commentSection = document.querySelector('.overflow');
    const textInput = document.querySelector('#textinput');

    fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        renderComment(data);
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let object = {
            comment: `${textInput.value}`,
        }
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(object)
        })
    })

    function renderComment(items) {
        items.forEach((item) => {
            let div = document.createElement('div');
            div.className = 'one-comment';
            div.innerHTML = `
                <p class="the-comment">${item.comment}</p>
                <button id="btn">Delete</button>
            `
            commentSection.appendChild(div);
            div.addEventListener('click', (e) => {
                if(e.target.id === 'btn'){
                    console.log('hello')
                    fetch(`http://localhost:3000/comments/${item.id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                }
            })
        })
    }
});
