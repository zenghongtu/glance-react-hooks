import React, {useState} from 'react';

function Example() {
  const [count, setCount] = useState(0);
  var fruitStateVariable = useState('banana'); // Returns a pair
  var fruit = fruitStateVariable[0]; // First item in a pair
  var setFruit = fruitStateVariable[1]; // Second item in a pair

  return (
    <div>
      <h2>State Hook</h2>
      <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      </div>
      <div>
        <p>current fruit: {fruit}</p>
        <button onClick={()=>setFruit('apple')}>Change fruit</button>
      </div>
    </div>
  );
}

export default Example;
