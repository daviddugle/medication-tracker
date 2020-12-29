module.exports = function(sequelize, DataTypes) {
    const Medications = sequelize.define("Medications", {
      medicaitonName: {
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
      // An Order should belong to an Employee
      // An Order cant be created without an Employee due to the foreign key constraint
      Medications.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Medicaitons;
  };
  