import { PRI_PASS_CODE } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export const POST = async ({ request, cookies }) => {
    try {
        const { passCode } = await request.json();
        console.log({ passCode })
        if (passCode === PRI_PASS_CODE) {
            // Set Cookie

            cookies.set('authorization', uuidv4(), {
                path: '/',               // Cookie is accessible on all routes
                httpOnly: true,          // Cookie is not accessible via JavaScript
                secure: true,            // Cookie is only sent over HTTPS
                sameSite: 'strict',      // Strictly restricts cross-site usage
                maxAge: 60 * 60 * 24     // Cookie expires in 1 day
            });


            return json({ data: 'Authorized' }, { status: 200 });
        }

        // Return a 401 Unauthorized if the passCode is incorrect
        return json({ error: 'You have entered an incorrect passcode' }, { status: 401 });

    } catch (error) {
        console.error(error)
        return json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
};