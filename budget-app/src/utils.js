//used for formatting
import React from 'react'

export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: 'USD', 
    style: 'currency',
    minimumFractionDigits: 0
} )