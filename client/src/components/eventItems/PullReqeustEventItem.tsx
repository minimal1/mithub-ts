/** @format */
import React from "react";
import { calcTimestamp } from "../../utils/utils";
import { EventItemProps } from "../EventItemList";

function PullRequestEventItem({ item }: EventItemProps) {
  const {
    id,
    actor,
    payload: { pull_request },
    created_at,
    repo,
  } = item;

  return (
    <>
      {pull_request ? (
        pull_request.labels.map((label) => (
          <div className='event item-pullrequest' key={id + "/" + label.name}>
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
                labeled a pull request with{" "}
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
                  <i className='fas fa-code-branch'></i>
                </span>
                <div className='labeled__detail'>
                  <a
                    href={`https://github.com/${repo.name}/pull/${pull_request.number}`}
                  >
                    <span className='labeled__title'>{pull_request.title}</span>
                  </a>
                  <span className='labeled__number'>
                    #{pull_request.number}
                  </span>
                  <p className='labeled__description'>{pull_request.body}</p>
                  <div className='labeled__more-info'>
                    <span className='labeled__addition'>
                      +{pull_request.additions}
                    </span>{" "}
                    <span className='labeled__deletion'>
                      -{pull_request.deletions}
                    </span>
                  </div>
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

export default PullRequestEventItem;
