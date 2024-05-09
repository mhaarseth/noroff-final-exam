import { useState, useEffect } from "react";

export function useApiAuth(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey");

    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url, {
          method: "GET",
          header: {
            Authorization: `Bearer ${token}`,
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        alert(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url]);
  return { data, isLoading, isError };
}