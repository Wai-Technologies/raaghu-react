import axios from "axios";

export async function RestService(URL: string, config?: any) {
    // const baseUrl = process.env.REACT_APP_API_URL; // Environment variable is not accessible here
    const baseUrl = localStorage.getItem("REACT_APP_API_URL");

    function isUrl(str: string) {
        const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\\/\w.-]*)*\/?$/; 
        return pattern.test(str);
    }

    let url;
    if (URL.includes(`${baseUrl}`)) {
        url = URL;
    } else {
        url = isUrl(URL) ? URL : baseUrl + URL;
    }

    const token = localStorage.getItem("accessToken");
    const tenant = localStorage.getItem("__tenant");

    if (token) {
        config = {
            ...config,
            headers: { ...config?.headers, Authorization: `Bearer ${token}` }
        };
    } else if (
        tenant &&
    !url.includes("api/abp/multi-tenancy/tenants/by-name/")
    ) {
        config = {
            ...config,
            headers: {
                ...config?.headers,
                Authorization: `Bearer ${token}`,
                __tenant: `${tenant}`
            }
        };
    }

    try {
        const response = await axios(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
