import React, { useEffect, useState } from "react";
import axios from "axios";

// axios 요청 추상화 훅
function useRequest(url, onSuccess, message, dependency = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    async () => {
      try {
        const response = await axios(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
        onSuccess(response.data);
      } catch (err) {
        setError(err);
        alert(message);
      }
    };
  }, [...dependency]);

  return {
    data,
    isLoading: data === null,
    error,
    isError: error === null,
  };
}

export default useRequest;
