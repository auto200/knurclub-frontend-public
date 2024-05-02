import { useEffect, useState } from 'react'

export const useNavigation = () => {
  const [path, setPath] = useState(window.location.pathname)
  const [queryString, setQueryString] = useState(window.location.search)

  const doNavigation = (xxx: string) => {
    window.history.pushState({}, '', xxx)
  }

  useEffect(() => {
    const onEvent = () => {
      setPath(window.location.pathname)
      setQueryString(window.location.search)
    }
    window.addEventListener('popstate', onEvent)

    return () => {
      window.removeEventListener('popstate', onEvent)
    }
  }, [])

  return { path, queryString, doNavigation }
}
