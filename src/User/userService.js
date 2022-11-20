require("dotenv").config();
import { errResponse, response } from "../../config/response";
import baseResponse from "../../config/baseResponseStatus";
import pool from "../../config/databse";
import { checkUserExists, createUser, updateUser } from "./userDao";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const joinUser = async(customerId, name, username, password, email, birth, contact, address, credit, createdAt) =>{
    try{
        const connection = await pool.getConnection(async conn => conn);

        const checkUser = await checkUserExists(connection, email);

        if(checkUser.length == 0){

            const hashedPassword = await bcrypt.hash(password, 3);
            
            const userInfos = [customerId, name, username, hashedPassword, email, birth, contact, address, credit, createdAt];
            const newUser = await createUser(connection, userInfos);

            console.log(`추가된 회원 : ${newUser[0].customerId}`);

            connection.release();

            return response(baseResponse.SUCCESS);
    } else {
        connection.release();

        console.log("이메일 겹침");

        return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
    }
    } catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }
}

export const editUser = async(_id,name, birth, contact, address, updatedAt) =>{
    //모델 자체를 return해야 함
    const connection = await pool.getConnection(async conn => conn);

    const updateInfo = [name, birth, contact, address,updatedAt,_id]; 

    console.log(_id);

    const updatedUser = await updateUser(connection, updateInfo);

    connection.release();

    return updatedUser[0];
}

export const login= async(email,password)=>{
    try{
        const connection = await pool.getConnection(async conn => conn);

        //email 확인
        const loginUser = await checkUserExists(connection, email);
        const loginUserData = loginUser[0];

        console.log(loginUserData);

        if(loginUser.length <1){
            return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
        }

        //password 확인
        if(!bcrypt.compare(password, loginUserData.password)){
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        //계정 상태 확인
        if(loginUserData.status == 0){
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        }

        console.log("모든 상태 확인 완료");

        let token = await jwt.sign(
            {
                //payload
                userId: loginUserData.customerId,
            },
            process.env.TOKEN_SECRET, //비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            }
        );

        console.log(token);
        
        connection.release();

        return response(baseResponse.SUCCESS, {'userId' :loginUserData.customerId, 'jwt' : token});

    } catch(e){
        return errResponse(baseResponse.DB_ERROR);
    }
}