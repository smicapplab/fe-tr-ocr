import { getFileType, getPresignedUploadUrl } from "$lib/aws/s3Helper";
import { v4 as uuidv4 } from 'uuid';
import { PRI_AWS_ISUER_BUCKET } from '$env/static/private';
import { json } from "@sveltejs/kit";

export const POST = async ({ request }) => {
    try {
        const { name } = await request.json();
        let fileType = getFileType(name);
        const fileId = uuidv4()
        const fileName = `pam/documents/${fileId}/${fileId}.${fileType}`
        const presignedUrl = await getPresignedUploadUrl({
            bucket: PRI_AWS_ISUER_BUCKET,
            fileName,
        })
        return json({ presignedUrl, fileId, fileName, fileType });
    } catch (error) {
        console.error(error)
        return json(error);
    }
};