import express from 'express'
import { checkLogin } from '../controller/login'
import { addUserGoods, getUserGames, getUserGoods, getUserId } from '../query/query'
import { errorPage } from './error'

const viewUser = 'user'
const bodyUser = {
    title: 'user',
    goods: {
        gold: 0,
        diamond: 0,
        diamond_google: 0,
        diamond_apple: 0
    },
    trophy: {
        total_highest_trophy: 0,
        trophy_reward_step: 0,
    },
    user_uuid: "",
    user_id: ""
}

const router = express.Router()
router.get('/', async (req, res) => {
    if (!checkLogin()) {
        errorPage("Login Fail", res)
    }

    res.render(viewUser, bodyUser)
})

router.post('/search', async (req, res) => {
    const userUuid = req.body.useruuid

    const user = await getUserId(userUuid, res)
    const goods = await getUserGoods(user.id, res)
    const games = await getUserGames(user.id, res)

    bodyUser.goods.gold = goods.gold
    bodyUser.goods.diamond = goods.diamond
    bodyUser.goods.diamond_google = goods.diamond_google
    bodyUser.goods.diamond_apple = goods.diamond_apple

    bodyUser.trophy.total_highest_trophy = games.total_highest_trophy
    bodyUser.trophy.trophy_reward_step = games.trophy_reward_step

    bodyUser.user_uuid = userUuid
    bodyUser.user_id = user.id

    res.render(viewUser, bodyUser)
})

router.post('/addgoods', async (req, res) => {
    const userUuid = req.body.add_user_uuid
    const userId = req.body.add_user_id

    let gold = req.body.add_gold
    let diamond = req.body.add_diamond
    // let diamond_google = req.body.add_diamond_google
    // let diamond_apple = req.body.add_diamond_apple

    // check params
    if (gold === undefined || diamond === undefined) {
        errorPage('invaild param', res)
    }

    if (gold === '') {
        gold = 0
    }

    if (diamond === '') {
        diamond = 0
    }

    await addUserGoods(userId, gold, diamond, res)

    const goods = await getUserGoods(userId, res)
    const games = await getUserGames(userId, res)

    bodyUser.goods.gold = goods.gold
    bodyUser.goods.diamond = goods.diamond
    bodyUser.goods.diamond_google = goods.diamond_google
    bodyUser.goods.diamond_apple = goods.diamond_apple

    bodyUser.trophy.total_highest_trophy = games.total_highest_trophy
    bodyUser.trophy.trophy_reward_step = games.trophy_reward_step

    bodyUser.user_uuid = userUuid
    bodyUser.user_id = userId

    res.render(viewUser, bodyUser)
})


export default router