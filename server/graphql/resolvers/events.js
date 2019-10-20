const User = require('../../models/user');
const Event = require('../../models/event');
const { dateToString } = require('../../helpers/date');
const { transformEvent } = require('./merge');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: dateToString(args.eventInput.date),
            creator: req.userId
        });
        let createdEvent;
        try {
            const result = await event.save();
            createdEvent = transformEvent(result);
            const userData = await User.findById(req.userId);
            if (!userData) throw new Error('User Not Found.');
            userData.createdEvents.push(event);
            await userData.save();
            return createdEvent;
        } catch (err) {
            throw err;
        }
    }
};