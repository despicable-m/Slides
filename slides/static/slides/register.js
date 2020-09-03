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

    // Gets info from database
    var uni = document.querySelector('#university');
    var sch = document.querySelector('#school');
    var pro = document.querySelector('#program');
    var lvl = document.querySelector('#level');

    // School
    uni.addEventListener('change', function () {
        if (uni.value != "") {
            fetch("/register", {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    id: uni.value,
                    opt: "uni"
                })
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                return change(json["schools"], "uni");
            });
        }
    });

    // Programs
    sch.addEventListener('change', function () {
        if (sch.value != "") {
            fetch("/register", {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    id: sch.value,
                    opt: "sch"
                })
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                return change(json["programs"], "sch");
            });
        }
    });

    // Level
    pro.addEventListener('change', function () {
        if (pro.value != "") {
            fetch("/register", {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    id: pro.value,
                    opt: "pro"
                })
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                return change(json["levels"], "lvl");
            });
        }
    });

    function change(data, opt) {
        if (opt === "uni") {
            for (i = 0; sch.length > 1; i++) {
                sch.remove(sch.length - 1);
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    var option = document.createElement("option");
                    option.value = key;
                    option.text = data[key];
                    sch.add(option);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        } else if (opt === "sch") {
            for (i = 0; pro.length > 1; i++) {
                pro.remove(pro.length - 1);
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(data)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _key = _step2.value;

                    var option = document.createElement("option");
                    option.value = _key;
                    option.text = data[_key];
                    pro.add(option);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        } else if (opt === "lvl") {
            for (i = 0; lvl.length > 1; i++) {
                lvl.remove(lvl.length - 1);
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Object.keys(data)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _key2 = _step3.value;

                    var option = document.createElement("option");
                    option.value = _key2;
                    option.text = data[_key2];
                    lvl.add(option);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }
});