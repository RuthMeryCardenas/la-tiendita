'use strict';
const chalk = require('chalk');

module.exports = function(Vendor) {
  Vendor.add = (staffNumber, name, cb) => {
    console.log(chalk.blue(staffNumber));
    console.log(chalk.red(name));
    const newVendor = {
      "staffNumber": staffNumber,
      "name": name
    }
    Vendor.create(newVendor, (err, instance) => {
      cb(err, instance);
    })
  }

  Vendor.remoteMethod('add', {
    accepts: [
      {
        arg: 'staffNumber',
        type: 'number',
        required: true
      },
      {
        arg: 'name',
        type: 'string',
        required: true
      }
    ],
    http: {
      path: '/add',
      verb: 'post'
    },
    returns: {
      arg: 'vendor',
      type: 'object'
    }
  })

  Vendor.removeVendor = (id, cb) => {
    console.log(id);
    //instance
    Vendor.findById(id, (err, instance) => {
      instance.destroy(() => {
        cb(err, true);
      })
    })
  }

  Vendor.remoteMethod('removeVendor', {
    accepts:{
        arg: 'id',
        type: 'number',
        required: true
    },
    http: {
      path: '/removeVendor',
      verb: 'post'
    },
    returns: {
      arg: 'vendor',
      type: 'boolean'
    }
  })
};
