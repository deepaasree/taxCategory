module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('property', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'Property',
        schema:'taxes',
        timestamps: true,
        underscored: true
    });

    return Model;
};