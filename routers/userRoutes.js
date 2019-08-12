const express = require('express');
const router = express.Router();
const userController =  require('../controllers/userControllers')

middleware = (req, res, next) => {
  console.log("first middleware")

  next()
}

router.get('/', middleware, userController.getUsers)
// create a user to add to DB of Users
router.post('/', userController.postUser)
//get a single user from DB
router.get('/:id', userController.getUserById)
//Delete a user by ID
router.delete('/:id',userController.deleteUser)
//Edit a user's data'
router.put('/:id', userController.editUser)

module.exports = router