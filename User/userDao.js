
export const selectUser = async (connection) =>{
    const selectUserListQuery = `
        SELECT email, nickname 
        FROM User;
    `
    const [userRows] = await connection.query(selectUserListQuery);
    return userRows;
}


export const selectUserEmail = async (connection, email)=>{
    const selectUserEmailQuery = `
        SELECT email, nickname
        FROM User
        WHERE email = ?;
    `;

    const [emailRows] = await connection.query(selectUserEmailQuery,email);
    return emailRows;
}

export const insertUserInfo =  async (connection, insertUserInfoParams) =>{
    const insertUserInfoQuery = `
    INSERT INTO User(email, password, nickname)
    VALUES (?, ?, ?);
    `;

  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

export const selectUserId = async(connection, userId)=>{
    const selectUserIdQuery = `
        SELECT id, email, nickname 
        FROM User 
        WHERE id = ?;
    `;
    const [userRow] = await connection.query(selectUserIdQuery, userId);
    return userRow;
}

export const selectUserPassword = async (connection, selectUserPasswordParams)=>{
    const selectUserPasswordQuery = `
        SELECT email, nickname, password
        FROM User 
        WHERE email = ? AND password = ?;`;
    const selectUserPasswordRow = await connection.query(
    selectUserPasswordQuery,
    selectUserPasswordParams
);

return selectUserPasswordRow;
}

export const selectUserAccount = async(connection, email) =>{
    const selectUserAccountQuery = `
    SELECT status, id
    FROM User 
    WHERE email = ?;`;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email   
    );
    return selectUserAccountRow[0];
}

export const updateUserInfo = async() =>{
    const updateUserQuery = `
    UPDATE User 
    SET nickname = ?
    WHERE id = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
    return updateUserRow[0];
}

export const selectUserInfo = async (connection,page)=>{
    const slectUserInfoQuery = `
    SELECT id, email, nickname, status
    FROM User
    LIMIT ${process.env.USERINFO_OFFSET * (page-1)},${process.env.USERINFO_OFFSET};`;
    const [result] = await connection.query(selectUserInfoQuery);
    return result
}