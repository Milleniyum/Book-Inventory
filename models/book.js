module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
        isbn: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subtitle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: true
        },
        published_date: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        page_count: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image_link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    //Set your associations here (SQL relationships - User.hasMany)

    return Book;
};