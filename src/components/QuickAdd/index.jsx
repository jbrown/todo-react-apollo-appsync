import React from "react";
import { Button, Input } from "pcln-design-system";
import { Flex } from "../index";

export class QuickAdd extends React.Component {
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
          id="quickAdd"
          placeholder={this.props.placeholder}
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
