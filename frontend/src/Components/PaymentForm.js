// import React, { useState } from "react";
// import axios from "axios"; // Import axios directly
// // import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// // import "./PaymentForm.css";
// import StripeCheckout from "react-stripe-checkout";

// const PaymentForm = () => {
//   const [product, setProduct] = useState({
//     name: "chhola samosa",
//     price: 10,
//     productBy: "Anna",
//   });
//   const makePayment = (token) => {
//     const body = {
//       token,
//       product,
//     };
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     return fetch(`http://localhost:3000/payment`, {
//       method: "POST",
//       headers,
//       body: JSON.stringify(body),
//     })
//       .then((response) => {
//         console.log("RESPONSE", response);
//         const { status } = response;
//         console.log("STATUS", status);
//       })
//       .catch((error) => console.log(error));
//   };
//   console.log("Stripe Key:", process.env.REACT_APP_KEY);
//   return (
//     <div>
//       {/* //added materialise css */}
//       <StripeCheckout
//         token={makePayment}
//         stripeKey={process.env.REACT_APP_KEY}
//         name="Buy chhola samosa"
//         amount={product.price * 100}
//       >
//         <button className="btn-large blue">
//           Buy Chhola Samosa in just {product.price}Rs.
//         </button>
//       </StripeCheckout>
//     </div>
//   );
// };
// export default PaymentForm;

import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const PaymentForm = () => {
  const [product] = useState({
    name: "chhola samosa",
    price: 10,
    productBy: "Anna",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`http://localhost:3000/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log("STATUS", status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <StripeCheckout
        token={makePayment}
        stripeKey={process.env.REACT_APP_KEY}
        name="Buy chhola samosa"
        amount={product.price * 100}
      >
        <button className="btn-large blue">
          Buy Chhola Samosa for {product.price} Rs.
        </button>
      </StripeCheckout>
    </div>
  );
};

export default PaymentForm;