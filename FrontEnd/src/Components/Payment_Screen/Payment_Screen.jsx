/* eslint-disable no-unused-vars */
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import "./Payment_Screen.css";
import axios from "axios";
import { useGlobalContext } from "../../StateContext";
import { useState } from "react";
import Swal from "sweetalert2";

export const Payment_Screen = () => {
  const { user, setuser } = useGlobalContext();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  // <------------------------------------------------------------>

  const handlePayment = async () => {
    console.log("clicled");
    if (!stripe || !elements) {
      return;
    }
    setloading(true);
    const { token, error } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    if (error) {
      setloading(false);
      console.error(error);
    } else {
      try {
        const updatedPlanData = {
          email: user.email,
          plan: {
            cycle: user.plan.cycle,
            name: user.plan.name,
            price: user.plan.price,
            devices: user.plan.devices,
            state: "active",
            dateofsubscription: new Date(),
          },
        };

        const { data } = await axios.put(
          `${import.meta.env.VITE_BACKEND_URI}/UpdateUser`,
          updatedPlanData
        );
        setloading(false);
        Swal.fire("Success", "", "success");
        navigate("/Selected_plan_Screen");
      } catch (e) {
        setloading(false);
        console.log(e);
      }
    }
  };

  // <------------------------------------------------------------>

  return (
    <div className="Payment_Screen_wrapper">
      <div className="Payment_Screen_Container">
        <div className="CardInfo">
          <h2>Complete Payment</h2>
          <span>Enter your credit or debit card details below</span>
          <div style={{ width: "90%" }}>
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>

          <input
            disabled={loading}
            style={{ backgroundColor: loading ? "#6c6c6c" : "#015294" }}
            type="submit"
            value={`${loading ? "Confirming.." : "Confirm Payment"}`}
            onClick={handlePayment}
            id="signUpButton"
          />
        </div>
        <div className="OrderInfo">
          <h2>Order Summary</h2>
          <div className="Order_decription">
            <span>Plan Name</span>
            <span>{user?.plan?.name}</span>
          </div>
          <div className="Order_decription">
            <span>Billing Cycle</span>
            <span>{user?.plan?.cycle}</span>
          </div>
          <div className="Order_decription">
            <span>Plan price</span>
            <span>
              {user?.plan?.price}/
              {user?.plan?.cycle === "monthly" ? "mo" : "yr"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
