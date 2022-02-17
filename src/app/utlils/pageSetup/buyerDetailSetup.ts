import BuyerDetail from '../../models/active/facilitiesManagement/buyerDetail/model'
import { Request } from 'express'

const getBuyerDetail = (req: Request): BuyerDetail => {
  return BuyerDetail.find(req, req.params['id'])
}

export { getBuyerDetail }