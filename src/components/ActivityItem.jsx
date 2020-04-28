/** @format */
import React from "react";
import "./ActivityItem.css";

function ActivityItem() {
  return (
    <div className={"activity"}>
      <span className='activity__author-avatar'>
        <a href='#'>
          <img src='#' />
        </a>
      </span>
      <div className='activity__contents'>
        <div className='activity__title'>
          <a href='#'></a>
          <a href='#'></a>
          <span className='activity__timestamp'></span>
        </div>
        <div className='activity__detail'></div>
      </div>
    </div>
  );
}
