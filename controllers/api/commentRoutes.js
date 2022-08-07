const express = require("express");
const {Comment} = require("../../models/");
const router = express.Router()

router.get("/", (req,res) =>{
  Comment.findAll()
  .then(dbUserData => {
    console.log(dbUserData)
    res.json(dbUserData)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.get("/:id", (req,res) =>{
  Comment.findOne({
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
    });});

router.post("/", (req,res) =>{
  Comment.create({
    id: req.body.id,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    comment_text: req.body.comment_text
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) =>{
  Comment.destory({
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