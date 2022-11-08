const { renderHome, newUser, newUserPost } = require("../controllers/home");

const express = require('express');
const router = express.Router();

//라우투는 컨트롤러에 폴더에 있는 미들웨어를 끌어와 실행시켜주는 공간.
//내가 해당 uri 전송시 다음과 같은 미들웨어 실행시켜줘.
router.route('/').get(renderHome);
//새로운 멤버 받기위한 Form 제공
router.route('/new').get(newUser).post(newUserPost)


module.exports = router;