import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import { getProcurementIndexParams, getProcurementNewParams } from '../../utlils/pageSetup/procurementSetup'
import { ProcurementCreateParams, ProcurementIndexParams, ProcurementNewParams } from '../../types/routes/facilitiesManagement/procurements'
import { Request, Response, Router } from 'express'

const router = Router()


router.get('/', (req: Request, res: Response) => {
  const params: ProcurementIndexParams = getProcurementIndexParams(req)

  res.render(
    'facilitiesManagement/procurements/index.html',
    params
  )
})

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

  if (procurement.create(req)) {
    if (req.body['afterSave'] === 'Save and continue') {
      res.redirect(`/facilities-management/RM6232/procurements/${procurement.data.id}`)
    } else {
      res.redirect('/facilities-management/RM6232/procurements')
    }
  } else {
    const params: ProcurementCreateParams = {
      errors: procurement.errors,
      errorList: procurement.errorList(),
      ...getProcurementNewParams(procurement)
    }

    res.render(
      'facilitiesManagement/procurements/new.html',
      params
    )
  }
})

export default router
