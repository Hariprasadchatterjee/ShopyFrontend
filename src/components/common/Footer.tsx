import { FaCcMastercard, FaCreditCard, FaFacebook, FaLinkedin, FaRegCreditCard } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
  <div className="container mx-auto px-4 lg:px-8 py-12">
    
    <div className="
      grid 
      grid-cols-2          /* Mobile: Two columns for links */
      md:grid-cols-4       /* Tablet: Four columns */
      lg:grid-cols-5       /* Desktop: Five columns for more space */
      gap-8
    ">
      
      <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-6 lg:mb-0">
        <h2 className="text-2xl font-bold text-white mb-2">ShopCart</h2>
        <p className="text-sm text-gray-400">Your one-stop shop for everything you need. Quality products, unbeatable prices.</p>
      </div>

      <div>
        <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Shop</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-white transition-colors">Men's Fashion</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Women's Fashion</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Home & Decor</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Service</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
        </ul>
      </div>
      
      <div className="col-span-2 md:col-span-4 lg:col-span-1">
        <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Subscribe</h3>
        <p className="text-sm text-gray-400 mb-4">Get the latest deals and special offers.</p>
        <form className="flex">
          <input type="email" placeholder="Your email" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"/>
          <button className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-r-md hover:bg-indigo-700">Go</button>
        </form>
        <div className="mt-6">
           <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Follow Us</h3>
           <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><FaFacebook size={20}/></a>
              <a href="#" className="hover:text-white"><FaSquareXTwitter size={20}/></a>
              <a href="#" className="hover:text-white"><FaLinkedin size={20}/></a>
           </div>
        </div>
      </div>
    </div>

    <div className="
      border-t border-gray-800 
      mt-8 pt-6 
      flex flex-col md:flex-row justify-between items-center text-sm
    ">
      <p className="text-gray-400 order-2 md:order-1 mt-4 md:mt-0">© 2025 ShopCart. All Rights Reserved.</p>
      <div className="order-1 md:order-2">
        <span className="text-gray-400 ">Payment Methods</span>
        <div className="flex gap-4 items-center justify-center mt-2">
              <a href="#" className="hover:text-white"><FaCcMastercard size={20}/></a>
              <a href="#" className="hover:text-white"><FaCreditCard size={20}/></a>
              <a href="#" className="hover:text-white"><FaRegCreditCard size={20}/></a>
        </div>
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer