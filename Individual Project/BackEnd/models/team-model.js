module.exports = (sequelize, DataTypes) => {
    return sequelize.define('team', {
        name: {
            type: DataTypes.STRING
        },
        matchesPlayed: {
            type: DataTypes.VIRTUAL, 
            get() {
                return (+this.get('wins') + this.get('draws') + this.get('losses'));
            }
        },
        wins: {
            type: DataTypes.INTEGER, defaultValue: 0
        },
        draws: {
            type: DataTypes.INTEGER, defaultValue: 0
        },
        losses: {
            type: DataTypes.INTEGER, defaultValue: 0
        },
        goalsFor: {
            type: DataTypes.INTEGER, defaultValue: 0
        },
        goalsAgainst: {
            type: DataTypes.INTEGER, defaultValue: 0
        },
        goalDifference: {
            type: DataTypes.VIRTUAL,
            get() {
                return (+this.get('goalsFor') - this.get('goalsAgainst'));
            }
        },
        points: {
            type: DataTypes.VIRTUAL,
            get() {
                return (+this.get('wins') * 3) + this.get('draws');
            }
        },
    },
        { timestamps: false })
};