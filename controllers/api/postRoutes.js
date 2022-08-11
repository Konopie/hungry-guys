const express = require("express");
const {Post, User} = require("../../models/");
const router = express.Router()

// GET /api/post
router.get("/", (req,res) =>{
  Post.findAll()
    .then(dbUserData => {
      res.json(dbUserData)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    })
});

// GET /api/post/1
router.get("/:id", (req,res) =>{
  Post.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET /api/post/userID/1
router.get("/userID/:id", (req,res) =>{
  Post.findAll({
    where: {
      user_id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// PUT /api/post/1
router.put('/:id', (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// POST /api/post
router.post("/", (req,res) =>{
  Post.create({
    id: req.body.id,
    user_id: req.body.user_id,
    post_text: req.body.post_test,
    post_url: req.body.post_url
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    })
});

// DELETE /api/post/1
router.delete("/:id", (req, res) =>{
  Post.destory({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData =>{
      if (!dbUserData){
        res.status(404).json({ message: 'No user found with this id'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;