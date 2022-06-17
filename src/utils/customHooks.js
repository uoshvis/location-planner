import { useState, useEffect } from "react"
import moment from 'moment'


const useCalculateDuration = (start, end) => {
    const [duration, setDuration] = useState('0')
    
    useEffect(() => {
        const startM = moment(start)
        const endM = moment(end)   
        const diff = moment.duration(endM.diff(startM)).asMinutes()
        
        setDuration(String(diff))
        
        
    }, [start, end])
    return duration
}


const useDurationIsValid = (duration) => {
    
    const [validDuration, setvalidDuration] = useState(true)
    
    useEffect(() => {
        if (Number(duration) <= 0) {
            setvalidDuration(false)
        }
        else {
            setvalidDuration(true)
        }

    }, [duration])

    return validDuration
}

export { useCalculateDuration, useDurationIsValid }