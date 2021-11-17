import { Request, Response, Router } from 'express'
import { StaticModel } from 'ccs-prototype-kit-model-interface'

const router = Router()

class API extends StaticModel {
  static all = this._all
}

router.get('/postcodes/:postcode', (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    status: 200,
    result: API.all('ukAddresses')
  }))
})

router.get('/find-region-postcode/:postcode', (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    status: 200,
    result: API.all('ukRegions')
  }))
})

export default router