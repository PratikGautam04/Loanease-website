export const calculateEMI = (principal, rate, tenure) => {
  const monthlyRate = rate / 12 / 100
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1)

  const totalPayable = emi * tenure

  return {
    emi: Math.round(emi),
    totalPayable: Math.round(totalPayable)
  }
}