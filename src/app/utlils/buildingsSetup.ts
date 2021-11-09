import addressContainerSetup from './addressContainerSetup'
import Building from '../models/active/facilitiesManagement/building/model'
import Buildings from '../models/active/facilitiesManagement/building/collection'
import BuildingType from '../models/static/facilitiesManagement/buildingType/model'
import BuildingTypes from '../models/static/facilitiesManagement/buildingType/collection'
import formatDate from './formatDate'
import regionContainerSetup from './regionContainerSetup'
import SecurityClearance from '../models/static/facilitiesManagement/securityClearance/model'
import SecurityClearances from '../models/static/facilitiesManagement/securityClearance/collection'
import StaticModel from '../../framework/models/static/staticModel'
import { Request } from 'express'

const buildingRows = (buildings: Buildings): Array<any> => {
  return buildings.collection.map((building) => {
    return [
      {
        html: `<a class="govuk-link" aria-label="View details for ${building.data.name}" href="/facilities-management/RM6232/buildings/${building.data.id}">${building.data.name}</a>`
      },
      {
        text: building.data.description.length > 0 ? building.data.description : '-'
      },
      {
        text: formatDate(building.data.updatedAt)
      },
      {
        html: building.data.status === 'completed' ? '<strong class="govuk-tag">completed</strong>' : '<strong class="govuk-tag govuk-tag--red">incomplete</strong>'
      }
    ]
  })
}

const getBuilding = (req: Request, id: string): Building => {
  const buildings = new Buildings(req.session.data['user']['buildings'])
  
  return buildings.find(String(id)) as Building
}

type RadioItem = {
  value: string
  text: string
  hint: {
    text: string
  }
  checked: boolean
}

const getRadioItem = (id: string, staticModel: StaticModel): RadioItem => {
  return {
    value: staticModel.data.id,
    text: staticModel.data.name,
    hint: {
      text: staticModel.data.description
    },
    checked: id === staticModel.data.id
  }
}

const getBuildingTypeRadioItems = (currentBuildingTypeID: string): Array<RadioItem> => {
  return BuildingTypes.collection.map((buildingType: BuildingType) => getRadioItem(currentBuildingTypeID, buildingType))
}

const getSecurityClearanceRadioItems = (currentSecurityClearanceID: string): Array<RadioItem> => {
  return SecurityClearances.collection.map((securityClearance: SecurityClearance) => getRadioItem(currentSecurityClearanceID, securityClearance))
}

type buildingPageDescription = {
  pageTitle: string
  stepNumber: number
  save_and_continue: boolean
  save_and_return: boolean
  previousStep: {
    text: string
    href: string
  }
  nextStep?: {
    text: string
    href: string
  }
  additionalDetails?: {[key: string]: any}
}

const pageDescription = (building: Building, step: string): buildingPageDescription | undefined => {
  const id: string = building.data.id

  switch (step) {
  case 'building-details':
    return {
      pageTitle: 'Building details',
      stepNumber: 1,
      save_and_continue: true,
      save_and_return: true,
      previousStep: {
        text: 'Return to building details summary',
        href: `/facilities-management/RM6232/buildings/${id}`
      },
      nextStep: {
        text: 'Building size',
        href: `/facilities-management/RM6232/buildings/${id}/edit/area`
      },
      additionalDetails: {
        addressContainerParams: addressContainerSetup(
          building.data.address,
          building.errors,
          {
            inputName: 'facilitiesManagement[address]',
            enterAddressManuallyLink: `/facilities-management/RM6232/buildings/${id}/edit/building-address`,
            showAddressHeading: true
          }
        ),
        regionContainerParams: regionContainerSetup(
          building.data.address,
          building.data.region,
          'facilitiesManagement[region]'
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
        href: `/facilities-management/RM6232/buildings/${id}/edit/building-details`
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
        href: `/facilities-management/RM6232/buildings/${id}/edit/building-details`
      },
      nextStep: {
        text: 'Building type',
        href: `/facilities-management/RM6232/buildings/${id}/edit/building-type`
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
        href: `/facilities-management/RM6232/buildings/${id}/edit/area`
      },
      nextStep: {
        text: 'Security clearance',
        href: `/facilities-management/RM6232/buildings/${id}/edit/security-clearance`
      },
      additionalDetails: {
        buildingTypeRadioItems: getBuildingTypeRadioItems(building.data.buildingType.data.id as string),
        detailsOpen: Number(building.data.buildingType.data.id) > 1
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
        href: `/facilities-management/RM6232/buildings/${id}/edit/building-type`
      },
      nextStep: {
        text: 'Building details summary',
        href: `/facilities-management/RM6232/buildings/${id}`
      },
      additionalDetails: {
        securityClearanceRadioItems: getSecurityClearanceRadioItems(building.data.securityClearance.data.id as string),
      }
    }
  }
}

export { buildingRows, getBuilding, pageDescription }