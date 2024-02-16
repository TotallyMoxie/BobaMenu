const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Boba = require('./models/productModel');
const Menu = require('./models/menuModel');

// Middleware
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(req.body);
});

app.get('/boba', async (req, res) => {
    try {
      const boba = await Boba.find({});
      res.status(200).json(boba);
    } catch (err) { console.log('error', error);
    res.status(500).send('Boba not found');

    }
})

app.get('/boba/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const boba = await Boba.findById(id);
    res.status(200).json(boba)
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Boba not found');
  }

})

app.get('/menu/:name', async(req, res) => {
  try {
    const {name} = req.params;
    const menu = await Menu.findByName(name);
    res.status(200).json(menu)
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Boba not found');
  }

})

app.post('/menu', async(req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        menu
      }
    })

  } catch (error) {
    console.log('error', error);
    res.status(500).json('Boba not found');
  }
})

app.post('/boba', async(req, res) => {
  try {
    const boba = await Boba.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        boba
      }
    })

  } catch (error) {
    console.log('error', error);
    res.status(500).json('Boba not found');
  }
})

app.patch('/boba/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const boba = await Boba.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json(boba);
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Boba not entered');
  }
})

app.delete('/boba/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const boba = await Boba.findByIdAndDelete(id);
    res.status(204).json(null);
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Boba not deleted');
  }
})


mongoose.
connect('mongodb+srv://butwhy:no@no.l2iauyf.mongodb.net/Boba-API?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to the database!');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((err) => {
  console.log('error: ', err);
})
