// Helper functions are defined here

const ifInArray = (arr, val) => {
    return arr.indexOf(val) > -1
}

const formatMinDuration = minDuration => {
    var formatedDuration
    const days = Math.floor(minDuration/1440);
    const hours = Math.floor((minDuration%1440)/60);
    const minutes = Math.ceil((minDuration%1440)%60);

    if (days) {
        formatedDuration = `${days} d ${hours} h ${minutes} min`
    }
    else if (hours) {
        formatedDuration = `${hours} h ${minutes} min`
    }
    else if (minutes) {
        formatedDuration = `${minutes} min`
    }
    return formatedDuration
}

export { ifInArray, formatMinDuration }