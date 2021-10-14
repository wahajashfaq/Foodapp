import { Application } from "express";
import { create} from "./controller";

export function routesConfig(app: Application) {
    //create new user
    app.post('/users',
       create
    );
}