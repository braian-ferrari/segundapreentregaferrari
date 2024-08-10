const express = require("express");
const router = express.Router()

const productsRouter = require("./products")
const realTimeProductsRouter = require("./realTimeProducts")


router.use("/products", productsRouter)
router.use("/realtimetroducts", realTimeProductsRouter)


module.exports = router