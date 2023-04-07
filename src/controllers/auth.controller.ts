import * as express from 'express';
import { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

class AuthController {
    public path = '/auth';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }
    //init routes for this controller.
    //uses express-validator to validate the body.
    public initRoutes() {
        //signup / registering a new user.
        this.router.post(`/signup`, this.validateBody('signup'), this.signUp);
        //signing in a user.
        this.router.post(`/signin`, this.validateBody('signin'), this.signIn);
        //verifying a user.
        this.router.post(`/verify`, this.validateBody('verify'), this.verify);
    }

    signUp = (req: Request, res: Response)  => {

        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(422).json({errors: result.array()})
        }
        return res.status(200).json({message: 'success'}).end();
    }
    signIn = (req: Request, res: Response) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(422).json({errors: result.array()})
        }
        return res.status(200).json({message: 'success'}).end();
    }
    verify = (req: Request, res: Response) => {
        //check if iit passes validation.
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(422).json({errors: result.array()})
        }
        return res.status(200).json({message: 'success'}).end();
    }

    private validateBody(type: string){
        switch (type) {
            case 'signup': 
                return [
                    body('username').notEmpty().isLength({min: 3, max: 20}),
                    body('email').notEmpty().normalizeEmail().isEmail(),
                    body('password').isString().notEmpty().isLength({min: 6, max: 20}),
                    body('birthday').exists().notEmpty().isDate().isISO8601(),
                    body('name').notEmpty().isString(),
                    body('family_name').notEmpty().isString(),
                ]
            case 'signin': 
                return [
                    body('username').notEmpty().isLength({min: 3, max: 20}),
                    body('password').isString().notEmpty().isLength({min: 6, max: 20}),
                ]
            case 'verify': 
                return [
                    body('username').notEmpty().isLength({min: 3, max: 20}),
                    body('code').isString().isLength({min: 6, max: 6})
                ]
        }
    }
}
export default AuthController;