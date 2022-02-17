import Service from '../service/model'
import { Condition, StaticModel } from 'ccs-prototype-kit-model-interface'
import { WorkPackageData, WorkPackageInterface } from '../../../../types/models/static/facilitiesManagement/workPackage'

class WorkPackage extends StaticModel implements WorkPackageInterface {
  static tableName: string = 'workPackages'
  static primaryKey: string = 'code'

  data: WorkPackageData = this.data as WorkPackageData

  services = (): Array<Service> => {
    return Service.where([{attribute: 'work_package_code', value: this.data.code}])
  }

  static selectable = (): Array<WorkPackage> => {
    return this.where([{attribute: 'selectable', value: true}])
  }

  static find = (code: string): WorkPackage => {
    return new this(this._find(this.tableName, this.primaryKey, code))
  }

  static all = (): Array<WorkPackage> => {
    return this._all(this.tableName).map(data => new this(data))
  }

  static where = (conditions: Array<Condition>): Array<WorkPackage> => {
    return this._where(this.tableName, conditions).map(data => new this(data))
  }
}

export default WorkPackage