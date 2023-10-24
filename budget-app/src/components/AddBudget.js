import {React, useRef} from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';



export default function AddBudget({  show, handleClose }) {
    //nameRef is a reference to the input field
    const nameRef = useRef();
    const maxRef = useRef();
    const { addBudget } = useBudgets();
    const handleSubmit = (e) => {
        // Prevents page from refreshing
        e.preventDefault();

        // Add budget to the list by calling the function 'addBudget' from useBudgets and passing in the name and max as parameters
        addBudget({
                name: nameRef.current.value,
                //use parseFloat to convert the string to a number
                max: parseFloat(maxRef.current.value),
            })
        // whenever we submit, we'll close the modal
            handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title > Add Budget </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* We'll use Form to add budget */}
                    <Form.Group className = 'mb-3' controlId='name'>
                        <Form.Label> Category </Form.Label>
                        {/* User's input */}
                        <Form.Control ref= {nameRef} type='text' placeholder='Enter category' required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='max-spending'>
                        <Form.Label> Max Spending </Form.Label>
                        <Form.Control ref= {maxRef} type='number' placeholder='Enter max' requiredmin={0} step={.01}/>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button  id='card-bttn' variant='primary' type='submit'> Add Budget </Button>
                        <Button variant='secondary' onClick={handleClose}> Cancel </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
  )
};
