import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.cloud_name || 'storage10x',
    api_key: process.env.api_key || '119343689196578',
    api_secret: process.env.api_secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'image',
        })
        console.log('file is uploaded successfully', response, response.url)
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.log('Error uploading file to cloudinaryy', error)
        fs.unlinkSync(localFilePath)
        throw error;

    }
}

export default uploadOnCloudinary;