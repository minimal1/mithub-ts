/** @format */

import Axios from "axios";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import UserStore from "../stores/user";

interface AuthCallBackProps extends RouteComponentProps {
  user: UserStore;
}

function AuthCallBack({ location, history, user }: AuthCallBackProps) {
  async function getToken() {
    let { search } = location;
    search = search.split("=")[1];
    try {
      const { status, data } = await Axios.post("/api/access_token", {
        code: search,
      });

      if (status === 200) user.login(data);
      history.push("/");
    } catch (error) {
      history.push("/error");
    }
  }

  getToken();

  return null;
}

export default inject("user")(observer(AuthCallBack));
