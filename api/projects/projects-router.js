// Write your "projects" router here!
const express = require('express');
const projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
    projects.get()
    .then((projects) => {
        res.status(200).json(projects)
    })
    .catch((error) => {
        next(error)
    }) 
});

router.get('/:id', validateProjectID(), (req, res) => {
    res.status(200).json(req.project)
})

router.get('/:id/actions', validateProjectID(), (req, res) => {
    projects.getProjectActions(req.params.id)
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch((error) => {
        next(error)
    })
})

router.post('/', validateProjectID(), (req, res) => {
    projects.insert(req.body)
        .then((project) => {
            res.status(201).json(project)
        })
        .catch((error) => {
            next(error)
        })
})

router.put('/:id', validateProjectID(), (req, res) => {
    projects.update(req.params.id, req.body)
    .then((project) => {
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({
                message: "The project could not be found."
            })
        }
    })
    .catch((error) => {
        next(error)
    })
})

router.delete('/:id', validateProjectID(), (req, res) => {
    projects.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The project has been deleted."
                })
            } else {
                res.status(404).json({
                    message: "The project could not be found."
                })
            }
        })
        .catch((error) => {
            next(error)
        })
})

function validateProjectID (req, res, next) {
    return (req, res, next) => {
        projects.get(req.params.id)
        .then((project) =>{
            if (project) {
                req.project = project
                next()
            } else {
                res.status(404).json({
                    message: "Project not found."
                })
            }
        })
        .catch((error) => {
            next(error)
        })
    }
}

module.exports = router;