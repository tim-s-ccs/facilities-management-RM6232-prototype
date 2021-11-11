import addressContainerSetup from '../../utlils/pageSetup/addressContainerSetup'
import { BuyerDetailEditAddressParams, BuyerDetailEditParams, BuyerDetailUpdateAddressParams, BuyerDetailUpdateParams } from '../../types/routes/facilitiesManagement/buyerDetails'
import { getBuyerDetail } from '../../utlils/pageSetup/buyerDetailSetup'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/:id/edit', (req: Request, res: Response) => {
  const buyerDetail = getBuyerDetail(req)

  const params: BuyerDetailEditParams = {
    buyerDetailData: buyerDetail.data,
    addressContainerParams: addressContainerSetup(
      buyerDetail.data.organisationAddress,
      buyerDetail.errors,
      {
        inputName: 'buyerDetail[organisationAddress]',
        enterAddressManuallyLink: `/facilities-management/RM6232/buyer-details/${buyerDetail.data.id}/edit-address`,
        showAddressHeading: false
      }
    )
  }

  res.render(
    'facilitiesManagement/buyerDetails/edit.html',
    params
  )
})

router.post('/:id', (req: Request, res: Response) => {
  const buyerDetail = getBuyerDetail(req)

  buyerDetail.assignAttributes(req.body['buyerDetail'])

  if (buyerDetail.validate('update')) {
    buyerDetail.save(req)

    res.redirect('/facilities-management/RM6232')
  } else {
    const params: BuyerDetailUpdateParams = {
      buyerDetailData: buyerDetail.data,
      addressContainerParams: addressContainerSetup(
        buyerDetail.data.organisationAddress,
        buyerDetail.errors,
        {
          inputName: 'buyerDetail[organisationAddress]',
          enterAddressManuallyLink: `/facilities-management/RM6232/buyer-details/${buyerDetail.data.id}/edit-address`,
          showAddressHeading: false
        }
      ),
      errors: buyerDetail.errors,
      errorList: buyerDetail.errorList()
    }

    res.render(
      'facilitiesManagement/buyerDetails/edit.html',
      params
    )
  }
})

router.get('/:id/edit-address', (req: Request, res: Response) => {
  const buyerDetail = getBuyerDetail(req)

  const params: BuyerDetailEditAddressParams = {
    buyerDetailData: buyerDetail.data,
    addressData: buyerDetail.data.organisationAddress.data,
  }

  res.render(
    'facilitiesManagement/buyerDetails/editAddress.html',
    params
  )
})

router.post('/:id/edit-address', (req: Request, res: Response) => {
  const buyerDetail = getBuyerDetail(req)
  const organisationAddress = buyerDetail.data.organisationAddress

  organisationAddress.assignAttributes(req.body['buyerDetail']['organisationAddress'])

  if (organisationAddress.validate('update_address')) {
    organisationAddress.save(req)

    res.redirect(`/facilities-management/RM6232/buyer-details/${buyerDetail.data.id}/edit`)
  } else {
    const params: BuyerDetailUpdateAddressParams = {
      buyerDetailData: buyerDetail.data,
      addressData: organisationAddress.data,
      errors: organisationAddress.errors,
      errorList: organisationAddress.errorList()
    }

    res.render(
      'facilitiesManagement/buyerDetails/editAddress.html',
      params
    )
  }
})

export default router
