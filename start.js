const app = require('./app');
const PORT = process.env.PORT || 3004;

app.listen(PORT, async () => {
  console.log(`Fund Backend Listening on: ${PORT}`);
});

// app.listen(PORT, () => console.log(`Listening on: 3004`));
