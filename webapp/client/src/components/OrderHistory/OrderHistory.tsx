import * as React from "react";

interface ComponentProps {
  actions: any;
}

class OrderHistory extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    this.props.actions.getOrders();
  }

  render() {
    return (<div>Here is the Order History Page</div>)
  }
}

export default OrderHistory;
