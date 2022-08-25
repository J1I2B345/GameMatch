const cloudinary = require("cloudinary");
// cloudinary.uploader.upload(file,options,callback)

//const SECRET = require("../config")
cloudinary.config({
	cloud_name: "gamematch",
	api_key: "397753543494913",
	api_secret: "paXBjSeBQx2K0aAzyfjigMvLwfw",
	secure: true,
});

const uploadImage = async (filePath) => {
	return await cloudinary.uploader.upload(filePath, {
		folder: "replit",
	});
};
module.exports = uploadImage;
