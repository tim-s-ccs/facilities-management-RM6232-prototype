import BuyerDetail from '../../models/active/facilitiesManagement/buyerDetail/model'
import { Request } from 'express'
import { Tables } from '../../types/models/tables'

const getBuyerDetail = (req: Request): BuyerDetail => {
  return BuyerDetail.find(Number(req.params['id']), req.session.data.tables as Tables)
}

export { getBuyerDetail }