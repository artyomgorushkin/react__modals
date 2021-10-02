import React from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

// BEGIN (write your solution here)
export default ({ onHide, action, item }) => {
  const formik = useFormik({
    initialValues: {
      task: '',
    },
    onSubmit: (values, { resetForm }) => {
      action(values.task);
      resetForm();
      onHide();
    },
  });

  const onClick = () => onHide();

  return (
    <Modal show className='modal-dialog' onHide={onHide}>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='modal-title h4'>Add</div>
          <button onClick={onClick} className='close' type='button'>
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
