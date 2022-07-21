document.addEventListener("DOMContentLoaded", function(ev) {
    ev.preventDefault();
    const form = document.querySelector('.my-form');
    const commentSection = document.querySelector('.overflow');
    const textInput = document.querySelector('#textinput');

    fetch('https://young-dawn-44660.herokuapp.com/comments')
    .then(res => res.json())
    .then(data => renderComment(data))

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let object = {
            comment: `${textInput.value}`,
        }
        fetch('https://young-dawn-44660.herokuapp.com/comments', {
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
                    fetch(`https://young-dawn-44660.herokuapp.com/comments/${item.id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                }
            })
        })
    }
})