/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {
  user: {
    email: 'buyer@example.com',
    buyerDetail: {
      id: '1',
      fullName: 'James Bond',
      jobTitle: 'Secret Agent',
      telephoneNumber: '0345 007 2222',
      organisationName: 'MI6',
      organisationAddress: {
        addressLine1: 'SIS Building',
        addressLine2: '85 Albert Embankment',
        city: 'London',
        postcode: 'SE11 5AW'
      },
      centralGovernment: 'true'
    },
    buildings: [
      {
        id: '1',
        name: '10 South Colonnade',
        description: 'Government Office Building',
        address: {
          addressLine1: '10 South Colonnade',
          addressLine2: '',
          city: 'London',
          postcode: 'E14 4QQ'
        },
        region: {
          name: 'Inner London - East',
          code: 'UKI4'
        },
        gia: 1000,
        externalArea: 0,
        buildingType: '1',
        securityClearance: '8',
        updatedAt: '2021-10-25',
        status: 'completed'
      },
      {
        id: '2',
        name: 'The Capital Building',
        description: '',
        address: {
          addressLine1: 'The Capital Building',
          addressLine2: '39 Old Hall Street',
          city: 'Liverpool',
          postcode: 'L3 9PP'
        },
        region: {
          name: 'Merseyside',
          code: 'UKD7'
        },
        gia: 0,
        externalArea: 1000,
        buildingType: '2',
        securityClearance: '7',
        updatedAt: '2021-10-26',
        status: 'completed'
      },
      {
        id: '3',
        name: '2 Rivergate',
        description: 'Bristol offices for CCS',
        address: {
          addressLine1: '2 Rivergate',
          addressLine2: 'Temple Quay',
          city: 'Bristol',
          postcode: 'BS32 4QW'
        },
        region: {
          name: 'Gloucestershire, Wiltshire and Bristol/Bath area',
          code: 'UKK1'
        },
        gia: 1000,
        externalArea: 0,
        buildingType: '3',
        securityClearance: '6',
        updatedAt: '2021-10-26',
        status: 'completed'
      },
      {
        id: '4',
        name: 'Concept House',
        description: '',
        address: {
          addressLine1: 'Concept House',
          addressLine2: 'Cardiff Road',
          city: 'Newport',
          postcode: 'NP10 8QQ'
        },
        region: {
          name: 'Monmouthshire and Newport',
          code: 'UKL21'
        },
        gia: 1000,
        externalArea: 0,
        buildingType: '4',
        securityClearance: '5',
        updatedAt: '2021-10-27',
        status: 'completed'
      },
      {
        id: '5',
        name: 'Rosebery Court',
        description: 'CCS Norwich Office',
        address: {
          addressLine1: 'Rosebery Court',
          addressLine2: 'Central Avenue',
          city: 'Norwich',
          postcode: 'NR7 0HS'
        },
        region: {
          name: 'East Anglia',
          code: 'UKH1'
        },
        gia: 1000,
        externalArea: 0,
        buildingType: '5',
        securityClearance: '4',
        updatedAt: '2021-09-01',
        status: 'completed'
      },
      {
        id: '6',
        name: 'CCS Birmingham office',
        description: '',
        address: {
          addressLine1: '23 Stephenson Street',
          addressLine2: '',
          city: 'Birmingham',
          postcode: 'B2 4BH'
        },
        region: {
          name: '',
          code: ''
        },
        gia: '',
        externalArea: '',
        buildingType: '',
        securityClearance: '',
        updatedAt: '2021-10-24',
        status: 'incomplete'
      }
    ]
  }
  // Insert values here

}
