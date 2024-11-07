import { PRI_AWS_SECRET_KEY, PRI_AWS_ACCESS_KEY } from '$env/static/private';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

let credentials = {};
if (PRI_AWS_ACCESS_KEY && PRI_AWS_SECRET_KEY) {
	credentials = {
		credentials: {
			accessKeyId: PRI_AWS_ACCESS_KEY,
			secretAccessKey: PRI_AWS_SECRET_KEY
		}
	};
}

const s3Client = new S3Client({
	region: 'ap-southeast-1',
	...credentials
});

// @ts-ignore
const decodeBase64 = (base64String) => {
	const base64Data = base64String.replace(/^data:([A-Za-z-+/]+);base64,/, '');
	// @ts-ignore
	return Buffer.from(base64Data, 'base64');
}

// @ts-ignore
export const uploadToS3 = async ({ buffer, fileName, bucket, fileType = "pdf" }) => {
	try {
		const checkUpload = new Upload({
			client: s3Client,
			params: {
				Bucket: bucket,
				Key: fileName,
				...(fileType === "pdf" ? { ContentType: 'application/pdf', ContentDisposition: 'inline' } : {}),
				Body: buffer
			}
		});

		checkUpload.on('httpUploadProgress', (progress) => {
			console.log(progress);
		});

		await checkUpload.done();
	} catch (e) {
		console.error('uploadToS3 ---->', { e });
	}
};

// @ts-ignore
export const uploadBase64File = async ({ base64String, fileName, bucket, fileType }) => {
	const buffer = decodeBase64(base64String);
	await uploadToS3({ buffer, fileName, bucket, fileType });
};

export const getFileType = (fileName) => {
	// Extract the file extension
	const extension = fileName.split('.').pop().toLowerCase();

	// Define supported file types
	const supportedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff'];

	// Check if the extension is in the supported list
	if (supportedExtensions.includes(extension)) {
		return extension; // Return the file extension as file type
	} else {
		return 'unknown'; // If not supported, return 'unknown'
	}
}

// @ts-ignore
export const resolveFileType = ({ name, data }) => {
	let fileType = "";
	if (name.toLowerCase().endsWith('.pdf')) {
		fileType = 'pdf';
	} else {
		fileType = data.substring('data:'.length, data.indexOf(';base64')).split('/')[1].toLowerCase();
	}
	return fileType;
}

export const getPresignedUploadUrl = async ({ bucket, fileName }) => {
	try {
		let command = new PutObjectCommand({
			Bucket: bucket,
			Key: fileName,
		});

		const uploadUrl = await getSignedUrl(s3Client, command, {
			expiresIn: 3600,
		});

		return uploadUrl;
	} catch (error) {
		return error;
	}
};