import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {cloudinaryUpload} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validation of user details- not empty 
    //check if user already exists
    //check for images ,check for avatar
    //upload image to cloudinary,avatar
    //create user object - create entry in db
    //remove passwrord and refresh token field from response
    //check for user creation 
    //return response  


    const {fullName,email,username,password} = req.body
    console.log("email:",email);

    if(
        [fullName,email,username,password].
        some((field)=>field?.trim() ==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = User.findOne({
        $or:[{email},   {username}]
    })

    if(existedUser){
        throw new ApiError(409,"User already exists with given email or username")
    }

    const avatarLocalPath = req.files?.avatar?[0]?.path: null
    const coverImageLocalPath = req.files?.coverImage?[0]?.path: null

    if(!avatarLocalPath || !coverImageLocalPath){
        throw new ApiError(400,"Avatar and Cover image are required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath) 
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError (500,"Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"User registration failed, please try again")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User resgistered successfully")
    )
    )

})

export{registerUser}