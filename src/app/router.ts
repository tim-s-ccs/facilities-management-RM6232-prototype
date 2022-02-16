import api from './routes/api'
import buildings from './routes/facilitiesManagement/buildings'
import buyerAccounts from './routes/facilitiesManagement/buyerAccounts'
import buyerDetails from './routes/facilitiesManagement/buyerDetails'
import dataViews from './routes/data/view'
import editBuildings from './routes/facilitiesManagement/editBuildings'
import procurements from './routes/facilitiesManagement/procurements'
import quickView from './routes/facilitiesManagement/quickView'
import { Router } from 'express'

const routes: Array<[string, Router]> = [
  ['/facilities-management', buyerAccounts],
  ['/facilities-management/RM6232/buyer-details', buyerDetails],
  ['/facilities-management/RM6232/buildings', buildings],
  ['/facilities-management/RM6232/procurements', editBuildings],
  ['/facilities-management/RM6232/procurements', procurements],
  ['/facilities-management/RM6232/quick-view', quickView],
  ['/data', dataViews],
  ['/api/v2', api]
]

export default routes