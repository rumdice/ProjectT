import express = require('express');

let res_view = 'test';
let res_body = {
    title: 'test',
    dbRow: 0
};

const router = express.Router();
router.get('/', async (req, res) => {
    res.render(res_view, res_body);
});

router.post('/search', async (req, res) => {
    let user_id = req.body.userid;

    res_body.dbRow = 1;
    res.render(res_view, res_body);
});

export default router;