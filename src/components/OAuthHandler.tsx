import { default as axios } from 'axios'
import { Config } from '../Config'
import { useEffect, useState } from 'react'
import { Home } from './Home'
import { PersistentStore } from '../util/PersistentStore'

import './OAuthHandler.css'

export const OAuthHandler: React.FC = () => {
  const u = new URLSearchParams(window.location.search)
  const [result, setResult] = useState<string | null>(null)
  const code = u.get('code')

  const backendUrl = Config.getNewBackendURL()

  useEffect(() => {
    if (code) {
      axios
        .get(
          `${backendUrl}/auth/login/twitch?authCode=${code}&redirectUrl=${encodeURIComponent(
            Config.getTwitchOAuthRedirectUrl()
          )}`
        )
        .then((d) => {
          setResult(d.data.token)
          console.log(d)
        })
        .catch((e) => {
          setResult('ERROR')
          console.error(e)
        })
    }
  }, [])

  useEffect(() => {
    if (result !== null && result !== 'ERROR') {
      PersistentStore.setKey('token', result)
      window.location.href = '/'
    }
  }, [result])

  return (
    <Home>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginTop: '10rem' }} className="lds-heart">
          <div></div>
        </div>
      </div>
    </Home>
  )
}
