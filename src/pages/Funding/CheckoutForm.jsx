import { CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  return (
    <form>
      <CardElement />
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;
