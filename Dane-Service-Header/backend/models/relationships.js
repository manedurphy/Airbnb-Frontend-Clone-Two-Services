const Photo = require('./Photo');
const Property = require('./Property');

Property.hasMany(Photo);
Photo.belongsTo(Property);
