import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

// BEGIN (write your solution here)
export default (show, handler, action, task) => {
  const handleClose = () => handler();
  const formik = useFormik({
    initialValues: {
      task: '',
    },
    onSubmit: (values, { resetForm }) => {
      action(values.task);
      resetForm();
      handler(false);
    },
  });

  return (
    <Modal show={show} className='modal-dialog'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='modal-title h4'>Rename</div>
          <button onClick={handleClose} className='close' type='button'>
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
