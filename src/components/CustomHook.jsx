import React, {useState,} from 'react';

const useReducer = (reducer, initState) => {
  const [state, setState] = useState(initState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState)
  }

  return [state, dispatch];
};


function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {text: action.text, completed: false,}];
    default:
      return state;
  }
}

function Todos() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  function handleAddClick(text) {
    dispatch({type: 'add', text})
  }

  console.log(todos);
  return <div>
    <input type="text"/>
    <button onClick={(e) => {
      const value = e.target.previousElementSibling.value;
      handleAddClick(value)
    }}>Add
    </button>
    {todos.map((todo, idx) => (
      <p key={idx}>{todo.text} | <span>completed: {todo.completed ? 'true' : 'false'}</span></p>))}
  </div>
}

export default Todos;
