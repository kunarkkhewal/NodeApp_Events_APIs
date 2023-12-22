const moment = require('moment');

const db = require('../model/event');

const errorMessage = (message) => {

    if (message.includes(`Event Doesn't Exist`)) {
        return `Event Doesn't Exist`
    }
    if (message.includes(`Start time already passed`)) {
        return `Start time already passed`
    }
    if (message.includes(`Event Duration Cannot be 0`)) {
        return `Event Duration Cannot be 0`
    }
    if (message.includes(`Event Already Present`)) {
        return 'Event Already Present'
    }
    if (message.includes(`Error Creating Event`)) {
        return 'Error Creating Event'
    }
    if (message.includes(`Event Name Already Present`)) {
        return 'Event Name Already Present'
    }
    if (message.includes(`Cannot Update Live/Past Events`)) {
        return 'Cannot Update Live/Past Events'
    }
    if (message.includes(`No Events Present`)) {
        return `No Events Present`
    }
    if (message.includes(`Unable to update`)) {
        return `Unable to update`
    }
    if (message.includes(`Cannot change Start time to already passed time`)) {
        return `Cannot change Start time to already passed time`
    }
    if (message.includes(`Please Provide Event Id`)) {
        return 'Please Provide Event Id'
    }
    if (message.includes('Cannot change Start time to less then 10 minutes')) {
        return 'You cannot change starting time in live event range: new starting time is 10 minutes from now.'
    }

    return 'Operation Failed'
}

const formatTimeinAMPM = (date) => {
    return moment(date).format('YYYY-MM-DD hh:mm:ss A');
}

const events = [];

const isEventNameExist = async (name) => {
    try {
        // const isEventNameExist = await db.Event.findOne({
        //     where: {
        //         eventname: name
        //     }
        // });
        const isEventNameExist = false;
        events.forEach(event => {
            if (event.eventname === name) {
                isEventNameExist = true;
            }
        })
        return isEventNameExist;
    } catch (error) {
        throw {
            error: {
                message: errorMessage(error.message)
            }
        }
    }
}

const createEvent = async (data) => {
    try {
        const isSameEventNameExist = await isEventNameExist(data.eventname);
        if (isSameEventNameExist) {
            throw { message: 'Event Already Present' };
        }

        let currentTime = moment().format('YYYY-MM-DD hh:mm:ss A');
        // data.eventstartingtime = formatTimeinAMPM(data.eventstartingtime);

        if (data.eventstartingtime < currentTime) {
            throw { message: `Start time already passed` };
        }

        if (moment().add(data.eventduration).format('YYYY-MM-DD hh:mm:ss A') == moment().format('YYYY-MM-DD hh:mm:ss A')) {
            throw { message: `Event Duration Cannot be 0` };
        }
        // const response = await db.Event.create(data);
        // if (!response) {
        //     throw { message: 'Error Creating Event' }
        // }
        // response.eventstartingtime = formatTimeinAMPM(response.eventstartingtime);
        // response.createdAt = formatTimeinAMPM(response.createdAt);
        // response.updatedAt = formatTimeinAMPM(response.updatedAt);
        const latestID = events && events.length && events[events.length - 1].id;
        events.push({id:latestID+1, ...data});

        return data;
    } catch (error) {
        throw {
            error: {
                message: errorMessage(error.message)
            }
        }
    }
}

const findAll = async () => {
    try {
        // const response = await db.Event.findAll({ raw: true });
        if (!events) throw { message: `No Events Present` };
        const liveEvents = [], upcomingEvents = [], pastEvents = [];
        events.forEach(event => {
            let currentTime = moment().format('YYYY-MM-DD hh:mm:ss A');
            let timein10mins = moment().add(10, 'minutes').format('YYYY-MM-DD hh:mm:ss A');
            let eventEndTime = moment(event.eventstartingtime).add(event.eventduration).format('YYYY-MM-DD hh:mm:ss A');

            event.eventstartingtime = formatTimeinAMPM(event.eventstartingtime);
            event.createdAt = formatTimeinAMPM(event.createdAt);
            event.updatedAt = formatTimeinAMPM(event.updatedAt);

            if (event.eventstartingtime > timein10mins) {
                upcomingEvents.push(event);
            } else if ((event.eventstartingtime < timein10mins && event.eventstartingtime > currentTime) || (eventEndTime > currentTime)) {
                liveEvents.push(event);
            } else if (event.eventstartingtime < currentTime) {
                pastEvents.push(event);
            }
        });
        result = { upcomingEvents, liveEvents, pastEvents };
        return result;
    } catch (error) {
        throw {
            error: {
                message: errorMessage(error.message)
            }
        }
    }
}

const updateEvent = async (data) => {
    try {
        if (!data.id) {
            throw { message: `Please Provide Event Id` };
        }
        // const record = await db.Event.findOne({
        //     where: {
        //         id: data.id
        //     },
        //     raw: true
        // });
        let record;
        events.forEach(event => {
            if(event.id = data.id) {
                record = event;
            }
        })
        if (!record) throw { message: `Event Doesn't Exist` };
        
        let currentTime = moment().format('YYYY-MM-DD hh:mm:ss A');
        let timein10mins = moment().add(10, 'minutes').format('YYYY-MM-DD hh:mm:ss A');
        let eventEndTime = moment(record.eventstartingtime).add(record.eventduration).format('YYYY-MM-DD hh:mm:ss A');
        record.eventstartingtime = formatTimeinAMPM(record.eventstartingtime);

        if (record.eventstartingtime > timein10mins) {
            const updateQuery = {};
            if (data.eventname) {
                if (record.eventname != data.eventname) {
                    const isSameEventNameExist = await isEventNameExist(data.eventname);
                    if (isSameEventNameExist) {
                        throw { message: 'Event Name Already Present' };
                    }
                }
                updateQuery.eventname = data.eventname;
            }

            if (data.eventstartingtime) {
                data.eventstartingtime = formatTimeinAMPM(data.eventstartingtime);
                if (data.eventstartingtime < timein10mins && data.eventstartingtime > currentTime) {
                    throw { message: 'Cannot change Start time to less then 10 minutes' };
                } else if (data.eventstartingtime < currentTime) {
                    throw { message: 'Cannot change Start time to already passed time' };
                }

                updateQuery.eventstartingtime = data.eventstartingtime;
            }

            if (data.eventduration) {
                if (moment().add(data.eventduration).format('YYYY-MM-DD hh:mm:ss A') == moment().format('YYYY-MM-DD hh:mm:ss A')) {
                    throw { message: `Event Duration Cannot be 0` };
                }

                updateQuery.eventduration = data.eventduration;
            }

            // updateQuery.updatedAt = moment().format('YYYY-MM-DD hh:mm:ss A');
            
            // const response = await db.Event.update(updateQuery, {
            //     where: {
            //         id: data.id
            //     },
            //     returning: true,
            //     plain: true
            // });

            events.forEach(event => {
                if(event.id = data.id) {
                    event = {...event, ...updateQuery};
                }
            })

            // if (!response) throw { message: `Unable to update` };

            return { message: 'Updated Successfully' };
        } else if ((record.eventstartingtime < timein10mins && record.eventstartingtime > currentTime) || (eventEndTime > currentTime) || (record.eventstartingtime < currentTime)) {
            throw { message: 'Cannot Update Live/Past Events' };
        }
    } catch (error) {
        throw {
            error: {
                message: errorMessage(error.message)
            }
        }
    }
}

module.exports = {
    createEvent,
    findAll,
    updateEvent,
}
