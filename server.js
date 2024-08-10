const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const routes = require('./src/routes/index');

const exphbs = require('express-handlebars');

const PORT = 8080;


const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);


io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');


    socket.on('productAdded', (newProduct) => {
        io.emit('updateProductList', newProduct);
    });

    socket.on('productDeleted', (productId) => {
        io.emit('removeProduct', productId);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
