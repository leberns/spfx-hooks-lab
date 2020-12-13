import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { ITodoItem } from './ITodoItem';

export default function TodoList() {
  const [text, updateText] = useState('');
  const [priority, updatePriority] = useState(1);
  const [todos, updateTodos] = useState([] as ITodoItem[]);

  const addItem = () => {
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

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => updateText(e.target.value);
  const onChangePriority = (e: ChangeEvent<HTMLInputElement>) => updatePriority(+e.target.value);
  const onClickAdd = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    addItem();
  };
  const onClickDone = (todo: ITodoItem) => setDone(todo);

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
          onChange={onChangeText}
        ></input>
      </div>
      <button onClick={onClickAdd.bind(this)}>Add</button>
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
    </section>
  );
}
