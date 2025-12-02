export default class Search {
  byText(_text: string, _array: any): any {
    const tokens = _text
      .split(" ")
      .filter(Boolean)
      .map((token) => `(?=.*\\b${token}\\b)`);
    const searchTermRegex = new RegExp(tokens.join(""), "gim");

    const filteredList = _array.filter((item: any) => {
      // item.match(searchTermRegex);
      return (
        item.body.match(searchTermRegex) || item.title.match(searchTermRegex)
      );
    });
    return filteredList;
  }
}
