import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutSteps from '../../components/common/CheckoutSteps';


// NOTE: In a real app, you'd likely use a global state (Context/Redux) instead of localStorage
// and define these types in a shared types file.
type CartItem = {
  product: string;
  name: string;
  imageSrc: string;
  price: number;
  quantity: number;
};

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

const MockData: CartItem[] = [
  {
    product: "1",
    name: 'Premium Comfort T-Shirt',
    price: 49.99,
    quantity: 1,
    imageSrc: '../../public/headphone.avif',
  },
  {
    product: "2",
    name: 'Urban Style Sneakers',
    price: 120.00,
    quantity: 1,
    imageSrc: '../../public/showes.avif',
  },
]

const PlaceOrderPage = () => {
  const navigate = useNavigate();

  // Retrieve data from localStorage
  const shippingAddress: ShippingAddress | null = JSON.parse(localStorage.getItem('shippingAddress') || 'null');
  const paymentMethod: string | null = localStorage.getItem('paymentMethod');

  // Redirect if essential information is missing
  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  // Calculations
  const itemsPrice = MockData.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Example shipping logic
  const taxPrice = 0.15 * itemsPrice; // 15% tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    // This is where you would dispatch an action to create the order
    // and make an API call to your backend.
    const orderData = {
      orderItems: MockData,
      shippingAddress,
      paymentMethod,
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice: taxPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    };
    console.log("Placing Order with data:", orderData);
    // After successful order creation, you might clear the cart and navigate to a success page
    // localStorage.removeItem('cartItems');
    // navigate('/order/success');
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <CheckoutSteps step1 step2 step3 step4 />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Shipping Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Shipping</h2>
              <p><strong>Address:</strong> {shippingAddress?.address}, {shippingAddress?.city}, {shippingAddress?.postalCode}, {shippingAddress?.country}</p>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Payment Method</h2>
              <p><strong>Method:</strong> {paymentMethod}</p>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Order Items</h2>
              {MockData.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {MockData.map((item) => (
                    <li key={item.product} className="py-4 flex items-center">
                      <img src={item.imageSrc} alt={item.name} className="h-16 w-16 object-cover rounded-md mr-4" />
                      <div className="flex-1">
                        <Link to={`/product/${item.product}`} className="font-medium text-gray-800 hover:text-indigo-600">{item.name}</Link>
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.quantity} x ${item.price.toFixed(2)} = <strong>${(item.quantity * item.price).toFixed(2)}</strong>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between"><span>Items</span><span>${itemsPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>${shippingPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>${taxPrice.toFixed(2)}</span></div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              
              <button
                type="button"
                onClick={placeOrderHandler}
                disabled={MockData.length === 0}
                className="w-full mt-6 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
