import express from "express";
import { doCheat } from "../controller/cheat";
import { checkLogin } from "../controller/login";
import { getUserId } from "../query/query";

let res_view = 'cheat';
let res_body = {
    title: 'cheat',
    user_uuid: "",
    user_id: "",
    cheat_res: ""
};

const router = express.Router();
router.get('/', async (req, res) => {
    if (!checkLogin()) {
        res.render('error', { title: 'Error' });
    }

    res.render(res_view, res_body);
});

router.post('/search', async (req, res) => {
    let user_uuid = req.body.useruuid;
    let dbResult = await getUserId(user_uuid, res);
    
    res_body.user_uuid = user_uuid;
    res_body.user_id = dbResult.user_row.id;
    res.render(res_view, res_body);
});

router.post('/do', async (req, res) => {
    let user_uuid = req.body.cheat_user_uuid;
    let cheat_url = req.body.cheat_url;

    res_body.cheat_res = (doCheat(cheat_url, user_uuid)) ? `${cheat_url} Done!` : "Error!";
    res.render(res_view, res_body);
});

export default router;