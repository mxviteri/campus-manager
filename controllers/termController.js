var termModel = require('../models/termModel.js');
var userModel = require('../models/userModel.js');

/**
* termController.js
*
* @description :: Server-side logic for managing terms.
*/
module.exports = {
  
  /**
  * termController.list()
  */
  list: function(req, res) {
    termModel.find(function(err, terms){
      if(err) {
        return res.json(500, {
          message: 'Error getting term.'
        });
      }
      return res.json(terms);
    });
  },
  
  /**
  * termController.show()
  */
  show: function(req, res) {
    var id = req.params.id;
    termModel.findOne({_id: id}, function(err, term){
      if(err) {
        return res.json(500, {
          message: 'Error getting term.'
        });
      }
      if(!term) {
        return res.json(404, {
          message: 'No such term'
        });
      }
      return res.json(term);
    });
  },
  
  /**
  * termController.create()
  */
  create: function(req, res) {
    var term = new termModel({
    
    userModel.findOne({ _id: req.user.id }).populate('client').exec(function(err, currentUser) { 
      term.client = currentUser.client.id;
      term.save(function(err, term){
        if(err) {
          return res.json(500, {
            message: 'Error saving term',
            error: err
          });
        }
        return res.json({
          message: 'saved',
          _id: term._id
        });
      });
    });
  },
  
  /**
  * termController.update()
  */
  update: function(req, res) {
    var id = req.params.id;
    termModel.findOne({_id: id}, function(err, term){
      if(err) {
        return res.json(500, {
          message: 'Error saving term',
          error: err
        });
      }
      if(!term) {
        return res.json(404, {
          message: 'No such term'
        });
      }
      
      term.start_date =  req.body.start_date ? req.body.start_date : term.start_date;
      term.save(function(err, term){
        if(err) {
          return res.json(500, {
            message: 'Error getting term.'
          });
        }
        if(!term) {
          return res.json(404, {
            message: 'No such term'
          });
        }
        return res.json(term);
      });
    });
  },
  
  /**
  * termController.remove()
  */
  remove: function(req, res) {
    var id = req.params.id;
    termModel.findByIdAndRemove(id, function(err, term){
      if(err) {
        return res.json(500, {
          message: 'Error getting term.'
        });
      }
      return res.json(term);
    });
  }
};