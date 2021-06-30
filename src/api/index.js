//TODO: reducer api function
export async function api({ url, parms }) {
    const _parms = parms.headers
        ? {
              ...parms,
              headers: {
                  ...parms.headers,
              },
          }
        : {
              ...parms,
          };
    let data = {};

    try {
        const response = await fetch(url, _parms);
        if (response.type == "opaque") {
            throw new Error(
                "this response has opaque body check your request to api"
            );
        }
        return response;
    } catch (e) {
        console.error(e);
    }

    return 0;
}
export function authHeader() {
    return {
        Authoriztion: `Bearer ${window.localStorage.getItem()}`,
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
