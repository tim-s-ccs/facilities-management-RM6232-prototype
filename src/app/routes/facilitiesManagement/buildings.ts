import Building from '../../models/active/facilitiesManagement/building/model'
import Buildings from '../../models/active/facilitiesManagement/building/collection'
import { buildingRows, getBuilding, pageDescription } from '../../utlils/buildingsSetup'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const buildings = new Buildings(req.session.data['user']['buildings'])
  
  res.render(
    'facilitiesManagement/buildings/index.html',
    {
      buldingRows: buildingRows(buildings)
    }
  )
})

router.get('/:id', (req: Request, res: Response) => {
  res.render(
    'facilitiesManagement/buildings/show.html',
    {
      building: getBuilding(req, req.params['id'])
    }
  )
})

router.get('/:id/edit/:step', (req: Request, res: Response) => {
  const id: string = req.params['id']
  const step: string = req.params['step']
  const building: Building = getBuilding(req, id)

  res.render(
    'facilitiesManagement/buildings/edit.html',
    {
      building: building,
      step: step,
      pageDescription: pageDescription(building, step)
    }
  )
})

export default router
