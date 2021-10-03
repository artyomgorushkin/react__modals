// @ts-check

import React, { useState, useEffect } from 'react';
// import { useImmer } from 'use-immer';
import _ from 'lodash';
import getModal from './modals/index.js';
import { v4 as uuidv4 } from 'uuid';

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
    const [state, setState] = useState([]);
    const [modalInfo, setModalInfo] = useState({ type: null, item: null });

    useEffect(() => {
        const taskslist = localStorage.getItem('tasks')
            ? JSON.parse(localStorage.getItem('tasks'))
            : [{ id: uuidv4(), text: 'first_task' }];

        setState([...taskslist]);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state));
    }, [state]);

    const addTaskAction = (task) => {
        setState((prevState) => [...prevState, { id: uuidv4(), text: task }]);
    };

    const renameTaskAction = (id, text) =>
        setState((state) =>
            state.map((item) => (item.id !== id ? item : { id, text }))
        );

    const removeTaskAction = (id) =>
        setState((state) => state.filter((item) => item.id !== id));

    const addTaskHandler = () => setModalInfo({ type: 'adding', item: null });

    const renameModalHandler = (item) =>
        setModalInfo({ type: 'renaming', item });

    const removeModalHandler = (item) =>
        setModalInfo({ type: 'removing', item });

    const hideModal = () => setModalInfo({ type: null, item: null });

    const actionMapping = {
        adding: addTaskAction,
        renaming: renameTaskAction,
        removing: removeTaskAction,
    };

    const renderModal = ({ type, item }, hideModal) => {
        if (!type) return null;

        const Component = getModal(type);
        return (
            <Component
                onHide={hideModal}
                action={actionMapping[type]}
                task={item}
            />
        );
    };

    return (
        <div className='mb-3'>
            <button
                onClick={addTaskHandler}
                data-testid='item-add'
                className='btn btn-secondary'
            >
                add
            </button>
            {state.length > 0 &&
                state.map((item) => {
                    return (
                        <Task
                            key={item.id}
                            props={{
                                item,
                                renameModalHandler,
                                removeModalHandler,
                            }}
                        />
                    );
                })}
            {renderModal(modalInfo, hideModal)}
        </div>
    );
};

export default App;
