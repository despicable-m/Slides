// document.querySelector('DOMContentLoaded', function () {

//     // // Gets csrftoken
//     // function getCookie(name) {
//     //     let cookieValue = null;
//     //     if (document.cookie && document.cookie !== '') {
//     //         const cookies = document.cookie.split(';');
//     //         for (let i = 0; i < cookies.length; i++) {
//     //             const cookie = cookies[i].trim();
//     //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//     //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//     //                 break;
//     //             }
//     //         }
//     //     }
//     //     return cookieValue;
//     // }
//     // const csrftoken = getCookie('csrftoken');

//     document.querySelectorAll('.levels').forEach(level => {
//         level.onclick = () => {
//             let id = level.dataset.id
//             console.log(id)
//             // fetch("/index", {
//             //     method: "POST",
//             //     credentials: 'same-origin',
//             //     headers: {
//             //         'Accept': 'application/json',
//             //         'X-Requested-With': 'XMLHttpRequest',
//             //         'X-CSRFToken': csrftoken,
//             //     },
//             //     body: JSON.stringify({
//             //         id: id
//             //     })
//             // })
//             // .then(response => response.json())
//             // .then(json => console.log(json))
//         }
//     })
// })

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#year').addEventListener('click', function () {
        console.log('fuck you')
    })
    // document.querySelectorAll('.levels').forEach(link => {
    //     link.addEventListener('click', function () {
    //         let id = link.dataset.id
    //         console.log(id)
    //     })
    // })
})