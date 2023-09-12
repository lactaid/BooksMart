const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')

const mongoose = require('mongoose');

const Offer = require('./models/tradeOffer');

mongoose.connect('mongodb://127.0.0.1:27017/tradeOffers', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected")

    } )
    .catch(() => {
        console.log('Error')
    })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, '/public')));

app.get('/home', async (req,res) => {

    console.log('going home!');
    res.render('index')
    })

    app.get('/faq', async (req,res) => {

        console.log('questions!');
        res.render('faq')
        })
    
app.get('/trades', async (req,res) => {
const offers = await Offer.find({});
// console.log(offers);
    res.render('trades', {offers})
})

app.get('/trades/new', async (req,res) => {
//     console.log("Antes de la consulta Offer.find({})");
// const offers = await Offer.find({});
// console.log(offers);
    res.render('new')
})

app.post('/trades', async (req,res)=>{
const usuario = req.body.usuario;
  const metodo_intercambio = req.body.metodo_intercambio;
  const lista_quiero = req.body.quiere_libros; // Array of books user wants
  const lista_tengo = req.body.tiene_libros; // Array of books user has

  // Now you can access the book data in lista_quiero and lista_tengo
  console.log('Usuario:', usuario);
  console.log('Metodo de Intercambio:', metodo_intercambio);
  console.log('Libros que Quiere:', lista_quiero);
  console.log('Libros que Tiene:', lista_tengo);

    const newOffer = new Offer(req.body);
    await newOffer.save();
res.redirect('/trades');
})


app.listen(3000, ()=>{
    console.log('hello')
})

