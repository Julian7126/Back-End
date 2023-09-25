import express from 'express';
import * as chatController from "../controller/chatController.js";


const chatRouter = express.Router();

chatRouter.get('/', chatController.getMessages);
chatRouter.post('/add', async (req, res) => {
  await chatController.addMessage(req.body, null, res);
});

export default chatRouter;
