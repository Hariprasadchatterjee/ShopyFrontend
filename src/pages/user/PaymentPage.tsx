import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from "../../components/common/CheckoutSteps";


// Define the "shape" of your form data
type FormValues = {
  paymentMethod: string;
};



const PaymentPage = () => {
  // Helper to safely get the saved payment method
  const getInitialValues = (): FormValues => {
    const savedPaymentMethod = localStorage.getItem('paymentMethod');
    return {
      paymentMethod: savedPaymentMethod || 'Stripe', // Default to Stripe
    };
  };

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: getInitialValues(),
  });

  const navigate = useNavigate();

  const submitHandler = (data) => {
    localStorage.setItem('paymentMethod', data.paymentMethod);
    console.log('Payment method saved:', data.paymentMethod);
    navigate('/placeorder'); // Navigate to the final order review page
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <CheckoutSteps step1 step2 step3 />
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Payment Method</h1>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <fieldset>
              <legend className="text-base font-medium text-gray-900">Select a payment method</legend>
              <div className="mt-4 space-y-4">
                {/* Stripe / Credit Card Option */}
                <div className="flex items-center">
                  <input
                    id="stripe"
                    type="radio"
                    value="Stripe"
                    {...register("paymentMethod", { required: "Please select a payment method" })}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="stripe" className="ml-3 block text-sm font-medium text-gray-700">
                    Stripe or Credit Card
                  </label>
                </div>
                
                {/* PayPal Option */}
                <div className="flex items-center">
                  <input
                    id="paypal"
                    type="radio"
                    value="PayPal"
                    {...register("paymentMethod", { required: "Please select a payment method" })}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                    PayPal
                  </label>
                </div>
              </div>
              {errors.paymentMethod && <p className="mt-2 text-xs text-red-500">{errors.paymentMethod.message}</p>}
            </fieldset>

            <div className="flex flex-col sm:flex-row-reverse items-center gap-4 pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => navigate('/shipping')} // Navigate back to the shipping page
                className="w-full sm:w-auto flex justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
