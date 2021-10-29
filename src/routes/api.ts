import { Router, Request, Response} from 'express'
import addresses from '../data/addresses'

const router = Router()

router.get('/postcodes/:postcode', (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    status: 200, 
    result: addresses
  }))
})

export default router
