import React, { Component, useState, useEffect, useCallback, useRef, createContext, useContext, useMemo } from 'react';
// import logo from './logo.svg';
import './App.css'

let idSeq = ''

function Control(props) {
  const { addTodo } = props;
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const newText = inputRef.current.value.trim();
    idSeq = Date.now()
    if (newText === 0) {
      return;
    }

    addTodo({
      id: idSeq,
      text: newText,
      complete: false
    });

    inputRef.current.value = '';
  }
  return (
    <div className='control'>
      <h1>
        todos
      </h1>
      <form
        onSubmit={onSubmit}
      >
        <input
          type='text'
          ref={inputRef}
          className='new-todo'
          placeholder='what needs to be done?'
        />
      </form>
    </div>
  )
}

function Todos(props) {
  const { todos, toggleTodo, removeTodo } = props;
  console.log(todos, 1212)
  return (
    <ul>
      {
        todos.map((todo, idx) => {
          return <TodoItem
            key={idx}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        })
      }
    </ul>
  )
}

function TodoItem(props) {
  const {
    todo: {
      id,
      text,
      complete
    },
    toggleTodo,
    removeTodo
  } = props;
  
  const onChange = () => {
    toggleTodo(id)
  }

  const onRemove = () => {
    console.log(id, 12122)
    removeTodo(id)
  }

  return (
    <li className='todo-item'>
      <input 
      type='checkbox' 
      onChange={onChange} 
      checked={complete} 
      />
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([])

  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo])
  }, [])

  const removeTodo = useCallback((id) => {
    return todos;
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map((todo, i) => {
      return todo.id === id
        ? {
          ...todo,
          complete: !todo.complete
        } : todo;
    }))
  }, [])

  return (
    <div className='todo-list'>
      <Control addTodo={addTodo} />
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} />
    </div>
  )
}


export default TodoList;
