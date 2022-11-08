const express = require('express');
const router = express.Router();
const {renderBoard, getNewComment, updateComment, findComment} = require('../controllers/board ');
const pool = require('../db');

//board.ejs에서 href 가 /board 로 이동하고 해당 라우트에서는 /new 로 이동해 최종적으로 /board/new 로 이동하면서
// 새로운 게시글 Form 과 새롭게 게시된 글의 대한 정보 업데이트 
router.route('/newboard').get(renderBoard).post(getNewComment);
router.route('/').patch(updateComment).get(findComment);


module.exports = router;
