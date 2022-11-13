const express = require("express");
const router = express.Router();
const boards = require('../controllers/boardController');



router.route('/app/boards').post(boards.postBoard).get(boards.getBoards).delete(boards.deleteBoard);
router.route('/app/boards/:boardId').get(boards.getBoardById).patch(boards.patchBoards);



module.exports = router;
