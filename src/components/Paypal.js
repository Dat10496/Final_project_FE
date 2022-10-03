import { Box } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../features/item/itemSlice";
import useAuth from "../hooks/useAuth";

const style = {
  layout: "vertical",
  shape: "pill",
  label: "checkout",
  color: "blue",
};

export default function Paypal({ toPay }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.item);
  const auth = useAuth();
  const { user } = auth;

  const onSuccess = (details) => {
    dispatch(payment({ details, user, cart }));
    console.log(details, "data");
  };
  return (
    <Box sx={{ width: "300px", height: "50px" }}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AZniqBCWnhCVIF5ObBDmd43RM0z1_ab7hLv9BlEy_wzO3B5tVYYtlP_xT5u2OsxQepESRX2oGg22F3Yv",
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: `${toPay}`,
                  },
                },
              ],
            });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              console.log("The payment was succeeded", details);
              onSuccess(details);
            });
          }}
          onCancel={function (data) {
            // Show a cancel page, or return to cart
            console.log("The payment was canceled", data);
          }}
          style={style}
        />
      </PayPalScriptProvider>
    </Box>
  );
}
