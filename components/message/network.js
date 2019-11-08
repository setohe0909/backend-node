const express = require("express");
const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");
const multer = require("multer");

const upload = multer({ dest: "public/files" });

router.get("/", function(req, res) {
  const filterMessage = req.query.chat || null;
  controller
    .getMessages(filterMessage)
    .then(messageList => {
      response.success(req, res, messageList, 200);
    })
    .catch(e => {
      response.error(req, res, "Unexpeted Error", 500, e);
    });
});

router.post("/", upload.single("file"), function(req, res) {
  controller
    .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then(fullMessage => {
      response.success(req, res, fullMessage, 200);
    })
    .catch(() => {
      response.error(req, res, "Información invalida", 400, "Error");
    });
});

router.patch("/:id", function(req, res) {
  controller
    .update(req.params.id, req.body.message)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(e => {
      response.error(req, res, "Error Interno", 400, e);
    });
});

router.delete("/:id", function(req, res) {
  controller
    .deleteMessage(req.params.id)
    .then(data => {
      response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
    })
    .catch(e => {
      response.error(req, res, "Error Interno", 500, e);
    });
});

module.exports = router;
