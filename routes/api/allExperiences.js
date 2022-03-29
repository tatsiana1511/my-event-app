const express = require('express');
const router = express.Router();
const experiencesCtrl = require('../../controllers/experiences');

router.get('/', experiencesCtrl.getAllExperiences);

module.exports = router;