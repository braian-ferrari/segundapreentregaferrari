const fs = require('fs');
const path = require('path');

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getAllCarts() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading carts file:', err);
            return [];
        }
    }

    async saveCarts(carts) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
        } catch (err) {
            console.error('Error writing carts file:', err);
        }
    }

    async addCart(cart) {
        const carts = await this.getAllCarts();
        carts.push(cart);
        await this.saveCarts(carts);
    }

    async addProductToCart(cartId, product) {
        const carts = await this.getAllCarts();
        const cart = carts.find(c => c.id === cartId);

        if (cart) {
            const existingProduct = cart.products.find(p => p.product === product.product);

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                cart.products.push(product);
            }

            await this.saveCarts(carts);
        } else {
            throw new Error('Carrito no encontrado');
        }
    }

    async getProductsFromCart(cartId) {
        const carts = await this.getAllCarts();
        const cart = carts.find(c => c.id === cartId);
        return cart ? cart.products : [];
    }
}

module.exports = new CartManager(path.join(__dirname, 'carts.json'));
