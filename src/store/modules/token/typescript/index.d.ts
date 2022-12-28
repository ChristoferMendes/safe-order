interface StateToken {
  token: string | null
}

type ActionToken = {
  type: string
  payload: string
}


export { StateToken, ActionToken }