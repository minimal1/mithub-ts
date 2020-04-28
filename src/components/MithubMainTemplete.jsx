/** @format */

import React from "react";
// import "./MithubMainTemplete.css";

function MithubMainTemplete({ header, repositories, activities }) {
  return (
    <div className='mithub-main'>
      {header}
      <div className='mithub-main__repositories'>
        <h5>Repositories</h5>
        {repositories}
      </div>
      <div className='mithub-main__activities'>
        <h5>All activity</h5>
        {activities}
      </div>
    </div>
  );
}

export default MithubMainTemplete;
