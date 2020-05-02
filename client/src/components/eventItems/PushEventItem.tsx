/** @format */
import React from "react";
import "./PushEventItem.css";
import { calcTimestamp } from "../../utils/utils";
import { EventItemProps } from "../EventItemList";
import CommitItem from "./CommitItem";

function PushEventItem({ item }: EventItemProps) {
  const {
    actor,
    repo,
    created_at,
    payload: { before, head, ref, size, commits },
  } = item;

  const branch = ref ? ref.split("heads/")[1] : "";

  const commitList = [];
  if (commits && size !== undefined && head && before) {
    if (size > 2) {
      commitList.push(
        <CommitItem key={1} commit={commits[0]} repoName={repo.name} />
      );
      commitList.push(
        <CommitItem key={2} commit={commits[1]} repoName={repo.name} />
      );
      commitList.push(
        <a
          href={`https://github.com/${repo.name}/compare/${before.slice(
            0,
            10
          )}...${head.slice(0, 10)}`}
          className='push__more-commits'
        >
          {size - 2} more {size - 2 > 1 ? "commits" : "commit"} >>
        </a>
      );
    } else if (size === 2) {
      commitList.push(
        <CommitItem key={1} commit={commits[0]} repoName={repo.name} />
      );
      commitList.push(
        <CommitItem key={2} commit={commits[1]} repoName={repo.name} />
      );
    } else if (size === 1) {
      commitList.push(
        <CommitItem key={1} commit={commits[0]} repoName={repo.name} />
      );
    }
  }

  return (
    <div className='event item-pullrequest'>
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
          pushed to{" "}
          <a href={`https://github.com/${repo.name}`}>
            <span className='event__repo'>{repo.name}</span>
          </a>
          <span className='event__timestamp'>{calcTimestamp(created_at)}</span>
        </div>
        <div className='event__detail'>
          <div className='event__push push'>
            {size} {size !== undefined && size > 1 ? "commits" : "commit"} to{" "}
            <a href={`https://github.com/${repo.name}/tree/${branch}`}>
              <span className='push__branch'>{branch}</span>
            </a>
            <div className='push__commits'>{commitList}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PushEventItem;
