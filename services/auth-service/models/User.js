module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING, allowNull: true },
      provider: { type: DataTypes.STRING, defaultValue: "local" },
      google_id: { type: DataTypes.STRING, allowNull: true },
      avatar: { type: DataTypes.TEXT, allowNull: true },
      is_password_set: { type: DataTypes.BOOLEAN, defaultValue: false },
      role: { type: DataTypes.STRING, defaultValue: "user" },
    },
    {
      tableName: "users",
    }
  );

  User.associate = (models) => {
    User.hasMany(models.RefreshToken, { foreignKey: "user_id" });
  };

  return User;
};
