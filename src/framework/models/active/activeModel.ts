import cast from '../../utils/cast'
import CustomValidator from '../../validation/validators/customValidator'
import InputValidator from '../../validation/validators/inputValidator'
import Model from '../model'
import StaticModel from '../static/staticModel'
import StaticModelValidator from '../../validation/validators/staticModelValidator'
import Validator from '../../validation/validator'
import { ActiveModelInterface, Condition, ModelData, ModelError } from '../../types/models/model'
import { getActiveRow, getActiveTable, setActiveRow } from '../../data/activeDataInterface'
import { Request } from 'express'
import { Schema, Scheme } from '../../types/validation/schema'
import { TableRow } from '../../types/data/tables'

abstract class ActiveModel extends Model implements ActiveModelInterface {
  abstract tableName: string
  schema: Schema
  errors: {[key: string]: ModelError} = {}

  constructor(data: ModelData, schema: Schema = {}) {
    super(data)

    this.schema = schema
  }

  static _find = (req: Request, tableName: string, id: number): ModelData => {
    return getActiveRow(req, tableName, id)
  }

  static _all = (req: Request, tableName: string): Array<ModelData> => {
    return getActiveTable(req, tableName)
  }

  static _where = (req: Request, tableName: string, conditions: Array<Condition>): Array<ModelData> => {
    return getActiveTable(req, tableName, conditions)
  }

  validate = (call: string) => {
    this.errors = {}

    if (this.schema.inputValidations !== undefined){
      this.schema.inputValidations.forEach(inputValidation => {
        const attributeValidation: InputValidator = new (inputValidation.validator as any)(this.data[inputValidation.attribute], inputValidation.options)

        this.validateAttribute(call, inputValidation, attributeValidation)
      })
    }

    if (this.schema.customValidations !== undefined) {
      this.schema.customValidations.forEach(customValidation => {
        const attributeValidation: CustomValidator = new (customValidation.validator as any)(this, customValidation.options)

        this.validateAttribute(call, customValidation, attributeValidation)
      })
    }

    if (this.schema.staticModelValidations !== undefined) {
      this.schema.staticModelValidations.forEach(staticModelValidation => {
        const attributeValidation: StaticModelValidator = new StaticModelValidator(this.data[staticModelValidation.attribute], staticModelValidation.options)

        this.validateAttribute(call, staticModelValidation, attributeValidation)
      })
    }

    Object.keys(this.data)
      .filter((attribute: string) => this.data[attribute] instanceof ActiveModel)
      .forEach((attribute: string) => {
        const model = this.data[attribute]

        if (!model.validate(call)) {
          this.errors = {...this.errors, ...model.errors}
        }
      })

    return Object.keys(this.errors).length === 0
  }

  private validateAttribute = (call: string, validation: Scheme, attributeValidation: Validator) => {
    if (!attributeValidation.valid(call)) {
      this.errors[validation.attribute] = {
        error: attributeValidation.error,
        errorMessage: validation.errorMessages[attributeValidation.error]
      }
    }
  }

  errorList = () => {
    return Object.entries(this.errors).map(([attribute, error]) => {
      return {
        text: error.errorMessage,
        href: `#${attribute}-error`
      }
    })
  }

  attributes = (): TableRow => {
    return Object.fromEntries(Object.keys(this.data).map((attribute) => {
      if(this.data[attribute] instanceof Model) {
        return [`${attribute}ID`, (this.data[attribute] as Model).data.id]
      } else {
        return [attribute, this.data[attribute]]
      }
    })) as TableRow
  }

  assignAttributes = (data: ModelData): void  => {
    for (const attribute in this.data) {
      if (attribute in data) {
        if (this.data[attribute] instanceof ActiveModel) {
          (this.data[attribute] as ActiveModel).assignAttributes(data[attribute])
        } else if (this.data[attribute] instanceof StaticModel) {
          const id = cast(data[attribute], 'number')

          if ((this.data[attribute] as StaticModel).data.id !== id) {
            this.data[attribute] = new this.data[attribute].constructor(id)
          }
        } else {
          this.data[attribute] = cast(data[attribute], typeof this.data[attribute])
        }
      }
    }
  }

  save = (req: Request) => {
    const activeModelAttributes: Array<string> = Object.keys(this.data).filter((attribute) => this.data[attribute] instanceof ActiveModel)

    activeModelAttributes.forEach(activeModelAttribute => (this.data[activeModelAttribute] as ActiveModel).save(req))

    setActiveRow(req, this.tableName, this.data.id, this.attributes())
  }
}

export default ActiveModel