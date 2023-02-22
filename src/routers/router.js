const express = require("express");
const auth = require('../middleware/auth')
const router = new express.Router();
const User = require('../models/user')
const { signUp,
  login,
  logout,
  logoutAll,
  me,
  users,
  specificUser,
  updateUser,
  deleteUser,
} = require('../controller/controller')

router.post('/signUp', signUp)

router.post('/users/login', login)

router.post('/users/logout', auth, logout)

router.post('/users/logoutAll', auth, logoutAll)

router.get('/users/me', auth, me)

router.get('/users', auth, users)

router.get('/users/:id', specificUser)

router.patch('/users/:id', updateUser)

router.delete('/users/:id', deleteUser)


module.exports = router
