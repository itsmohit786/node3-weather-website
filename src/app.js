const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
// Define paths for Express Config
const publicDirectoryPath =  path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static directory to serve
app.use( express.static( publicDirectoryPath ) );


// Routes
app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mohit'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        imgName: 'mohit.jpg',
        name: 'Mohit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Mohit'
    })
})
app.get('/weather',(req, res) => {
    console.log(req.query)

    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }

    const location = req.query.address;

    geocode( location , (error, data) => {
        if(error){
            return error
        } 
        
        forecast(data, (error, forecastData) => {
            if(error) {
                return error;
            } 
            console.log(data.placeName);
            console.log( forecastData )

            return res.send({
                address: data.placeName,
                forecast: forecastData,
                location
            });
        })
    });
});

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) =>{
    res.render('404', {
        'title': '404',
        'name': 'Mohit',
        'errorMsg': 'Help Article not found!',  
    })
} )

app.get('*', (req, res) => {
    res.render('404',{
        'title': '404',
        'name': 'Mohit',
        'errorMsg': 'Page not found!!'
    })
})

app.listen(3000, () => {
    console.log('Server is UP!!')
})