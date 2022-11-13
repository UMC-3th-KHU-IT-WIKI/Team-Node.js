module.exports.selectBoard = async (connection) =>{
  const selectBoardListQuery = `
      SELECT title, content
      FROM BoardInfo;
  `
  const [boardRows] = await connection.query(selectBoardListQuery);
  return boardRows;
}



module.exports.selectBoardContent = async(connection, content) => {
  const selectBoardContentQuery = `
    SELECT title, content
    FROM BoardInfo
    WHERE username = ?;
  `;

  const [contentRows] = await connection.query(selectBoardContentQuery.content);
  return contentRows;
}



module.exports.insertBoardInfo =  async (connection, insertBoardInfoParams) =>{
    const insertBoardInfoQuery = `
    INSERT INTO BoardInfo(title, username, content)
    VALUES (?,?,?);
    `;

  const insertBoardInfoRow = await connection.query(
    insertBoardInfoQuery,
    insertBoardInfoParams
  );

  return insertBoardInfoRow;
};


module.exports.updateBoardInfo = async(connection,title, username) =>{
  const updateBoardQuery = `
  UPDATE BoardInfo SET title=? WHERE username=?;`;
  const updateBoardRow = await connection.query(updateBoardQuery, [title, username]);
  return updateBoardRow[0];
}


module.exports.deleteBoardInfo = async(connection, deleteBoardInfoParams) =>{
  const deleteBoardQuery = `
  DELETE FROM BoardInfo
  WHERE username = ?;`;
  const deleteBoardRow = await connection.query(deleteBoardQuery, deleteBoardInfoParams);
  return deleteBoardRow;
}