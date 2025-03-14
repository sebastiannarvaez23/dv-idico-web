export const uribuild = (params: Record<string, string | number | boolean | undefined>): string => {
    const urlParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== '') {
            urlParams.append(key, String(value));
        }
    }
    return `?${urlParams.toString()}`;
};