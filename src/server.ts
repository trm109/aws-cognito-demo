import App from './app';
import bodyParser from 'body-parser';

//Controll for Home Controller
import HomeController from './controllers/home.controller';
//Controll for Auth Controller
import AuthController from './controllers/auth.controller';


const app = new App({
    port: 3000,
    controllers: [
        new HomeController(),
        new AuthController(),
    ],
    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ],
});

app.listen();