module.exports = function(sequelize, DataTypes) {
    var Unknown = sequelize.define("Unknown", {
        isbn: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    });

    //Set your associations here (SQL relationships - User.hasMany)

    return Unknown;
};