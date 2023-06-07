module.exports = (sequelize, DataTypes) => {
    const TaxCategories = sequelize.define('taxCategories', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        storeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        taxType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        taxFor: {
            type: DataTypes.ENUM('SPECIFIC_ZONE', 'SPECIFIC_POSTAL_CODE'),
            allowNull: false
        },
        otherZoneRate: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        isEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'TaxCategories',
        schema: 'taxes',
        timestamps: true,
        underscored: true
    });
    TaxCategories.association = (models) => {
        TaxCategories.hasMany(models.taxZonesMapping, { foreignKey: 'taxCategoryId' });
    }
    return TaxCategories;
};

