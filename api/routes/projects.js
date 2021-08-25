const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const {connectionString, DB, collection} = require('../config/config');

//Imports asyncHandler middleware function
const { asyncHandler } = require('../middleware/async-handler');


//DB Connection
MongoClient.connect(connectionString, {
    useUnifiedTopology: true })
    .then (client => {

        //Create DB
        const db = client.db(DB);

        //Create Projects Collection
        const projectsCollection = db.collection('projects');

        // Route that returns all projects
        router.get('/projects', asyncHandler(async (req, res) => {
          const projects = await projectsCollection.find().toArray()
          res.json(projects);
        }));

        // Route that returns project for a specific skill
        router.get('/projects/:skill', asyncHandler(async (req, res) => {
          const {skill} = req.params ;
          const project  = await projectsCollection.find({skills: {$regex: skill, $options: 'i' }}).toArray()
          res.json(project);
        }));

    })
    .catch(error => console.error(error))


module.exports = router;
