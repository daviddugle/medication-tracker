module.exports = function(sequelize, DataTypes) {
    const Medications = sequelize.define("Medications", {
      medicationName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {          
          len: [1]
        }
      },
      timeOfDay: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      dosage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
  
    Medications.associate = function(models) {
     
      Medications.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Medications;
  };
  