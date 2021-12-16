import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import { nextStep, pageDescription, urlFormatter } from '../../utlils/pageSetup/quickViewSetup'
import { QuickViewCreateParams, QuickViewParams } from '../../types/routes/facilitiesManagement/quickView'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/:step', (req: Request, res: Response) => {
  const step: string = req.params['step']
  const procurement: Procurement = Procurement.build(req, req.query)

  const params: QuickViewParams = {
    procurement: procurement,
    step: step,
    pageDescription: pageDescription(procurement, step)
  }

  res.render(
    'facilitiesManagement/quickView/new.html',
    params
  )
})

router.post('/:step', (req: Request, res: Response) => {
  const step: string = req.params['step']

  const procurement: Procurement = Procurement.build(req, req.body['procurement'])

  if (procurement.validate(step)) {
    res.redirect(urlFormatter(nextStep(step), procurement))
  } else {

    const params: QuickViewCreateParams = {
      procurement: procurement,
      step: step,
      pageDescription: pageDescription(procurement, step),
      errors: procurement.errors,
      errorList: procurement.errorList()
    }

    res.render(
      'facilitiesManagement/quickView/new.html',
      params
    )
  }
})

export default router
