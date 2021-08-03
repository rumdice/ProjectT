import express = require('express');
import { checkLogin } from '../controller/login';
import { addUserGoods, getUserGames, getUserGoods, getUserId } from '../query/query';
import { errorPage } from './error';

let res_view = 'user'; // .pug
let res_body = {
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
};

const router = express.Router();
router.get('/', async (req, res) => {
    if (!checkLogin()) {
        errorPage("Login Fail", res);
    }

    res.render(res_view, res_body);
});

router.post('/search', async (req, res) => {
    let user_uuid = req.body.useruuid;

    let user = await getUserId(user_uuid, res);
    let goods = await getUserGoods(user.id, res);
    let games = await getUserGames(user.id, res);


    res_body.goods.gold = goods.gold;
    res_body.goods.diamond = goods.diamond;
    res_body.goods.diamond_google = goods.diamond_google;
    res_body.goods.diamond_apple = goods.diamond_apple;

    res_body.trophy.total_highest_trophy = games.total_highest_trophy;
    res_body.trophy.trophy_reward_step = games.trophy_reward_step;

    res_body.user_uuid = user_uuid;
    res_body.user_id = user.id;

    res.render(res_view, res_body);
});

router.post('/addgoods', async (req, res) => {
    let gold = req.body.add_gold;
    let diamond = req.body.add_diamond;
    let diamond_google = req.body.add_diamond_google;
    let diamond_apple = req.body.add_diamond_apple;

    let user_id = req.body.add_user_id;
    let user_uuid = req.body.add_user_uuid;

    // check params
    if (gold === undefined || diamond === undefined) {
        errorPage('invaild param', res);
    }

    if (gold === '') {
        gold = 0;
    }

    if (diamond === '') {
        diamond = 0;
    }

    await addUserGoods(user_id, gold, diamond, res);

    let goods = await getUserGoods(user_id, res);
    let games = await getUserGames(user_id, res);

    res_body.goods.gold = goods.gold;
    res_body.goods.diamond = goods.diamond;
    res_body.goods.diamond_google = goods.diamond_google;
    res_body.goods.diamond_apple = goods.diamond_apple;

    res_body.trophy.total_highest_trophy = games.total_highest_trophy;
    res_body.trophy.trophy_reward_step = games.trophy_reward_step;

    res_body.user_uuid = user_uuid;
    res_body.user_id = user_id;

    res.render(res_view, res_body);
});


export default router;