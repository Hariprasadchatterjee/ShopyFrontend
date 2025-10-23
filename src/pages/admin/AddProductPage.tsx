import React, { useState, useEffect, useCallback } from 'react';
import { PhotoIcon, XCircleIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';

// --- TYPE DEFINITIONS ---
// Based on your Mongoose Schema for the form state
interface IProductForm {
  name: string;
  slug: string;
  description: string;
  price: number | '';
  category: string;
  stock: number | '';
}

// Type for the form validation errors
type FormErrors = Partial<Record<keyof IProductForm | 'images', string>>;

// --- CONSTANTS ---
const CATEGORIES = [
  'Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones',
  'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports',
  'Outdoor', 'Home',
];

const AddProductPage: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState<IProductForm>({
    name: '',
    slug: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // --- HELPER FUNCTIONS ---
  const generateSlug = useCallback((name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .slice(0, 50); // Limit length
  }, []);

  // --- EFFECTS ---
  // Effect to auto-generate the slug when the product name changes
  useEffect(() => {
    if (formData.name) {
      const newSlug = generateSlug(formData.name);
      setFormData(prev => ({ ...prev, slug: newSlug }));
    } else {
       setFormData(prev => ({ ...prev, slug: '' }));
    }
  }, [formData.name, generateSlug]);
  
  // Effect to clean up image preview URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  // --- EVENT HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear the error for this field when the user starts typing
    if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      // Limit to 5 images
      const newFiles = [...selectedFiles, ...files].slice(0, 5);
      setSelectedFiles(newFiles);

      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);

      if(errors.images){
        setErrors(prev => ({...prev, images: undefined}));
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (formData.name.length > 100) newErrors.name = "Product name cannot exceed 100 characters.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (formData.price === '' || formData.price <= 0) newErrors.price = "A valid price is required.";
    if (formData.stock === '' || formData.stock < 0) newErrors.stock = "A valid stock quantity is required.";
    if (!formData.category) newErrors.category = "Please select a category.";
    if (selectedFiles.length === 0) newErrors.images = "At least one image is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');
    console.log("Submitting Form Data:", formData);
    console.log("Submitting Files:", selectedFiles);

    // --- MOCK API CALL ---
    setTimeout(() => {
      // In a real app, you would get the response from your API
      const isSuccess = Math.random() > 0.1; // 90% chance of success
      if (isSuccess) {
        setFormStatus('success');
        // Reset form after success
        setFormData({ name: '', slug: '', description: '', price: '', category: '', stock: '' });
        setSelectedFiles([]);
        setImagePreviews([]);
      } else {
        setFormStatus('error');
      }
    }, 1500); // Simulate network delay
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 md:p-8 text-gray-200">
      <div className="max-w-4xl mx-auto">
      <NavLink to="/admin/products" className="text-blue-400 hover:underline mb-6 block">
        &larr; Back to Products
      </NavLink>
        <h1 className="text-3xl font-bold text-white mb-6">Add New Product</h1>
        
        <form onSubmit={handleSubmit} noValidate className="bg-gray-800 border border-gray-700 rounded-lg p-8 space-y-8">
          
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-white p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
              required
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Slug (Auto-generated) */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">URL Slug</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              readOnly
              className="w-full bg-gray-900 text-gray-400 p-2 rounded-md border-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-white p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${errors.description ? 'border-red-500' : 'border-gray-600'}`}
              required
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price (INR)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full bg-gray-700 text-white p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${errors.price ? 'border-red-500' : 'border-gray-600'}`}
                required
              />
              {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-300 mb-1">Stock Quantity</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={`w-full bg-gray-700 text-white p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${errors.stock ? 'border-red-500' : 'border-gray-600'}`}
                required
              />
              {errors.stock && <p className="text-red-400 text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-white p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${errors.category ? 'border-red-500' : 'border-gray-600'}`}
              required
            >
              <option value="" disabled>Select a category</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Image Uploader */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Images (up to 5)</label>
            <div className={`mt-2 flex justify-center rounded-lg border border-dashed ${errors.images ? 'border-red-500' : 'border-gray-600'} px-6 py-10`}>
              <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-gray-800 font-semibold text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-blue-500"
                  >
                    <span>Upload files</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
             {errors.images && <p className="text-red-400 text-xs mt-1">{errors.images}</p>}

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {imagePreviews.map((src, index) => (
                        <div key={index} className="relative group">
                            <img src={src} alt={`Preview ${index + 1}`} className="h-24 w-24 object-cover rounded-md" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 p-0.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <XCircleIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    ))}
                </div>
            )}
          </div>
          
          {/* --- FORM STATUS AND SUBMISSION --- */}
          <div className="pt-6 border-t border-gray-700">
            {formStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-400 bg-green-500/10 p-3 rounded-md mb-4">
                <CheckCircleIcon className="h-5 w-5" />
                <p>Product successfully created!</p>
              </div>
            )}
            {formStatus === 'error' && Object.keys(errors).length === 0 && (
              <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-md mb-4">
                 <ExclamationCircleIcon className="h-5 w-5" />
                <p>An unexpected error occurred. Please try again.</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="inline-flex justify-center rounded-md bg-blue-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-blue-800 disabled:cursor-not-allowed"
              >
                {formStatus === 'submitting' ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
