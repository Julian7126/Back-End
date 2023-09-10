import mongoose from 'mongoose';

const messagesCollection = 'messages';

const messagesSchema = new mongoose.Schema({
  email: {
    type: String,
   
  },
  message: {
    type: String,
    
  },
});

const messagesModel = mongoose.model(messagesCollection, messagesSchema);
export default messagesModel;
