import BuyerDetail from '../../models/active/facilitiesManagement/buyerDetail/model'
import { Request } from 'express'

const getBuyerDetail = (req: Request): BuyerDetail => {
  return BuyerDetail.find(req, Number(req.params['id']))
}

export { getBuyerDetail }