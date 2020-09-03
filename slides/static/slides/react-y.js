var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var items = [{ id: 1, name: 'Taco Seasoning', price: 2.25, qty: 2 }, { id: 2, name: 'Pinto Beans', price: 1.99, qty: 3 }, { id: 3, name: 'Sour Cream', price: 3.50, qty: 1 }];

var Dog = function Dog() {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'I am a dog ',
            1 + 5
        ),
        React.createElement('hr', null),
        React.createElement(
            'h2',
            null,
            'Woof woof '
        )
    );
};

var RandomNum = function RandomNum() {
    var num = Math.random() * 10;
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Your number is: ',
            num,
            ' '
        ),
        React.createElement(
            'h2',
            null,
            num > 5 ? "Big" : "Small",
            ' number'
        )
    );
};

function Greeter(_ref) {
    var name = _ref.name,
        age = _ref.age,
        inlove = _ref.inlove;

    var greet = function greet() {
        alert('Hello there, ' + name);
    };
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Hi there, ',
            name,
            ' ',
            age,
            ' ',
            inlove
        ),
        React.createElement(
            'button',
            { onClick: greet },
            'Click Me'
        )
    );
}

function Counter(_ref2) {
    var _ref2$step = _ref2.step,
        step = _ref2$step === undefined ? 1 : _ref2$step;

    var _React$useState = React.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        count = _React$useState2[0],
        setCount = _React$useState2[1];

    var _React$useState3 = React.useState(true),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        isHappy = _React$useState4[0],
        setIsHappy = _React$useState4[1];

    var toggleIsHappy = function toggleIsHappy() {
        return setIsHappy(!isHappy);
    };

    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            'You clicked ',
            count,
            ' times'
        ),
        React.createElement(
            'button',
            { onClick: function onClick() {
                    return setCount(count + step);
                } },
            'Count'
        ),
        React.createElement(
            'h3',
            { onClick: toggleIsHappy },
            isHappy ? ":)" : ":("
        )
    );
}

function CartItem(_ref3) {
    var id = _ref3.id,
        name = _ref3.name,
        price = _ref3.price,
        qty = _ref3.qty,
        updateQty = _ref3.updateQty;

    var addOne = function addOne() {
        updateQty(id, qty + 1);
    };
    var subtractOne = function subtractOne() {
        updateQty(id, qty - 1);
    };
    return React.createElement(
        'div',
        { className: 'CartItem' },
        React.createElement(
            'div',
            null,
            name
        ),
        React.createElement(
            'div',
            null,
            '$',
            price
        ),
        React.createElement(
            'button',
            { onClick: subtractOne, disabled: qty < 1 },
            '-'
        ),
        React.createElement(
            'div',
            null,
            qty
        ),
        React.createElement(
            'button',
            { onClick: addOne },
            '+'
        ),
        React.createElement(
            'div',
            null,
            'Total: ',
            qty * price
        )
    );
}

function Cart(_ref4) {
    var items = _ref4.items;

    var initialState = window.localStorage.getItem('goods');
    // This is wrong

    var _React$useState5 = React.useState(items || initialState),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        goods = _React$useState6[0],
        setItems = _React$useState6[1];

    var _React$useState7 = React.useState(1),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        count = _React$useState8[0],
        setCount = _React$useState8[1];

    React.useEffect(function () {
        window.localStorage.setItem('goods', JSON.stringify(goods));
    }, [goods]);

    var updateQty = function updateQty(id, newQty) {
        var newItems = goods.map(function (item) {
            if (item.id === id) {
                return Object.assign({}, item, { qty: newQty });
            }
            return item;
        });
        setItems(newItems);
    };

    var grandTotal = goods.reduce(function (total, item) {
        return total + item.qty * item.price;
    }, 0).toFixed(2);
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: function onClick() {
                    return setCount(count + 1);
                } },
            count
        ),
        React.createElement(
            'h1',
            null,
            'I AM CART'
        ),
        React.createElement(
            'div',
            { className: 'Cart-Items' },
            goods.map(function (item) {
                return React.createElement(CartItem, Object.assign({ key: item.id, updateQty: updateQty }, item));
            })
        ),
        React.createElement(
            'h2',
            null,
            'Grand Total: $',
            grandTotal
        )
    );
}

var App = function App() {
    return React.createElement(
        'div',
        null,
        React.createElement(Cart, { items: items }),
        React.createElement(Counter, { step: 5 }),
        React.createElement(Counter, null),
        React.createElement(Dog, null),
        React.createElement(RandomNum, null),
        React.createElement(Greeter, { name: 'Abena', age: 24, inlove: 'yes' })
    );
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));