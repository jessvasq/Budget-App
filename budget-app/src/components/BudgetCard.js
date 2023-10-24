import React from 'react';
import { Button, Card, ProgressBar, Stack, CardBody, CardTitle} from 'react-bootstrap';
import { currencyFormatter } from '../utils';

export default function BudgetCard({
  name, 
  amount, 
  max, 
  gray, 
  hideButtons,
  onAddExpenseClick,
  onViewExpenseClick,

}) {
  const classNames = []
  if (amount > max) {
    classNames.push('bg-danger', 'bg-opacity-10')
  } else if(gray) {
    classNames.push('bg-light')
  }
  


  return (
    <Card className={classNames.join(' ')}>
        <CardBody >
          <CardTitle >
          <div id='category-title'>{name}</div>
          <div className='d-flex justify-content-end align-items-baseline fw-normal mb-3'>
                  <h6 id ='sub-title'>EXPENSES</h6>
                   <span id ='sub-title' className='text-muted fs-6 ms-1'>
                      / BUDGET
                    </span>
                    
                </div>
          </CardTitle>
    
            <CardTitle className='d-flex justify-content-end align-items-baseline fw-normal mb-3'>
       
                <div >
                  {currencyFormatter.format(amount)} 
                  {/* if there's a max, we'll display the max */}
                    {max && (
                    <span className='text-muted fs-6 ms-1'>
                      / {currencyFormatter.format(max)} 
                    </span>
                    )}
                </div>
            </CardTitle>
            
            {/* only render the progress bar if there's a max */}
            {max &&(
              <ProgressBar className='rounded-pill' variant={getProgressBarVariant(amount, max)}
              min={0}
              max={max}
              now={amount}
              />
            )}

            {/* if hideButtons is false, we'll render the buttons */}
            {!hideButtons && (
              <div className='d-flex justify-content-end'>
              <Stack direction='horizontal' gap='2' className='mt-4'>
                <Button id='card-bttn' variant='outline-primary' className='ms-auto' onClick={onAddExpenseClick}> Add Expenses</Button>
                <Button id='card-bttn' variant='outline-secondary' className='ms-auto' onClick={onViewExpenseClick}>View Expenses</Button>
              </Stack>
              </div>
            )}
        </CardBody>
    </Card>
  )
}

const getProgressBarVariant=(amount, max) => {
  const ratio = amount/max;
  if (ratio < 0.5) return 'success';
  if (ratio < 0.75) return 'warning';
  return 'danger';
}
