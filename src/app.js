var express= require('express');
var path = require("path");
var hbs = require('hbs');

var app = express();

var pathdir = path.join(__dirname,'../public');
var viewpath = path.join(__dirname,'../templates/views');
var partialpath = path.join(__dirname,'../templates/partials');

app.use(express.static(pathdir));

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewpath);
hbs.registerPartials(partialpath);


var geocode = require('./utilis/geocode');
var forecast = require('./utilis/forecast');


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'User',
        age : 20
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'diksheet',
        place: 'guwhati'
    })
})


app.get('/about', (req,res)=>{
    res.render("about",{
        title: 'About',
        place : 'guwahati',
        name: 'diksheet'
    });
})
app.get('/weather', (req,res)=>{
    if(!req.query.address)
     return res.send({error : 'plz give a location'})
    geocode(req.query.address, (error, data ) =>{
        if(error)
         return res.send({error });
       forecast(data.lattitude, data.longitude, (error, forecastData)=>{
           if(error)
           return res.send({error : 'plz check lomcatom' });
   
           else 
           res.send({
               place :data.location,
               forecast :forecastData});
       })
   })
   
})

app.listen(port, ()=>{
    console.log("server started ", port);
})