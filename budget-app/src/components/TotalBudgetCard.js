import React from 'react';
import { useBudgets } from '../contexts/BudgetsContext';
import BudgetCard from './BudgetCard';

//we'll use the useBudgets hook to get the budgets from the BudgetsContext
export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets();
    //this function will take all the expenses, add all the amounts together, and return the total amount of expenses for a specific budget/category
    const amount = expenses.reduce(
        (total, expense) => total + expense.amount, 0)

    const max = budgets.reduce(
        (total, budget) => total + budget.max, 0)
    //if there are no expenses under uncategorized, we'll return null because we don't want to render a card if it's empty
    if (max === 0) return null;

    return (
        <BudgetCard amount={amount} name='Total' gray max={max} hideButtons />
    )
};
