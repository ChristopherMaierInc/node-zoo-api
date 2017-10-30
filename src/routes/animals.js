const express = require('express')
const Animal = require('../models/animal')

const router = express.Router()

router.get('/animals', (req, res) => {
  const query = req.query.q || ''
  let animals
  if (query) {
    animals = Animal.search(query)
  }
  else {
    animals = Animal.all()
  }
  res.json(animals)
})

router.get('/animals/:id', (req, res) => {
  const animal = Animal.find(req.params.id)
  res.json(animal)
})

module.exports = router
