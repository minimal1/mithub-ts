/** @format */

import UserStore from "./user";

class RootStore {
  public user: UserStore;
  constructor() {
    this.user = new UserStore();
  }
}

export default RootStore;
