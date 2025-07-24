import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  _id: String,
  img: String,
  name: String,
  title: String,
  desc: String,
  article: String,
  category: String,
});

export default mongoose.model('article', articleSchema);
