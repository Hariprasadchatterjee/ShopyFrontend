import React, { useMemo, useState, useEffect } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import type { ColumnDef } from '@tanstack/react-table';

// --- TYPE DEFINITIONS ---
interface Coupon {
  id: string;
  code: string;
  type: 'Percentage' | 'Fixed Amount';
  value: number;
  description: string;
  status: 'Active' | 'Scheduled' | 'Expired';
  usageLimit: number;
  timesUsed: number;
  startDate: Date;
  endDate: Date;
}

interface ICouponForm {
  code: string;
  description: string;
  type: 'Percentage' | 'Fixed Amount';
  value: number | '';
  usageLimit: number | '';
  startDate: string;
  endDate: string;
}

type FormErrors = Partial<Record<keyof ICouponForm, string>>;

// --- MOCK DATA & HOOK ---
const mockCoupons: Omit<Coupon, 'status'>[] = [
  { id: 'SUMMER25', code: 'SUMMER25', type: 'Percentage', value: 25, description: 'Summer sale discount for all electronics.', usageLimit: 1000, timesUsed: 452, startDate: new Date('2025-09-01T00:00:00Z'), endDate: new Date('2025-10-31T23:59:59Z')},
  { id: 'FLAT500', code: 'FLAT500', type: 'Fixed Amount', value: 500, description: 'Flat ₹500 off on orders above ₹2000.', usageLimit: 500, timesUsed: 150, startDate: new Date('2025-10-10T00:00:00Z'), endDate: new Date('2025-11-10T23:59:59Z') },
  { id: 'OLDCODE', code: 'OLDCODE', type: 'Fixed Amount', value: 100, description: 'Expired code from last year.', usageLimit: 200, timesUsed: 200, startDate: new Date('2024-01-01T00:00:00Z'), endDate: new Date('2024-01-31T23:59:59Z') },
  { id: 'WINTERSOON', code: 'WINTERSOON', type: 'Percentage', value: 20, description: 'Upcoming winter collection discount.', usageLimit: 2000, timesUsed: 0, startDate: new Date('2025-11-01T00:00:00Z'), endDate: new Date('2025-12-31T23:59:59Z') },
  { id: 'FREESHIP', code: 'FREESHIP', type: 'Fixed Amount', value: 150, description: 'Effectively free shipping.', usageLimit: 10000, timesUsed: 8341, startDate: new Date('2025-01-01T00:00:00Z'), endDate: new Date('2025-12-31T23:59:59Z') },
];

const useCouponsData = () => {
    const getStatus = (startDate: Date, endDate: Date): Coupon['status'] => {
        const now = new Date();
        if (now < startDate) return 'Scheduled';
        if (now > endDate) return 'Expired';
        return 'Active';
    };

    const data = useMemo(() => mockCoupons.map(coupon => ({
        ...coupon,
        status: getStatus(coupon.startDate, coupon.endDate)
    })), []);

    return { data, isLoading: false, error: null };
};


// --- REUSABLE COUPON FORM COMPONENT ---
interface CouponFormProps {
    initialData?: ICouponForm;
    onSubmit: (formData: ICouponForm) => Promise<void>;
    mode: 'add' | 'edit';
}

