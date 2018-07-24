const crypto = require('crypto')
const knex = require('knex')(require('./knexfile'))
module.exports = {
  createUserIfNotExists ({ username, email }) {
    return knex('Users').select()
      .where('email',email)
      .then(function(rows){
        if (rows.length ===0) {
          console.log('not exists')
          return knex('Users').insert({'username':username, 'email': email})
        }
        else {
          console.log("users exitsts already")
        }
    });
  },
}