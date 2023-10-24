import {React} from 'react';
import { Modal, Button, Stack } from 'react-bootstrap';
import { uncategorizedBudgetId, useBudgets } from '../contexts/BudgetsContext';
import { currencyFormatter } from '../utils';



export default function ViewExpenses({ budgetId, handleClose }) {
    const { getBudgetsExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();
    //we'll get the expenses for a specific budget by calling the getBudgetsExpenses function and passing in the budgetId
    const expenses = getBudgetsExpenses(budgetId)

    //this function will check for the budgetId and if it's uncategorized, we'll return the id of the uncategorized budget. If it's not uncategorized, we'll return the budgetId
    const budget = uncategorizedBudgetId === budgetId ? { name: 'uncategorized', id: budgetId } : budgets.find(b => b.id === budgetId);

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {/* if the budgetId is uncategorized, we'll return 'uncategorized'. If it's not uncategorized, we'll return the name of the budget */}
                        <Stack direction='horizontal' gap='2'>
                            <div> VIEW EXPENSES - {budget?.name}</div> <br/>
                           
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* we'll loop through the expenses array and render a Stack for each expense. */ }
                    <Stack direction='vertical' gap='3'>
                        {expenses.map(expense => (
                            <Stack direction='horizontal' gap='2' key={expense.id}>
                                <div id='expenses-desc' className='me-auto'>{expense.description}</div>
                                <div className='fs-5'>{currencyFormatter.format(expense.amount)}</div>
                                {/* we'll add an onClick function to the delete button that will call the deleteExpense function and pass in the expense */}
                                <Button onClick={() => deleteExpense(expense)} size='sm' variant='outline-danger'>
                                    &times;
                                </Button>
                            </Stack>
                        ))}
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                <div>
                            {budgetId !== uncategorizedBudgetId && (
                                <Button id='delete-bttn' onClick={() => {
                                    deleteBudget(budget)
                                    handleClose()}}
                                    variant='danger'>Delete Category</Button>    
                            )}
                </div>
                </Modal.Footer>
        </Modal>
  )
};
