/** @format */

import React from "react";
import { observer, inject } from "mobx-react";
import "./MoreButton.css";

type MoreButtonProps = {
  loading?: boolean;
  isLast?: boolean;
  onLoadMore: () => void;
};

function MoreButton({ loading, isLast, onLoadMore }: MoreButtonProps) {
  return (
    <button
      className={"more"}
      onClick={() => {
        if (!loading) onLoadMore();
      }}
      style={{ display: isLast ? "none" : "block" }}
    >
      {loading ? "Loading more..." : "More"}
    </button>
  );
}

export default inject(({ user }) => ({
  loading: user.loading,
  isLast: user.currentPage >= user.lastPage,
  onLoadMore: user.loadNextPage,
}))(observer(MoreButton));
