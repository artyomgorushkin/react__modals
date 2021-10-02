// @ts-check

import React, { useState } from 'react';
// import { useImmer } from 'use-immer';
import _ from 'lodash';
import getModal from './modals/index.js';

const Task = ({ props: { item, renameModalHandler, removeModalHandler } }) => {
  const onRenameClickHandler = () => {
    renameModalHandler(item);
  };

  const onRemoveClickHandler = () => {
    removeModalHandler(item);
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
        onClick={onRemoveClickHandler}
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
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  // const [currentTask, setCurrentTask] = useState(null);
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });

  const addTaskAction = (task) => {
    setState([...state, { text: task, id: _.uniqueId() }]);
    // setShow(false);
  };

  const renameTaskAction = (id, text) => {
    setState((state) => state.map((item) => (item.id !== id ? item : { id, text })));
  };

  const removeTaskAction = (id, text) => {
    console.log('removeTaskAction');
  };

  const addTaskHandler = () => setModalInfo({ type: 'adding', item: null });

  const renameModalHandler = (item) => {
    console.log('renameModalHandler');
    // setName('renaming');
  };

  const removeModalHandler = (item) => {
    console.log('removeModalHandler');
    // setName('removing');
  };

  const hideModal = () => setModalInfo({ type: null, item: null });

  const actionMapping = {
    adding: addTaskAction,
    renaming: renameTaskAction,
    removing: removeTaskAction,
  };

  const renderModal = ({ type, item }, hideModal) => {
    if (!type) return null;

    const Component = getModal(type);
    return <Component onHide={hideModal} action={actionMapping[type]} item={item} />;
  };

  return (
    <div className='mb-3'>
      <button onClick={addTaskHandler} data-testid='item-add' className='btn btn-secondary'>
        add
      </button>
      {state.map((item) => {
        return <Task props={{ item, renameModalHandler, removeModalHandler }} />;
      })}
      {renderModal(modalInfo, hideModal)}
      {name && <p>{name}</p>}
    </div>
  );
};

export default App;
