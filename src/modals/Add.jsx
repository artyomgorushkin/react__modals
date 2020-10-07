import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

// BEGIN (write your solution here)
export default (show, handler, action) => {
  const handleClose = () => handler();

  const formik = useFormik({
    initialValues: {
      task: ''
    },
    onSubmit: (values, { resetForm }) => {
      action(values.task);
      resetForm();
    },
  })

  return (
    <Modal show={show} className='modal-dialog'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='modal-title h4'>Add</div>
          <button onClick={handleClose} className='close' type='button'>
            <span aria-hidden='true'>×</span>
            <span className='sr-only'>Close</span>
          </button>
        </div>
        <div className='modal-body'>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup className='form-group'>
              <FormControl
                className='form-control'
                data-testid='input-body'
                name='task'
                onChange={formik.handleChange}
                value={formik.values.task}
                required
              />
            </FormGroup>
            <input className='btn btn-primary' type='submit' value='submit' />
          </form>
        </div>
      </div>
    </Modal>
  );
};
// END
