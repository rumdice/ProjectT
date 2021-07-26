import express = require('express');

let res_view = 'home';
let res_body = {
    title: 'home'
};

const router = express.Router();
router.get('/', (req, res) => {
    res.render(res_view, res_body);
});

export default router;