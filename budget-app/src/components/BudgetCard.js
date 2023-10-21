import React from 'react';
import { Button, Card, ProgressBar, Stack, CardBody, CardTitle} from 'react-bootstrap';
import { currencyFormatter } from '../utils';

export default function BudgetCard({name, amount, max, gray, onAddExpenseClick}) {
  const classNames = []
  if (amount > max) {
    classNames.push('bg-danger', 'bg-opacity-10')
  } else if(gray) {
    classNames.push('bg-light')
  }
  


  return (
    <Card className={classNames.join(' ')}>
        <CardBody>
            <CardTitle className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                <div className='me-2'>{name}</div>
                {/* we'll use a function to format the inpu to dollars. */}
                <div className='d-flex align-items-baseline'>
                  <div>{currencyFormatter.format(amount)} 
                    <span className='text-muted fs-6 ms-1'>
                      / {currencyFormatter.format(max)} 
                    </span>
                  </div>
                </div>
            </CardTitle>
            
            <ProgressBar className='rounded-pill' variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
            />
            <Stack direction='horizontal' gap='2' className='mt-4'>
              <Button variant='outline-primary' className='ms-auto'  onClick={onAddExpenseClick}> Add Expenses</Button>
              <Button variant='outline-secondary' className='ms-auto'>View Expenses</Button>
            </Stack>
        </CardBody>
    </Card>
  )
}

const getProgressBarVariant=(amount, max) => {
  const ratio = amount/max;
  if (ratio > 0.5) return 'primary';
  if (ratio > 0.75) return 'warning';
  return 'danger';
}
