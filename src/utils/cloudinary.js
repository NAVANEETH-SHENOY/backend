import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { loadEnvFile } from 'process';



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //uplaod the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: "auto"
            })
        //file has been uploaded successfully
        console.log("file uploaded on cloudinary successfully",
            response.url
        );
        return response;
    }
    catch (error) {
        fs.unlinkSync(localFilePath);//remove the locally saved temporary 
        // file as the upload operation got failed
    }
}

    cloudinary.v2.uploader.upload_stream("http://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png",
        {
            public_id: "basketball"
            ,
        },
        function (error, result) { console.log(result, error); });