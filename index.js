const express = require('express');
const path = require('path');
const Boom = require('boom');
const productsRouter = require('./routes/views/products.view.routes');
const productsApiRouter = require('./routes/api/products.api.routes');
const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} = require('./middleware/error.middleware');
const isRequestAjaxOrApi = require('./utils/is-request-ajax-or-api');

const app = express();
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter);

app.get('/', (req, res) => {
  res.redirect('/products');
});

app.use((req, res, next) => {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload }
    } = Boom.notFound();
    return res.status(statusCode).json(payload);
  }
  res.status(404).render('404');
});

app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
