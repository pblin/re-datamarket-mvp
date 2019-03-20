import * as React from 'react';
import {reduxForm, Field} from "redux-form";

interface InlineEditProps {
  id: string;
  value: any;
  form: any;
  initialValues: any;
  onSubmit: any;
  handleSubmit: any;
}

interface InlineEditState {
  mode: string;
}


export class InlineEditForm extends React.Component<InlineEditProps, InlineEditState>{
  constructor(props) {
    super(props);
    this.state = {
      mode: 'display'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.setState({mode: 'display'});
    console.log(this.props);
    this.props.handleSubmit(values);
  }

  render() {
    return (
      <div>
        {this.state.mode == 'display' &&
          <div onClick={() => this.setState({mode: 'edit'})}>{this.props.children}</div>
        }
        { this.state.mode == 'edit' &&
          <form onSubmit={(values) => this.handleSubmit(values) }>
            <Field name="inlineField" component="input" />
          </form>
        }
      </div>
    )
  }
}

export default reduxForm()(InlineEditForm);
