import React, { useState, useEffect } from "react";
import CoinsTable from './CoinsTable';

export default function DataApi() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.coincap.io/v2/assets");
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!data || data.length === 0) {
    return null; // If data is empty, return null
  }



  return (
    <>
      <div sx={{ width: "100%" }}><CoinsTable data={data} /></div>
    </>
  );
}

