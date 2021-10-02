import React from 'react';
import { Modal } from 'react-bootstrap';

export default ({ onHide, action, task }) => {
  const onClick = () => onHide();

  const onRemoveClickHandler = () => {
    action(task.id);
    onHide();
  };

  return (
    <Modal show className='modal-dialog'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='modal-title h4'>Remove</div>
          <button onClick={onClick} className='close' type='button'>
            <span aria-hidden='true'>×</span>
            <span className='sr-only'>Close</span>
          </button>
        </div>
        <div className='modal-body'>
          <form onSubmit={action}>
            <div className='form-group'>
              <input
                className='btn btn-danger'
                onClick={onRemoveClickHandler}
                type='button'
                value='remove'
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
