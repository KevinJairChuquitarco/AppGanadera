const hbs = require('hbs');

 hbs.registerHelper('isdefined', function (value) {
    return value !== undefined;
  });
  
