const { errResponse, response } = require("../config/response");
const  regexEmail = require("regex-email");
const  baseResponse = require( "../config/baseResponseStatus");
const  { createUser, editUser, postSignIn } = require( "../service/userService");
const  { retrieveUser, retrieveUserList }  = require("../provider/userProvider");



module.exports.getTest = async (req,res) => {
   return res.send(response(baseResponse.SUCCESS));
}


//회원가입 폼 rendering 
module.exports.renderRegister = (req,res) => {
    res.render('users/register');
}


 module.exports.postUsers = async (req,res)=>{
    const {email, password, nickname} = req.body;
    
    if (!email)
        return res.send(response(baseResponse.SIGNIN_EMAIL_EMPTY));
    
    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNIN_EMAIL_LENGTH));

    // 형식 체크
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));

    // 기타 등등 미션에 따라서 추가하기

    const signUpResponse = await createUser(email, password, nickname);
    return res.send(signUpResponse);
}



 module.exports.getUsers = async (req,res) =>{


    const email = req.params.email;

    if(!email){
        // 유저 전체 조회
        const userListResult = await retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    }else{
        const userListbyEmail = await retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListbyEmail));
    }
}

 module.exports.getUserById = async(req,res) =>{
    const userId = req.params.userId;
    console.log(userId);
    if (!userId)
        return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    
    const userByUserId = await retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS,userByUserId));
}


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */

 module.exports.login = async (req,res)=>{
    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await postSignIn(email,password);

    return res.send(signInResponse);
}


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
 module.exports.patchUsers = async (req,res) =>{
    const userIdFromJWT = req.verifiedToken.userId;

    const {params:{userId}, body:{nickname}} = req;

    if (userIdFromJWT != userId)
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    else{
        if (!nickname)
            return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
        
        const editUserInfo = await editUser(userId,nickname);
        return res.send(editUserInfo);
    }
}