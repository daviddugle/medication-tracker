module.exports = function(sequelize, DataTypes) {
    const Notes = sequelize.define("Notes", {
      note: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {          
          len: [1]
        }
      }     
    });
  
    Notes.associate = function(models) {
     
      Notes.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Notes;
  };
  