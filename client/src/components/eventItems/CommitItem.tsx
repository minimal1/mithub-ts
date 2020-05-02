/** @format */

import React from "react";
import "./CommitItem.css";
import { Commit } from "../../stores/user";

type CommitProps = {
  commit: Commit;
  repoName: string;
};

function CommitItem({ commit, repoName }: CommitProps) {
  let { author, message, sha } = commit;

  return (
    <div className='push__commit commit'>
      <span className='commit__author-name'>{author.name}</span>

      <a href={`https://github.com/${repoName}/commit/${sha}`}>
        <span className='commit__sha'>{sha.slice(0, 7)}</span>
      </a>
      <span className='commit__message'>{message}</span>
    </div>
  );
}

export default CommitItem;
