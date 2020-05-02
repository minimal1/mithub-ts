/** @format */
import React from "react";
import RepoInfo from "./RepoInfo";
import { calcTimestamp } from "../../utils/utils";
import { EventItemProps } from "../EventItemList";

function CreateEventItem({ item, accessToken }: EventItemProps) {
  const { actor, repo, created_at } = item;
  console.log(item);

  return (
    <div className='event item-create'>
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
          created a repository{" "}
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

export default CreateEventItem;
