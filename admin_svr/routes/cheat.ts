import express from "express"
import { doCheat } from "../controller/cheat"
import { checkLogin } from "../controller/login"
import { getUserId } from "../query/query"

const viewCheat = 'cheat'   // 페이지를 보여줄 .pug 파일 이름
const bodyCheat = {
    title: 'cheat',
    user_uuid: "",          // cheat.pug 의 var 변수에 대입됨. 객체안의 변수는 camelcase체크 안함. 신기함.
    user_id: "",
    cheat_res: ""
}

const router = express.Router()
router.get('/', async (req, res) => {
    if (!checkLogin()) {
        res.render('error', { title: 'Error' })
    }

    res.render(viewCheat, bodyCheat)
})

router.post('/search', async (req, res) => {
    const userUuid = req.body.useruuid
    const dbResult = await getUserId(userUuid, res)

    bodyCheat.user_uuid = userUuid
    bodyCheat.user_id = dbResult.user_row.id
    res.render(viewCheat, bodyCheat)
})

router.post('/do', async (req, res) => {
    const userUuid = req.body.cheat_user_uuid
    const cheatUrl = req.body.cheat_url

    bodyCheat.cheat_res = (doCheat(cheatUrl, userUuid)) ? `${cheatUrl} Done!` : "Error!"
    res.render(viewCheat, bodyCheat)
})

export default router