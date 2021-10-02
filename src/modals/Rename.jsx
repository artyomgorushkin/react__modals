import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

// BEGIN (write your solution here)
export default ({ onHide, action, task }) => {
  const formik = useFormik({
    initialValues: {
      task: '',
    },
    onSubmit: (values, { resetForm }) => {
      action(task.id, values.task);
      resetForm();
      onHide();
    },
  });

  const onClick = () => onHide();

  return (
    <Modal show className='modal-dialog'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='modal-title h4'>Rename</div>
          <button onClick={onClick} className='close' type='button'>
            <span aria-hidden='true'>×</span>
            <span className='sr-only'>Close</span>
          </button>
        </div>
        <div className='modal-body'>
          <form onSubmit={formik.handleSubmit}>
            <div className='form-group'>
              <input
                className='form-control'
                data-testid='input-body'
                name='task'
                required=''
                onChange={formik.handleChange}
                value={formik.values.task || task.text}
              />
            </div>
            <input className='btn btn-primary' type='submit' value='submit' />
          </form>
        </div>
      </div>
    </Modal>
  );
};
// END
