import express from 'express';
// import { db } from './models/index.js';
import sessionParser from 'express-session';
import cors from 'cors';

const app = express();
// db.sequelize.sync();
// const Users = db.Users;
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(
  sessionParser({
    secret: 'test',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.use(cors(corsOptions));

// Root context
app.get('/', (req, res) => {
  // Users.findAll()
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => console.log(errpr));
  res.status(200).end('Express Server Start Port 4000');
});

app.get('/confirmSession', (req, res) => {
  console.log('CHECK SESSION');
  let msg = 'NOT FOUND!';
  if (req.session.user) {
    msg = `${req.session.user.name}!!`;
  }
  console.log(req.session.user);
  res.send(msg);
});

app.get('/session', (req, res) => {
  console.log('CREATE SESSION!');
  if (req.session.user) {
    console.log('SESSION IS FOUND');
  } else {
    req.session.user = {
      name: 'TEST',
      age: 35,
      createCurTime: new Date(),
    };
    console.log('CREATE SESSTION COMPLATE', req.session.user);
  }
  res.redirect('/confirmSession');
});

app.get('/deleteSession', (req, res) => {
  req.session.destroy();
  console.log('SESSION DELETE!');
  res.send('SESSION DELETE');
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('ERROR');
});

app.listen(4000, () => console.log('Express Server Start Port 4000'));
