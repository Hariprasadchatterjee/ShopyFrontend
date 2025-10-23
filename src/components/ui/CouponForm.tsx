// import React, { useMemo, useState, useEffect, useCallback } from 'react';
// import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

// // --- TYPE DEFINITIONS ---
// export interface Coupon {
//   id: string;
//   code: string;
//   type: 'Percentage' | 'Fixed Amount';
//   value: number;
//   description: string;
//   status: 'Active' | 'Scheduled' | 'Expired';
//   usageLimit: number;
//   timesUsed: number;
//   startDate: Date;
//   endDate: Date;
// }

// export interface ICouponForm {
//   code: string;
//   description: string;
//   type: 'Percentage' | 'Fixed Amount';
//   value: number | '';
//   usageLimit: number | '';
//   startDate: string;
//   endDate: string;
// }

// type FormErrors = Partial<Record<keyof ICouponForm, string>>;

// // --- MOCK DATA & HOOK ---
// export const mockCoupons: Omit<Coupon, 'status'>[] = [
//   { id: 'SUMMER25', code: 'SUMMER25', type: 'Percentage', value: 25, description: 'Summer sale discount for all electronics.', usageLimit: 1000, timesUsed: 452, startDate: new Date('2025-09-01T00:00:00Z'), endDate: new Date('2025-10-31T23:59:59Z')},
//   { id: 'FLAT500', code: 'FLAT500', type: 'Fixed Amount', value: 500, description: 'Flat ₹500 off on orders above ₹2000.', usageLimit: 500, timesUsed: 150, startDate: new Date('2025-10-10T00:00:00Z'), endDate: new Date('2025-11-10T23:59:59Z') },
//   { id: 'OLDCODE', code: 'OLDCODE', type: 'Fixed Amount', value: 100, description: 'Expired code from last year.', usageLimit: 200, timesUsed: 200, startDate: new Date('2024-01-01T00:00:00Z'), endDate: new Date('2024-01-31T23:59:59Z') },
//   { id: 'WINTERSOON', code: 'WINTERSOON', type: 'Percentage', value: 20, description: 'Upcoming winter collection discount.', usageLimit: 2000, timesUsed: 0, startDate: new Date('2025-11-01T00:00:00Z'), endDate: new Date('2025-12-31T23:59:59Z') },
//   { id: 'FREESHIP', code: 'FREESHIP', type: 'Fixed Amount', value: 150, description: 'Effectively free shipping.', usageLimit: 10000, timesUsed: 8341, startDate: new Date('2025-01-01T00:00:00Z'), endDate: new Date('2025-12-31T23:59:59Z') },
// ];

// const useCouponsData = () => {
//     const getStatus = (startDate: Date, endDate: Date): Coupon['status'] => {
//         const now = new Date();
//         if (now < startDate) return 'Scheduled';
//         if (now > endDate) return 'Expired';
//         return 'Active';
//     };

//     const data = useMemo(() => mockCoupons.map(coupon => ({
//         ...coupon,
//         status: getStatus(coupon.startDate, coupon.endDate)
//     })), []);

//     return { data, isLoading: false, error: null };
// };


// // --- REUSABLE COUPON FORM COMPONENT ---
// interface CouponFormProps {
//     initialData?: ICouponForm;
//     onSubmit: (formData: ICouponForm) => Promise<void>;
//     mode: 'add' | 'edit';
// }

// export const CouponForm: React.FC<CouponFormProps> = ({ initialData, onSubmit, mode }) => {
//     const [formData, setFormData] = useState<ICouponForm>({
//         code: '', description: '', type: 'Percentage', value: '', usageLimit: '', startDate: '', endDate: ''
//     });
//     const [errors, setErrors] = useState<FormErrors>({});

//     useEffect(() => {
//         if (initialData) {
//             setFormData(initialData);
//         }
//     }, [initialData]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (errors[name as keyof FormErrors]) {
//             setErrors(prev => ({ ...prev, [name]: undefined }));
//         }
//     };

//     const validate = () => {
//         const newErrors: FormErrors = {};
//         if (!formData.code.trim()) newErrors.code = "Coupon code is required.";
//         if (!formData.value || +formData.value <= 0) newErrors.value = "A valid discount value is required.";
//         if (!formData.startDate) newErrors.startDate = "Start date is required.";
//         if (!formData.endDate) newErrors.endDate = "End date is required.";
//         if (formData.endDate && formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
//             newErrors.endDate = "End date cannot be before the start date.";
//         }
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (validate()) {
//             onSubmit(formData);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//                 <label htmlFor="code" className="block text-sm font-medium text-gray-300">Coupon Code</label>
//                 <input type="text" name="code" id="code" value={formData.code} onChange={handleChange} className={`mt-1 block w-full bg-gray-700 border ${errors.code ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
//                 {errors.code && <p className="text-red-400 text-xs mt-1">{errors.code}</p>}
//             </div>
//             <div>
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
//                 <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                     <label htmlFor="type" className="block text-sm font-medium text-gray-300">Discount Type</label>
//                     <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
//                         <option>Percentage</option>
//                         <option>Fixed Amount</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="value" className="block text-sm font-medium text-gray-300">Value ({formData.type === 'Percentage' ? '%' : '₹'})</label>
//                     <input type="number" name="value" id="value" value={formData.value} onChange={handleChange} className={`mt-1 block w-full bg-gray-700 border ${errors.value ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
//                     {errors.value && <p className="text-red-400 text-xs mt-1">{errors.value}</p>}
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                     <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">Start Date</label>
//                     <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} className={`mt-1 block w-full bg-gray-700 border ${errors.startDate ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
//                     {errors.startDate && <p className="text-red-400 text-xs mt-1">{errors.startDate}</p>}
//                 </div>
//                 <div>
//                     <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">End Date</label>
//                     <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} className={`mt-1 block w-full bg-gray-700 border ${errors.endDate ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
//                     {errors.endDate && <p className="text-red-400 text-xs mt-1">{errors.endDate}</p>}
//                 </div>
//             </div>
//              <div>
//                 <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-300">Usage Limit</label>
//                 <input type="number" name="usageLimit" id="usageLimit" value={formData.usageLimit} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
//             </div>
//             <div className="pt-5 border-t border-gray-700 flex justify-end">
//                 <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900">
//                     {mode === 'add' ? 'Create Coupon' : 'Save Changes'}
//                 </button>
//             </div>
//         </form>
//     );
// };
