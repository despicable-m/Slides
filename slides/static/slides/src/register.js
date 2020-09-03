document.addEventListener('DOMContentLoaded', function () {
    // Gets csrftoken
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');

    // Gets info from database
    let uni = document.querySelector('#university')
    let sch = document.querySelector('#school')
    let pro = document.querySelector('#program')
    let lvl = document.querySelector('#level')

    // School
    uni.addEventListener('change', () => {
        if (uni.value != "") {
            fetch("/register", {
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify({
                        id: uni.value,
                        opt: "uni"
                    })
                })
                .then(response => response.json())
                .then(json => change(json["schools"], "uni"))

        }

    })

    // Programs
    sch.addEventListener('change', () => {
        if (sch.value != "") {
            fetch("/register", {
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify({
                        id: sch.value,
                        opt: "sch"
                    })
                })
                .then(response => response.json())
                .then(json => change(json["programs"], "sch"))

        }

    })

    // Level
    pro.addEventListener('change', () => {
        if (pro.value != "") {
            fetch("/register", {
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify({
                        id: pro.value,
                        opt: "pro"
                    })
                })
                .then(response => response.json())
                .then(json => change(json["levels"], "lvl"))
        }
    })

    function change(data, opt) {
        if (opt === "uni") {
            for (i = 0; sch.length > 1; i++) {
                sch.remove(sch.length - 1)
            }

            for (const key of Object.keys(data)) {
                var option = document.createElement("option")
                option.value = key
                option.text = data[key]
                sch.add(option)
            }
        }
        
        else if (opt === "sch") {
            for (i = 0; pro.length > 1; i++) {
                pro.remove(pro.length - 1)
            }

            for (const key of Object.keys(data)) {
                var option = document.createElement("option")
                option.value = key
                option.text = data[key]
                pro.add(option)
            }
        }
        else if (opt === "lvl") {
            for (i = 0; lvl.length > 1; i++) {
                lvl.remove(lvl.length - 1)
            }

            for (const key of Object.keys(data)) {
                var option = document.createElement("option")
                option.value = key
                option.text = data[key]
                lvl.add(option)
            }            
        }
    }
})