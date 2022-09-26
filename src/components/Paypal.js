import { Box } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { payment } from "../features/item/itemSlice";

const style = {
  layout: "vertical",
  shape: "pill",
  label: "checkout",
  maxHeight: "30",
  width: "30",
};

export default function Paypal({ toPay }) {
  const dispatch = useDispatch();

  const onSuccess = (details) => {
    dispatch(payment({ details }));
    console.log(details, "data");
  };
  return (
    <Box sx={{ width: "50px", height: "50px" }}>
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
              console.log("Payment successfully", details);
              onSuccess(details);
            });
          }}
          onCancel={function (data) {
            // Show a cancel page, or return to cart
            console.log(data);
          }}
          style={style}
        />
      </PayPalScriptProvider>
    </Box>
  );
}
