const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors')
const { getCustomers, createCustomer } = require('./src/customers')
const { createPet, getPets } = require('./src/pets')

const app = express()
app.use(cors())
app.use(express.json())

// routes go here...
app.get('/customers', getCustomers)
app.post('/customers', createCustomer)

app.get('/pets', getPets)
app.post('/pets', createPet)

exports.app = functions.https.onRequest(app)
