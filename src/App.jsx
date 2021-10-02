// @ts-check

import React, { useState } from 'react';
// import { useImmer } from 'use-immer';
import _ from 'lodash';
import getModal from './modals/index.js';

const Task = ({ props: { item, renameModalHandler, removeModalHandler } }) => {
  const onRenameClickHandler = () => {
    renameModalHandler(item);
  };

  return (
    <div key={item.id}>
      <span className='mr-3'>{item.text}</span>
      <button
        onClick={onRenameClickHandler}
        type='button'
        className='border-0 btn-link p-0 mr-3'
        data-testid='item-rename'
      >
        rename
      </button>
      <button
        onClick={removeModalHandler}
        type='button'
        className='border-0 btn-link p-0'
        data-testid='item-remove'
      >
        remove
      </button>
    </div>
  );
};

const App = () => {
  const [state, setState] = useState([{ id: _.uniqueId(), text: 'first_task' }]);
  const [name, setName] = useState('adding');
  const [show, setShow] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const addTaskAction = (task) => {
    setState([...state, { text: task, id: _.uniqueId() }]);
    setShow(false);
  };

  const renameTaskAction = (id, text) => {
    setState((state) => state.map((item) => (item.id !== id ? item : { id, text })));
  };

  const addTaskHandler = () => {
    setName('adding');
    setShow(true);
  };

  const renameModalHandler = (item) => {
    setShow(true);
    setName('renaming');
    setCurrentTask(item);
  };

  const removeModalHandler = () => {
    // setName('removing');
    // setShow(true);
  };

  const closeHandler = () => {
    setShow(false);
  };

  const actionMapping = {
    adding: addTaskAction,
    renaming: renameTaskAction,
  };

  return (
    <div className='mb-3'>
      <button onClick={addTaskHandler} data-testid='item-add' className='btn btn-secondary'>
        add
      </button>
      {state.map((item) => {
        return <Task props={{ item, renameModalHandler, removeModalHandler }} />;
      })}
      {getModal(name)(show, closeHandler, actionMapping[name], currentTask)}
    </div>
  );
};

export default App;
