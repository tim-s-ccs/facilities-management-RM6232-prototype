import Address from '../../models/active/facilitiesManagement/address/model'
import addressContainerSetup from './addressContainerSetup'
import Building from '../../models/active/facilitiesManagement/building/model'
import BuildingType from '../../models/static/facilitiesManagement/buildingType/model'
import Procurement from '../../models/active/facilitiesManagement/procurement/model'
import regionContainerSetup from './regionContainerSetup'
import SecurityClearance from '../../models/static/facilitiesManagement/securityClearance/model'
import { BuildingPageDescription, RadioItem } from '../../types/utils/pageSetup/buildingsSetup'
import { Request } from 'express'
import { StaticModel } from 'ccs-prototype-kit-model-interface'

const getBuilding = (req: Request): Building => {
  return Building.find(req, req.params['id'])
}

const getProcurement = (req: Request): Procurement => {
  return Procurement.find(req, req.params['procurement_id'])
}

const getRadioItem = (staticModel: StaticModel, id?: string): RadioItem => {
  return {
    value: staticModel.data.id,
    text: staticModel.data.name,
    hint: {
      text: staticModel.data.description
    },
    checked: id === staticModel.data.id
  }
}

const getBuildingTypeRadioItems = (currentBuildingTypeID?: string): Array<RadioItem> => {
  return BuildingType.all().map((buildingType: BuildingType) => getRadioItem(buildingType, currentBuildingTypeID))
}

const getSecurityClearanceRadioItems = (currentSecurityClearanceID?: string): Array<RadioItem> => {
  return SecurityClearance.all().map((securityClearance: SecurityClearance) => getRadioItem(securityClearance, currentSecurityClearanceID))
}

const nextStepURL = (currentStep: string, id: string, procurement_id: string): string => {
  switch (currentStep) {
  case 'building-details':
    return `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}/edit/area`
  case 'area':
    return `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}/edit/building-type`
  case 'building-type':
    return `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}/edit/security-clearance`
  default:
    return `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}`
  }
}

const pageDescription = (building: Building, procurement: Procurement, step: string): BuildingPageDescription | undefined => {
  const id: string = building.data.id
  const procurement_id: string = procurement.data.id

  switch (step) {
  case 'building-details':
    return {
      pageTitle: 'Building details',
      stepNumber: 1,
      save_and_continue: true,
      save_and_return: true,
      previousStep: {
        text: 'Return to building details summary',
        href: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}`
      },
      nextStep: {
        text: 'Building size',
        href: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}/edit/area`
      },
      additionalDetails: {
        addressContainerParams: addressContainerSetup(
          building.errors,
          {
            inputName: 'building[address]',
            enterAddressManuallyLink: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}/edit/building-address`,
            showAddressHeading: true
          },
          building.data.address as Address
        ),
        regionContainerParams: regionContainerSetup(
          'building[region]',
          building.data.region,
          building.data.address as Address
        )
      }
    }
  case 'building-address':
    return {
      pageTitle: 'Add building address',
      stepNumber: 1,
      save_and_continue: true,
      save_and_return: false,
      previousStep: {
        text: 'Return to building details',
        href: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}/edit/building-details`
      }
    }
  case 'area':
    return {
      pageTitle: 'Internal and external areas',
      stepNumber: 2,
      save_and_continue: true,
      save_and_return: true,
      previousStep: {
        text: 'Return to building details',
        href: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}/edit/building-details`
      },
      nextStep: {
        text: 'Building type',
        href: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}/edit/building-type`
      }
    }
  case 'building-type':
    return {
      pageTitle: 'Building type',
      stepNumber: 3,
      save_and_continue: true,
      save_and_return: true,
      previousStep: {
        text: 'Return to building size',
        href: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}/edit/area`
      },
      nextStep: {
        text: 'Security clearance',
        href: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}/edit/security-clearance`
      },
      additionalDetails: {
        buildingTypeRadioItems: getBuildingTypeRadioItems(building.data.buildingType?.data?.id),
        detailsOpen: Number(building.data.buildingType?.data?.id) > 2
      }
    }
  case 'security-clearance':
    return {
      pageTitle: 'Security clearance',
      stepNumber: 4,
      save_and_continue: false,
      save_and_return: true,
      previousStep: {
        text: 'Return to building type',
        href: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}/edit/building-type`
      },
      nextStep: {
        text: 'Building details summary',
        href: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/${id}`
      },
      additionalDetails: {
        securityClearanceRadioItems: getSecurityClearanceRadioItems(building.data.securityClearance?.data?.id),
      }
    }
  case 'new':
    return {
      pageTitle: 'Add a building',
      stepNumber: 1,
      save_and_continue: true,
      save_and_return: true,
      previousStep: {
        text: 'Return to buildings',
        href: `/facilities-management/RM6232/procurements/${procurement_id}/edit/buildings`
      },
      additionalDetails: {
        addressContainerParams: addressContainerSetup(
          building.errors,
          {
            inputName: 'building[address]',
            enterAddressManuallyLink: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/new/building-address`,
            showAddressHeading: true
          },
          building.data.address as Address
        ),
        regionContainerParams: regionContainerSetup(
          'building[region]',
          building.data.region,
          building.data.address as Address
        )
      }
    }
  case 'new-address':
    return {
      pageTitle: 'Add building address',
      stepNumber: 1,
      save_and_continue: true,
      save_and_return: false,
      previousStep: {
        text: 'Return to building details',
        href: `/facilities-management/RM6232/procurements/${procurement_id}/edit-buildings/new`
      }
    }
  }
}

export { getBuilding, getProcurement, pageDescription, nextStepURL }