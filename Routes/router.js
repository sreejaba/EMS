const express = require('express')
const router = new express.Router()

const userController = require('../Controller/userController')
const uploads = require('../multetConfig/storageConfig')

router.post('/employee/register',uploads.single('user_profile'),userController.register)


router.get('/employee/get-all-employee-details',userController.getusers)


router.get('/employee/view-profile/:id',userController.viewProfile)

router.delete('/employee/delete-user/:id',userController.deleteUser)

router.put('/employee/update-user/:id',userController.editUser)

module.exports = router

