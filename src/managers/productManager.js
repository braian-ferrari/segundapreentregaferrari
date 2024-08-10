const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getAllProducts() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading products file:', err);
            return [];
        }
    }

    async saveProducts(products) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
        } catch (err) {
            console.error('Error writing products file:', err);
        }
    }

    async addProduct(product) {
        const products = await this.getAllProducts();
        products.push(product);
        await this.saveProducts(products);
    }

    async updateProduct(productId, updatedProduct) {
        let products = await this.getAllProducts();
        products = products.map(p => p.id === productId ? { ...p, ...updatedProduct } : p);
        await this.saveProducts(products);
    }

    async deleteProduct(productId) {
        let products = await this.getAllProducts();
        products = products.filter(p => p.id !== productId);
        await this.saveProducts(products);
    }
}

module.exports = new ProductManager(path.join(__dirname, 'products.json'));
