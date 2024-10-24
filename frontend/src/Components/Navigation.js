// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Navbar";
// import Landing from "./Landing.js";
// import Login from "./login.js";
// import Signup from "./Signup.js";
// import Menu from "./Menu.js";
// import CartPage from "./CartPage.js";
// import ProfilePage from "./ProfilePage.js";
// import Receipt from "./Receipt.js";
// import PaymentForm from "./PaymentForm.js";
// import PaymentPage from "./PaymentPage.js";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51Q4ekwGfQYqZiDkV7tF6Q51ecYxNZG3YtzW2i8Jsol4rD8t6bsKbzgxvVUnW6E5nQr5jCUkoeVGcMAhs0YA90VKi00TSrYGcyg");
// const Navigation = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         {/* Define your routes here */}
//         <Route path="/login" element={<Login></Login>} />
//         <Route path="/menu" element={<Menu></Menu>} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/delivery" element={<div>Crowd Monitor</div>} />
//         <Route path="/profile" element={<ProfilePage></ProfilePage>} />
//         <Route path="/" element={<Landing></Landing>} />
//         <Route path="/Signup" element={<Signup></Signup>}></Route>
//         {/* Wrap PaymentPage and PaymentForm in Elements */}
//         <Route
//           path="/payment"
//           element={
//             <Elements stripe={stripePromise}>
//               <PaymentForm />
//             </Elements>
//           }
//         />
//         <Route
//           path="/paymentpage"
//           element={
//             <Elements stripe={stripePromise}>
//               <PaymentPage />
//             </Elements>
//           }
//         />
//         <Route path="/Receipt" element={<Receipt></Receipt>}></Route>
//       </Routes>
//     </Router>
//   );
// };

// export default Navigation;

// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Login from "./login";
import Signup from "./Signup";
import Menu from "./Menu";
import CartPage from "./CartPage";
import ProfilePage from "./ProfilePage";
import Receipt from "./Receipt";
import PaymentForm from "./PaymentForm";
import PaymentPage from "./PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
// "pk_test_51Q4ekwGfQYqZiDkV7tF6Q51ecYxNZG3YtzW2i8Jsol4rD8t6bsKbzgxvVUnW6E5nQr5jCUkoeVGcMAhs0YA90VKi00TSrYGcyg"
// );
const stripePromise = loadStripe("your-publishable-key-here");
const Navigation = () => {
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Navbar />
        <Routes>
          {/* Define your routes here */}
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/delivery" element={<div>Crowd Monitor</div>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/paymentpage" element={<PaymentPage />} />

          <Route path="/Receipt" element={<Receipt />} />
        </Routes>
      </Elements>
    </Router>
  );
};

export default Navigation;