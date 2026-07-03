import { useForm, type SubmitHandler } from "react-hook-form";
import type { AddAddressFormProps, AddressFormInputs as Inputs } from "../../types/allTypes";
import { createAddress, updateAddress } from "../../services/addressService";
import { useAuthStore } from "../../store/authStore";
import { useState, useMemo } from "react";
import { MdMyLocation } from "react-icons/md";


const AddAddressForm = ({ cancel, onSubmitSuccess, initialData }: AddAddressFormProps) => {
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [locating, setLocating] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    // Compute initial names from user state if creating new address
    const defaultNames = useMemo(() => {
        if (!user?.name) return { firstName: '', lastName: '' };
        const parts = user.name.trim().split(' ');
        const firstName = parts[0] || '';
        const lastName = parts.slice(1).join(' ') || '';
        return { firstName, lastName };
    }, [user]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: initialData ? {
            firstName: initialData.firstName || '',
            lastName: initialData.lastName || '',
            company: initialData.company || '',
            country: initialData.country || '',
            address: initialData.address || '',
            apartment: initialData.apartment || '',
            city: initialData.city || '',
            postalCode: initialData.postalCode || '',
            phone: initialData.phone || '',
        } : {
            firstName: defaultNames.firstName,
            lastName: defaultNames.lastName,
            company: '',
            country: '',
            address: '',
            apartment: '',
            city: '',
            postalCode: '',
            phone: '',
        }
    });

    const handleDetectLocation = () => {
        if (!navigator.geolocation) {
            setApiError("Geolocation is not supported by your browser");
            return;
        }
        setLocating(true);
        setApiError(null);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    if (data && data.address) {
                        const addr = data.address;
                        const detectedCity = addr.city || addr.town || addr.village || addr.suburb || "";
                        const detectedPostcode = addr.postcode || "";
                        const streetParts = [addr.road, addr.house_number].filter(Boolean).join(" ");
                        const detectedAddress = streetParts || data.display_name?.split(",")[0] || "";

                        if (detectedCity) setValue("city", detectedCity, { shouldValidate: true });
                        if (detectedPostcode) setValue("postalCode", detectedPostcode, { shouldValidate: true });
                        if (detectedAddress) setValue("address", detectedAddress, { shouldValidate: true });

                        const countryName = addr.country || "";
                        if (countryName.toLowerCase().includes("united states") || countryName === "US") {
                            setValue("country", "US", { shouldValidate: true });
                        } else if (countryName.toLowerCase().includes("india")) {
                            setValue("country", "India", { shouldValidate: true });
                        } else if (countryName.toLowerCase().includes("ghana")) {
                            setValue("country", "Ghana", { shouldValidate: true });
                        } else if (countryName.toLowerCase().includes("panama")) {
                            setValue("country", "Panama", { shouldValidate: true });
                        } else if (countryName) {
                            setValue("country", countryName, { shouldValidate: true });
                        }
                    }
                } catch (err) {
                    console.error("Reverse geocoding error:", err);
                    setApiError("Could not fetch address details for your location.");
                } finally {
                    setLocating(false);
                }
            },
            (err) => {
                console.error("Geolocation error:", err);
                setLocating(false);
                setApiError("Unable to access location. Please verify browser permissions.");
            },
            { timeout: 10000 }
        );
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        setApiError(null);
        try {
            if (initialData?._id) {
                const res = await updateAddress(initialData._id, data);
                if (res.data.success) {
                    onSubmitSuccess(res.data.address);
                    cancel(false);
                }
            } else {
                const res = await createAddress(data);
                if (res.data.success) {
                    onSubmitSuccess(res.data.address);
                    cancel(false);
                }
            }
        } catch (err: any) {
            console.error("Error saving address:", err);
            setApiError(err.response?.data?.message || "Failed to save address. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex-3 mt-6 mb-8 tracking-wide'>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className='text-xl font-semibold'>
                    {initialData?._id ? "Edit Address" : "Add New Address"}
                </h2>
                <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={locating}
                    className="flex items-center justify-center gap-2 text-sm bg-stone-200 hover:bg-stone-300 text-stone-800 px-3 py-2 rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                    <MdMyLocation className={`size-4 ${locating ? 'animate-spin' : ''}`} />
                    {locating ? "Detecting location..." : "Use Current Location"}
                </button>
            </div>

            {apiError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                    {apiError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                    <label htmlFor='firstName' className='block font-medium text-stone-700 text-sm'>First Name</label>
                    <input {...register("firstName", { required: "First Name is required" })} type='text' id='firstName' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='First Name' />
                    {errors.firstName && <p className='mt-1 text-red-500 text-xs'>{errors.firstName.message}</p>}
                </div>
                <div>
                    <label htmlFor='lastName' className='block font-medium text-stone-700 text-sm'>Last Name</label>
                    <input type='text' {...register("lastName", { required: "Last Name is required" })} id='lastName' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Last Name' />
                    {errors.lastName && <p className='mt-1 text-red-500 text-xs'>{errors.lastName.message}</p>}
                </div>
                <div>
                    <label htmlFor='company' className='block font-medium text-stone-700 text-sm'>Company</label>
                    <input type='text' {...register("company")} id='company' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Company' />
                </div>
                <div>
                    <label htmlFor='country' className='block font-medium text-stone-700 text-sm'>Country</label>
                    <select id='country' {...register("country", { required: "Country is required" })} className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm'>
                        <option value=''>-- Select Country --</option>
                        <option value='Ghana'>Ghana</option>
                        <option value='India'>India</option>
                        <option value='North Pole'>North Pole</option>
                        <option value='Panama'>Panama</option>
                        <option value='Siberia'>Siberia</option>
                        <option value='US'>United States</option>
                    </select>
                    {errors.country && <p className='mt-1 text-red-500 text-xs'>{errors.country.message}</p>}
                </div>
                <div>
                    <label htmlFor='address' className='block font-medium text-stone-700 text-sm'>Address</label>
                    <input type='text' {...register("address", { required: "Address is required" })} id='address' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Address' />
                    {errors.address && <p className='mt-1 text-red-500 text-xs'>{errors.address.message}</p>}
                </div>
                <div>
                    <label htmlFor='apartment' className='block font-medium text-stone-700 text-sm'>Apartment, suite, etc.</label>
                    <input {...register("apartment")} type='text' id='apartment' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Apartment, suite, etc.' />
                </div>
                <div>
                    <label htmlFor='city' className='block font-medium text-stone-700 text-sm'>City</label>
                    <input {...register("city", { required: "City is required" })} type='text' id='city' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='City' />
                    {errors.city && <p className='mt-1 text-red-500 text-xs'>{errors.city.message}</p>}
                </div>
                <div>
                    <label htmlFor='postalCode' className='block font-medium text-stone-700 text-sm'>Postal/Zip Code</label>
                    <input {...register("postalCode", { required: "Postal/Zip Code is required" })} type='text' id='postalCode' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Postal/Zip Code' />
                    {errors.postalCode && <p className='mt-1 text-red-500 text-xs'>{errors.postalCode.message}</p>}
                </div>
                <div>
                    <label htmlFor='phone' className='block font-medium text-stone-700 text-sm'>Phone</label>
                    <input {...register("phone", { required: "Phone number is required" })} type='text' id='phone' className='block bg-stone-200/50 mt-1 px-2 py-3 rounded-md w-full sm:text-sm' placeholder='Phone' />
                    {errors.phone && <p className='mt-1 text-red-500 text-xs'>{errors.phone.message}</p>}
                </div>
                <div className='flex space-x-4 pt-2'>
                    <button disabled={loading} type='submit' className='bg-[#E41F66] px-6 py-3 rounded-lg text-stone-50 hover:bg-[#c60b4d] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-50'>
                        {loading ? "Saving..." : "Confirm"}
                    </button>
                    <button onClick={() => cancel(false)} type='button' className='bg-stone-300 px-6 py-3 rounded-lg text-black hover:bg-stone-400/50 transition-all duration-300 ease-in-out cursor-pointer'>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAddressForm;