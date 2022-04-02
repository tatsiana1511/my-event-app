const Experience = require('../models/experience');
const AWS = require('aws-sdk');

module.exports = {
    create,
    getMyService,
    getAllExperiences,
    deleteService,
    editService,
};

async function create(req, res) {
    try {
        if (!req.file) {
            res.status(400).json({
                errors: [
                    {
                        msg: 'Please upload a file, or click next'
                    }
                ]
            });
        }
        const file = req.file;

        if (!file.mimetype.startsWith('image')) {
            console.log('shit')
            res.status(400).json({error: 'Image only'});
        }
        file.name = `photo_${file.originalname}`;

        let Blob = req.file.buffer;

        const s3 = new AWS.S3();

        let params =  {
            Bucket: process.env.S3_BUCKET,
            Key: file.name,
            Body: Blob
        };
        s3.upload(params, function(err, data) {
            console.log(err, data);
        });
        const experience = await Experience.create({
            user: req.user._id,
            serviceName: req.body.serviceName,
            serviceType: req.body.serviceType,
            description: req.body.description,
            pricePerHour: req.body.pricePerHour,
            serviceLocation: req.body.serviceLocation,
            servicePhoto: file.name,
        });
        res.status(200).json(experience);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}

async function getMyService(req, res) {
    try {
        let myService = await Experience.findOne({user: req.user._id}).exec();
        res.status(200).json(myService);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getAllExperiences(req, res) {
    try {
        let allExperiences = await Experience.find({}).exec();
        res.status(200).json(allExperiences);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function deleteService(req, res) {
    try {
        await Experience.deleteOne({_id: req.params.id});
        res.status(200).json();
    } catch (err) {
        res.status(400).json(err);
    }
}

async function editService(req, res) {
    try {
        await Experience.findOneAndUpdate({_id: req.params.id}, {
            serviceName: req.body.serviceName,
            serviceType: req.body.serviceType,
            description: req.body.description, 
            pricePerHour: req.body.pricePerHour,
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json(err);
    }
} 