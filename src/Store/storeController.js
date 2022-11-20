import { errResponse, response } from "../../config/response";
import baseResponse from "../../config/baseResponseStatus";
import mysql from 'mysql2/promise';
import { findByName, findByType } from './storeProvider';

export const home = (req, res)=>
{
    return res.render("home");
}

export const getSearch = (req,res)=>{
    return res.render("search");
}

export const postSearch = (req,res)=>{
    const {name, type} = req.body;

    if(name != undefined){
        return res.redirect(`/stores/name?name=${name}&page=1&pageSize=10`);
    } else if(type != undefined){
        return res.redirect(`/stores/type?type=${type}&page=1&pageSize=10`);
    } else{
        res.redirect("/search");
    }

    return res.end();
}

export const getByName = async(req,res)=>{
    const {name}= req.query;
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    if(page <=0) page = 1;

    const stores = await findByName(name,page,pageSize);

    return res.send(stores);
}

export const getByType = async(req,res)=>{
    const{type}=req.query;
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    if(page <=0) page = 1;

    const stores = await findByType(type,page,pageSize);

    return res.send(stores);
}

export const showStore = (req,res)=>{
    
}