// Write your "actions" router here!
const express = require('express')
const actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res) => {
    actions.get()
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch((error) => {
        next(error)
    })
})

router.get('/:id', validateActionId(), (req, res) => {
    actions.get(req.params.id)
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch((error) => {
        next(error)
    })
})

router.post('/', validateActionId(), (req, res) => {
    actions.insert(req.body)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((error) => {
        next(error)
    })
})

router.put('/:id', validateActionId(), (req, res) => {
    actions.update(req.params.id, req.body)
    .then((action) => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({
                message: "The action could not be found."
            })
        }
    })
    .catch((error) => {
        next(error)
    })
})

router.delete('/:id', validateActionId(), (req, res) =>{
    actions.remove(req.params.id)
    .then((count) => {
        if (count > 0) {
            res.status(200).json({
                message: "The action has been deleted."
            })
        } else {
            res.status(404).json({
                message: "The action could not be found."
            })
        }
    })
    .catch((error) => {
        next(error)
    })
})

function validateActionId(req, res, next) {
    return (req, res, next) => {
        actions.get(req.params.id)
        .then((action) =>{
            if (action) {
                req.action = action
                next()
            } else {
                res.status(404).json({
                    message: "Action not found."
                })
            }
        })
        .catch((error) => {
            next(error)
        })
    }
}
module.exports = router