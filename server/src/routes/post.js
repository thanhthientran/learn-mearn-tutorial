const express = require('express')
const router = express.Router()
const postController = require('./../app/controller/PostController')
const verifyToken = require('../middleware/auth')

router.post('/test',postController.test)
router.post('/create',verifyToken, postController.create)
router.put('/:id/edit', verifyToken, postController.edit)
router.delete('/:id/delete',verifyToken, postController.destroy)
router.get('/',verifyToken, postController.read)

module.exports = router