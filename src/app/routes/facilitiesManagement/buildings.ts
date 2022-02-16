import Building from '../../models/active/facilitiesManagement/building/model'
import { buildingRows, getBuilding, nextStepURL, pageDescription } from '../../utlils/pageSetup/buildingsSetup'
import { BuildingsCreateParams, BuildingsEditParams, BuildingsIndexParams, BuildingsNewParams, BuildingsShowParams, BuildingsUpdateParams } from '../../types/routes/facilitiesManagement/buildings'
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

router.get('/new', (req: Request, res: Response) => {
  const building: Building = Building.build(req)

  const params: BuildingsNewParams = {
    building: building,
    form_url: '/facilities-management/RM6232/buildings/create',
    pageDescription: pageDescription(building, 'new')
  }

  res.render(
    'facilitiesManagement/buildings/new.html',
    params
  )
})

router.post('/create', (req: Request, res: Response) => {
  const building: Building = Building.build(req, req.body['building'])

  if (building.create(req)) {
    if (req.body['afterSave'] === 'Save and continue') {
      res.redirect(nextStepURL('building-details', building.data.id))
    } else {
      res.redirect(`/facilities-management/RM6232/buildings/${building.data.id}`)
    }
  } else {
    const params: BuildingsCreateParams = {
      building: building,
      form_url: '/facilities-management/RM6232/buildings/create',
      pageDescription: pageDescription(building, 'new'),
      errors: building.errors,
      errorList: building.errorList()
    }

    res.render(
      'facilitiesManagement/buildings/new.html',
      params
    )
  }
})

router.get('/new/building-address', (req: Request, res: Response) => {
  const building: Building = Building.build(req)

  const params: BuildingsNewParams = {
    building: building,
    form_url: '/facilities-management/RM6232/buildings/create/building-address',
    pageDescription: pageDescription(building, 'new-address')
  }

  res.render(
    'facilitiesManagement/buildings/new-address.html',
    params
  )
})

router.post('/create/building-address', (req: Request, res: Response) => {
  const building: Building = Building.build(req, req.body['building'])

  if (building.validate('new-address')) {
    const params: BuildingsNewParams = {
      building: building,
      form_url: '/facilities-management/RM6232/buildings/create',
      pageDescription: pageDescription(building, 'new')
    }

    res.render(
      'facilitiesManagement/buildings/new.html',
      params
    )
  } else {
    const params: BuildingsCreateParams = {
      building: building,
      pageDescription: pageDescription(building, 'new-address'),
      form_url: '/facilities-management/RM6232/buildings/create/building-address',
      errors: building.errors,
      errorList: building.errorList()
    }

    res.render(
      'facilitiesManagement/buildings/new-address.html',
      params
    )
  }
})

router.get('/:id', (req: Request, res: Response) => {
  const building: Building = getBuilding(req)

  const params: BuildingsShowParams = {
    building: building,
    return_url: '/facilities-management/RM6232/buildings',
    edit_url: `/facilities-management/RM6232/buildings/${building.data.id}/edit/`
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
    form_url: `/facilities-management/RM6232/buildings/${building.data.id}/edit/${step}`,
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
  // TODO: Fix issuse when active model does not exist
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
      form_url: `/facilities-management/RM6232/buildings/${building.data.id}/edit/${step}`,
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
