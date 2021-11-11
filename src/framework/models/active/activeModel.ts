import CustomValidator from '../../validation/validators/customValidator'
import InputValidator from '../../validation/validators/inputValidator'
import Model from '../model'
import { ActiveModelInterface, ModelData, ModelError } from '../../types/models/model'
import { Request } from 'express'
import { Schema } from '../../types/validation/schema'
import { TableRow, Tables } from '../../types/models/tables'

abstract class ActiveModel extends Model implements ActiveModelInterface {
  abstract tableName: string
  schema: Schema
  errors: {[key: string]: ModelError} = {}

  constructor(schema: Schema = {}) {
    super()

    this.schema = schema
  }

  validate = (call: string) => {
    this.errors = {}
    
    if (this.schema.inputValidations !== undefined){
      this.schema.inputValidations.forEach(inputValidation => {
        const attributeValidation: InputValidator = new (inputValidation.validator as any)(this.data[inputValidation.attribute], inputValidation.options)

        if (!attributeValidation.valid(call)) {
          this.errors[inputValidation.attribute] = {
            error: attributeValidation.error,
            errorMessage: inputValidation.errorMessages[attributeValidation.error]
          }
        }
      })
    }

    if (this.schema.customValidations !== undefined) {
      this.schema.customValidations.forEach(customValidation => {
        const attributeValidation: CustomValidator = new (customValidation.validator as any)(this, customValidation.options)

        if (!attributeValidation.valid(call)) {
          this.errors[customValidation.attribute] = {
            error: attributeValidation.error,
            errorMessage: customValidation.errorMessages[attributeValidation.error]
          }
        }
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
        } else {
          this.data[attribute] = data[attribute]
        }
      }
    }
  }

  save = (req: Request) => {
    const activeModelAttributes: Array<string> = Object.keys(this.data).filter((attribute) => this.data[attribute] instanceof ActiveModel)
    
    activeModelAttributes.forEach(activeModelAttribute => (this.data[activeModelAttribute] as ActiveModel).save(req))
    
    const tables: Tables = req.session.data.tables
    
    const index: number = tables[this.tableName].map(row => row.id).indexOf(this.data.id)
  
    tables[this.tableName][index] = this.attributes()
  }
}

export default ActiveModel