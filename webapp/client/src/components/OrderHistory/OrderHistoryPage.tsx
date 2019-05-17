import {connect} from "react-redux";
import OrderHistory from "./OrderHistory";
import {bindActionCreators} from "redux";
import {getOrders} from "../../store/orders/orderActions";

const mapStateToProps = (state: any) => {
  console.log('Order History new state');
  console.log(state);
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getOrders
      },
      dispatch
    )
  }
};

const OrderHistoryPage = connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

export default OrderHistoryPage;
