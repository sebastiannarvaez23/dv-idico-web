function getSuspender<T>(promise: Promise<T>) {

    let status: "pending" | "success" | "error" = "pending";
    let response: T | null = null;

    const suspender = promise.then(
        (res) => {
            status = "success";
            response = res;
        },
        (err) => {
            status = "error";
            response = err;
        }
    );

    const read = () => {
        switch (status) {
            case "pending":
                throw suspender;
            case "error":
                throw response as Error;
            default:
                return response as T;
        }
    }

    return { read };
}

export default getSuspender;