"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Search {
    byText(_text, _array) {
        const tokens = _text
            .split(" ")
            .filter(Boolean)
            .map((token) => `(?=.*\\b${token}\\b)`);
        const searchTermRegex = new RegExp(tokens.join(""), "gim");
        const filteredList = _array.filter((item) => {
            return (item.body.match(searchTermRegex) || item.title.match(searchTermRegex));
        });
        return filteredList;
    }
}
exports.default = Search;
