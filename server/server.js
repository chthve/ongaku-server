const app = require('./app');

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is clubbing at http://localhost/${port} 🕺`); //eslint-disable-line
});
