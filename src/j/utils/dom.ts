

let dimensionCache:any = {};

export function getDimensions(ele: HTMLElement, id: string): {
    width: number, height: number, left: number, top: number
} {
    let dimensions = dimensionCache[id];
    if (!dimensions) {
        // make sure we got good values before caching
        if (ele.offsetWidth && ele.offsetHeight) {
            dimensions = dimensionCache[id] = {
                width: ele.offsetWidth,
                height: ele.offsetHeight,
                left: ele.offsetLeft,
                top: ele.offsetTop
            };

        } else {
            // do not cache bad values
            return { width: 0, height: 0, left: 0, top: 0 };
        }
    }

    return dimensions;
}

export function flushDimensionCache() {
    dimensionCache = {};
}

export function clearDimensions(id: string) {
    delete dimensionCache[id];
}
