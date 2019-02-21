import React, {useState, useEffect} from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
  useEffect(() => {
      document.title = `You clicked ${count} times`;
      return () => {
        console.log('call clean up');
      }
    },
    [count] // Only re-run the effect if count changes
  );

  return (
    <div>
      <h2>Effect Hook</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Example;
