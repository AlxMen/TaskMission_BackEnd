import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
  res.send('Desde el Back')
})

export default router