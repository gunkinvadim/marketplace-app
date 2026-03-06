export const delayTimeout = (ms: number = 0) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}