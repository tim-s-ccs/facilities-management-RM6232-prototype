import Address from '../../models/active/facilitiesManagement/address/model'
import addressContainerSetup from '../../utlils/addressContainerSetup'
import BuyerDetail from '../../models/active/facilitiesManagement/buyerDetail/model'
import { BuyerDetailEditAddressParams, BuyerDetailEditParams } from '../../types/routes/facilitiesManagement/buyerDetails'
import { Request, Response, Router } from 'express'



const router = Router()

router.get('/:id/edit', (req: Request, res: Response) => {
  const buyerDetail = new BuyerDetail(req.session.data.user.buyerDetail)

  res.render(
    'facilitiesManagement/buyerDetails/edit.html',
    {
      buyerID: req.params['id'],
      buyerDetailData: buyerDetail.data,
      addressContainerParams: addressContainerSetup(
        buyerDetail.data.organisationAddress,
        buyerDetail.errors,
        {
          inputName: 'facilitiesManagement[organisationAddress]',
          enterAddressManuallyLink: `/facilities-management/RM6232/buyer-details/${buyerDetail.data.id}/edit-address`,
          showAddressHeading: false
        }
      )
    } as BuyerDetailEditParams
  )
})

router.post('/:id', (req: Request, res: Response) => {
  const buyerDetail = new BuyerDetail(req.body['facilitiesManagement'])

  if (buyerDetail.validate('update')) {
    req.session.data.user.buyerDetail = buyerDetail.attributes()

    res.redirect('/facilities-management/RM6232')
  } else {
    res.render(
      'facilitiesManagement/buyerDetails/edit.html',
      {
        buyerID: req.params['id'],
        buyerDetailData: buyerDetail.data,
        addressContainerParams: addressContainerSetup(
          buyerDetail.data.organisationAddress,
          buyerDetail.errors,
          {
            inputName: 'facilitiesManagement[organisationAddress]',
            enterAddressManuallyLink: `/facilities-management/RM6232/buyer-details/${buyerDetail.data.id}/edit-address`,
            showAddressHeading: false
          }
        ),
        errors: buyerDetail.errors,
        errorList: buyerDetail.errorList()
      } as BuyerDetailEditParams
    )
  }
})

router.get('/:id/edit-address', (req: Request, res: Response) => {
  const buyerDetailAddress = new Address(req.session.data.user.buyerDetail.organisationAddress)

  res.render(
    'facilitiesManagement/buyerDetails/editAddress.html',
    {
      buyerID: req.params['id'],
      addressData: buyerDetailAddress.data,
    } as BuyerDetailEditAddressParams
  )
})

router.post('/:id/edit-address', (req: Request, res: Response) => {
  const buyerDetailAddress = new Address(req.body['facilitiesManagement']['organisationAddress'])

  if (buyerDetailAddress.validate('update_address')) {
    req.session.data.user.buyerDetail.organisationAddress = buyerDetailAddress.attributes()

    res.redirect(`/facilities-management/RM6232/buyer-details/${req.params['id']}/edit`)
  } else {
    res.render(
      'facilitiesManagement/buyerDetails/editAddress.html',
      {
        buyerID: req.params['id'],
        addressData: buyerDetailAddress.data,
        errors: buyerDetailAddress.errors,
        errorList: buyerDetailAddress.errorList()
      } as BuyerDetailEditAddressParams
    )
  }
})

export default router
