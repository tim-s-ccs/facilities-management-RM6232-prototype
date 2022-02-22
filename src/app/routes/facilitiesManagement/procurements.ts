import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import { editPageDescription, getContractName, getProcurement, getProcurementIndexParams, getProcurementNewParams, pageHasSummary, showPageDescription, summaryPageDescription } from '../../utlils/pageSetup/procurementSetup'
import { ProcurementCreateParams, ProcurementEditParams, ProcurementIndexParams, ProcurementNewParams, ProcurementShowParams, ProcurementShowPostParams, ProcurementSummaryParams, ProcurementUpdateParams } from '../../types/routes/facilitiesManagement/procurements'
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

  if (procurement.create()) {
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

router.get('/:id', (req: Request, res: Response) => {
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

router.post('/:id', (req: Request, res: Response) => {
  const procurement: Procurement = getProcurement(req)
  const state: string = procurement.data.state as string

  if (procurement.validate(state)) {
    procurement.goToNextState()
    procurement.save()

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

router.get('/:id/edit/:step', (req: Request, res: Response) => {
  const procurement: Procurement = getProcurement(req)
  const step: string = req.params['step']

  const params: ProcurementEditParams = {
    procurement: procurement,
    step: step,
    contractName: getContractName(req),
    pageDescription: editPageDescription(req, procurement, step)
  }

  res.render(
    'facilitiesManagement/procurements/edit.html',
    params
  )
})

router.post('/:id/edit/:step', (req: Request, res: Response) => {
  const step: string = req.params['step']
  const procurement: Procurement = getProcurement(req)

  // TODO: Fix issuse when active model does not exist
  if (step === 'buildings') {
    procurement.findOrBuildProcurementBuildings(req.body['procurement'])
  } else {
    procurement.assignAttributes(req.body['procurement'])
  }

  if (procurement.validate(step)) {
    procurement.save()

    if (pageHasSummary(step)) {
      res.redirect(`/facilities-management/RM6232/procurements/${procurement.data.id}/summary/${step}`)
    } else {
      res.redirect(`/facilities-management/RM6232/procurements/${procurement.data.id}`)
    }
  } else {
    const params: ProcurementUpdateParams = {
      procurement: procurement,
      step: step,
      contractName: getContractName(req),
      pageDescription: editPageDescription(req, procurement, step),
      errors: procurement.errors,
      errorList: procurement.errorList()
    }

    res.render(
      'facilitiesManagement/procurements/edit.html',
      params
    )
  }
})

router.get('/:id/summary/:step', (req: Request, res: Response) => {
  const procurement: Procurement = getProcurement(req)
  const step: string = req.params['step']

  const params: ProcurementSummaryParams = {
    procurement: procurement,
    step: step,
    pageDescription: summaryPageDescription(procurement, step)
  }

  res.render(
    'facilitiesManagement/procurements/summary.html',
    params
  )
})

export default router
