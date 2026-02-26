import { useEffect, useState } from "react";
import api from "../services/api";

export const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(url);
      setData(res.data);
    };
    fetchData();
  }, [url]);

  return data;
};