const fetchError = async (/** @type {any} */ promise) => {
    try {
        const response = await promise;
        if (response.ok) {
            const awaitedData = await response.json();
            return { data: awaitedData };
        } else {
            console.error(response)
            return { error: "Error occurred while fetching URL" };
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
};

export const fetchGet = async (url = "") => {
    return await fetchError(fetch(url));
};

export const fetchPost = async ({
    url = "", params = {},
}) => {
    const returnData = await fetchError(fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(params),
    }));
    return returnData;
};

export const fetchPatch = async ({
    url = "", params = {},
}) => {
    const returnData = await fetchError(fetch(url, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(params),
    }));
    return returnData;
};
