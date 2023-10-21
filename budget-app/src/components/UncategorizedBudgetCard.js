import React from 'react';
import { uncategorizedBudgetId, useBudgets } from '../contexts/BudgetsContext';
import BudgetCard from './BudgetCard';

//we'll use the useBudgets hook to get the budgets from the BudgetsContext
export default function UncategorizedBudgetCard(props) {
    const { getBudgetsExpenses } = useBudgets();
    //this function will take all the expenses, add all the amounts together, and return the total amount of expenses for a specific budget/category
    const amount = getBudgetsExpenses(uncategorizedBudgetId).reduce(
        (total, expense) => total + expense.amount, 0)
    //if there are no expenses under uncategorized, we'll return null because we don't want to render a card if it's empty
    if (amount === 0) return null;

    return (
        <BudgetCard amount={amount} name='uncategorized' gray {...props} />
    )
};
