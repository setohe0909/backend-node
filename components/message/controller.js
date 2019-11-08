const store = require("./store");
const socket = require("../../socket").socket;

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.log("[Message-controller]- there is not user");
      reject("Wrong data");
      return false;
    }

    let fileURL = "";
    if (file) {
      fileURL = `http://localhost:3000/app/files/${file.filename}`;
    }

    const fullMessage = {
      chat,
      user,
      message,
      date: new Date(),
      file: fileURL
    };

    store.add(fullMessage);
    socket.io.emit("message", fullMessage);

    resolve(fullMessage);
  });
}

function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterChat));
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject("Invalid data");
      return false;
    }

    const result = await store.update(id, message);
    resolve(result);
  });
}

function deleteMessage(id) {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      reject("Invalid data");
      return false;
    }

    store
      .remove(id)
      .then(() => resolve())
      .catch(e => reject(e));
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage
};
