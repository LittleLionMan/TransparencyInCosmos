import { data } from "../data/data";

export const objSearch = (arg, chain) => {
    for (let name in data) {
        if (name === chain) {
            return data[name][arg];
        }
    }
}