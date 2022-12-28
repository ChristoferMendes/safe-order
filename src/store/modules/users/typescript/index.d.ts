interface IUser {
  uuid: string;
  name: string;
  email: string;
  avatar: string | null;
  avatar_url: string | null;
}


interface StateUser {
  user: IUser | null
}
type ActionUser = {
  type: string;
  payload: IUser | null;
}

export { IUser, StateUser , ActionUser }