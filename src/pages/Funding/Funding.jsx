// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";

// const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Funding = () => {
  // const options = {
  //   clientSecret: "{{CLIENT_SECRET}}",
  // };

  return (
    <div>
      <div className="container mx-auto py-28">
        <h2 className="text-center font-bold text-3xl">
          This is funding page.
        </h2>
        {/* <div>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm></CheckoutForm>
          </Elements>
        </div> */}
      </div>
    </div>
  );
};

export default Funding;
