const express = require('express')
const bountyRouter = express.Router()
// const uuid = require('uuid')
const Bounty = require('../models/bounties')
// const bounties = 'some bounties'

bountyRouter.route('/')
    .get((req, res, next) => {
        Bounty.find((error, bounty) => {
            if (error) {
                res.status(500)
                return next(error)
            }
            return res.status(200).send(bounty)
        })
    })
    .post((req, res, next) => {
        const newBountyObj = new Bounty (req.body)
        newBountyObj.save(err => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(newBountyObj)
        })
    })
bountyRouter.route('/:bountyId')
    .get((req, res, next) => {
        Bounty.findById(req.params.bountyId, (err, bounty) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(bounty)            
        })
    })
    .delete((req, res, next) => {
        Bounty.findByIdAndRemove(req.params.bountyId, (error, bounty) => {
            if (error) {
                res.status(500)
                return next(error)
            }
            const response = {
                message: 'Bounty successfully deleted'
            }
            return res.status(200).send(response)
        })
    })
    .put((req, res, next) => {
        Bounty.findByIdAndUpdate(
            req.params.bountyId, 
            req.body, 
            {new:true},
            (err, bounty) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.send(bounty)
            }
        )


        // const bountyId = req.params.bountyId
        // const newBountyObject = req.body
        // const bountyIndex = bounties.findIndex(index => index.id === bountyId)
        // // replaces values that are different from the stored bounty with the new bounty values, ie updates anything new.
        // const updateBounty = Object.assign(bounties[bountyIndex], newBountyObject)
        // res.send(`Successfully updated bounty information for ${updateBounty.firstName}.`)
    })

module.exports = bountyRouter