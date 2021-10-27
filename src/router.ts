import { Router } from 'express'
import buyerAccount from './routes/facilitiesManagement/buyerAccount'
import buyerDetail from './routes/facilitiesManagement/buyerDetail'
import api from './routes/api'

const routes: Array<[string, Router]> = [
  ['/facilities-management', buyerAccount],
  ['/facilities-management/RM6232/buyer-details', buyerDetail],
  ['/api/v2', api]
]

export default routes