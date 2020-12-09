import * as React from 'react';
import { useState } from 'react';

export default function FormEditor() {
  const [state, setState] = useState({ text: 'hallo', checked: false });

  const updateState = partialState => setState(prevState => ({ ...prevState, ...partialState }));
  const onChangeText = (e) => updateState({ text: e.target.value });

  return (
    <section>
      <h2>Edit Form</h2>
      <input
        type='text'
        value={state.text}
        onChange={onChangeText}
      ></input>
      <h2>Display</h2>
      <span>text: </span>
      <span>{state.text}</span>
    </section>
  );
}
