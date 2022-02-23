import ActiveProcurementBuildingsValidation from './customValidators/activeProcurementBuildingsValidation'
import EnteringRequirementsValidation from './customValidators/enteringRequirementsValidation'
import ExtensionValidation, { extension0Required, extension1Required, extension2Required, extension3Required } from './customValidators/extensionValidation'
import InitialCallOffPeriodLengthValidation from './customValidators/initialCallOffPeriodLengthValidation'
import MobilisationStartDateValidation, { mobilisationPeriodCondition, mobilisationPeriodRequiredCondition, mobilisationStartDateCondition } from './customValidators/mobilisationPeriodValidation'
import ServiceSelectionValidation from './customValidators/serviceSelectionValidation'
import TotalContractPeriodValidation from './customValidators/totalContractPeriodValidation'
import { DateValidator, DateValidatorOptions, InclusionValidator, InclusionValidatorOptions, LengthValidator, LengthValidatorOptions, NumberValidator, NumberValidatorOptions, StringValidator, StringValidatorOptions, ValidationSchema } from 'ccs-prototype-kit-model-interface'

const serviceCodeLengthOptions: LengthValidatorOptions = {
  on: ['new', 'choose-services', 'services'],
  min: 1
}

const regionCodeLengthOptions: LengthValidatorOptions = {
  on: ['new', 'choose-regions'],
  min: 1
}

const estimatedAnnualCostOptions: NumberValidatorOptions = {
  on: ['new', 'annual-contract-value'],
  onlyInteger: true,
  greaterThan: 0,
  lessThan: 1_000_000_000_000
}

const contractNameOptions: StringValidatorOptions = {
  on: ['new', 'contract-name'],
  required: true,
  maxLength: 100
}

const tupeOptions: InclusionValidatorOptions = {
  on: ['tupe'],
  in: [true, false]
}

const initialCallOffPeriodYearsOptions: NumberValidatorOptions = {
  on: ['contract-period'],
  onlyInteger: true,
  greaterThan: -1,
  lessThan: 8
}

const initialCallOffPeriodMonthsOptions: NumberValidatorOptions = {
  on: ['contract-period'],
  onlyInteger: true,
  greaterThan: -1,
  lessThan: 12
}

const initialCallOffPeriodStartDateOptions: DateValidatorOptions = {
  on: ['contract-period'],
  onOrAfterDate: 'today',
  onOrBeforeDate: '2099-12-31'
}

const mobilisationPeriodRequiredOptions: InclusionValidatorOptions = {
  on: ['contract-period'],
  in: [true, false]
}

const mobilisationPeriodRequiredTupeOptions: InclusionValidatorOptions = {
  on: ['contract-period'],
  conditions: [mobilisationPeriodCondition],
  in: [true]
}

const mobilisationPeriodOptions: NumberValidatorOptions = {
  on: ['contract-period'],
  conditions: [mobilisationPeriodRequiredCondition],
  onlyInteger: true,
  greaterThan: 0,
  lessThan: 53
}

const mobilisationPeriodTupeOptions: NumberValidatorOptions = {
  on: ['contract-period'],
  conditions: [mobilisationPeriodRequiredCondition, mobilisationPeriodCondition],
  greaterThan: 3,
}

const optionalCallOffRequiredOptions: InclusionValidatorOptions = {
  on: ['contract-period'],
  in: [true, false]
}

const extensionPeriodYears0Options: NumberValidatorOptions = {
  on: ['contract-period'],
  conditions: [extension0Required],
  onlyInteger: true,
  greaterThan: -1
}

const extensionPeriodMonths0Options: NumberValidatorOptions = {
  on: ['contract-period'],
  conditions: [extension0Required],
  onlyInteger: true,
  greaterThan: -1,
  lessThan: 12
}

const extensionPeriodYears1Options: NumberValidatorOptions = {
  on: ['contract-period'],
  conditions: [extension1Required],
  onlyInteger: true,
  greaterThan: -1
}

