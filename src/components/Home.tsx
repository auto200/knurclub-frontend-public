import {
  Features,
  TwitchHelixScopeHelper,
} from '../util/TwitchHelixScopeHelper'
import { Config } from '../Config'
import { NavBar } from './NavBar'

import './Home.css'
import Footer from './Footer'
import { Logo } from './Logo'
import { ReactNode, useState } from 'react'
import { PersistentStore } from '../util/PersistentStore.ts'
import { Settings } from './Settings.tsx'

type HomeProps = {
  children?: ReactNode
}
export const Home = ({ children }: HomeProps) => {
  const makeRedirectUrl = (clientId: string, redirectUrl: string) => {
    const scopes: Features[] = [Features.SONG_REQUEST, Features.SOUND_ALERTS]
    return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${TwitchHelixScopeHelper.getHelixScopesForFeature(
      scopes
    ).join('+')}`
  }

  const [isSettingsViewEnabled, setIsSettingsViewEnabled] = useState(false)

  const doTwitchAuth = () => {
    window.location.href = makeRedirectUrl(
      Config.getTwitchAppClientID(),
      Config.getTwitchOAuthRedirectUrl()
    )
  }

  const onLogOut = () => {
    PersistentStore.removeKey('token')
    window.location.href = '/'
  }

  const onOpenSettings = () => {
    setIsSettingsViewEnabled(true)
  }

  const onClose = () => {
    setIsSettingsViewEnabled(false)
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <NavBar
        onLogout={onLogOut}
        onSettingsOpen={onOpenSettings}
        onLogin={doTwitchAuth}
        isLoggedIn={children !== undefined}
      />
      <div className={'HomeContainer'}>
        {children && !isSettingsViewEnabled && children}
        {isSettingsViewEnabled && <Settings onClose={onClose} />}
        {!children && (
          <>
            <Logo
              style={{ display: 'block', paddingTop: '4rem', margin: 'auto' }}
              size={'20rem'}
            />
            <p className={'HomeSloganHeader'}>WITAJ W KNUR CLUB</p>
            <p className={'HomeSloganHeader HomeSloganSub'}>
              OPEN SOURCE ZESTAW STREAMERSKI
            </p>
            <p className={'HomeSloganHeader HomeSloganSub'}>
              TYLKO DLA PRAWDZIWYCH SIGM
            </p>
            <button className={'LoginButton'} onClick={doTwitchAuth}>
              ZALOGUJ
            </button>
          </>
        )}
        <Footer />
      </div>
    </div>
  )
}
