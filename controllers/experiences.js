const Experience = require('../models/experience');

module.exports = {
    create,
    getMyService,
    getAllExperiences,
    deleteService,
    editService,
    addPhoto,
};

async function create(req, res) {
    try {
        const experience = await Experience.create({
            user: req.user._id,
            serviceName: req.body.serviceName,
            serviceType: req.body.serviceType,
            description: req.body.description,
            pricePerHour: req.body.pricePerHour,
        });
        res.status(200).json(experience);
    } catch (err) {
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

async function addPhoto(req, res) {
    
}