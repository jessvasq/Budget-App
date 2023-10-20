import { Container, Stack, Button} from 'react-bootstrap';
import './App.css';
import BudgetCard from './components/BudgetCard';

function App() {
  return <Container className='my-4'> 
    <Stack direction='horizontal' gap='2' className='mb-4'>
      <h1 className='me-auto'> Budgets </h1>  
      <Button variant='primary'> Add Buget </Button>
      <Button variant='outline-primary'> Add Expense </Button>
    </Stack>
    <div id = "grid-container">
      <BudgetCard 
        name='Entertainment' 
        gray
        amount={200} 
        max={800}> 
      </BudgetCard>
    </div>
  </Container>
}

export default App;
