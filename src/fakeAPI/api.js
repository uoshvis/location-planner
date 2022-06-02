const { v4: uuidv4 } = require('uuid');
const events =  require('./mockEvents') ;



const getEvents = () => 
    new Promise((resolve, reject) => {
        if (!events) {
            return setTimeout(
                () => reject(new Error('Events not found')),
                500
            )            
        }
        setTimeout(() => resolve(Object.values(events)), 500)
    })
    
// Usage getEvents

// getEvents()
//     .then(result => {
//         console.log(result)
//     })
//     .catch((error) => {
//         console.log(error)
//     })


const doGetEvents = async () => {
try {
    const result = await getEvents()
    console.log(result)
} catch (error) {
    console.log(error)
}
}

// doGetEvents()


// getEvent


const getEvent = (eventId) => 
    new Promise((resolve, reject) => {
        const event = events.find(({ id }) => id === eventId)
        if (!event) {
            return setTimeout(
                () => reject(new Error('Event not found')),
                250
            )
        }
        setTimeout(() => resolve(event), 500)
    })


// usageGetEvent

const doGetEvent = async (id) => {
    try {
        const result = await getEvent(id)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

// doGetEvent(23)


// getEventbyLocation


const getEventsbyLocation = (eventLocation) => 
    new Promise((resolve, reject) => {

        const eventsByLocation = eventLocation !== 'all' ? events.filter(({ location }) => location === eventLocation) : events 
        

        if (!eventsByLocation) {
            return setTimeout(
                () => reject(new Error('Events by location not found')),
                250
            )
        }
        setTimeout(() => resolve(eventsByLocation), 500)
    })



//  createEvent

const createEvent = (data) => 
    new Promise((resolve, reject) => {
        if (!data.title || !data.start || !data.end) {
            reject(new Error('Not all information provided'))
        }
        const id = uuidv4()
        const newEvent = {id, ...data}

        events.push(newEvent)

        setTimeout(() => resolve(true), 500)
    })



// usage CreateEvent

const doCreateEvent = async (data) => {
    try {
        const result = await createEvent(data)
        console.log(result)
    } catch(error) {
        console.log(error)
    }
}

// doCreateEvent(
//     {
//         title: 'MY NEW SUPER EVENT ',
//         start: new Date(2015, 3, 13, 8, 0, 0),
//         end: new Date(2015, 3, 13, 10, 30, 0),

//     })


const updateEvent = (eventId, data) => 
    new Promise((resolve, reject) => {
        const eventIndex = events.findIndex((obj => obj.id === eventId));
        if(eventIndex === -1) {
            return setTimeout(
                () => reject(new Error('Event not found')),
                500
            )
        }
        
        events[eventIndex] = { ...events[eventIndex], ...data}

        return setTimeout(() => resolve(true), 500)
 
    })

const doUpdateEvent = async (id, data) => {
    try {
        const result = await updateEvent(id, data)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}
// doGetEvent(23)

// doUpdateEvent(23, {title: 'Go to park'})

// doGetEvent(23)


const deleteEvent = (eventId) => 
    new Promise((resolve, reject) => {
        const eventIndex = events.findIndex((obj => obj.id === eventId));

        if(eventIndex === -1) {
            return setTimeout(
                () => reject(new Error('User not found')),
                250
            )
        }

        events.splice(eventIndex, 1)

        return setTimeout(() => resolve(true), 500);


    })

// usage DeleteEvent

const doDeleteEvent = async (id) => {
    try {
        const result = await deleteEvent(id)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

// doDeleteEvent(2)
// doGetEvents()

export  { getEvent, getEvents, getEventsbyLocation, createEvent, updateEvent, deleteEvent }