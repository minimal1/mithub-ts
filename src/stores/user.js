/** @format */

import { observable, action } from "mobx";

export default class UserStore {
  @observable user = {
    id: -1,
    username: "",
    useremail: "",
    avatarUrl: undefined,
  };
}
