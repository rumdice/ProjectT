import express = require('express');
import { checkAdminInfo, setLogin } from '../common';

let res_view = 'login';
let res_body = {
    title: 'login',
};

let res_home_body = {
    title: 'home'
};

const router = express.Router();
router.get('/', (req, res) => {
    res.render(res_view, res_body);
});

router.post('/login', async (req, res) => {

    // TODO : 로그인 기능을 정석으로 구현하려면 session 생성,관리와 redis연결이 필요함.
    // 일단은 간략하게 운영서버 메모리에 상태값만 저장 (운영서버 재시작시 상태정보가 날라감)
    let id = req.body.admin_id;
    let pwd = req.body.admin_pwd;
    
    if (!checkAdminInfo(id, pwd)) {
        res.render(res_view, res_body); // 에러 - 로그인 실패 다시 로그인 화면으로 보내기
    }
    
    setLogin();

    res.render(res_home_body.title, res_home_body);
});

export default router;