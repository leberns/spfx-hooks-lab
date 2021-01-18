import * as React from 'react';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { ITodoItem } from './ITodoItem';

export default function TodoList() {
  const initialTodos = () => {
    const persistedTodos: ITodoItem[] = JSON.parse(window.localStorage.getItem('todos')) || [];
    return persistedTodos;
  };

  const [text, updateText] = useState('');
  const [priority, updatePriority] = useState(1);
  const [todos, updateTodos] = useState(initialTodos);
  const [countTodos, updateCountTodos] = useState(0);
  const [countPendingITems, updateCountPendingITems] = useState(0);
  const textRef = useRef<HTMLInputElement>();

  const updateStats = () => {
    updateCountTodos(todos.length);
    updateCountPendingITems(todos.filter(i => !i.isDone).length);
    console.log(`Count of pending items: ${countPendingITems}, total: ${countTodos}`);
  };

  useEffect(() => {
    const todosPersist = JSON.stringify(todos);
    window.localStorage.setItem('todos', todosPersist);
    console.log(todosPersist);
    updateStats();
  }, [todos]);

  const addItem = () => {
    if (text.trim().length === 0) {
      textRef.current.focus();
      return;
    }

    const item: ITodoItem = {
      id: Date.now(),
      text: text,
      priority: priority,
      isDone: false,
    };

    const newTodos = JSON.parse(JSON.stringify(todos));
    newTodos.push(item);
    const newTodosOrdered = newTodos.sort((a: ITodoItem, b: ITodoItem) =>
      (a.priority >= b.priority ? 1 : -1));
    updateTodos(newTodosOrdered);

    updateText('');
    updatePriority(1);
  };

  const setDone = (todo: ITodoItem) => {
    updateTodos(prevTodos =>
      prevTodos.map(t =>
        todo.id === t.id ? { ...todo, isDone: !todo.isDone } : t
      ));
  };

  const removeDone = () => {
    const pendingTodos = todos.filter((todoItem) => !todoItem.isDone);
    updateTodos(pendingTodos);
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => updateText(e.target.value);
  const onChangePriority = (e: ChangeEvent<HTMLInputElement>) => updatePriority(+e.target.value);
  const onClickAdd = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    addItem();
  };
  const onClickDone = (todo: ITodoItem) => setDone(todo);
  const onClickRemoveDone = () => removeDone();

  return (
    <section>
      <div>
        <span>Prio: </span>
        <input
          type="number"
          value={priority}
          onChange={onChangePriority}
        ></input>
      </div>
      <div>
        <span>Text: </span>
        <input
          type="text"
          value={text}
          ref={textRef}
          onChange={onChangeText}
        ></input>
      </div>
      <button onClick={onClickAdd.bind(this)}>Add</button>
      <button onClick={onClickRemoveDone.bind(this)}>Remove Done</button>
      <div>
        {todos.map(todo => (
          <div key={todo.id} onClick={onClickDone.bind(this, todo)}>
            <span>{todo.isDone ? 'Done ' : 'To do'}</span>
            <span> | </span>
            <span>{todo.priority}</span>
            <span> | </span>
            <span>{todo.text}</span>
          </div>
        ))}
      </div>
      <div>There are still {countPendingITems} item(s) pending from a total of {countTodos}</div>
    </section>
  );
}
