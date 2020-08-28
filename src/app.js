var express= require('express');
var path = require("path");
var hbs = require('hbs');

var app = express();

var pathdir = path.join(__dirname,'../public');
var viewpath = path.join(__dirname,'../templates/views');
var partialpath = path.join(__dirname,'../templates/partials');

app.use(express.static(pathdir));


app.set('view engine', 'hbs');
app.set('views', viewpath);
hbs.registerPartials(partialpath);


var geocode = require('./utilis/geocode');
var forecast = require('./utilis/forecast');


app.get('',(req,res)=>{
    res.render('index',{
        name: 'diksheet',
        age : 20
    })
})
app.get('/place', (req,res)=>{
    res.render('place')
})
app.get('/help',(req,res)=>{
    res.render('help',{
        name: 'diksheet',
        place: 'guwhati'
    })
})
app.get('/products', (req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error :' error hai',
        })
    }

    res.send({
        products: [],
    })
})

app.get('/about', (req,res)=>{
    res.render("about",{
        place : 'guwsahati',
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
// app.get("/products",(req,res)=>{
//     // if(!req.query.address)
//     // {
//     //     return res.send({
//     //         error: "you have an error",
//     //     })
//     // }
//     console.log(req.query.search)
//      res.render({
//         products : [],
//     })
// })
// app.get('/*', (req, res)=>{
//     res.render('error');
// })
app.listen(3000, ()=>{
    console.log("server started 3000");
})