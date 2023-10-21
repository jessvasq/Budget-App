import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';


//context allows us to pass data through the component tree without having to pass props down manually at every level.
const BudgetsContext = React.createContext();


export const uncategorizedBudgetId = 'uncategorized'

export const useBudgets = () => { 
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({children}) => {
    const [budgets, setBudgets] = useLocalStorage('budgets', []);
    const [expenses, setExpenses] = useLocalStorage('expenses', []);

    const getBudgetsExpenses = (budgetId) => {
        //get all expenses that have the same id, we'll use this to display the expenses for a given budget.
        return expenses.filter(expense => expense.budgetId === budgetId)
    };

    const addExpense = ({description, amount, budgetId}) => {
         //the setBudgets function will update the budgets state variable by adding a new budget to the array
         setExpenses(prevExpense => {
            return [...prevExpense, {id:uuidV4(), description, amount, budgetId }]
        })
    };

    const addBudget = ({name, max}) => {
        //the setBudgets function will update the budgets state variable by adding a new budget to the array
        setBudgets(prevBudgets => {
            //if there's another budget with the same name, we'll just return the existing budget
            if (prevBudgets.find(budget => budget.name === name)) {
            return prevBudgets;
                }
            return [...prevBudgets, {id:uuidV4(), name, max }]
        })
    };

    const deleteBudget = ({id}) => {
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if(expense.budgetId !== id) return expense
                return { ...expense, budgetId:uncategorizedBudgetId }
            })
        })
        setBudgets(prevBudgets => {
            // We're going to return all budgets that don't have the id that we're trying to delete. So all the items that do not match the uuid that we're trying to delete will stay, and the one that does match will be removed.
            return prevBudgets.filter(budget => budget.id !== id)
        })
    };

    const deleteExpense = ({id}) => {
        setExpenses(prevExpense => {
            // We're going to return all expenses that don't have the id that we're trying to delete. So all the items that do not match the uuid that we're trying to delete will stay, and the one that does match will be removed.
            return prevExpense.filter(expense => expense.id !== id)
        })
    };

    return (
    <BudgetsContext.Provider 
    value={{
        //functions we'll use to interact with the data
        budgets, 
        expenses, 
        getBudgetsExpenses,
        addExpense, 
        addBudget,
        deleteBudget,
        deleteExpense,
    }}
    >
        {children}
    </BudgetsContext.Provider>
)};


