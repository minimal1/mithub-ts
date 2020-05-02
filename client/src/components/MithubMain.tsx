/** @format */

import React from "react";
import MithubMainTemplete from "./MithubMainTemplete";
import Header from "./Header";
import EventItemList from "./EventItemList";
import MoreButton from "./MoreButton";

function MithubMain() {
  return (
    <MithubMainTemplete
      header={<Header onLogout={() => 1} />}
      activities={<EventItemList />}
      more={<MoreButton onLoadMore={() => 1} />}
    />
  );
}

export default MithubMain;
