import { errResponse, response } from "../../config/response";
import baseResponse from "../../config/baseResponseStatus";
import pool from "../../config/databse";
import {selectType, selectName} from "./StoreDao";

export const findByName = async(name,page,pageSize)=>{
    //Dao에서 검색해서
    //가게 이름, 이미지, 타입, 주소 반환
    const connection = await pool.getConnection(async conn => conn);

    const start = (page-1)*pageSize;

    const stores = await selectName(connection, name,start,pageSize);

    if(stores.length ==0) {
        return errResponse(baseResponse.DB_ERROR);
    }

    connection.release();

    console.log(stores);

    return stores;
}

export const findByType = async(type,page,pageSize)=>{
    const connection = await pool.getConnection(async conn => conn);

    const start = (page-1)*pageSize;
    
    const stores = await selectType(connection, type,start,pageSize);

    if(stores.length ==0) {
        return errResponse(baseResponse.DB_ERROR);
    }

    connection.release();

    return stores;
}