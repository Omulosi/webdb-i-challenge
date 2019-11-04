const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
  db('accounts') 
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving records: ' + error.message });
    });
});

router.get('/:id', async (req, res) => {
  try {
    const result = await db('accounts').where({ id: req.params.id });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await db('accounts')
      .insert({
        budget: req.body.budget,
        name: req.body.name,
      })
    res.json({message: 'success', data: result});
  } catch (error) {
    res.status(500).json({ message: 'Error ' + error.message });
  }
});

router.put('/:id', (req, res) => {
  db('accounts').where({ id: req.params.id })
    .update({
      name: req.body.name,
      budget: req.body.budget,
    })
    .then(updatedAccount => {
      res.json({message: "success", data: updatedAccount});
    })
    .catch(error => {
      res.status(500).json({ message: 'Error: ' + error.message });
    });
});

router.delete('/:id', (req, res) => {
  db('accounts').where({ id: req.params.id }).del()
    .then(result => {
      res.json({message: "success", data: result});
    })
    .catch(error => {
      res.status(500).json('Error: ' + error.message)
    })
});

module.exports = router;
