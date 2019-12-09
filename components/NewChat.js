import * as React from "react";
import { TextInput } from "react-native";
import { FlatList, Text, Button, View } from "react-native";

import graphqlTag from "graphql-tag";
import { Mutation, useMutation } from "react-apollo";

class MyTextInput extends React.Component {
  state = {
    text: ""
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;
    onSubmit(text);
    this.setState({ text: "" });
  };

  onChange = text => {
    this.setState({ text });
  };

  render() {
    const { text } = this.state;
    return (
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="Enter text..."
        onSubmitEditing={this.onSubmit}
        onChangeText={this.onChange}
        value={text}
      />
    );
  }
}

const CREATE_CHAT_MUTATION = graphqlTag`
mutation CREATE_CHAT_MUTATION(
  $data: ChatCreateInput!
) {
  createChat(data: $data) {
    id
    name
    lastMessage {
      id
      isMine
    }
    participants {
      id
    }
  }
}
`;

const QUERY_CHATS = graphqlTag`
query queryChats {
  chats {
    id
    name
    participants {
      id
      firstName
    }
  }
}
`;

// class MutationPost extends Mutation {}

// const NewChat = () => (
//   <MutationPost mutation={ADD_POST} refetchQueries={["queryPosts"]}>
//     {addPost => {
//       const add = text => {
//         addPost({ variables: { text } });
//       };
//       return <MyTextInput onSubmit={add} />;
//     }}
//   </MutationPost>
// );

// ck2k0095umh5l0b099487efci
// ck2k1obb418ua0b00jlbzqpy8

const NewChat = () => {
  const [addChat, { data, loading, error }] = useMutation(CREATE_CHAT_MUTATION);
  console.log("add chat loading => ", loading);
  console.log("add chat error => ", error);
  console.log("add chat data => ", data);
  return (
    <View>
      <Button
        title="create a new chat"
        onPress={() => {
          addChat({
            variables: {
              data: {
                name: "Heath & Jon Chat",
                participants: {
                  connect: [
                    {
                      id: "ck2k0095umh5l0b099487efci"
                    },
                    {
                      id: "ck2k1obb418ua0b00jlbzqpy8"
                    }
                  ]
                }
              }
            },
            update: (proxy, payload) => {
              console.log("naaaa cbf writing these eh");
            },
            refetchQueries: [{ query: QUERY_CHATS }]
          });
        }}
      />
    </View>
  );
};
export default NewChat;
