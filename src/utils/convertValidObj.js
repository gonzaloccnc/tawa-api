export const convertValidObj = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, val]) => val != null)
  )
}
