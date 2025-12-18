import express from "express"
import { login, refresh } from "../controllers/auth.controllers.js"

const routes = express.Router()

routes.post("/login", login)
routes.post("/refresh", refresh)

export default routes;