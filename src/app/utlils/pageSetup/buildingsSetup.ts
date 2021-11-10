import addressContainerSetup from './addressContainerSetup'
import Building from '../../models/active/facilitiesManagement/building/model'
import Buildings from '../../models/active/facilitiesManagement/building/collection'
import BuildingType from '../../models/static/facilitiesManagement/buildingType/model'
import BuildingTypes from '../../models/static/facilitiesManagement/buildingType/collection'
import formatDate from '../formatDate'
import regionContainerSetup from './regionContainerSetup'
import SecurityClearance from '../../models/static/facilitiesManagement/securityClearance/model'
import SecurityClearances from '../../models/static/facilitiesManagement/securityClearance/collection'
import StaticModel from '../../../framework/models/static/staticModel'
import { BuildingPageDescription, BuildingRowItems, RadioItem } from '../../types/utils/pageSetup/buildingsSetup'
import { Request } from 'express'
import { Tables } from '../../types/models/tables'

const buildingRows = (buildings: Buildings): Array<BuildingRowItems> => {
  return buildings.collection.map((building): BuildingRowItems => {
    return [
      {
        html: `<a class="govuk-link" aria-label="View details for ${building.data.name}" href="/facilities-management/RM6232/buildings/${building.data.id}">${building.data.name}</a>`
      },
      {
        text: building.data.description !== undefined && String(building.data.description).length > 0 ? building.data.description : '-'
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

const getBuilding = (req: Request): Building => {
  return Building.find(Number(req.params['id']), req.session.data.tables as Tables)
}

const getRadioItem = (staticModel: StaticModel, id?: number): RadioItem => {
  return {
    value: staticModel.data.id,
    text: staticModel.data.name,
    hint: {
      text: staticModel.data.description
    },
    checked: id === staticModel.data.id
  }
}

const getBuildingTypeRadioItems = (currentBuildingTypeID?: number): Array<RadioItem> => {
  return BuildingTypes.collection.map((buildingType: BuildingType) => getRadioItem(buildingType, currentBuildingTypeID))
}

const getSecurityClearanceRadioItems = (currentSecurityClearanceID?: number): Array<RadioItem> => {
  return SecurityClearances.collection.map((securityClearance: SecurityClearance) => getRadioItem(securityClearance, currentSecurityClearanceID))
}

const pageDescription = (building: Building, step: string): BuildingPageDescription | undefined => {
  const id: number = building.data.id

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
          'facilitiesManagement[region]',
          building.data.address,
          building.data.region
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
        buildingTypeRadioItems: getBuildingTypeRadioItems(building.data.buildingType?.data.id),
        detailsOpen: (building.data.buildingType?.data.id as number) > 1
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
        securityClearanceRadioItems: getSecurityClearanceRadioItems(building.data.securityClearance?.data.id),
      }
    }
  }
}

export { buildingRows, getBuilding, pageDescription }