import { ProcurementRow } from '../../types/data/activeTables'

const procurements: Array<ProcurementRow> = [
  {
    id: '000001',
    userID: '000001',
    serviceCodes: ['E.1', 'E.2'],
    regionCodes: ['UKC1', 'UKC2'],
    estimatedAnnualCost: 123_456,
    contractName: 'Test 1',
    referenceNumber: 'RM6232-820103-2022',
    state: 'completed_search',
    updatedAt: '2022-01-28T16:26:00'
  },
  {
    id: '000002',
    userID: '000001',
    serviceCodes: ['F.1', 'F.2'],
    regionCodes: ['UKD1', 'UKD2'],
    estimatedAnnualCost: 5_678_901,
    contractName: 'Test 2',
    referenceNumber: 'RM6232-921032-2022',
    state: 'entering_requirements',
    updatedAt: '2022-03-11T10:08:00'
  },
  {
    id: '000003',
    userID: '000001',
    serviceCodes: ['E.1', 'E.2', 'F.1', 'F.2', 'G.1', 'G.2'],
    regionCodes: ['UKF1', 'UKF2'],
    estimatedAnnualCost: 15_678_901,
    contractName: 'Test 3',
    referenceNumber: 'RM6232-931311-2022',
    tupe: true,
    initialCallOffPeriodYears: 2,
    initialCallOffPeriodMonths: 3,
    initialCallOffPeriodStartDate: '2022-11-01',
    mobilisationPeriodRequired: true,
    mobilisationPeriod: 4,
    optionalCallOffRequired: true,
    extensionPeriodRequired0: true,
    extensionPeriodYears0: 1,
    extensionPeriodMonths0: 2,
    extensionPeriodRequired1: true,
    extensionPeriodYears1: 2,
    extensionPeriodMonths1: 3,
    extensionPeriodRequired2: false,
    extensionPeriodYears2: undefined,
    extensionPeriodMonths2: undefined,
    extensionPeriodRequired3: false,
    extensionPeriodYears3: undefined,
    extensionPeriodMonths3: undefined,
    procurementBuildingIDs: ['000001', '000002', '000003'],
    state: 'entering_requirements',
    updatedAt: '2022-07-01T15:33:00'
  },
  {
    id: '000004',
    userID: '000001',
    serviceCodes: ['H.1', 'H.2'],
    regionCodes: ['UKG1', 'UKG2'],
    estimatedAnnualCost: 654_321,
    contractName: 'Test 4',
    referenceNumber: 'RM6232-000060-2022',
    state: 'final_results',
    updatedAt: '2022-02-14T18:30:00'
  },
  {
    id: '000005',
    userID: '000001',
    serviceCodes: ['I.1', 'I.2'],
    regionCodes: ['UKH1', 'UKH2'],
    estimatedAnnualCost: 5_987_654,
    contractName: 'Test 5',
    referenceNumber: 'RM6232-089271-2022',
    state: 'final_results',
    updatedAt: '2022-04-22T01:36:00'
  },
  {
    id: '000006',
    userID: '000001',
    serviceCodes: ['J.1', 'J.2'],
    regionCodes: ['UKI1', 'UKI2'],
    estimatedAnnualCost: 15_456_321,
    contractName: 'Test 6',
    referenceNumber: 'RM6232-109627-2022',
    state: 'final_results',
    updatedAt: '2022-08-02T16:44:00'
  }
]

export default procurements