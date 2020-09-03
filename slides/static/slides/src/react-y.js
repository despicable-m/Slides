const items = [
    { id: 1, name:'Taco Seasoning', price:2.25, qty:2},
    { id: 2, name:'Pinto Beans', price:1.99, qty:3},
    { id: 3, name:'Sour Cream', price:3.50, qty:1}
]

const Dog = () => {
    return (
    <div>
        <h1>I am a dog {1+5}</h1>
        <hr/>
        <h2>Woof woof </h2>
    </div>
    )
}

const RandomNum = () => {
    const num = Math.random() * 10
    return (
        <div>
            <h1>Your number is: {num} </h1>
            <h2>{num > 5 ? "Big" : "Small"} number</h2>
        </div>
    
    )
}

function Greeter({name, age, inlove}) {
    const greet = () => {
        alert(`Hello there, ${name}`)
    }
    return (
    <div>
        <h1>Hi there, {name} {age} {inlove}</h1>
        <button onClick={greet}>Click Me</button>
    </div>
    )
}

function Counter({step = 1}) {
    const [count, setCount] = React.useState(0);
    const [isHappy, setIsHappy] = React.useState(true)
    const toggleIsHappy = () => setIsHappy(!isHappy)
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + step)}>
          Count
        </button>
        <h3 onClick={toggleIsHappy}>{isHappy ? ":)" : ":(" }</h3>
      </div>
    );
  }

function CartItem({ id, name, price, qty, updateQty }) {
    const addOne = () => {
        updateQty(id, qty + 1)
    }
    const subtractOne = () => {
        updateQty(id, qty - 1)
    }
    return (
        <div className="CartItem">
            <div>{name}</div>
            <div>${price}</div>
            <button onClick={subtractOne} disabled={qty < 1}>-</button>
            <div>{qty}</div>
            <button onClick={addOne}>+</button>
            <div>Total: {qty * price}</div>
        </div>
    )
}

function Cart({ items }) {
    const initialState = window.localStorage.getItem('goods');
    // This is wrong
    const [goods, setItems] = React.useState(items || initialState);
    const [count, setCount] = React.useState(1)
    React.useEffect(() => {
        window.localStorage.setItem('goods', JSON.stringify(goods));
    }, [goods])

    const updateQty = (id, newQty) => {
        const newItems = goods.map(item => {
            if (item.id === id) {
                return {...item, qty: newQty}
            }
            return item;
        })
        setItems(newItems)
    }

    const grandTotal = goods.reduce((total, item) => (
        total + item.qty * item.price
    ), 0).toFixed(2);
    return (
        <div>
            <button onClick={() => setCount(count +1)}>{count}</button>
            <h1>I AM CART</h1>
            <div className="Cart-Items">
                {goods.map(item => (
                    <CartItem key={item.id} updateQty={updateQty} {...item}/>
                ))}
            </div>
            <h2>Grand Total: ${grandTotal}</h2>
        </div>
    )
}


const App = () => {
    return (
        <div>
            <Cart items={items}/>
            <Counter step={5}/>
            <Counter/>
            <Dog/>
            <RandomNum/>
            <Greeter name="Abena" age={24} inlove="yes"/>
        </div>
    )
}

ReactDOM.render(<App/>, document.querySelector('#root'))