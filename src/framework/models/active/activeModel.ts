import Model from '../model'
import { ActiveModelInterface, ModelError } from '../../types/models/model'
import { Schema } from '../../types/validation/schema'
import InputValidator from '../../validation/validators/inputValidator'
import CustomValidator from '../../validation/validators/customValidator'

abstract class ActiveModel extends Model implements ActiveModelInterface {
  schema: Schema
  errors: {[key: string]: ModelError} = {}

  constructor(schema: Schema = {}) {
    super()

    this.schema = schema
  }

  attributes = (): object => {
    return Object.fromEntries(Object.keys(this.data).map((attributeKey) => {
      if(this.data[attributeKey] instanceof Model) {
        return [attributeKey, this.data[attributeKey].attributes()]
      } else {
        return [attributeKey, this.data[attributeKey]]
      }
    }))
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
      .filter((attribute: string) => this.data[attribute] instanceof Model)
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
}

export default ActiveModel