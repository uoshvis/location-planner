const validateData = (data) => {
    const dataIsNotEmpty = data.title && data.location && data.start && data.end
    const endIsLater = data.end > data.start
    return dataIsNotEmpty && endIsLater
}

const getEmptyFieldNames = (obj) => {
    const emptyFields = []
    for (var key in obj) {
        if (obj[key] === null || obj[key] === '')
            emptyFields.push(key)
    }
    return emptyFields.join()
}

export {validateData, getEmptyFieldNames }