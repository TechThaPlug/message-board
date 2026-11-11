const { Router } = require("express");

const {
  getMessages,
  getNewMessageForm,
  createMessage,
  getMessage,
} = require("../controllers/messageController");

const router = Router();

router.get("/", getMessages);

router.get("/new", getNewMessageForm);

router.post("/new", createMessage);

router.get("/message/:id", getMessage);

module.exports = router;
