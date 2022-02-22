export const makeSecureCode = (str: string | null | undefined) => {
  return str
    ? str.substring(0, 3) + '...' + str.substring(str.length - 4)
    : '...'
}
