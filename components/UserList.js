import * as React from "react";
import { FlatList, Text, View } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import graphqlTag from "graphql-tag";

const ALL_USERS = graphqlTag`
query ALL_USERS {
    users {
      id
      firstName
    }
  }
`;

const ChatsList = () => {
  const { data, loading, error } = useQuery(ALL_USERS);
  if (loading) return <Text>Loading Users</Text>;
  if (error) return <Text>error retrieving users list</Text>;
  console.log("User data => ", data.users);

  return (
    <FlatList
      data={data.users}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <View>
          <Text>{item.id}</Text>
          <Text>{item.firstName}</Text>
        </View>
      )}
    />
  );
};

export default ChatsList;
