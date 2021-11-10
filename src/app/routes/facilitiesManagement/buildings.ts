import Building from '../../models/active/facilitiesManagement/building/model'
import Buildings from '../../models/active/facilitiesManagement/building/collection'
import { buildingRows, getBuilding, pageDescription } from '../../utlils/pageSetup/buildingsSetup'
import { BuildingsEditParams, BuildingsIndexParams, BuildingsShowParams } from '../../types/routes/facilitiesManagement/buildings'
import { Request, Response, Router } from 'express'
import { Tables } from '../../types/models/tables'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const buildings = new Buildings(req.session.data.tables as Tables, [{attribute: 'userID', value: req.session.data.user.id}])
  
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

export default router
