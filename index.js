require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public/'))
app.use(methodOverride('_method'))


//SET UP HOME ROUTE

//SET UP CONTROLLERS

let server = app.listen(process.env.PORT || 3000, function() {
    console.log(`you're listening to the smooth sounds of port ${process.env.PORT}`)
  })
  
module.exports = server