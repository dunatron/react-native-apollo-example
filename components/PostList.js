import * as React from "react";
import { FlatList, Text } from "react-native";

import graphqlTag from "graphql-tag";
import { Query } from "react-apollo";
import { useMutation, useQuery } from "@apollo/react-hooks";

const QUERY_POSTS = graphqlTag`
query queryPosts {
  posts {
    id
    text
  }
}
`;

const PostList = () => {
  const { loading, error, data } = useQuery(QUERY_POSTS);
  console.log("COOOL posts data =>", data);
  if (loading) return null;
  if (error) return null;
  return (
    <FlatList
      data={data.posts}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => <Text>{item.text}</Text>}
    />
  );
};

export default PostList;
