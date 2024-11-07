import { PRI_AWS_TEXTTRACT_API } from '$env/static/private';
import { PUBLIC_ISSUER_DOC_URL } from '$env/static/public';
import { fetchGet, fetchPost } from '$lib/fetch-util';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const { name, fileId, fileName, fileType } = await request.json();
    const url = `${PUBLIC_ISSUER_DOC_URL}/${fileName}`

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