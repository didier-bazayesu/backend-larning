const sendResponse = (res, data) => {
   res.status(200)
    res.end(JSON.stringify(data))
}

module.exports = sendResponse