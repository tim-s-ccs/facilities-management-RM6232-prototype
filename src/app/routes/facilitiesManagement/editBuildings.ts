import Building from '../../models/active/facilitiesManagement/building/model'
import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import { BuildingsCreateParams, BuildingsEditParams, BuildingsNewParams, BuildingsShowParams, BuildingsUpdateParams } from '../../types/routes/facilitiesManagement/buildings'
import { getBuilding, getProcurement, nextStepURL, pageDescription } from '../../utlils/pageSetup/editBuildingsSetup'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/:procurement_id/edit-buildings/new', (req: Request, res: Response) => {
  const building: Building = Building.build(req)
  const procurement: Procurement = getProcurement(req)

  const params: BuildingsNewParams = {
    building: building,
    form_url: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit-buildings/create`,
    pageDescription: pageDescription(building, procurement, 'new')
  }

  res.render(
    'facilitiesManagement/buildings/new.html',
    params
  )
})

router.post('/:procurement_id/edit-buildings/create', (req: Request, res: Response) => {
  const building: Building = Building.build(req, req.body['building'])
  const procurement: Procurement = getProcurement(req)

  if (building.create()) {
    if (req.body['afterSave'] === 'Save and continue') {
      res.redirect(nextStepURL('building-details', building.data.id, procurement.data.id))
    } else {
      res.redirect(`/facilities-management/RM6232/procurements/${procurement.data.id}/edit-buildings/${building.data.id}`)
    }
  } else {
    const params: BuildingsCreateParams = {
      building: building,
      form_url: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit-buildings/create`,
      pageDescription: pageDescription(building, procurement, 'new'),
      errors: building.errors,
      errorList: building.errorList()
    }

    res.render(
      'facilitiesManagement/buildings/new.html',
      params
    )
  }
})

router.get('/:procurement_id/edit-buildings/new/building-address', (req: Request, res: Response) => {
  const building: Building = Building.build(req)
  const procurement: Procurement = getProcurement(req)

  const params: BuildingsNewParams = {
    building: building,
    form_url: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit-buildings/create/building-address`,
    pageDescription: pageDescription(building, procurement, 'new-address')
  }

  res.render(
    'facilitiesManagement/buildings/new-address.html',
    params
  )
})

router.post('/:procurement_id/edit-buildings/create/building-address', (req: Request, res: Response) => {
  const building: Building = Building.build(req, req.body['building'])
  const procurement: Procurement = getProcurement(req)

  if (building.validate('new-address')) {
    const params: BuildingsNewParams = {
      building: building,
      form_url: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit-buildings/create`,
      pageDescription: pageDescription(building, procurement, 'new')
    }

    res.render(
      'facilitiesManagement/buildings/new.html',
      params
    )
  } else {
    const params: BuildingsCreateParams = {
      building: building,
      form_url: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit-buildings/create/building-address`,
      pageDescription: pageDescription(building, procurement, 'new-address'),
      errors: building.errors,
      errorList: building.errorList()
    }

    res.render(
      'facilitiesManagement/buildings/new-address.html',
      params
    )
  }
})

router.get('/:procurement_id/edit-buildings/:id', (req: Request, res: Response) => {
  const building: Building = getBuilding(req)
  const procurement: Procurement = getProcurement(req)

  const params: BuildingsShowParams = {
    building: building,
    return_url: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit/buildings`,
    edit_url: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit-buildings/${building.data.id}/edit/`
  }

  res.render(
    'facilitiesManagement/buildings/show.html',
    params
  )
})

router.get('/:procurement_id/edit-buildings/:id/edit/:step', (req: Request, res: Response) => {
  const step: string = req.params['step']
  const building: Building = getBuilding(req)
  const procurement: Procurement = getProcurement(req)

  const params: BuildingsEditParams = {
    building: building,
    step: step,
    form_url: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit-buildings/${building.data.id}/edit/${step}`,
    pageDescription: pageDescription(building, procurement, step)
  }

  res.render(
    'facilitiesManagement/buildings/edit.html',
    params
  )
})

router.post('/:procurement_id/edit-buildings/:id/edit/:step', (req: Request, res: Response) => {
  const step: string = req.params['step']
  const building: Building = getBuilding(req)
  const procurement: Procurement = getProcurement(req)

  // TODO: Fix issuse when active model does not exist
  building.assignAttributes(req.body['building'])

  if (building.validate(step)) {
    building.save()

    if (req.body['afterSave'] === 'Save and continue') {
      res.redirect(nextStepURL(step, building.data.id, procurement.data.id))
    } else {
      res.redirect(`/facilities-management/RM6232/procurements/${procurement.data.id}/edit-buildings/${building.data.id}`)
    }
  } else {
    const params: BuildingsUpdateParams = {
      building: building,
      step: step,
      form_url: `/facilities-management/RM6232/procurements/${procurement.data.id}/edit-buildings/${building.data.id}/edit/${step}`,
      pageDescription: pageDescription(building, procurement, step),
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
