const Users = require('../data/db.js')

exports.middleware = (req, res, next) => {
  console.log("My first custom middleware")

  next()
}

exports.getUsers = (req, res)=> {
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
}

exports.postUser =  (req, res)=> {
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
  }

  exports.getUserById = (req, res)=> {
    const ID = req.params.id
    
    Users.findById(ID)
      .then(user => {
        if(!user) {
          return res.status(404).json({ message: "The user with the specified ID does not exist." })
        }else{
          res.status(200).json(user)
        }
      })
      .catch( error => {
        res.status(500).json({ error: "The user information could not be retrieved." })
      })
    }
    
    exports.deleteUser =  (req, res)=> {
      const ID = req.params.id
      
      Users.remove(ID)
        .then(user => {
          if(!user) {
            return res.status(404).json({ message: "The user with the specified ID does not exist." })
          }else{
            res.status(200).json( {user, message:'User deleted'})
          }
        })
        .catch( error => {
          res.status(500).json({ error: "The user could not be removed" })
        })
      }

      exports.editUser =  (req, res)=> {
        const ID = req.params.id
        const {name, bio} = req.body
        
        
        if (!name || !bio) {
          return(
            res.status(400).json({ message: "Please provide name and a bio for the user." })
          )
        } 
          Users.update(ID, req.body)
            .then( user => {
              if(!user) {
                return res.status(404).json({ message: "The user with the specified ID does not exist." })
              } else {
                res.status(200).json(user)
              }   
            })
            .catch( error => {
              res.status(500).json({ error: "The user information could not be modified." })
            })
        
        }