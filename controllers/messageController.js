const db = require("../db/queries");

async function getMessages(req, res) {
  try {
    const messages = await db.getAllMessages();

    res.render("index", { messages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not load messages");
  }
}

function getNewMessageForm(req, res) {
  res.render("new");
}

async function createMessage(req, res) {
  try {
    const username = req.body.username?.trim();
    const text = req.body.text?.trim();

    if (!username || !text) {
      return res.status(400).send("All fields are required");
    }

    if (username.length > 255) {
      return res.status(400).send("Username is too long");
    }

    if (text.length > 5000) {
      return res.status(400).send("Message is too long");
    }

    await db.insertMessage(username, text);

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not save message");
  }
}

async function getMessage(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).send("Invalid message ID");
    }

    const message = await db.getMessageById(id);

    if (!message) {
      return res.status(404).send("Message not found");
    }

    res.render("message", { message });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not load message");
  }
}

module.exports = {
  getMessages,
  getNewMessageForm,
  createMessage,
  getMessage,
};
