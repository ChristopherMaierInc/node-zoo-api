const express = require('express')
const Animal = require('../models/sea-animal')

const router = express.Router()

function validateFound(animal) {
  if (animal == null) {
    const error = new Error('Sea Animal not found') // Error with message
    error.status = 404 // Store status for res.status() to use
    throw error
  }
}

router.get('/sea-animals', (req, res) => {
  const query = req.query.q || ''
  let animals
  if (query) {
    animals = Animal.search(query)
  }
  else {
    animals = Animal.all();
  }
  res.json(animals);
})

router.get('/sea-animals/:id', (req, res) => {
  const animal = Animal.find(req.params.id)
  validateFound(animal)
  res.json(animal)
})

router.post('/sea-animals', (req, res) => {
  const animal = Animal.create(req.body)
  res.status(201).json(animal)
})

router.patch('/sea-animals/:id', (req, res) => {
  const animal = Animal.findAndUpdate(req.params.id, req.body)
  validateFound(animal)
  res.json(animal)
})

router.delete('/sea-animals/:id', (req, res) => {
  const animal = Animal.destroy(req.params.id)
  validateFound(animal)
  res.json(animal)
})

module.exports = router
