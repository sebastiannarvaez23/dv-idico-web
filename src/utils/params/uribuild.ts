export const uribuild = (params: Record<string, string | number | boolean>): string => {
    const urlParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        urlParams.append(key, String(value));
    }
    return `?${urlParams.toString()}`;
};