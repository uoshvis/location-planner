const { v4: uuidv4 } = require('uuid');
const events =  require('./mockEvents') ;
const {validateData, getEmptyFieldNames} = require('./apiHelpers')

// ######## START of Unused functions comment ########

// const getEvents = () => 
//     new Promise((resolve, reject) => {
//         if (!events) {
//             return setTimeout(
//                 () => reject(new Error('Events not found')),
//                 500
//             )            
//         }
//         setTimeout(() => resolve(Object.values(events)), 500)
//     })
    

// const getEvent = (eventId) => 
//     new Promise((resolve, reject) => {
//         const event = events.find(({ id }) => id === eventId)
//         if (!event) {
//             return setTimeout(
//                 () => reject(new Error('Event not found')),
//                 500
//             )
//         }
//         setTimeout(() => resolve(event), 500)
//     })


// ######## END of Unused functions comment ########


const getEventsByLocation = (eventLocation) => 
    new Promise((resolve, reject) => {

        const eventsByLocation = eventLocation === 'all' ? events :
            events.filter(({ location }) => location === eventLocation)
        
        if (!eventsByLocation) {
            return setTimeout(
                () => reject(new Error('Events by location not found')),
                500
            )
        }
        setTimeout(() => resolve(eventsByLocation), 500)
    })

const createEvent = (data) => 
    new Promise((resolve, reject) => {
        
        if (!validateData(data)) {
           
            return setTimeout(
                () => reject(
                    new Error(
                        'Invalid data provided',
                        {cause: getEmptyFieldNames(data)}
                    )),
                500
                )            
            }
            
        const uuid = uuidv4()
        const newEvent = {...data, id: uuid}
        events.push(newEvent)

        setTimeout(() => resolve(true), 500)
    })


const updateEvent = (eventId, data) => 
    new Promise((resolve, reject) => {

        const eventIndex = events.findIndex((obj => obj.id === eventId));
    
        if(eventIndex === -1) {
            return setTimeout(() => reject(
                new Error(
                    'Index does not exists',
                    {cause: ['no object']}
                )),
            500
            )         
        }

        if (!validateData(data)) {
            return setTimeout(
                () => reject(
                    new Error(
                        'Invalid data provided',
                        {cause: getEmptyFieldNames(data)}
                    )),
                500
                )
        }

        events[eventIndex] = { ...events[eventIndex], ...data}
        
        return setTimeout(() => resolve(true), 500)
    
    })


const deleteEvent = (eventId) => 
    new Promise((resolve, reject) => {
        const eventIndex = events.findIndex((obj => obj.id === eventId));

        if(eventIndex === -1) {
            return setTimeout(() => reject(
                new Error(
                    'Index does not exists',
                    {cause: ['no object']}
                )),
            500
            )         
        }

        events.splice(eventIndex, 1)

        return setTimeout(() => resolve(true), 500);
    })

export  { getEventsByLocation, createEvent, updateEvent, deleteEvent }

