import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
<<<<<<< HEAD
import {upload} from "../middlewares/multer.middleware.js";
=======
import { upload } from "../middlewares/multer.middleware.js";
>>>>>>> dde0e40de9308880114587239b5739b153dc7a48
const router= Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
<<<<<<< HEAD
    ]),
    registerUser
)
=======

    ]),
    registerUser
    )
>>>>>>> dde0e40de9308880114587239b5739b153dc7a48


export default router;