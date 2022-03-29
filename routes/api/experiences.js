const express = require('express');
const router = express.Router();
const experiencesCtrl = require('../../controllers/experiences');

router.post('/', experiencesCtrl.create);
router.get('/my-service', experiencesCtrl.getMyService);
router.delete('/:id', experiencesCtrl.deleteService);
router.post('/:id', experiencesCtrl.editService);

module.exports = router;