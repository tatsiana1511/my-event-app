const express = require('express');
let multer = require('multer');
let upload = multer();
const router = express.Router();
const experiencesCtrl = require('../../controllers/experiences');

router.post('/', upload.single('file'), experiencesCtrl.create);
router.get('/my-service', experiencesCtrl.getMyService);
router.delete('/:id', experiencesCtrl.deleteService);
router.post('/:id', experiencesCtrl.editService);

module.exports = router;