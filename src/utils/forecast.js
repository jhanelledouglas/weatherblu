const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=aaf6270c858f9c6888eb0c5a65ccc3b5&units=metric'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {

            callback(undefined,
                'It is currently ' + body.main.temp + ' degrees out. There is a ' + body.wind.speed + ' wind speed ')

        }

    })

}

module.exports = forecast