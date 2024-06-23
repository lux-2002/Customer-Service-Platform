const express = require('express');
const mongoose = require('mongoose');
const Request = require('../models/Request');
const router = express.Router();
const Intercom = require('intercom-client');
const client = new Intercom.Client({ token: 'INTERCOM_ACCESS_TOKEN' });

mongoose.connect('mongodb://localhost:27017/customer-service', { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/requests', (req, res) => {
  const newRequest = new Request({
    user: req.user.id,
    category: req.body.category,
    comments: req.body.comments
  });
  newRequest.save().then(request => {
    client.messages.create({
      message_type: 'inbox',
      body: request.comments,
      from: { type: 'user', user_id: req.user.id }
    });
    res.json(request);
  });
});

router.get('/requests/:category', (req, res) => {
  Request.find({ category: req.params.category }).then(requests => res.json(requests));
});

module.exports = router;
