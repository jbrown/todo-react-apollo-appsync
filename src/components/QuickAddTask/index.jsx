import React from "react";
import { Button, Flex, Input } from "pcln-design-system";

export class QuickAddTask extends React.Component {
  state = {
    name: ""
  };

  onSubmit = () => {
    if (this.state.name === "") return;

    this.props.onSubmit(this.state.name);

    this.setState({ name: "" });
  };

  render() {
    return (
      <Flex flexDirection="row" mb={2}>
        <Input
          id="newTask"
          placeholder="Add Task"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <Button ml={2} onClick={this.onSubmit}>
          Add
        </Button>
      </Flex>
    );
  }
}
