import { Home } from './Home'
import { PersistentStore } from '../util/PersistentStore'
import { Config } from '../Config'
import { SRGuide } from './SRGuide.tsx'

function copyToClipboard(token: string | null) {
  navigator.clipboard.writeText(Config.getWidgetWithTokenURL(token ?? ''))
  alert('OK SKOPIOWANED')
}

export const HomeUser = () => {
  return (
    <Home>
      <SRGuide
        onCopyLink={() => copyToClipboard(PersistentStore.getKey('token'))}
      />
    </Home>
  )
}