const CouponForm: React.FC<CouponFormProps> = ({ initialData, onSubmit, mode }) => {
    const [formData, setFormData] = useState<ICouponForm>({
        code: '', description: '', type: 'Percentage', value: '', usageLimit: '', startDate: '', endDate: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = () => {
        const newErrors: FormErrors = {};
        if (!formData.code.trim()) newErrors.code = "Coupon code is required.";
        if (!formData.value || +formData.value <= 0) newErrors.value = "A valid discount value is required.";
        if (!formData.startDate) newErrors.startDate = "Start date is required.";
        if (!formData.endDate) newErrors.endDate = "End date is required.";
        if (formData.endDate && formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
            newErrors.endDate = "End date cannot be before the start date.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-300">Coupon Code</label>
                <input type="text" name="code" id="code" value={formData.code} onChange={handleChange} className={`mt-1 block w-full bg-gray-700 border ${errors.code ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                {errors.code && <p className="text-red-400 text-xs mt-1">{errors.code}</p>}
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300">Discount Type</label>
                    <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>Percentage</option>
                        <option>Fixed Amount</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="value" className="block text-sm font-medium text-gray-300">Value ({formData.type === 'Percentage' ? '%' : '₹'})</label>
                    <input type="number" name="value" id="value" value={formData.value} onChange={handleChange} className={`mt-1 block w-full bg-gray-700 border ${errors.value ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                    {errors.value && <p className="text-red-400 text-xs mt-1">{errors.value}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">Start Date</label>
                    <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} className={`mt-1 block w-full bg-gray-700 border ${errors.startDate ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                    {errors.startDate && <p className="text-red-400 text-xs mt-1">{errors.startDate}</p>}
                </div>
                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">End Date</label>
                    <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} className={`mt-1 block w-full bg-gray-700 border ${errors.endDate ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                    {errors.endDate && <p className="text-red-400 text-xs mt-1">{errors.endDate}</p>}
                </div>
            </div>
             <div>
                <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-300">Usage Limit</label>
                <input type="number" name="usageLimit" id="usageLimit" value={formData.usageLimit} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="pt-5 border-t border-gray-700 flex justify-end">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900">
                    {mode === 'add' ? 'Create Coupon' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
};


// --- MAIN COUPON PAGE COMPONENT ---
const CouponPage: React.FC = () => {
    const [formMode, setFormMode] = useState<'closed' | 'add' | 'edit'>('closed');
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const { data: coupons, isLoading, error } = useCouponsData();

    const handleOpenAddForm = () => {
        setSelectedCoupon(null);
        setFormMode('add');
    };

    const handleOpenEditForm = (coupon: Coupon) => {
        setSelectedCoupon(coupon);
        setFormMode('edit');
    };

    const handleCloseForm = () => {
        setFormMode('closed');
        setSelectedCoupon(null);
    };

    const handleFormSubmit = async (formData: ICouponForm) => {
        console.log(`Submitting in ${formMode} mode:`, formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In a real app, you would refetch data here
        handleCloseForm();
    };

    const columns = useMemo<ColumnDef<Coupon>[]>(
        () => [
            {
                accessorKey: 'code',
                header: 'Coupon Code',
                cell: ({ row }) => <span className="font-mono bg-gray-700 text-blue-300 py-1 px-2 rounded">{row.original.code}</span>
            },
            {
                accessorKey: 'description',
                header: 'Description',
            },
            {
                accessorKey: 'value',
                header: 'Discount',
                cell: ({ row }) => (
                    <span>
                        {row.original.type === 'Percentage' ? `${row.original.value}%` : `₹${row.original.value.toLocaleString()}`}
                    </span>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => {
                    const status = row.original.status;
                    const statusClass = {
                        Active: "bg-green-500/20 text-green-400",
                        Scheduled: "bg-blue-500/20 text-blue-400",
                        Expired: "bg-gray-500/20 text-gray-400",
                    }[status];
                    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClass}`}>{status}</span>;
                }
            },
            {
                accessorKey: 'timesUsed',
                header: 'Usage',
                cell: ({ row }) => `${row.original.timesUsed} / ${row.original.usageLimit}`
            },
            {
                accessorKey: 'endDate',
                header: 'Expires On',
                cell: ({ row }) => row.original.endDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric'})
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <div className="flex items-center space-x-4">
                        <button onClick={() => handleOpenEditForm(row.original)} className="text-gray-400 hover:text-white"><PencilSquareIcon className="h-5 w-5"/></button>
                        <button className="text-gray-400 hover:text-red-500"><TrashIcon className="h-5 w-5"/></button>
                    </div>
                )
            },
        ],
        []
    );

    const formInitialData = useMemo(() => {
        if (!selectedCoupon) return undefined;
        // Convert dates to YYYY-MM-DD format for the <input type="date">
        const toYYYYMMDD = (date: Date) => date.toISOString().split('T')[0];
        return {
            ...selectedCoupon,
            value: selectedCoupon.value,
            usageLimit: selectedCoupon.usageLimit,
            startDate: toYYYYMMDD(selectedCoupon.startDate),
            endDate: toYYYYMMDD(selectedCoupon.endDate),
        };
    }, [selectedCoupon]);

    return (
        <div className="bg-gray-900 min-h-screen p-4 md:p-8 text-gray-100">
            {/* --- FORM MODAL --- */}
            {formMode !== 'closed' && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
                    <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">
                                {formMode === 'add' ? 'Create New Coupon' : 'Edit Coupon'}
                            </h2>
                            <button onClick={handleCloseForm} className="text-gray-400 hover:text-white">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <CouponForm
                                mode={formMode}
                                onSubmit={handleFormSubmit}
                                initialData={formInitialData}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className={`transition-filter ${formMode !== 'closed' ? 'blur-sm pointer-events-none' : ''}`}>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Coupon Management</h1>
                    <button onClick={handleOpenAddForm} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        <PlusIcon className="h-5 w-5" />
                        <span>Create Coupon</span>
                    </button>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700/50">
                                <tr>
                                    {columns.map(col => (
                                        <th key={col.id || col.accessorKey} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            {col.header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {isLoading ? (
                                    <tr><td colSpan={columns.length} className="text-center py-4">Loading...</td></tr>
                                ) : error ? (
                                    <tr><td colSpan={columns.length} className="text-center py-4 text-red-400">Error loading data.</td></tr>
                                ) : (
                                    coupons.map(coupon => (
                                        <tr key={coupon.id} className="hover:bg-gray-700/50">
                                            {columns.map(col => (
                                                <td key={col.id || col.accessorKey} className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {col.cell ? col.cell({ row: { original: coupon } }) : coupon[col.accessorKey as keyof Coupon]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponPage;
