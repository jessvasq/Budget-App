import { Container, Stack, Button} from 'react-bootstrap';
import './App.css';
import BudgetCard from './components/BudgetCard';
import AddBudget from './components/AddBudget';
import {React, useState} from 'react';
import { useBudgets } from './contexts/BudgetsContext';


function App() {
  // We'll use React.useState to keep track of whether the modal is open or not, by default it's false/closed
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  // We'll use the useBudgets hook to get the budgets from the BudgetsContext
  const {budgets, getBudgetsExpenses} = useBudgets();

  return(
  <>
  <Container className='my-4'> 
    <Stack direction='horizontal' gap='2' className='mb-4'>
      <h1 className='me-auto'> Budgets </h1>  
      {/* onClick function will set the state of showAddBudgetModal to true, which will open the modal, so that whenever we click on the show modal we'll see the pop-up to add a new budget */}
      <Button variant='primary' onClick={()=> setShowAddBudgetModal(true)}> Add Buget </Button>
      <Button variant='outline-primary'> Add Expense </Button>
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
        /> 
        )
      })
        };
      
    </div>
  </Container>
  <AddBudget show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
  </>
  )
}

export default App;
