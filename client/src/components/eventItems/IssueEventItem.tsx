/** @format */
import React from "react";
import "./LabeledEventItem.css";
import { calcTimestamp } from "../../utils/utils";
import { EventItemProps } from "../EventItemList";

function IssueEventItem({ item }: EventItemProps) {
  const {
    id,
    actor,
    payload: { issue },
    created_at,
    repo,
  } = item;

  return (
    <>
      {issue ? (
        issue.labels.map((label) => (
          <div className='event item-issue' key={id + "/" + label.name}>
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
                labeled an issue with{" "}
                <span
                  className='event__label'
                  style={{ backgroundColor: `#${label.color}` }}
                >
                  {label.name}
                </span>{" "}
                in{" "}
                <a href={`https://github.com/${repo.name}`}>
                  <span className='event__repo'>{repo.name}</span>
                </a>
                <span className='event__timestamp'>
                  {calcTimestamp(created_at)}
                </span>
              </div>
              <div className='event__detail labeled'>
                <span className='labeled__icon'>
                  <i className='fas fa-exclamation'></i>
                </span>
                <div className='labeled__detail'>
                  <a
                    href={`https://github.com/${repo.name}/issues/${issue.number}`}
                  >
                    <span className='labeled__title'>{issue.title}</span>
                  </a>
                  <span className='labeled__number'>#{issue.number}</span>
                  <p className='labeled__description'>{issue.body}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
}

export default IssueEventItem;
