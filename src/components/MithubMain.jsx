/** @format */

import React from "react";
import MithubMainTemplete from "./MithubMainTemplete";
import Header from "./Header";
import ActivityItemList from "./ActivityItemList";
import RepoItemList from "./RepoItemList";

function MithubMain() {
  return (
    <MithubMainTemplete
      header={<Header />}
      repositories={<RepoItemList />}
      activities={<ActivityItemList />}
    />
  );
}

export default MithubMain;
