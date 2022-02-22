import { getProcurementBuilding, getProcurementName, getServiceCheckboxes } from '../../utlils/pageSetup/procurementBuildingSetup'
import { ProcurementBuildingEditParams, ProcurementBuildingsUpdateParams } from '../../types/routes/facilitiesManagement/procurementBuildings'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/:id/edit', (req: Request, res: Response) => {
  const procurementBuilding = getProcurementBuilding(req)

  const params: ProcurementBuildingEditParams = {
    procurementBuilding: procurementBuilding,
    procurementID: procurementBuilding.procurement().data.id,
    procurementName: getProcurementName(procurementBuilding),
    buildingName: procurementBuilding.buildingName(),
    serviceCheckboxes: getServiceCheckboxes(procurementBuilding)
  }

  res.render(
    'facilitiesManagement/procurementBuildings/edit.html',
    params
  )
})

router.post('/:id/edit/', (req: Request, res: Response) => {
  const procurementBuilding = getProcurementBuilding(req)

  procurementBuilding.assignAttributes(req.body['procurementBuilding'])

  if (procurementBuilding.validate('services')) {
    procurementBuilding.save()

    res.redirect(`/facilities-management/RM6232/procurements/${procurementBuilding.procurement().data.id}/summary/assigning-services-to-buildings`)
  } else {
    const params: ProcurementBuildingsUpdateParams = {
      procurementBuilding: procurementBuilding,
      procurementID: procurementBuilding.procurement().data.id,
      procurementName: getProcurementName(procurementBuilding),
      buildingName: procurementBuilding.buildingName(),
      serviceCheckboxes: getServiceCheckboxes(procurementBuilding),
      errors: procurementBuilding.errors,
      errorList: procurementBuilding.errorList()
    }

    res.render(
      'facilitiesManagement/procurementBuildings/edit.html',
      params
    )
  }
})

export default router
