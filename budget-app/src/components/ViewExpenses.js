import {React} from 'react';
import { Modal, Button, Stack } from 'react-bootstrap';
import { uncategorizedBudgetId, useBudgets } from '../contexts/BudgetsContext';
import { currencyFormatter } from '../utils';



export default function ViewExpenses({ budgetId, handleClose }) {
    const { getBudgetsExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

    const expenses = getBudgetsExpenses(budgetId)

    //this function will check for the budgetId and if it's uncategorized, we'll return the id of the uncategorized budget. If it's not uncategorized, we'll return the budgetId
    const budget = uncategorizedBudgetId === budgetId ? { name: 'uncategorized', id: budgetId } : budgets.find(b => b.id === budgetId);

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {/* if the budgetId is uncategorized, we'll return 'uncategorized'. If it's not uncategorized, we'll return the name of the budget */}
                        <Stack direction='horizontal' gap='2'>
                            <div>Expenses - {budget?.name}</div>

                            {budgetId !== uncategorizedBudgetId && (
                                <Button onClick={() => {
                                    deleteBudget(budget)
                                    handleClose()}}
                                    variant='outline-danger'>Delete</Button>
                            )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction='vertical' gap='3'>
                        {expenses.map(expense => (
                            <Stack direction='horizontal' gap='2' key={expense.id}>
                                <div className='me-auto fs-4'>{expense.description}</div>
                                <div className='fs-5'>{currencyFormatter.format(expense.amount)}</div>
                                <Button onClick={() => deleteExpense(expense)} size='sm' variant='outline-danger'>
                                    &times;
                                </Button>
                            </Stack>
                        ))}
                    </Stack>
                </Modal.Body>
        </Modal>
  )
};
