import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const authGuard = async ({ event, resolve }) => {
    const authorization = event.cookies.get('authorization');
    const currentPath = event.url.pathname;

    console.log(currentPath, authorization)

    if (!authorization && currentPath === '/ocr') {
        throw redirect(302, '/');
    }

    if (authorization && currentPath === '/') {
        throw redirect(302, '/ocr');
    }

    return resolve(event);
}

export const handle = sequence(authGuard);