const port = process.env.PORT || 5665;
const app = require('./app');

app.listen(port);
console.log(`Api rodando na porta ${port}`);