import * as React from "react";
import { TextInput } from "react-native";

import graphqlTag from "graphql-tag";
import { Mutation } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";

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

const ADD_POST = graphqlTag`
mutation addPost($text: String!) {
  addPost(text: $text)
}
`;

class MutationPost extends Mutation {}

const NewPost = props => {
  console.log("Test props => ", props);
  const [testAddPost] = useMutation(ADD_POST);
  return (
    <MutationPost mutation={ADD_POST} refetchQueries={["queryPosts"]}>
      {addPost => {
        const add = text => {
          addPost({ variables: { text } });
        };
        return <MyTextInput onSubmit={add} />;
      }}
    </MutationPost>
  );
};

// const NewPost = props => {
//   console.log("Test props => ", props);
//   // const [addPost] = useMutation(ADD_POST);
//   const add = text => {
//     addPost({ variables: { text } });
//   };
//   return <MyTextInput onSubmit={add} />;
// };

export default NewPost;
