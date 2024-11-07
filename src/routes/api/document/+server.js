import { resolveFileType, uploadBase64File } from '$lib/aws/s3Helper';
import { PRI_AWS_TEXTTRACT_API, PRI_AWS_ISUER_BUCKET } from '$env/static/private';
import { PUBLIC_ISSUER_DOC_URL } from '$env/static/public';
import { v4 as uuidv4 } from 'uuid';
import { fetchGet, fetchPost } from '$lib/fetch-util';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const { name, data } = await request.json();

    let fileType = resolveFileType({ name, data });
    const fileId = uuidv4()
    const fileName = `pam/documents/${fileId}/${fileId}.${fileType}`

    await uploadBase64File({
        base64String: data,
        fileName,
        bucket: PRI_AWS_ISUER_BUCKET,
        fileType,
    })

    const url = `${PUBLIC_ISSUER_DOC_URL}/${fileName}`


    console.log({ url })

    console.log({
        url: `${PRI_AWS_TEXTTRACT_API}/document`,
        params: {
            name,
            fileId,
            fileName,
            fileType,
            url
        }
    })

    const response = await fetchPost({
        url: `${PRI_AWS_TEXTTRACT_API}/document`,
        params: {
            name,
            fileId,
            fileName,
            fileType,
            url
        }
    });

    return json(response);
};

export const GET = async () => {
    const response = await fetchGet(`${PRI_AWS_TEXTTRACT_API}/document`);
    return json(response?.data);
};