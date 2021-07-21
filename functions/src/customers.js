const admin = require('firebase-admin')
const fbcreds = require('../credentials.json')

function connectDb() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(fbcreds)
    })
  }
  return admin.firestore()
}

exports.getCustomers = (req, res) => {
  const db = connectDb()
  db.collection('customers').get()
  .then(customerCollection => {
    const customerArray = customerCollection.docs.map(doc => {
        let customer = doc.data()
        customer.id = doc.id
        return customer
    })
    res.send(customerArray)
  })
  .catch(err => res.status(500).send(err))
}

exports.createCustomer = (req, res) => {
    if(!req.body) {
        res.status(401).send('Invalid request')
        return
    }
  const db = connectDb()
  db.collection('customers').add(req.body)
    .then(() => res.send({message: "Customer Created"}))
    .catch(err => res.status(500).send(err))
}
