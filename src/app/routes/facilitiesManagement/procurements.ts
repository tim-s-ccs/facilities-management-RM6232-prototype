import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import { getProcurement, getProcurementIndexParams, getProcurementNewParams, showPageDescription } from '../../utlils/pageSetup/procurementSetup'
import { ProcurementCreateParams, ProcurementIndexParams, ProcurementNewParams, ProcurementShowParams, ProcurementShowPostParams } from '../../types/routes/facilitiesManagement/procurements'
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

router.get('/:id', (req: Request, res: Response) =>{
  const procurement: Procurement = getProcurement(req)
  const state: string = procurement.data.state as string

  const params: ProcurementShowParams = {
    procurement: procurement,
    state: state,
    pageDescription: showPageDescription(procurement, state)
  }

  res.render(
    'facilitiesManagement/procurements/show.html',
    params
  )
})

router.post('/:id', (req: Request, res: Response) =>{
  const procurement: Procurement = getProcurement(req)
  const state: string = procurement.data.state as string

  if (procurement.validate(state)) {
    procurement.goToNextState()
    procurement.save(req)

    res.redirect(`/facilities-management/RM6232/procurements/${procurement.data.id}`)
  } else {
    const params: ProcurementShowPostParams = {
      procurement: procurement,
      state: state,
      pageDescription: showPageDescription(procurement, state),
      errors: procurement.errors,
      errorList: procurement.errorList()
    }

    res.render(
      'facilitiesManagement/procurements/show.html',
      params
    )
  }
})

export default router
