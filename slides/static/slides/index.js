document.addEventListener('DOMContentLoaded', function () {
    // Gets csrftoken
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var _i = 0; _i < cookies.length; _i++) {
                var cookie = cookies[_i].trim();
                if (cookie.substring(0, name.length + 1) === name + '=') {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    // Course
    var course = document.querySelectorAll('.container-courses')
    course.forEach(course => {
        course.onclick = () => {
            var id = course.dataset.course_id
            fetch(`/fetch/document`, {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    id: id
                })
            }).then(function (response) {
                return response.json();
            }).then(function (json) {console.log(json)});
        }
    })

        

});