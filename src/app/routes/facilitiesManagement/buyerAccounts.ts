import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', (_: Request, res: Response) => {
  res.redirect('/facilities-management/RM6232')
})

router.get('/RM6232', (_: Request, res: Response) => {
  res.render('facilitiesManagement/buyerAccount/index.html')
})

export default router
