import React from "react";
import { Input } from "pcln-design-system";
import { Button, Flex } from "jbrown-design-system";

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
      <Flex flexDirection="row" {...this.props}>
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