const extensionPeriodMonths1Options: NumberValidatorOptions = {
  on: ['contract-period'],
  conditions: [extension1Required],
  onlyInteger: true,
  greaterThan: -1,
  lessThan: 12
}

const extensionPeriodYears2Options: NumberValidatorOptions = {
  on: ['contract-period'],
  conditions: [extension2Required],
  onlyInteger: true,
  greaterThan: -1
}

const extensionPeriodMonths2Options: NumberValidatorOptions = {
  on: ['contract-period'],
  conditions: [extension2Required],
  onlyInteger: true,
  greaterThan: -1,
  lessThan: 12
}

const extensionPeriodYears3Options: NumberValidatorOptions = {
  on: ['contract-period'],
  conditions: [extension3Required],
  onlyInteger: true,
  greaterThan: -1
}

const extensionPeriodMonths3Options: NumberValidatorOptions = {
  on: ['contract-period'],
  conditions: [extension3Required],
  onlyInteger: true,
  greaterThan: -1,
  lessThan: 12
}

const procurementValidationSchema: ValidationSchema = {
  inputValidations: [
    {
      attribute: 'serviceCodes',
      validator: LengthValidator,
      options: serviceCodeLengthOptions,
      errorMessages: {
        greaterThan: 'Select at least one service you need to include in your procurement'
      }
    },
    {
      attribute: 'regionCodes',
      validator: LengthValidator,
      options: regionCodeLengthOptions,
      errorMessages: {
        greaterThan: 'Select at least one region you need to include in your procurement'
      }
    },
    {
      attribute: 'estimatedAnnualCost',
      validator: NumberValidator,
      options: estimatedAnnualCostOptions,
      errorMessages: {
        notANumber: 'The annual contract value must be a whole number greater than 0',
        notAnInteger: 'The annual contract value must be a whole number greater than 0',
        greaterThan: 'The annual contract value must be a whole number greater than 0',
        lessThan: 'The annual contract value must be less than 1,000,000,000,000 (1 trillion)'
      }
    },
    {
      attribute: 'contractName',
      validator: StringValidator,
      options: contractNameOptions,
      errorMessages: {
        required: 'You must enter the contract name',
        tooLong: 'The contract name must be 100 characters or less'
      }
    },
    {
      attribute: 'tupe',
      validator: InclusionValidator,
      options: tupeOptions,
      errorMessages: {
        invalid: 'Select one option'
      }
    },
    {
      attribute: 'initialCallOffPeriodYears',
      validator: NumberValidator,
      options: initialCallOffPeriodYearsOptions,
      errorMessages: {
        notANumber: 'The years for the initial call-off period must be a whole number',
        notAnInteger: 'The years for the initial call-off period must be a whole number',
        greaterThan: 'The years for the initial call-off period must be between 0 and 7',
        lessThan: 'The years for the initial call-off period must be between 0 and 7'
      }
    },
    {
      attribute: 'initialCallOffPeriodMonths',
      validator: NumberValidator,
      options: initialCallOffPeriodMonthsOptions,
      errorMessages: {
        notANumber: 'The months for the initial call-off period must be a whole number',
        notAnInteger: 'The months for the initial call-off period must be a whole number',
        greaterThan: 'The months for the initial call-off period must be between 0 and 11',
        lessThan: 'The months for the initial call-off period must be between 0 and 11'
      }
    },
    {
      attribute: 'initialCallOffPeriodStartDate',
      validator: DateValidator,
      options: initialCallOffPeriodStartDateOptions,
      errorMessages: {
        invalidDate: 'Enter a valid initial call-off start date',
        invalidOnOrAfterDate: 'Initial call-off period start date must be today or in the future',
        invalidOnOrBeforeDate: 'Initial call-off period start date cannot be later than 31 December 2100'
      }
    },
    {
      attribute: 'mobilisationPeriodRequired',
      validator: InclusionValidator,
      options: mobilisationPeriodRequiredOptions,
      errorMessages: {
        invalid: 'Select one option for mobilisation period'
      }
    },
    {
      attribute: 'mobilisationPeriodRequired',
      validator: InclusionValidator,
      options: mobilisationPeriodRequiredTupeOptions,
      errorMessages: {
        invalid: 'Mobilisation length must be a minimum of 4 weeks when TUPE is selected'
      }
    },
    {
      attribute: 'mobilisationPeriod',
      validator: NumberValidator,
      options: mobilisationPeriodOptions,
      errorMessages: {
        notANumber: 'Enter mobilisation length as a whole number',
        notAnInteger: 'Enter mobilisation length as a whole number',
        greaterThan: 'Mobilisation length must be between 1 and 52 weeks',
        lessThan: 'Mobilisation length must be between 1 and 52 weeks'
      }
    },
    {
      attribute: 'mobilisationPeriod',
      validator: NumberValidator,
      options: mobilisationPeriodTupeOptions,
      errorMessages: {
        greaterThan: 'Mobilisation length must be a minimum of 4 weeks when TUPE is selected',
      }
    },
    {
      attribute: 'optionalCallOffRequired',
      validator: InclusionValidator,
      options: optionalCallOffRequiredOptions,
      errorMessages: {
        invalid: 'Select one option for call-off contract extension'
      }
    },
    {
      attribute: 'extensionPeriodYears0',
      validator: NumberValidator,
      options: extensionPeriodYears0Options,
      errorMessages: {
        notANumber: 'The years for the extension period must be a whole number',
        notAnInteger: 'The years for the extension period must be a whole number',
        greaterThan: 'The years for the extension period must be greater than or equal to 0'
      }
    },
    {
      attribute: 'extensionPeriodMonths0',
      validator: NumberValidator,
      options: extensionPeriodMonths0Options,
      errorMessages: {
        notANumber: 'The months for the extension period must be a whole number',
        notAnInteger: 'The months for the extension period must be a whole number',
        greaterThan: 'The months for the extension period must be between 0 and 11'
      }
    },
    {
      attribute: 'extensionPeriodYears1',
      validator: NumberValidator,
      options: extensionPeriodYears1Options,
      errorMessages: {
        notANumber: 'The years for the extension period must be a whole number',
        notAnInteger: 'The years for the extension period must be a whole number',
        greaterThan: 'The years for the extension period must be greater than or equal to 0'
      }
    },
    {
      attribute: 'extensionPeriodMonths1',
      validator: NumberValidator,
      options: extensionPeriodMonths1Options,
      errorMessages: {
        notANumber: 'The months for the extension period must be a whole number',
        notAnInteger: 'The months for the extension period must be a whole number',
        greaterThan: 'The months for the extension period must be between 0 and 11'
      }
    },
    {
      attribute: 'extensionPeriodYears2',
      validator: NumberValidator,
      options: extensionPeriodYears2Options,
      errorMessages: {
        notANumber: 'The years for the extension period must be a whole number',
        notAnInteger: 'The years for the extension period must be a whole number',
        greaterThan: 'The years for the extension period must be greater than or equal to 0'
      }
    },
    {
      attribute: 'extensionPeriodMonths2',
      validator: NumberValidator,
      options: extensionPeriodMonths2Options,
      errorMessages: {
        notANumber: 'The months for the extension period must be a whole number',
        notAnInteger: 'The months for the extension period must be a whole number',
        greaterThan: 'The months for the extension period must be between 0 and 11'
      }
    },
    {
      attribute: 'extensionPeriodYears3',
      validator: NumberValidator,
      options: extensionPeriodYears3Options,
      errorMessages: {
        notANumber: 'The years for the extension period must be a whole number',
        notAnInteger: 'The years for the extension period must be a whole number',
        greaterThan: 'The years for the extension period must be greater than or equal to 0'
      }
    },
    {
      attribute: 'extensionPeriodMonths3',
      validator: NumberValidator,
      options: extensionPeriodMonths3Options,
      errorMessages: {
        notANumber: 'The months for the extension period must be a whole number',
        notAnInteger: 'The months for the extension period must be a whole number',
        greaterThan: 'The months for the extension period must be between 0 and 11'
      }
    }
  ],
  customValidations: [
    {
      attribute: 'serviceCodes',
      validator: ServiceSelectionValidation,
      options: {
        on: ['choose-services', 'services']
      },
      errorMessages: {
        invalidCleaning: '\'Mobile cleaning\' and \'Routine cleaning\' are the same, but differ by delivery method. Please choose one of these services only',
        invalidCafmHelpdeskBillable: 'You must select another service to include \'CAFM system\', \'Helpdesk services\' and/or \'Management of billable works\'',
        invalidMultipleCafm: 'Select only one CAFM service',
        invalidCafm: '\'CAFM – Soft FM Requirements\' can only be selected when all other services are of type Soft FM'
      }
    },
    {
      attribute: 'initialCallOffPeriod',
      validator: InitialCallOffPeriodLengthValidation,
      options: {
        on: ['contract-period']
      },
      errorMessages: {
        initialCallOffPeriodLength: 'The total initial call-off period must be between 1 month and 7 years'
      }
    },
    {
      attribute: 'mobilisationPeriod',
      validator: MobilisationStartDateValidation,
      options: {
        on: ['contract-period'],
        conditions: [mobilisationPeriodRequiredCondition, mobilisationStartDateCondition]
      },
      errorMessages: {
        startDateInvalid: 'Mobilisation start date must be in the future, please review your \'Initial call-off-period\' and \'Mobilisation period length\''
      }
    },
    {
      attribute: 'extensionPeriod0',
      validator: ExtensionValidation,
      options: {
        on: ['contract-period'],
        conditions: [extension0Required],
        extension: 0
      },
      errorMessages: {
        extensionLength: 'The total for extension period 1 must be greater than 1 month'
      }
    },
    {
      attribute: 'extensionPeriod1',
      validator: ExtensionValidation,
      options: {
        on: ['contract-period'],
        conditions: [extension1Required],
        extension: 1
      },
      errorMessages: {
        extensionLength: 'The total for extension period 2 must be greater than 1 month'
      }
    },
    {
      attribute: 'extensionPeriod2',
      validator: ExtensionValidation,
      options: {
        on: ['contract-period'],
        conditions: [extension2Required],
        extension: 2
      },
      errorMessages: {
        extensionLength: 'The total for extension period 3 must be greater than 1 month'
      }
    },
    {
      attribute: 'extensionPeriod3',
      validator: ExtensionValidation,
      options: {
        on: ['contract-period'],
        conditions: [extension3Required],
        extension: 3
      },
      errorMessages: {
        extensionLength: 'The total for extension period 4 must be greater than 1 month'
      }
    },
    {
      attribute: 'base',
      validator: TotalContractPeriodValidation,
      options: {
        on: ['contract-period']
      },
      errorMessages: {
        totalContractPeriod: 'Call-off contract period, including extensions and mobilisation period, must not be more than 10 years in total'
      }
    },
    {
      attribute: 'procurementBuildings',
      validator: ActiveProcurementBuildingsValidation,
      options: {
        on: ['buildings']
      },
      errorMessages: {
        greaterThan: 'Select at least one building'
      }
    },
    {
      attribute: 'base',
      validator: EnteringRequirementsValidation,
      options: {
        on: ['entering_requirements']
      },
      errorMessages: {
        'tupe_incomplete': '‘TUPE’ must be ‘COMPLETED’',
        'contract-period_incomplete': '‘Contract period’ must be ‘COMPLETED’',
        'buildings_incomplete': '‘Buildings’ must be ‘COMPLETED’',
        'assigning-services-to-buildings_incomplete': '‘Assigning services to buildings’ must be ‘COMPLETED’'
      }
    }
  ]
}

export default procurementValidationSchema
