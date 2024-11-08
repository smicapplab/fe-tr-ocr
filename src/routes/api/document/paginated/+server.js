import { PRI_AWS_TEXTTRACT_API } from '$env/static/private';
import { fetchGet } from '$lib/fetch-util';
import { json } from '@sveltejs/kit';

const stage = {
    done: "done"
}

export const POST = async ({ request }) => {
    //`/api/document?status=${$ocrStatusStore}&lastEvaluatedKey=${$lastEvalOcrStore}`
    const { status, lastEvaluatedKey } = await request.json();

    const url = `${PRI_AWS_TEXTTRACT_API}/document?status=${stage[status] || ""}&lastEvaluatedKey=${lastEvaluatedKey || ""}`
    console.log(url)
    const response = await fetchGet(url);
    return json(response?.data);
};