// @ts-check

import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import getModal from './modals/index.js';

const task = (task) => (
  <div>
    <span className='mr-3'>{task}</span>
    <button type='button' className='border-0 btn-link p-0 mr-3' data-testid='item-rename'>
      rename
    </button>
    <button type='button' className='border-0 btn-link p-0' data-testid='item-remove'>
      remove
    </button>
  </div>
);

const App = () => {
  const [state, setState] = useState(['kill bill', 'make tea']);

  const addTaskHandler = () => {
    setState([...state, 'sleep']);
  }

  return (
    <div className='mb-3'>
      <button onClick={addTaskHandler} data-testid='item-add' className='btn btn-secondary'>
        add
      </button>
      {state.map((item) => task(item))}
      {getModal('adding')()}
    </div>
  );
}
// END
export default App;
