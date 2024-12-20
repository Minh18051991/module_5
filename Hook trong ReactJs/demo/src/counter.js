import React, {useState} from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () =>{
        setCount(count + 1);
    };
    const decrement = () => {
        if(count > 0){
            setCount(count - 1);
        }
        else{
            alert("Counter cannot go below 0");
        }
    };
    return (
        <div>
            <h2>Count : {count}</h2>
            <button onClick = {increment}>Increment</button>
            <button onClick = {decrement}>Decrement</button>
        </div>
    )

}
export default Counter;