import addresses from '../data/addresses'
import regions from '../data/regions'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/postcodes/:postcode', (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    status: 200, 
    result: addresses
  }))
})

router.get('/find-region-postcode/:postcode', (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    status: 200, 
    result: regions
  }))
})

export default router
