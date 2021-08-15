import express from 'express'

const viewTest = 'test'
const bodyTest = {
    title: 'test',
    dbRow: 0
}

const router = express.Router()
router.get('/', async (req, res) => {
    res.render(viewTest, bodyTest)
})

router.post('/search', async (req, res) => {
    bodyTest.dbRow = 1
    res.render(viewTest, bodyTest)
})

export default router