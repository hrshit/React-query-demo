import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PostsRQ = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    // refetchInterval: false, // it not going to fetch data at any regular interval
    // refetchIntervalInBackground: true, // it not going to still keep pulling data in background if the tab is changing
    staleTime: 3000, // data is stay in the fresh mode for the next 30 minutes, will not make network request for the next 30 minutes
    enabled: false, // stops the fetching on the component mounted
  });

  console.log("Data", data);

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="post-list">
      <button onClick={refetch}> Fetch Data </button>
      {data?.data.map((post) => (
        <Link key={post.id} to={`/rq-posts/${post.id}`}>
          <div className="post-item" key={post.id}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsRQ;
