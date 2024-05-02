import { createContext } from 'react'

type RouterContextType = {
  currentPath: string
  queryString: string
  navigate: (path: string) => void
}

export const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  queryString: '',
  navigate: () => {},
})
