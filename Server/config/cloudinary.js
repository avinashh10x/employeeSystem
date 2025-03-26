import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'storage10x',
    api_key: process.env.API_KEY || '119343689196578',
    api_secret: process.env.API_SECRET || 'OMFLGWK1O43L-85sGFGwUpgEQHM',
});

const uploadOnCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    return reject(error);
                }
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer); // Pass the file buffer to the upload stream
    });
};

export default uploadOnCloudinary;