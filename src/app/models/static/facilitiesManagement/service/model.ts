import { Condition, StaticModel } from 'ccs-prototype-kit-model-interface'
import { ServiceData, ServiceInterface } from '../../../../types/models/static/facilitiesManagement/service'

class Service extends StaticModel implements ServiceInterface {
  static tableName: string = 'services'
  data: ServiceData = this.data as ServiceData

  hyphenateCode = () => this.data.code.replace('.', '-')

  static find = (id: number): Service => {
    return new this(this._find(this.tableName, id))
  }

  static all = (): Array<Service> => {
    return this._all(this.tableName).map(data => new this(data))
  }

  static where = (conditions: Array<Condition>): Array<Service> => {
    return this._where(this.tableName, conditions).map(data => new this(data))
  }

  static findLotNumber =  (serviceCodes: string[], annualContractValue: number): string => {
    const lotNumber: string = this.determineLotNumber(serviceCodes)

    return `${lotNumber}${this.determineLotCode(lotNumber, annualContractValue)}`
  }

  static determineLotNumber = (serviceCodes: string[]): string => {
    const serviceCount: number = this.count(this.tableName, [{attribute: 'code', values: serviceCodes}])
    const hardFMServiceCount: number = this.count(this.tableName, [
      {attribute: 'code', values: serviceCodes},
      {attribute: 'hard', value: true}
    ])
    const softFMServiceCount: number = this.count(this.tableName, [
      {attribute: 'code', values: serviceCodes},
      {attribute: 'soft', value: true}
    ])

    if (hardFMServiceCount == serviceCount && softFMServiceCount < hardFMServiceCount) {
      // HARD FM
      return '2'
    } else if (softFMServiceCount == serviceCount && hardFMServiceCount < serviceCount) {
      // SOFT FM
      return '3'
    } else {
      // TOTAL FM
      return '1'
    }
  }

  static determineLotCode = (lotNumber: string, annualContractValue: number): string => {
    if (lotNumber === '3') {
      if (annualContractValue > 0 && annualContractValue < 1_000_000) {
        return 'a'
      } else if (annualContractValue >= 1_000_000 && annualContractValue < 7_000_000) {
        return 'b'
      } else {
        return 'c'
      }
    } else {
      if (annualContractValue > 0 && annualContractValue < 1_500_000) {
        return 'a'
      } else if (annualContractValue >= 1_500_000 && annualContractValue < 10_000_000) {
        return 'b'
      } else {
        return 'c'
      }
    }
  }
}

export default Service
