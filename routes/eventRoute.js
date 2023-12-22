const router = require('express').Router();
const eventOperation = require('./../controller/event');

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: The events managing API
 * components:
 *   schemas:
 *     AllEvents:
 *       type: object
 *       required:
 *          upcomingEvents: 
 *              id
 *              eventName
 *              eventstartingtime
 *              eventduration
 *              createdAt
 *              updatedAt
 *          liveEvents: 
 *              id
 *              eventName
 *              eventstartingtime
 *              eventduration
 *              createdAt
 *              updatedAt
 *          pastEvents: 
 *              id
 *              eventName
 *              eventstartingtime
 *              eventduration
 *              createdAt
 *              updatedAt
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the book
 *         eventName:
 *           type: string
 *           description: The name of your event
 *         eventstartingtime:
 *           type: string
 *           format: date-time
 *           description: starting time
 *         eventduration:
 *           type: string
 *           description: duration
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the book was updated
 *       example:
 *          upcomingEvents:
 *              id: 1
 *              eventname: The New event
 *              eventstartingtime: 2022-02-27 07:50:00 PM
 *              eventduration: 01:00:00
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 *          liveEvents:
 *              id: 1
 *              eventname: The New event
 *              eventstartingtime: 2022-02-27 07:50:00 PM
 *              eventduration: 01:00:00
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 *          pastEvents:
 *              id: 1
 *              eventname: The New event
 *              eventstartingtime: 2022-02-27 07:50:00 PM
 *              eventduration: 01:00:00
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 *     CreateEvent:
 *       type: object
 *       required:
 *              eventName
 *              eventstartingtime
 *              eventduration
 *       properties:
 *         eventName:
 *           type: string
 *           description: The name of your event
 *         eventstartingtime:
 *           type: string
 *           format: date-time
 *           description: starting time
 *         eventduration:
 *           type: string
 *           description: duration
 *       example:
 *              eventname: The New event
 *              eventstartingtime: 2022-02-27 07:50:00 PM
 *              eventduration: 01:00:00
 *     EventsCreated:
 *       type: object
 *       required:
 *              id
 *              eventName
 *              eventstartingtime
 *              eventduration
 *              createdAt
 *              updatedAt
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the book
 *         eventName:
 *           type: string
 *           description: The name of your event
 *         eventstartingtime:
 *           type: string
 *           format: date-time
 *           description: starting time
 *         eventduration:
 *           type: string
 *           description: duration
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the book was updated
 *       example:
 *              id: 1
 *              eventname: The New event
 *              eventstartingtime: 2022-02-27 07:50:00 PM
 *              eventduration: 01:00:00
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 *     UpdateEvent:
 *       type: object
 *       required:
 *              id
 *              eventName
 *              eventstartingtime
 *              eventduration
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the book
 *         eventName:
 *           type: string
 *           description: The name of your event
 *         eventstartingtime:
 *           type: string
 *           format: date-time
 *           description: starting time
 *         eventduration:
 *           type: string
 *           description: duration
 *       example:
 *              id: 1
 *              eventname: The New event
 *              eventstartingtime: 2022-02-27 07:50:00 PM
 *              eventduration: 01:00:00
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: get all events info
 *     tags: [Events]
 *     responses:
 *       200:
 *          description: OK
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AllEvents'
 *       400:
 *         description: Appropriate error message
 *
 *       500:
 *         description: Some server error
 */
// GET ALL EVENTS INFORMATION
router.get('/', (req, res) => {
    eventOperation.findAll()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err)
        })
});

/**
 * @swagger
 * /add:
 *   post:
 *     summary: create event
 *     tags: [Events]
 *     requestBody:
 *       description: OK
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             $ref: '#/components/schemas/CreateEvent'
 *     responses:
 *       200:
 *          description: OK
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/EventsCreated'
 *       400:
 *         description: Appropriate error message
 *
 *       500:
 *         description: Some server error
 *
 */
// CREATE A NEW EVENT
router.post('/add', (req, res) => {
    eventOperation.createEvent(req.body)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err)
        })
});

/**
 * @swagger
 * /update:
 *   put:
 *     summary: create event
 *     tags: [Events]
 *     requestBody:
 *       description: OK
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             $ref: '#/components/schemas/UpdateEvent'
 *     responses:
 *       200:
 *          description: OK
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      example:
 *                          oneOf:
 *                              - message: Updated Successfully
 *                              - message: Cannot Update Live/Past Events
 *       400:
 *         description: Appropriate error message
 *         example: "error 4XX"
 *
 *       500:
 *         description: Some server error
 *
 */
//UPDATE EVENT
router.put('/update', (req, res) => {
    eventOperation.updateEvent(req.body)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(400).send(err)
    })
});

module.exports = router;