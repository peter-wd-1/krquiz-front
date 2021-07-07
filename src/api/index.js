//TODO: reducer api function
export function api(token) {
    return async ({ url, parms }) => {
        const _parms = parms.headers
            ? {
                  ...parms,
                  headers: {
                      ...parms.headers,
                      Authorization: `Token ${token}`,
                  },
              }
            : {
                  ...parms,
              };
        let response;
        try {
            response = await fetch(url, _parms);
            if (response.type == "opaque") {
                throw new Error(
                    "this response has opaque body check your request to api"
                );
            }
        } catch (e) {
            console.error(e);
        }
        return response;
    };
}

export function url({ path = "", queryValue = {}, baseURL = "" }) {
    let fullBASEURL = "";
    if (baseURL) {
        fullBASEURL = `${baseURL}${path}`;
    } else {
        if (process.env.NODE_ENV == "production")
            throw new Error("baseURL should be provided");
        fullBASEURL = `${path}`;
    }
    return fullBASEURL;
}

const AuthAPIString =
    process.env.NODE_ENV == "development"
        ? {
              requestToken: "/api/v1/users/",
          }
        : {
              retuestTOken: "",
          };

export { AuthAPIString };
