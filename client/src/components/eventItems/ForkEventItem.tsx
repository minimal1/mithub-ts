/** @format */
import React from "react";
import RepoInfo from "./RepoInfo";
import { calcTimestamp } from "../../utils/utils";
import { EventItemProps } from "../EventItemList";

function ForkEventItem({ item, accessToken }: EventItemProps) {
  const {
    actor,
    repo,
    created_at,
    payload: { forkee },
  } = item;

  return (
    <div className='event item-fork'>
      <span className='event__author-avatar'>
        <a href={`https://github.com/${actor.login}`}>
          <img src={actor.avatar_url} alt={actor.login} />
        </a>
      </span>
      <div className='event__contents'>
        <div className='event__title'>
          <a href={`https://github.com/${actor.login}`}>
            <span className='event__author-name'>{actor.login}</span>
          </a>{" "}
          forked{" "}
          <a href={`https://github.com/${forkee?.full_name}`}>
            <span className='event__repo'>{forkee?.full_name}</span>
          </a>{" "}
          from{" "}
          <a href={`https://github.com/${repo.name}`}>
            <span className='event__repo'>{repo.name}</span>
          </a>
          <span className='event__timestamp'>{calcTimestamp(created_at)}</span>
        </div>
        <RepoInfo
          repoName={repo.name}
          repoUrl={repo.url}
          accessToken={accessToken || ""}
        />
      </div>
    </div>
  );
}

export default ForkEventItem;
