import { NavBar } from './NavBar'

import './Home.css'
import Footer from './Footer'
import { Logo } from './Logo'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext.ts'

type HomeProps = {
  children?: ReactNode
}
export const Home = ({ children }: HomeProps) => {
  const authContext = useContext(AuthContext)

  const login = authContext?.login ?? (() => {})

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <NavBar />
      <div className={'HomeContainer'}>
        {children && children}
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
            <button
              className={'LoginButton'}
              onClick={() => {
                console.log('spuha2')
                login()
              }}
            >
              ZALOGUJ
            </button>
          </>
        )}
        <Footer />
      </div>
    </div>
  )
}
