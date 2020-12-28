var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registrarCliente = require('./routes/registrar-cliente');
const registrarProveedor = require('./routes/registrar-proveedor');
const loginCliente = require('./routes/login-cliente');
const loginProveedor = require('./routes/login-proveedor');
const crearProductoProveedor = require('./routes/crear-producto-proveedor');
const verProductos = require('./routes/ver-productos');
const verProducto = require('./routes/ver-producto');
const realizarCompra = require('./routes/realizar-compra');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registrar-cliente', registrarCliente);
app.use('/registrar-proveedor', registrarProveedor);
app.use('/login-cliente', loginCliente);
app.use('/login-proveedor', loginProveedor);
app.use('/crear-producto-proveedor', crearProductoProveedor);
app.use('/ver-productos', verProductos);
app.use('/ver-producto', verProducto);
app.use('/realizar-compra', realizarCompra);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
