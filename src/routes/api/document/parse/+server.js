import { PRI_AWS_TEXTTRACT_API } from '$env/static/private';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const { jobId } = await request.json();
    const url = `${PRI_AWS_TEXTTRACT_API}/document/${jobId}`

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Parse and return the response JSON
        const result = await response.json();
        console.log('Document updated successfully:', result);
        return json({ data: result });
    } catch (error) {
        console.error('Error updating document:', error);
        return json({ error });
    }

};