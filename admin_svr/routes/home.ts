import express from 'express'

const viewHome = 'home'
const bodyHome = {
    title: 'home'
}

const router = express.Router()
router.get('/', (req, res) => {
    res.render(viewHome, bodyHome)
})

export default router