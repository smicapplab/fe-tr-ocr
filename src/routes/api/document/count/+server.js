import { PRI_AWS_TEXTTRACT_API } from '$env/static/private';
import { fetchPost } from '$lib/fetch-util';
import { json } from '@sveltejs/kit';

export const POST = async () => {
    const url = `${PRI_AWS_TEXTTRACT_API}/document/count`
    const response = await fetchPost({
        url,
    });

    return json({ data: response.data });
};