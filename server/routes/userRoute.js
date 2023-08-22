const express = require('express')
const {
    getUsers,
    getUserId,
    getUserUsername,
    createUser,
    deleteUser,
} = require('../controllers/userController')

//create an instance of the router
const router = express.Router()

//get all items
router.get('/', getUsers)

//get single item
router.get('/:id', getUserId)

//get single user by username
router.get('/:username', getUserUsername)

//post new item
router.post('/', createUser)

//delete an item
router.delete('/:id', deleteUser)

module.exports = router
