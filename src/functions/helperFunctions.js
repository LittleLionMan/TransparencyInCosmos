export const objSearch = (arg, data, chain) => {
    for (let name in data) {
        if (name === chain) {
            return data[name][arg];
        }
    }
}