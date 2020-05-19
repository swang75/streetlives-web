import React, { Component } from 'react';

import Header from '../../../../components/header';
import Button from '../../../../components/button';
import Selector from '../../../../components/selector';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    }

    this.onSelectOption = this.onSelectOption.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  onSelectOption(value) {
    if (this.state.value === value) {
      value = null;
    }

    this.setState({
      value
    });
  }

  updateValue = e => this.props.updateValue(
    this.state.value,
    this.props.id,
    this.props.metaDataSection,
    this.props.fieldName,
  );

  render() {
    return (
      <div className="w-100">
        <Header className="mb-3">Does this service offer a TGNC affirmative experience?</Header>
        <Selector fluid>
          <Selector.Option
            onClick={() => this.onSelectOption(true)}
            active={this.state.value === true}
          >
            Yes
          </Selector.Option>

          <Selector.Option
            onClick={() => this.onSelectOption(false)}
            active={this.state.value === false}
          >
            No
          </Selector.Option>
        </Selector>
        <Button onClick={this.updateValue} primary>
          OK
        </Button>
      </div>
    );
  }
}

export default Edit;
