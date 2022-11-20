export const checkUserExists=async(connection, email)=>{
    //겹치는 유저 정보가 있는지

    const selectSameEmail = `select * from customer where email='${email}';`;

    const check = await connection.query(selectSameEmail);

    return check[0];
}

export const createUser =async (connection, userInfos)=>{
    //db에 유저 정보 생성

    console.log("유저 생성");

    const insertUserInfo = `
    insert into customer(customerId, name, username, password, email, birth, contact, address, credit, createdAt)
    values (?,?,?,?,?,?,?,?,?,?);
    `;

    const insertUserInfoRow = await connection.query( insertUserInfo, userInfos);
    
    return insertUserInfoRow;
}

export const updateUser= async (connection, updateInfo)=>{
    //user 정도 업데이트
    const updateUserInfo = `
    update customer set name=?,birth=?,contact=?,address=?,updatedAt=? where customerId=?;
    `;

    const updateUserInfoRow = await connection.query(updateUserInfo, updateInfo);

    return updateUserInfoRow;
}