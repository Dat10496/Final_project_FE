import { PayPalButton } from "react-paypal-button-v2";
import { React } from "react";
import { PAYPAL_CLIENT_ID } from "../app/config";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

const style = {
  layout: "vertical",
  shape: "pill",
  label: "checkout",
};

export default function PaypalButton({ value, auth }) {
  const { user, cart, paymentSuccess, addCart } = auth;
  const userId = user._id;

  const onSuccess = (details) => {
    console.log(details);
    paymentSuccess({ details, cart });

    cart.length = 0;
    addCart({ cart, userId });

    toast.success("Transaction completed by " + details.payer.name.given_name);
  };
  return (
    <Box sx={{ width: 300, height: 50 }}>
      <PayPalButton
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            // Your code here after capture the order
            console.log("The payment was succeeded", details);
            onSuccess(details);
          });
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: value,
                },
              },
            ],
          });
        }}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"

        onCancel={function (data) {
          // Show a cancel page, or return to cart
          console.log("The payment was canceled", data);
        }}
        catchError={function (err) {
          console.log("The payment get error", err);
        }}
        options={{
          clientId: PAYPAL_CLIENT_ID,
        }}
        style={style}
      />
    </Box>
  );
}
