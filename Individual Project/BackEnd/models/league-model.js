module.exports = (sequelize, DataTypes) => {
    return sequelize.define('league', {
        name: {
            type: DataTypes.STRING
        }
    },
        { timestamps: false })
};