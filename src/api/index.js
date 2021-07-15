//TODO: reducer api function
export function api(token) {
    return async ({ path, parms }) => {
        if (parms == "undefined") {
            throw new Error("Api Error: no parameters found");
        }
        const url = process.env.REACT_APP_SERVER_URL + path;
        const _parms = {
            ...parms,
            headers: {
                ...parms.headers,
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `token ${token}`,
            },
        };
        let response;
        try {
            response = await fetch(url, _parms);
        } catch (e) {
            console.error(e);
        }
        return response;
    };
}

// export function url({ path = "", queryValue = {}, baseURL = "" }) {
//     let fullBASEURL = "";
//     if (baseURL) {
//         fullBASEURL = `${baseURL}${path}`;
//     } else {
//         if (process.env.NODE_ENV == "production")
//             throw new Error("baseURL should be provided");
//         fullBASEURL = `${path}`;
//     }
//     return fullBASEURL;
// }
