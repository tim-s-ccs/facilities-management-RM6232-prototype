import api from './routes/api'
import buildings from './routes/facilitiesManagement/buildings'
import buyerAccounts from './routes/facilitiesManagement/buyerAccounts'
import buyerDetails from './routes/facilitiesManagement/buyerDetails'
import { Router } from 'express'

const routes: Array<[string, Router]> = [
  ['/facilities-management', buyerAccounts],
  ['/facilities-management/RM6232/buyer-details', buyerDetails],
  ['/facilities-management/RM6232/buildings', buildings],
  ['/api/v2', api]
]

export default routes