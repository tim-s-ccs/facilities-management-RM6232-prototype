import { getStaticTable } from '../../framework/data/staticDataInterface'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/postcodes/:postcode', (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    status: 200,
    result: getStaticTable('ukAddresses')
  }))
})

router.get('/find-region-postcode/:postcode', (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    status: 200,
    result: getStaticTable('ukRegions')
  }))
})

export default router