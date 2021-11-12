import Building from '../../models/active/facilitiesManagement/building/model'
import { buildingRows, getBuilding, nextStepURL, pageDescription } from '../../utlils/pageSetup/buildingsSetup'
import { BuildingsEditParams, BuildingsIndexParams, BuildingsShowParams, BuildingsUpdateParams } from '../../types/routes/facilitiesManagement/buildings'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const buildings: Array<Building> = Building.where(req, [{attribute: 'userID', value: req.session.data.user.id}])

  const params: BuildingsIndexParams = {
    buldingRows: buildingRows(buildings)
  }

  res.render(
    'facilitiesManagement/buildings/index.html',
    params
  )
})

router.get('/:id', (req: Request, res: Response) => {
  const params: BuildingsShowParams = {
    building: getBuilding(req)
  }

  res.render(
    'facilitiesManagement/buildings/show.html',
    params
  )
})

router.get('/:id/edit/:step', (req: Request, res: Response) => {
  const step: string = req.params['step']
  const building: Building = getBuilding(req)

  const params: BuildingsEditParams = {
    building: building,
    step: step,
    pageDescription: pageDescription(building, step)
  }

  res.render(
    'facilitiesManagement/buildings/edit.html',
    params
  )
})

router.post('/:id/edit/:step', (req: Request, res: Response) => {
  const step: string = req.params['step']
  const building: Building = getBuilding(req)

  building.assignAttributes(req.body['building'])

  if (building.validate(step)) {
    building.save(req)

    if (req.body['afterSave'] === 'Save and continue') {
      res.redirect(nextStepURL(step, building.data.id))
    } else {
      res.redirect(`/facilities-management/RM6232/buildings/${building.data.id}`)
    }
  } else {
    const params: BuildingsUpdateParams = {
      building: building,
      step: step,
      pageDescription: pageDescription(building, step),
      errors: building.errors,
      errorList: building.errorList()
    }

    res.render(
      'facilitiesManagement/buildings/edit.html',
      params
    )
  }
})

export default router
