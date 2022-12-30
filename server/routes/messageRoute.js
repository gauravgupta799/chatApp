const router = require("express").Router();
const {addMessage, getAllMessages} = require("../controllers/messageController");

router.post("/addMsg" , addMessage);
router.post("/getMsg" , getAllMessages);

module.exports = router;