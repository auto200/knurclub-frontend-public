import { createContext } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
  consumeSession: (session: string) => void
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  consumeSession: () => {},
})
