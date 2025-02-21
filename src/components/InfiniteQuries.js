import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const fetchFruits = ({ pageParam }) => {
  return axios.get(
    `http://localhost:4000/fruits/?_page=${pageParam}&_per_page=10`
  );
};

const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (allPages.length < 5) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  console.log("Data", data?.pages[0]?.data.data);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <h2>Page is Loading...</h2>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="container">
      {data?.pages[0]?.data.data.map((item) => (
        <div key={item.id} className="fruit-label">
          {item.name}
        </div>
      ))}
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
};

export default InfiniteQueries;
