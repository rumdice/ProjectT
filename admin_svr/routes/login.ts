import express from 'express'
import { checkAdminInfo, setLogin } from '../controller/login'

const viewLogin = 'login'
const bodyLogin = {
    title: 'login',
}

const bodyHome = {
    title: 'home'
}

const router = express.Router()
router.get('/', (req, res) => {
    res.render(viewLogin, bodyLogin)
})

router.post('/login', async (req, res) => {
    // TODO : 로그인 기능을 정석으로 구현하려면 session 생성,관리와 redis연결이 필요함.
    // 일단은 간략하게 운영서버 메모리에 상태값만 저장 (운영서버 재시작시 상태정보가 날라감)
    const id = req.body.admin_id
    const pwd = req.body.admin_pwd

    if (!checkAdminInfo(id, pwd)) {
        res.render(viewLogin, bodyLogin) // 다시 로그인 화면으로 보내기 (에러 처리 x)
    }

    setLogin()

    res.render(bodyHome.title, bodyHome)
})

export default router