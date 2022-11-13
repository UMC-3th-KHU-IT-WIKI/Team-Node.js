const express = require("express");
//const app  = require("../../../config/express");
const { jwtMiddleware } = require("../config/jwtMiddleware");
const router = express.Router();
const users = require('../controllers/userController');

router.route('/test').get(users.getTest);


//회원가입 폼 가져오기.
//uri : localhost://3000/users/register
//app.js 에 기본 uri 설정이 users 가 전제됨 .
//egister는 그 뒤에 붙는것.
router.route('/app/users').post(users.postUsers).get(users.getUsers);
router.route('/app/login').post(users.login);
router.route('/app/users/:userId').get(users.getUserById).patch(users.patchUsers);

module.exports = router; 


/*

    // 0. 테스트 API
    // app.get('/app/test', user.getTest)

    // 1. 유저 생성 (회원가입) API
    app.post('/app/users', user.postUsers);

    // 2. 유저 조회 API (+ 검색)
    app.get('/app/users',user.getUsers); 

    // 3. 특정 유저 조회 API
    app.get('/app/users/:userId', user.getUserById);


    // TODO: After 로그인 인증 방법 (JWT)
    // 로그인 하기 API (JWT 생성)
    app.post('/app/login', user.login);

    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    app.patch('/app/users/:userId', jwtMiddleware, user.patchUsers)



*/

