const express = require('express')

const Users = require('./data/db.js')

const server = express();
server.use(express.json())

//see a list of users

server.get('/users', (req, res)=> {
  
    Users.find()
      .then(users => {
        if(!users) {
          return res.status(500).json({message: 'Error getting users!!'})
        }else{
          res.status(200).json(users)
        }
      })
    .catch( error => {
      res.status(500).json({ error: "The users information could not be retrieved." })
    })
  
})


// create a user to add to DB of Users


server.post('/users', (req, res)=> {
  
  const {name, bio} = req.body

  const userInformation = req.body;
  
    if(!name || !bio){
      return(
        res.status(400).json({ errorMessage: "Please provide name and a bio for the user." })
      )
    }else {
      return Users.insert(userInformation)
        .then(user => {
          res.status(201).json(user)
        })
        .catch( error => {
          res.status(500).json({message: 'error adding to the list of users!!'})
        })
    }
})

//









//delete a hub
// server.delete('/hubs/:id', (req, res)=> {
//   const hubId = req.params.id;
//   Hubs.remove(hubId)
//     .then(hub => {
//       res.status(200).json({message: 'hub deleted successfully'});
//     })
//     .catch( error => {
//       res.status(500).json({message: 'error deleting the hub'})
//   })
// })






const port = 5000;
server.listen(port, () => console.log('api is running, listening on port 5000'));