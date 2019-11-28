import express from 'express';
import { db } from './models/index.js';

const app = express();
db.sequelize.sync();
const Users = db.Users;

// Root context
app.get('/', (req, res, next) => {
  Users.findAll()
    .then(response => {
      console.log(response);
    })
    .catch(error => console.log(errpr));
  res.status(200).end('Express Server Start Port 3000');
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('ERROR');
});

app.listen(3000, () => console.log('Express Server Start Port 3000'));
