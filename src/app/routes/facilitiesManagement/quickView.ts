import { chooseRegionsAccordionItems, chooseServicesAccordionItems } from '../../utlils/pageSetup/quickViewSetup'
import { ChooseRegionsParams, ChooseServicesParams } from '../../types/routes/facilitiesManagement/quickView'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/choose-services', (_req: Request, res: Response) => {

  const params: ChooseServicesParams = {
    accordionItems: chooseServicesAccordionItems(),
  }

  res.render(
    'facilitiesManagement/quickView/chooseServices.html',
    params
  )
})

router.get('/choose-regions', (_req: Request, res: Response) => {

  const params: ChooseRegionsParams = {
    accordionItems: chooseRegionsAccordionItems(),
  }

  res.render(
    'facilitiesManagement/quickView/chooseRegions.html',
    params
  )
})

export default router
