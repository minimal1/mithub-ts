/** @format */

import React from "react";
import "./MithubMainTemplete.css";

type MithubMainTempleteProps = {
  header: JSX.Element;
  activities: JSX.Element;
  more: JSX.Element;
};

function MithubMainTemplete({
  header,
  activities,
  more,
}: MithubMainTempleteProps) {
  return (
    <div className='mithub-main'>
      {header}
      <main>
        {/* <div className='mithub-main__repositories'>
          <h5>Repositories</h5>
          {repositories}
        </div> */}
        <div className='mithub-main__activities'>
          {/* <h5>All activity</h5> */}
          {activities}
          {more}
        </div>
      </main>
    </div>
  );
}

export default MithubMainTemplete;
