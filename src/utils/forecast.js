const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=aaf6270c858f9c6888eb0c5a65ccc3b5'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(response.body.main.temp)
            // console.log(body.main.temp)
            // callback(undefined, body.main.temp)

            callback(undefined,
                'It is cuurently ' + body.main.temp + ' degrees out. There is a ' + body.wind.speed + ' wind speed ')
        }

    })

}

module.exports = forecast