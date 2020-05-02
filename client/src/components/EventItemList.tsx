/** @format */

import * as React from "react";
import { inject, observer } from "mobx-react";
import CreateEventItem from "./eventItems/CreateEventItem";
import ForkEventItem from "./eventItems/ForkEventItem";
import WatchEventItem from "./eventItems/WatchEventItem";
import PushEventItem from "./eventItems/PushEventItem";
import PullRequestEventItem from "./eventItems/PullReqeustEventItem";
import IssueEventItem from "./eventItems/IssueEventItem";
import PublicEventItem from "./eventItems/PublicEventItem";
import { Event } from "../stores/user";
import "./Event.css";

export type EventItemProps = {
  item: Event;
  accessToken?: string;
};

type EventItemListProps = {
  accessToken?: string;
  loading?: boolean;
  loadedEvents?: Event[];
};

let itemList: JSX.Element[] = [];

function EventItemList({
  accessToken,
  loading,
  loadedEvents,
}: EventItemListProps) {
  if (accessToken === null) {
    itemList = [];
  }
  if (!loading && loadedEvents) {
    itemList = loadedEvents.map((item) => {
      const { type } = item;
      switch (type) {
        case "CreateEvent":
          return (
            <CreateEventItem
              item={item}
              key={item.id}
              accessToken={accessToken}
            />
          );
        case "ForkEvent":
          return (
            <ForkEventItem
              item={item}
              key={item.id}
              accessToken={accessToken}
            />
          );
        case "WatchEvent":
          return (
            <WatchEventItem
              item={item}
              key={item.id}
              accessToken={accessToken}
            />
          );
        case "PublicEvent":
          return (
            <PublicEventItem
              item={item}
              key={item.id}
              accessToken={accessToken}
            />
          );
        case "PushEvent":
          return <PushEventItem item={item} key={item.id} />;
        case "PullRequestEvent":
          return <PullRequestEventItem item={item} key={item.id} />;
        case "IssuesEvent":
          return <IssueEventItem item={item} key={item.id} />;
        default:
          return <></>;
      }
    });
  }
  return <div>{itemList}</div>;
}

export default inject(({ user }) => ({
  accessToken: user.userInfo.accessToken,
  loading: user.loading,
  loadedEvents: user.loadedEvents,
}))(observer(EventItemList));
