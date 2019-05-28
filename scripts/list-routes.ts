import app from '../src/web/app';

app.ready(() => {
  console.log(app.printRoutes());
});
