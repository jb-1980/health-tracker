export const formattedDate = (date: string | Date) => {
  return new Date(date).toDateString()
}
