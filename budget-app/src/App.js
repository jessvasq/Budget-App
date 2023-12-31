import { Container, Stack, Button} from 'react-bootstrap';
import './App.css';
import './index.css';
import BudgetCard from './components/BudgetCard';
import AddBudget from './components/AddBudget';
import {React, useState} from 'react';
import { uncategorizedBudgetId, useBudgets } from './contexts/BudgetsContext';
import AddExpense from './components/AddExpense';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpenses from './components/ViewExpenses';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  // We'll use React.useState to keep track of whether the modal is open or not, by default it's false/closed
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  // We'll use the useBudgets hook to get the budgets from the BudgetsContext
  const {budgets, getBudgetsExpenses} = useBudgets();

  //keep track to see if the add expense modal is open or not
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  //keep track of the budget id that we're adding an expense to
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();

  const [viewExpensesBudgetId, setViewExpensesBudgetId] = useState();

  //date 
  const [startDate, setStartDate] = useState(null);

  const OpenAddExpenseModal = (budgetId) => {
    //set the state of showAddExpenseModal to true, which will open the modal
    setShowAddExpenseModal(true);
    //set the state of addExpenseBudgetId to the budgetId that we're adding an expense to
    setAddExpenseBudgetId(budgetId);
  }

  return(
  <div id='body1'>
  <Container> 
    <Stack direction='horizontal' gap='2' className='mb-4'>
      
      <div id='date'  className='me-auto' >
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} 
      dateFormat="MMMM, yyyy"
      placeholderText='Select Month'
      owMonthYearPicker
       />
      </div>
    </Stack>

    <div  className='p-5'>
    <TotalBudgetCard/>
    </div>

    <div id = "grid-container">
      {/* TO-DO: Create a separate component for the BudgetCard */}
      {/* we'll loop through the budgets array and render a BudgetCard for each budget */}
      {budgets.map(budget => {
        //this function will take all the expenses, add all the amounts together, and return the total amount of expenses for a specific budget/category
        const amount = getBudgetsExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)

        return(  

        <BudgetCard 
        //we need to pass in the budget id so that we can open the view expenses modal for a specific budget      
          key={budget.id}
          name={budget.name} 
          //we'll pass in the amount of expenses for a specific budget
          amount={amount} 
          max={budget.max}
          //this function will open the add expense modal with the budget id as default
          onAddExpenseClick={() => OpenAddExpenseModal(budget.id)}
          // this function will open the view expenses modal with the budget id as default
          onViewExpenseClick ={() => setViewExpensesBudgetId(budget.id)}
        /> 
        )
      })
        }
      {/* onAddExpenseClick will open the popup 'add expense' modal with the uncategorized budget as default */}
       {/*this function will open the view expenses modal with the uncategorized budget as default */}
     <UncategorizedBudgetCard 
     onAddExpenseClick={OpenAddExpenseModal}
     onViewExpenseClick={() => setViewExpensesBudgetId(uncategorizedBudgetId)}
     />
  

      
    </div>
    <Stack direction='horizontal' gap='2' className='mt-5 d-flex justify-content-center p-3'>
      {/* onClick function will set the state of showAddBudgetModal to true, which will open the modal, so that whenever we click on the show modal we'll see the pop-up to add a new budget */}
      <Button id='bttn-category'className='p-3' variant='primary' onClick={()=> setShowAddBudgetModal(true)}> Add Category </Button>
      {/*this button will open the add expense modal with the uncategorized budget as default */}
      <Button id='bttn-category' className='p-3' variant='outline-primary' onClick={OpenAddExpenseModal}> Add Expense </Button>
    </Stack>

  </Container>
  {/* By default, the budget and expense modals are closed, so we won't see it until we click on the buttons to open it */}
  <AddBudget 
  show={showAddBudgetModal} 
  handleClose={() => setShowAddBudgetModal(false)}/>

  <AddExpense 
  show={showAddExpenseModal} 
  defaultBudgetId= {addExpenseBudgetId} 
  handleClose={() => setShowAddExpenseModal(false)}/>

  <ViewExpenses 
    budgetId={viewExpensesBudgetId} 
    handleClose={() => setViewExpensesBudgetId()}/>

  </div>

  )
}

export default App;
