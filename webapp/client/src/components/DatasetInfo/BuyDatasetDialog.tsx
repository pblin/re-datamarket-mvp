import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import StripeCheckout from "react-stripe-checkout";
import {STRIPETOKEN} from '../ConfigEnv';
import {StripeService} from "../../services/StripeService";

const BuyDatasetDialog = ({isOpen = false, onCancel, dataset, user}) => {
  const onToken = async (token) => {
    const body = {
      amount: dataset.price_high,
      description: dataset.description,
      product: dataset.id,
      stripeTokenType: token.type,
      stripeEmail: token.email,
      stripeToken: token.id,
      token: token
    };

    const stripeService = new StripeService();
    const results = await stripeService.checkout(body, user.id);
    console.log('PAYMENT RESULTS');
    console.log(results);
  };

  return(
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle id="alert-dialog-title">Buy Dataset</DialogTitle>
      <DialogContent>
        <StripeCheckout
          name="Rebloc"
          description={'checkout'}
          panelLabel={`Pay ${dataset['price_high']}$`}
          amount={0} //Amount in cents $9.99
          token={onToken}
          label="Pay with 💳"
          locale="auto"
          stripeKey={STRIPETOKEN}
          image="https://www.rebloc.io/img/favicon.png" //Pop-in header image
          billingAddress={false}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuyDatasetDialog;
