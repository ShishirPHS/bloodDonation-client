import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Funding = () => {
  return (
    <div>
      <div className="container mx-auto py-28 px-5">
        <h2 className="text-center font-bold text-3xl">
          This is funding page.
        </h2>
        <div className="mt-14">
          <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Funding;
