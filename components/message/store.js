const Model = require("./Model");
const list = [];

function addMessage(message) {
  list.push(message);
  const myMessage = new Model(message);
  myMessage.save();
}

function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterChat !== null) {
      filter = { chat: filterChat };
    }

    const messages = Model.find(filter)
      .populate("User")
      .exec((err, populated) => {
        if (error) {
          reject(error);
          return false;
        }
        resolve(populated);
      });
  });
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({
    _id: id
  });

  foundMessage.messages = message;
  const newMessage = await foundMessage.save();
  return newMessage;
}

function removeMessage(id) {
  return Model.deleteOne(id);
}

module.exports = {
  add: addMessage,
  list: getMessages,
  update: updateText,
  remove: removeMessage
};
