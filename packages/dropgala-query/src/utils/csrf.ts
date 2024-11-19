import { CookieNames } from '@dropgala/types/common.type'
import Tokens from 'csrf'
import { NextApiRequest } from 'next'

export class Csrf extends Tokens {
  constructor() {
    super()
  }

  public verification(req: NextApiRequest) {
    try {
      const cookies = req.cookies
      const secret = cookies[CookieNames.XSRF_TOKEN]
      if (!secret) {
        throw new Error('InvalidCsrfTokenError 1')
      }
      const token = req.headers['x-csrf-token'] as string
      console.log('Verification', {
        token,
        secret,
        verify: this.verify(secret, token)
      })
      if (!this.verify(secret, token)) {
        throw new Error('InvalidCsrfTokenError')
      }
      return
    } catch (error) {
      console.log('Crsf->verification Error :>', error)
      throw error
    }
  }
}

const csrf = new Csrf()

export default csrf
