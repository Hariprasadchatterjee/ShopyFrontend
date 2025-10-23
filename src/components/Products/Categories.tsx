
const products = [
  { id: 1, name: "AURA Pro Smartphone", stock:5, image: "../../../public/Images/products/product_14.png" },
  { id: 2, name: "ZenBook Monitor",  stock:25, image: "../../../public/Images/products/product_20.png" },
  { id: 3, name: "NoiseFree Headphones", stock:50, image: "../../../public/Images/products/product_16.png" },
  { id: 4, name: "Urban Runner Sneakers", stock:15, image: "../../../public/showes.avif" },
];

const Categories = () => {
  return (
    <div className="container mx-auto py-8 px-4 border  mt-4">
      <div className=" text-content flex justify-between items-center mb-8">
      <h2 className="relative text-xl md:text-3xl text-white font-bold  ">Popular <span className='text-indigo-600 '>Categories</span>
        <div className='absolute w-full h-1 bg-indigo-600 rounded-xl -bottom-2'></div>
      </h2>
      </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-2">
          {
            products.map( (item,index)=>{
             return (
          <div key={index} className="flex justify-center items-center bg-slate-900 text-white p-4 gap-4 w-full">
            <figure className="flex-1">
              <img src={item.image} alt="" />
            </figure>
            <div className="flex-3">
              <h2 className="text-2xl tracking-tighter font-mono font-semibold">{item.name}</h2>
              <p className="text-gray-400"> <span className="text-green-600 font-mono">({item.stock})</span> items Avialable</p>
            </div>
          </div>
            )
            })
          }
        </div>
    </div>
  )
}

export default Categories