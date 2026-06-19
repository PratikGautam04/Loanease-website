import { useState } from "react"
import { LoanContext } from "./loan-context"

export function LoanProvider({ children }) {

  const [loans, setLoans] = useState(() => {
    return JSON.parse(localStorage.getItem("loans")) || []
  })

  const saveLoans = (updatedLoans) => {
    setLoans(updatedLoans)
    localStorage.setItem("loans", JSON.stringify(updatedLoans))
  }

  const addLoan = (loan) => {
    const newLoan = {
      id: Date.now(),
      ...loan,
      status: "Pending",
      remaining: loan.totalPayable,
    }

    saveLoans([...loans, newLoan])
  }

  const updateLoanStatus = (id, status) => {

  const updated = loans.map((loan) => {

    if (loan.id === id) {

      if (status === "Active") {
        return {
          ...loan,
          status: "Active",
          remaining: loan.totalPayable,
        }
      }

      if (status === "Rejected") {
        return {
          ...loan,
          status: "Rejected"
        }
      }

    }

    return loan
  })

  saveLoans(updated)
}

  const makeRepayment = (id) => {

  const updated = loans.map((loan) => {

    if (loan.id === id && loan.status === "Active") {

      const newRemaining = loan.remaining - loan.emi
      const newTenure = loan.tenure - 1

      // If fully paid
      if (newRemaining <= 0 || newTenure <= 0) {
        return {
          ...loan,
          remaining: 0,
          tenure: 0,
          status: "Closed"
        }
      }

      // If still active
      return {
        ...loan,
        remaining: newRemaining,
        tenure: newTenure,
        status: "Active"
      }
    }

    return loan
  })

  saveLoans(updated)
}

  return (
    <LoanContext.Provider
      value={{ loans, addLoan, updateLoanStatus, makeRepayment }}
    >
      {children}
    </LoanContext.Provider>
  )
}