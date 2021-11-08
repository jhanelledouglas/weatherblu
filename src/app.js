const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')





const app = express()


//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and vieew location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jhanelle Douglas'
    })
})

//HOMEPAGE
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jhanelle DOuglas'
    })
})


//HELP PAGE
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help page',
        title: 'Help',
        name: 'Jhanelle Douglas'
    })
})


//WEATHER PAGE
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an aadress!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {

            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })

        })
        // res.send({
        //     forecast: 'windy',
        //     location: 'jamaica',
        //     address: req.query.address
        // })
})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jhanelle DOuglas',
        errorMessage: ' Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jhanelle',
        errorMessage: 'Page not Found'
    })

})







app.listen(3000, () => {
    console.log('Server is connected on 3000')
})