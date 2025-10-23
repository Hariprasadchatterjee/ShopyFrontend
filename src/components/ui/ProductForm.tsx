import React, { useState, useEffect, useCallback } from 'react';
import { PhotoIcon, XCircleIcon } from '@heroicons/react/24/solid';
import type { Product } from '../../types/Product';

// --- TYPE DEFINITIONS ---
export interface IProductForm {
  name: string;
  slug: string;
  description: string;
  price: number | '';
  category: string;
  stock: number | '';
}

export interface IExistingImage {
    url: string;
    public_id: string;
}

type FormErrors = Partial<Record<keyof IProductForm | 'images', string>>;

const CATEGORIES = [
  'Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones',
  'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports',
  'Outdoor', 'Home',
];

// --- COMPONENT PROPS ---
interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (formData: IProductForm, newFiles: File[], imagesToDelete: IExistingImage[]) => Promise<void>;
  mode: 'add' | 'edit';
  status: 'idle' | 'submitting' | 'success' | 'error';
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData,  onSubmit, mode, status }) => {
  const [formData, setFormData] = useState<IProductForm>({
    name: '', slug: '', description: '', price: '', category: '', stock: ''
  });
  
  const [existingImages, setExistingImages] = useState<IExistingImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<IExistingImage[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  // --- FORM POPULATION & HELPERS ---
  useEffect(() => {
     if (initialData) {
      setFormData({
        name: initialData.name || '',
        slug: initialData.slug || '',
        description: initialData.description || '',
        price: initialData.price  || '',
        category: initialData.category || '',
        stock: initialData.stock || '',
      });
      setExistingImages(initialData.images || []);
    }
  }, [initialData]);

  const generateSlug = useCallback((name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 50);
  }, []);

  useEffect(() => {
    if (formData.name && mode === 'add') { // Only auto-update slug in add mode
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.name) }));
    }
  }, [formData.name, generateSlug, mode]);
  
  useEffect(() => {
    return () => newImagePreviews.forEach(url => URL.revokeObjectURL(url));
  }, [newImagePreviews]);

  // --- EVENT HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const totalImages = existingImages.length + newFiles.length + files.length;
      if (totalImages > 5) {
        alert("You can only have a maximum of 5 images in total.");
        return;
      }
      setNewFiles(prev => [...prev, ...files]);
      const previews = files.map(file => URL.createObjectURL(file));
      setNewImagePreviews(prev => [...prev, ...previews]);
      if (errors.images) setErrors(prev => ({ ...prev, images: undefined }));
    }
  };

  const removeExistingImage = (imageToRemove: IExistingImage) => {
    setExistingImages(prev => prev.filter(img => img.public_id !== imageToRemove.public_id));
    setImagesToDelete(prev => [...prev, imageToRemove]);
  };
  
  const removeNewImage = (indexToRemove: number) => {
    setNewFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setNewImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (formData.price === '' || formData.price <= 0) newErrors.price = "A valid price is required.";
    if (existingImages.length + newFiles.length === 0) newErrors.images = "At least one image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData, newFiles, imagesToDelete);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-gray-800 border border-gray-700 rounded-lg p-8 space-y-8">
      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full bg-gray-700 text-white p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-600'}`} required />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">URL Slug</label>
        <input type="text" id="slug" name="slug" value={formData.slug} readOnly={mode === 'edit'} onChange={handleChange} className={`w-full p-2 rounded-md border-gray-700 ${mode === 'edit' ? 'bg-gray-900 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-white'}`} />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
        <textarea id="description" name="description" rows={5} value={formData.description} onChange={handleChange} className="w-full bg-gray-700 text-white p-2 rounded-md" />
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price (INR)</label>
          <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} className={`w-full bg-gray-700 text-white p-2 rounded-md ${errors.price ? 'border-red-500' : 'border-gray-600'}`} required />
          {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-300 mb-1">Stock Quantity</label>
          <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} className="w-full bg-gray-700 text-white p-2 rounded-md" />
        </div>
      </div>
      
      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-700 text-white p-2 rounded-md">
          <option value="" disabled>Select a category</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Image Management */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Product Images (max 5)</label>
        {existingImages.length > 0 && (
            <div className="mb-4 p-4 bg-gray-900/50 rounded-md">
                <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Current Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {existingImages.map((image) => (
                        <div key={image.public_id} className="relative group">
                            <img src={image.url} alt="Existing product" className="h-24 w-24 object-cover rounded-md" />
                            <button type="button" onClick={() => removeExistingImage(image)} className="absolute top-0 right-0 p-0.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100">
                                <XCircleIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}
        <div className={`mt-2 flex justify-center rounded-lg border border-dashed ${errors.images ? 'border-red-500' : 'border-gray-600'} px-6 py-10`}>
          <div className="text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" />
            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-blue-400 hover:text-blue-500">
              <span>Upload new files</span>
              <input id="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleFileChange} />
            </label>
            <p className="pl-1 text-sm">or drag and drop</p>
          </div>
        </div>
        {errors.images && <p className="text-red-400 text-xs mt-1">{errors.images}</p>}
        {newImagePreviews.length > 0 && (
            <div className="mt-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">New Images to Upload</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {newImagePreviews.map((src, index) => (
                        <div key={index} className="relative group">
                            <img src={src} alt={`New preview ${index + 1}`} className="h-24 w-24 object-cover rounded-md" />
                            <button type="button" onClick={() => removeNewImage(index)} className="absolute top-0 right-0 p-0.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100">
                                <XCircleIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
      
      {/* Submission Button */}
      <div className="pt-6 border-t border-gray-700 flex justify-end">
        <button type="submit" disabled={status === 'submitting'} className="inline-flex justify-center rounded-md bg-blue-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed">
          {status === 'submitting' ? 'Saving...' : (mode === 'edit' ? 'Save Changes' : 'Save Product')}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

