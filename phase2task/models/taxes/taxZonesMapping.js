module.exports = (sequelize, DataTypes) => {
    const TaxZonesMapping = sequelize.define('taxZoneMapping', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        zoneName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isForZoneMap: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        taxPercent: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        storeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        taxCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'TaxZoneMapping',
        schema:'taxes',
        timestamps: true,
        underscored: true
    });
    TaxZonesMapping.association = (models) => {
        TaxZonesMapping.belongsTo(models.taxCategories, { foreignKey: 'taxCategoryId' });
    };
    return TaxZonesMapping;
};

