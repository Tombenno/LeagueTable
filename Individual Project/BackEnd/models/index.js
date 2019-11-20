const Sequelize = require('sequelize');

// Create sequalizer instance
const sequelize = new Sequelize(
    'leagues',                 // Database
    'root',                 // Username
    'password',     // Password
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

// Import Models
const League = sequelize.import(__dirname + '/league-model');
const Team = sequelize.import(__dirname + '/team-model');

// Sync models and add default data
sequelize.sync({ force: true }).then(() => {
    League.create({ name: 'Premier League' });
    League.create({ name: 'Championship' })
    Team.create({ name: 'Arsenal', leagueId: 1 });
    Team.create({ name: 'Liverpool', leagueId: 1 });
    Team.create({ name: 'Leicester City', leagueId: 1 });
    Team.create({ name: 'Chelsea', leagueId: 1 });
    Team.create({ name: 'Manchester City', leagueId: 1 });
    Team.create({ name: 'Sheffield United', leagueId: 1 });
    Team.create({ name: 'Manchester United', leagueId: 1 });
    Team.create({ name: 'Wolves', leagueId: 1 });

    Team.create({ name: 'Leeds United', leagueId: 2 });
    Team.create({ name: 'West Brom', leagueId: 2 });
    Team.create({ name: 'Preston', leagueId: 2 });
    Team.create({ name: 'Swansea City', leagueId: 2 });
    Team.create({ name: 'Nottingham Forest', leagueId: 2 });
    Team.create({ name: 'Bristol City', leagueId: 2 });
    Team.create({ name: 'Fulham', leagueId: 2 });
    Team.create({ name: 'Sheffield Wednesday', leagueId: 2 });
    Team.create({ name: 'Brentford', leagueId: 2 });
    Team.create({ name: 'QPR', leagueId: 2 });
});


Team.belongsTo(League);
League.hasMany(Team);

// Export models
module.exports = {
    League,
    Team
};
