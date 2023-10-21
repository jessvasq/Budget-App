import React from 'react';
import { Button, Card, ProgressBar, Stack, CardBody, CardTitle} from 'react-bootstrap';
import { currencyFormatter } from '../utils';

export default function BudgetCard({
  name, 
  amount, 
  max, 
  gray, 
  hideButtons,
  onAddExpenseClick}) {
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
                  {/* if there's a max, we'll display the max */}
                    {max && (<span className='text-muted fs-6 ms-1'>
                      / {currencyFormatter.format(max)} 
                    </span>
                    )}
                  </div>
                </div>
            </CardTitle>
            
            {/* only render the progress bar if there's a max */}
            {max &&
            (<ProgressBar className='rounded-pill' variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
            />
            )}
            {/* if hideButtons is false, we'll render the buttons */}
            {!hideButtons && (
            <Stack direction='horizontal' gap='2' className='mt-4'>
              <Button variant='outline-primary' className='ms-auto'  onClick={onAddExpenseClick}> Add Expenses</Button>
              <Button variant='outline-secondary' className='ms-auto'>View Expenses</Button>
            </Stack>
            )}
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
