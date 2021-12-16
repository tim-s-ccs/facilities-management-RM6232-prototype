import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import { getProcurementNewParams } from '../../utlils/pageSetup/procurementSetup'
import { ProcurementCreateParams, ProcurementNewParams } from '../../types/routes/facilitiesManagement/procurements'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/new', (req: Request, res: Response) => {
  const procurement: Procurement = Procurement.build(req, req.query)

  const params: ProcurementNewParams = getProcurementNewParams(procurement)

  res.render(
    'facilitiesManagement/procurements/new.html',
    params
  )
})

router.post('/new', (req: Request, res: Response) => {
  const procurement: Procurement = Procurement.build(req, req.body['procurement'])

  const params: ProcurementCreateParams = {
    errors: procurement.errors,
    errorList: procurement.errorList(),
    ...getProcurementNewParams(procurement)
  }

  res.render(
    'facilitiesManagement/procurements/new.html',
    params
  )
})

export default router
