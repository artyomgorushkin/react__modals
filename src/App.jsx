// @ts-check

import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import getModal from './modals/index.js';

const task = (task, renameHandler, removeHandler) => (
  <div>
    <span className='mr-3'>{task}</span>
    <button
      onClick={renameHandler}
      type='button'
      className='border-0 btn-link p-0 mr-3'
      data-testid='item-rename'
    >
      rename
    </button>
    <button
      onClick={removeHandler}
      type='button'
      className='border-0 btn-link p-0'
      data-testid='item-remove'
    >
      remove
    </button>
  </div>
);

const App = () => {
  const [state, setState] = useState(['kill bill', 'make tea']);
  const [name, setName] = useState('adding');
  const [show, setShow] = useState(false);

  const addTaskHandler = () => {
    setName('adding');
    setShow(true);
  };

  const renameHandler = () => {
    setShow(true);
    setName('renaming');
  };

  const removeHandler = () => {
    setName('removing');
    setShow(true);
  };

  const closeHandler = () => {
    setShow(false);
  };

  return (
    <div className='mb-3'>
      <button onClick={addTaskHandler} data-testid='item-add' className='btn btn-secondary'>
        add
      </button>
      {state.map((item) => task(item, renameHandler, removeHandler))}
      {getModal(name)(show, closeHandler)}
    </div>
  );
};

export default App;