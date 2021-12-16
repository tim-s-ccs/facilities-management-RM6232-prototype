import Procurement from '../../../models/active/facilitiesManagement/procurement/model'
import { ErrorParams } from '../formParams'
import { QuickViewPageDescription } from '../../utils/pageSetup/quickViewSetup'

export type QuickViewParams = {
  procurement: Procurement
  step: string
  pageDescription?: QuickViewPageDescription
}

export type QuickViewCreateParams = ErrorParams & QuickViewParams
