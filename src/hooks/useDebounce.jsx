import React, { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearInterval(id);
    };

    //end of useeffect
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
