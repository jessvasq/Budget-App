import { Container, Stack, Button} from 'react-bootstrap';
import './App.css';
import BudgetCard from './components/BudgetCard';
import AddBudget from './components/AddBudget';
import {React, useState} from 'react';
import { useBudgets } from './contexts/BudgetsContext';
import AddExpense from './components/AddExpense';


function App() {
  // We'll use React.useState to keep track of whether the modal is open or not, by default it's false/closed
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  // We'll use the useBudgets hook to get the budgets from the BudgetsContext
  const {budgets, getBudgetsExpenses} = useBudgets();

  //keep track to see if the add expense modal is open or not
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  //keep track of the budget id that we're adding an expense to
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();

  const OpenAddExpenseModal = (budgetId) => {
    //set the state of showAddExpenseModal to true, which will open the modal
    setShowAddExpenseModal(true);
    //set the state of addExpenseBudgetId to the budgetId that we're adding an expense to
    setAddExpenseBudgetId(budgetId);
  }

  return(
  <>
  <Container className='my-4'> 
    <Stack direction='horizontal' gap='2' className='mb-4'>
      <h1 className='me-auto'> Budgets </h1>  
      {/* onClick function will set the state of showAddBudgetModal to true, which will open the modal, so that whenever we click on the show modal we'll see the pop-up to add a new budget */}
      <Button variant='primary' onClick={()=> setShowAddBudgetModal(true)}> Add Buget </Button>
      {/*this button will open the add expense modal with the uncategorized budget as default */}
      <Button variant='outline-primary' onClick={OpenAddExpenseModal}> Add Expense </Button>
    </Stack>


    <div id = "grid-container">
      {/* TO-DO: Create a separate component for the BudgetCard */}
      {/* we'll loop through the budgets array and render a BudgetCard for each budget */}
      {budgets.map(budget => {
        //this function will take all the expenses, add all the amounts together, and return the total amount of expenses for a specific budget/category
        const amount = getBudgetsExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)

        return(
        <BudgetCard 
          name={budget.name} 
          amount={0} 
          max={budget.max}
          //we'll pass in the budget id to the OpenAddExpenseModal function
          OpenAddExpenseModal={() => OpenAddExpenseModal(budget.id)}
        /> 
        )
      })
        };
      
    </div>
  </Container>
  {/* By default, the budget and expense modals are closed, so we won't see it until we click on the buttons to open it */}
  <AddBudget 
  show={showAddBudgetModal} 
  handleClose={() => setShowAddBudgetModal(false)}/>
  <AddExpense 
  show={showAddExpenseModal} 
  defaultBudgetId= {addExpenseBudgetId} 
  handleClose={() => setShowAddExpenseModal(false)}/>
  </>
  )
}

export default App;
