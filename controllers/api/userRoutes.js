const express = require("express");
const {User, Comment, Post, Rate} = require("../../models/");
const router = express.Router();
const {checkPassword} = require('../../util/helpers');
let user;

// GET /api/user
router.get("/", (req,res) =>{
  User.findAll()
    .then(dbUserData => {
      res.json(dbUserData)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    })
});

// GET /api/user/1
router.get("/:id", (req,res) =>{
  User.findOne({
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

// GET /api/user/username/*username
router.get("/username/:user", (req,res) =>{
  User.findOne({
    where: {
      username: req.params.user
    },
    attributes: {exclude: ['username', 'email', 'password']}
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

// PUT /api/user/1
router.put('/:id', (req, res) => {
  User.update(req.body, {
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

// POST /api/user
router.post("/", (req,res) =>{
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    })
});

// POST /api/user/login
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }
    user = dbUserData;

    async function validatePassword(input, hash){
      const validate = await checkPassword(input, hash)
      return validate;
    }

    return validatePassword(req.body.password, dbUserData.dataValues.password);
  }).then(result => {
    console.log(result);
    if(!result){
      res.status(400).json({message: 'Incorrect Password!'})
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user: user, message: 'You are now logged in!' });
    });
  });
})

//POST /api/user/logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
})

// DELETE /api/user/1
router.delete("/:id", (req, res) =>{
  User.destroy({
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


module.exports = router;