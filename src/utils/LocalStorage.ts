export class LocalhostStorage {
  static get = (key:any) => {
    const item:any = localStorage.getItem(key);
    return item !== 'null' && item !== 'undefined' ? JSON.parse(item) : null;
  };

  static set = (key:any, value:any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  static remove = (key:any) => {
    localStorage.removeItem(key);
  };

  static clear = () => {
    localStorage.clear();
  };
}