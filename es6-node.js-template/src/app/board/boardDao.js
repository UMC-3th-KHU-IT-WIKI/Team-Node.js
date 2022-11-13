/*
BoardInfo table에 들어갈 columns는
boardid, nickname, content만 한다.
+생성 일시도 넣으면 좋긴 하겠다.(시간이 있으면....)
 */
export const selectBoard = async (connection) => {
  const selectBoardListQuery = `
        SELECT boardid, nickname, content FROM BoardInfo;
    `;
  const [Boardlist] = await connection.query(selectBoardListQuery);
  return Boardlist;
};

export const selectBoardNickname = async (connection, nickname) => {
  const selectBoardNicknameQuery = `
        SELECT boardid, nickname, content FROM BoardInfo WHERE nickname = ?;
    `;

  const [NicknameBoardList] = await connection.query(
    selectBoardNicknameQuery,
    nickname
  );
  return NicknameBoardList;
};

export const insertBoardInfo = async (connection, insertBoardInfoParams) => {
  const insertBoardInfoQuery = `
    INSERT INTO BoardInfo(boardid, nickname, content) VALUES (?, ?, ?);
    `;

  const insertBoardInfoRow = await connection.query(
    insertBoardInfoQuery,
    insertBoardInfoParams
  );

  return insertBoardInfoRow;
};

export const selectContentBoardId = async (connection, boardid) => {
  const selectContentBoardidQuery = `
        SELECT boardid, nickname, content FROM BoardInfo WHERE boardid = ?;
    `;
  const [contentboardidRow] = await connection.query(
    selectContentBoardidQuery,
    boardid
  );
  return contentboardidRow;
};

export const selectBoardId = async (connection, boardid) => {
  const selcetBoardidQuery = `
        SELECT boardid FROM BoardInfo WHERE boardid= ?;
    `;
  const [boardidRow] = await connection.query(
    selectContentBoardidQuery,
    boardid
  );
  return boardidRow;
};

export const updateBoardInfo = async () => {
  const updateBoardQuery = `
    UPDATE BoardInfo SET content = ? WHERE boardid = ?;`;
  const updateBoardRow = await connection.query(updateBoardQuery, [
    content,
    boardid,
  ]);
  return updateBoardRow[0];
};
