const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/markdown-blog')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const PostSchema = new mongoose.Schema({
  content: String,
});

const Post = mongoose.model('Post', PostSchema);

app.post('/api/posts', (req, res) => {
  const newPost = new Post({
    content: req.body.content,
  });
  newPost.save().then(() => res.status(201).send('Post saved!'));
});

app.get('/api/posts', (req, res) => {
  Post.find().then((posts) => res.json(posts));
});

app.put('/api/posts/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { content: req.body.content }, { new: true })
    .then(updatedPost => {
      if (!updatedPost) {
        return res.status(404).send('Post not found');
      }
      res.send('Post updated successfully');
    })
    .catch(error => res.status(500).send(error.message));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.delete('/api/posts/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(deletedPost => {
      if (!deletedPost) {
        return res.status(404).send('Post not found');
      }
      res.send('Post deleted successfully');
    })
    .catch(error => res.status(500).send(error.message));
});