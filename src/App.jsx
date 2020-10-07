// @ts-check

import React, { useState } from 'react';
// import { useImmer } from 'use-immer';
import _ from 'lodash';
import getModal from './modals/index.js';

const task = (item, renameHandler, removeHandler) => (
  <div key={item.id}>
    <span className='mr-3'>{item.text}</span>
    <button
      onClick={renameHandler(item)}
      type='button'
      className='border-0 btn-link p-0 mr-3'
      data-testid='item-rename'
    >
      rename
    </button>
    <button
      onClick={removeHandler(item)}
      type='button'
      className='border-0 btn-link p-0'
      data-testid='item-remove'
    >
      remove
    </button>
  </div>
);

const App = () => {
  const [state, setState] = useState([
  ]);
  const [showAdding, setShowAdding] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: '', text: '' });

  const closeHandler = (func) => () => {
    func(false);
  };

  const addTaskAction = (task) => {
    setState([...state, { text: task, id: _.uniqueId() }]);
  };

  const removeTaskAction = (e) => {
    e.preventDefault();
    const updatedState = state.filter((item) => item.id !== currentTask.id);
    setState([...updatedState]);
    setShowRemove(false);
  };

  const renameAction = (name) => {
    console.log('name: ', name);
    const updatedState = state.map((item) => {
      if (item.id === currentTask.id) return { text: name, id: [item.id] };
      return item;
    });
    setState([...updatedState]);
  };

  const addTaskHandler = () => {
    setShowAdding(true);
  };

  const renameModalHandler = (item) => () => {
    setCurrentTask(item);
    setShowRename(true);
  };

  const removeModalHandler = (item) => () => {
    setShowRemove(true);
    setCurrentTask(item);
  };

  return (
    <div className='mb-3'>
      <button onClick={addTaskHandler} data-testid='item-add' className='btn btn-secondary'>
        add {currentTask.text}
      </button>
      {state.map((item) => task(item, renameModalHandler, removeModalHandler))}
      {getModal('adding')(showAdding, closeHandler(setShowAdding), addTaskAction)}
      {getModal('removing')(showRemove, closeHandler(setShowRemove), removeTaskAction)}
      {getModal('renaming')(showRename, closeHandler(setShowRename), renameAction, currentTask)}
    </div>
  );
};

export default App;
