import {React, useRef} from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { uncategorizedBudgetId, useBudgets } from '../contexts/BudgetsContext';

export default function AddExpense({  
    show, 
    handleClose, 
    defaultBudgetId,
 }) {
    //nameRef is a reference to the input field
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();
    const { addExpense, budgets } = useBudgets();

    const handleSubmit = (e) => {
        // Prevents page from refreshing
        e.preventDefault();

        // Add budget to the list by calling the function 'addBudget' from useBudgets and passing in the name and max as parameters
        addExpense({
                description: descriptionRef.current.value,
                //use parseFloat to convert the string to a number
                amount: parseFloat(amountRef.current.value),
                budgetId: budgetIdRef.current.value,
            })
        // whenever we submit, we'll close the modal
            handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title> Add Expense </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* We'll use Form to add Expense */}
                    <Form.Group className = 'mb-3' controlId='description'>
                        <Form.Label> Description </Form.Label>
                        {/* User's input */}
                        <Form.Control ref= {descriptionRef} type='text' placeholder='Enter description' required />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label> Amount </Form.Label>
                        <Form.Control ref= {amountRef} type='number' placeholder='Enter amount' requiredmin={0} step={0.01}/>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='budgetId'>
                        <Form.Label> Budget </Form.Label>
                        <Form.Select defaultValue={defaultBudgetId} ref= {budgetIdRef}>
                            {/* we'll add an option for uncategorized expenses */}
                            <option id={uncategorizedBudgetId}>uncategorized</option>

                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className='d-flex justify-content-end'>
                        <Button id='card-bttn'  variant='primary' type='submit'> Add Expense </Button>
                        <Button variant='secondary' onClick={handleClose}> Cancel </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
  )
};
