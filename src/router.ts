import { Router } from 'express'
import buyerAccount from './routes/facilitiesManagement/buyerAccount'

const routes: Array<[string, Router]> = [
  ['/facilities-management', buyerAccount]
]

export default routes