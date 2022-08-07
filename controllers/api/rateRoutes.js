const express = require("express");
const {Rate} = require("../../models/");
const router = express.Router()

router.get("/", (req,res) =>{
  Rate.findAll()
  .then(dbUserData => {
    res.json(dbUserData)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.get("/:id", (req,res) =>{
  Rate.findOne({
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

router.post("/", (req,res) =>{
  Rate.create({
    id: req.body.id,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    rating: req.body.rating
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) =>{
  Rate.destory({
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