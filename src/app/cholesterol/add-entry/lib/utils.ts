export const calculateLDL = (
  totalCholesterol: number,
  hdl: number,
  triglycerides: number
) => {
  return totalCholesterol - hdl - triglycerides / 5
}

export const calculateNonHDL = (totalCholesterol: number, hdl: number) => {
  return totalCholesterol - hdl
}
