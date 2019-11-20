const express = require('express');
const cors = require('cors');
const leagueRouter = require('./routes/league-routes');
const teamRouter = require('./routes/team-routes');
const app = express();


app.use(cors());
app.use(express.json());

app.use('/league', leagueRouter);
app.use('/team', teamRouter);

app.get('/', (req, res) => {
    res.send('yay');
})

app.listen(8080, () => {
    console.log('Server running on port 8080.')
});

module.exports = app;