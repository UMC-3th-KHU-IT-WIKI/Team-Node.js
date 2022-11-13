const pool = require("../config/database");
const { selectUser, selectUserAccount, selectUserEmail, selectUserId, selectUserPassword } = require("../dao/userDao");


///CRUD 중 READ에 관한 부분 

exports.retrieveUserList = async(email) =>{
    if(!email){
        const connection = await pool.getConnection(async conn => conn);
        const userListResult = await selectUser(connection);
        connection.release();

        return userListResult;
    }
    else{
        const connection = await pool.getConnection(async conn => conn);
        const userListResult = await selectUserEmail(connection, email);
        connection.release();

        return userListResult;
    }
}

exports.retrieveUser = async(userId) =>{
    const connection = await pool.getConnection(async conn => conn);
    const userResult = await selectUserId(connection,userId);

    connection.release();

    return userResult[0];
}

exports.emailCheck = async (email) =>{
    const connection = await pool.getConnection(async conn => conn);
    const emailCheckResult = selectUserEmail(connection,email);

    connection.release();

    return emailCheckResult;
}


exports.passwordCheck = async(selectUserPasswordParams) =>{
    const connection = await pool.getConnection(async conn => conn);
    const passwordCheckResult = await selectUserPassword(
        connection,selectUserPasswordParams
    );

    connection.release();
    return passwordCheckResult[0];
}


exports.accountCheck = async (email) =>{
    const connection = await pool.getConnection(async conn => conn);
    const userAccountResult = await selectUserAccount(connection, email);
    connection.release();

    return userAccountResult;
}