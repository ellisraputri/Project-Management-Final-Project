export function getHttp(){
    let apiUrl = import.meta.env.VITE_API_URL;
    if (import.meta.env.MODE !== "development"){
        apiUrl = "/"
    }
    return apiUrl;
}