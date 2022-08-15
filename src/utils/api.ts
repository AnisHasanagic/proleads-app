export const apiCall = (
    url: string,
    body?: any,
    method = "GET",
    protectedRoute = false,
    isFormData = false
): Promise<Response> => {
    let DEFAULT_HEADERS: any = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    if (protectedRoute) {
        const bearer = "Bearer " + localStorage.getItem("access_token");
        DEFAULT_HEADERS["Authorization"] = bearer;
    }

    let requestData: any = {
        method: method,
        headers: DEFAULT_HEADERS,
    };

    if (body) {
        requestData.body = JSON.stringify(body);
    }

    if (isFormData) {
        const formData: any = new FormData();

        for (const key in body) {
            formData.append(key, body[key]);
        }

        DEFAULT_HEADERS = {};

        if (protectedRoute) {
            const bearer = "Bearer " + localStorage.getItem("access_token");
            DEFAULT_HEADERS["Authorization"] = bearer;
        }

        requestData = {
            method: method,
            headers: DEFAULT_HEADERS,
            body: formData,
        };
    }

    if (method === "GET") {
        requestData = {
            method: method,
            headers: DEFAULT_HEADERS,
        };
    }

    return fetch(url, requestData);
};