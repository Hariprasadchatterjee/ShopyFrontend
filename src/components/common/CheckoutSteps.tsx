const CheckoutSteps = ({ step1, step2, step3, step4 }: { step1?: boolean, step2?: boolean, step3?: boolean, step4?: boolean }) => {
  return (
    <nav className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8">
      {/* Step 1: Login */}
      <div>
        {step1 ? (
          <span className="font-bold text-indigo-600">Login</span>
        ) : (
          <span className="text-gray-500">Login</span>
        )}
      </div>
      <span className="text-gray-400">&gt;</span>
      
      {/* Step 2: Shipping */}
      <div>
        {step2 ? (
          <span className="font-bold text-indigo-600">Shipping</span>
        ) : (
          <span className="text-gray-500">Shipping</span>
        )}
      </div>
      <span className="text-gray-400">&gt;</span>

      {/* Step 3: Payment */}
       <div>
        {step3 ? (
          <span className="font-bold text-indigo-600">Payment</span>
        ) : (
          <span className="text-gray-500">Payment</span>
        )}
      </div>
      <span className="text-gray-400">&gt;</span>

      {/* Step 4: Place Order */}
       <div>
        {step4 ? (
          <span className="font-bold text-indigo-600">Place Order</span>
        ) : (
          <span className="text-gray-500">Place Order</span>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps