import React, { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    const previewTitle = document.title;
    document.title = title;

    return () => (document.title = previewTitle);
  }, [title]);
};

export default useTitle;
