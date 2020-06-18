const { Model, DataTypes } = require("sequelize");

// define product class Model
class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        code: {
          type: DataTypes.STRING,
          notEmpty: true,
          unique: true,
          validate: {
            isUnique: function (value, next) {
              let product = Product.findAll({ where: { code: value } })
                .then(function (product) {
                  if (product.length > 0) {
                    return next("Codigo já em uso!");
                  }
                  return next();
                })
                .catch(function (err) {
                  return next(err);
                });
            },
          },
        },
        name: {
          type: DataTypes.STRING,
          notEmpty: true,
          validate: {
            len: {
              min: [3],
              msg: "Nome deve ter no mínimo 3 caracteres.",
            },
            fn: function (val) {
              if (val == null) throw new Error("Nome do produto é requerida.");
            },
          },
        },
        barcode: {
          type: DataTypes.INTEGER,
          validate: {
            min: { args: [0], msg: "Codigo de barras do produto é requerido." },
          },
        },
        unit: {
          type: DataTypes.STRING,
        },
        sales_price: {
          type: DataTypes.DECIMAL(10, 2),
        },
        ncm: {
          type: DataTypes.INTEGER,
        },
        is_active: {
          type: DataTypes.INTEGER,
        },
        avatar: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Product;
