import { errResponse, response } from "../../config/response";
import baseResponse from "../../config/baseResponseStatus";
import { joinUser, editUser, login } from "./userService";
import { v4 } from "uuid";

export const getJoin = (req, res)=>{
    res.render("join");
}

export const postJoin = async (req,res)=>{
    const {name, username, password,password2, email, birth, contact, address, credit} = req.body;

    if(password !== password2){
        console.log("비밀번호 확인 잘못 입력함");
        return res.status(400).render("join");
    }
    try{
        joinUser(Math.floor(Math.random()*1000000000000000), 
        name, username, password, email, birth, contact, address, credit, new Date());
    } catch(error){
        console.log(error);
        return res.status(400).render("join");
    }
    //return res.redirect("/login");
    return res.end();
}

export const getUpdate =(req,res)=>{
    return res.render("update-profile");
}

export const patchUpdate = (req,res)=>{
    const {name, birth, contact, address} = req.body; 
    const {id} = req.params;

    const userIdFromJWT =req.verifiedToken.userId;

    if(id != userIdFromJWT){
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    
    //session : {user : {_id}}, 
    //req.session.user = editUser(1111 ,name, birth, contact, address, new Date()); //postman에서는 session을 어떻게 가져오지?
    
    editUser(id ,name, birth, contact, address, new Date());

    return res.redirect(`/users/${id}/update`);
}

export const getLogin=(req,res)=>{
    return res.render("login");
}

export const postLogin=async(req,res)=>{
    const {email, password} = req.body;
    
    const loginResponse = await login(email,password);

    return res.send(loginResponse);
}