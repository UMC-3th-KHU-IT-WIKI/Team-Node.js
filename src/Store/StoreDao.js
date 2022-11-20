export const selectName = async(connection, name, start,pageSize)=>{
    //가게 이름, 이미지, 타입, 주소 반환

    const selectTypeQuery = `
    select storeName, type, address from store where storeName='${name}' limit ${start}, ${pageSize};
    `; //store update에서 imageUrl 등록 후 추가.

    const selectedStore = await connection.query(selectTypeQuery);

    return selectedStore[0];
}

export const selectType = async(connection, type, start, pageSize)=>{
    //가게 이름, 이미지, 타입, 주소 반환

    const selectTypeQuery = `
    select storeName, type, address from store where type='${type}' limit ${start}, ${pageSize};
    `; //store update에서 imageUrl 등록 후 추가.

    console.log(`${start}, ${pageSize}`);

    const selectedStore = await connection.query(selectTypeQuery);

    console.log(selectedStore[0]);

    return selectedStore[0];
}