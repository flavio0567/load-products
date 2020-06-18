const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

const Product = require("../../models/Product.model");
const { build } = require("../../models/Product.model");

const tmpFolder = path.resolve(__dirname, "..", "src", "products.csv");

module.exports = {
  create: async (req, res) => {
    let prods = [];

    // console.log("SERVER > CONTROLLER > product > index ");

    const newProds = await createProducts(prods);
    // console.log("calling:", newProds);
    // const result = await carregaProdutos(newProds);
    // console.log("resolved:", result);
    // return res.status(200).json(result);
    return newProds;
  },
};

function createProducts(prods) {
  // console.log("SERVER > CONTROLLER > createProducts() ");

  fs.createReadStream("products.csv")
    .pipe(csv())
    .on("data", (row) => {
      prods.push(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed", prods[100]);
      const result = carregaProdutos(prods);
      return result;
    });
  return prods;
}

async function carregaProdutos(prods) {
  console.log("SERVER > CONTROLLER > carrega Produtos()  ", prods[0]);

  return new Promise(() => {
    const mapProd = prods.map((prod) => {
      const newProduct = Product.build({
        code: prod.code,
        name: prod.name,
        barcode: prod.barcode,
        unit: prod.unit,
        sales_price: parseFloat(prod.sale_price),
        ncm: prod.ncm,
        product_family: null,
        is_active: 0,
        avatar: null,
      });
      newProduct
        .save()
        .then((product) => {
          return product;
        })
        .catch((err) => {
          console.log("Ocorreu erro salvando product", err);
        });
      return;
    });
  });
}

// return res.status(200).json(prods);
// });

// };
