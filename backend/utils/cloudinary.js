import {v2 as cloudinary} from "cloudinary"
import 'dotenv/config'


cloudinary.config({ 
    cloud_name: 'dagrkolqn', 
    api_key: '627636817196889', 
    api_secret: 'SvpvYwWoq1rjSCKwKYW-C158ZxU' 
});


async function uploadOnCloudinary(file) {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
  
    return result;
  }

export {uploadOnCloudinary}