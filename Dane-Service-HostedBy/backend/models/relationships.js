const CoHost = require('./Cohost');
const HostedBy = require('./HostedBy');
const Language = require('./Language');
const Host = require('./Host');
const HostLanguage = require('./HostLanguage');

Host.hasMany(CoHost);
Host.hasMany(HostedBy);
Host.hasMany(HostLanguage);
HostedBy.hasMany(CoHost);
HostLanguage.belongsTo(Host);
HostLanguage.belongsTo(Language);
CoHost.belongsTo(Host);
CoHost.belongsTo(HostedBy);
