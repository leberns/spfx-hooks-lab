import * as React from 'react';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { ITodoItem } from './ITodoItem';

type StorageReturnType =
  [ITodoItem[], (v: ITodoItem[]) => void, () => void, (item: ITodoItem) => void];

function useStorage(key: string, persistedCallback: (v: ITodoItem[]) => void): StorageReturnType {

  const initializeStorage = () => {
    const persistedValue: ITodoItem[] = JSON.parse(window.localStorage.getItem(key)) || [];
    return persistedValue;
  };

  const [storageValue, setStorageState] = useState(initializeStorage);

  function setStorage(v: ITodoItem[]) {
    setStorageState(v);
  }

  function clearStorage() {
    setStorageState([]);
  }

  useEffect(() => {
    const persistValue = JSON.stringify(storageValue);
    window.localStorage.setItem(key, persistValue);
    console.log(persistValue);
    if (persistedCallback) {
      persistedCallback(storageValue);
    }
  }, [storageValue]);

  const setDone = (item: ITodoItem) => {
    setStorageState(prevItems =>
      prevItems.map(t =>
        item.id === t.id ? { ...item, isDone: !item.isDone } : t
      ));
  };

  return [storageValue, setStorage, clearStorage, setDone];
}

export default function TodoList() {

  const [countItems, setCountItems] = useState(0);
  const [countPendingITems, setCountPendingItems] = useState(0);
  const updateStats = (items: ITodoItem[]) => {
    setCountItems(items.length);
    const countPending = items.filter(i => !i.isDone).length;
    setCountPendingItems(countPending);
    console.log(`Count of pending items: ${countPendingITems}, total: ${countItems}`);
  };

  const [todos, setTodos, clearTodos, setDone] = useStorage('todos', updateStats);
  const textRef = useRef<HTMLInputElement>();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(1);

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
    setTodos(newTodosOrdered);

    setText('');
    setPriority(1);
  };

  const removeDone = () => {
    const pendingTodos = todos.filter((todoItem) => !todoItem.isDone);
    setTodos(pendingTodos);
  };


  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const onChangePriority = (e: ChangeEvent<HTMLInputElement>) => setPriority(+e.target.value);
  const onClickAdd = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    addItem();
  };
  const onClickDone = (todo: ITodoItem) => setDone(todo);
  const onClickRemoveDone = () => removeDone();
  const onClickRemoveAll = () => clearTodos();

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
      <button onClick={onClickRemoveAll.bind(this)}>Remove All</button>
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
      <div>There are still {countPendingITems} item(s) pending from a total of {countItems}</div>
    </section>
  );
}
