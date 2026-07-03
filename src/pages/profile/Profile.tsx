import { Link } from 'react-router-dom';
import Heading from '../../components/common/Heading';
import { MdDone } from "react-icons/md";
import { useEffect, useState } from 'react';
import AddAddressForm from '../../components/profile/AddAddressForm';
import AddressPreview from '../../components/profile/AddressPreview';
import OrderTable from '../../components/profile/OrderTable';
import { WishList } from '../../components/wishlist/WishList';
import { AddressSkeleton } from '../../components/common/Skeletons';
import { getAddresses, deleteAddress } from '../../services/addressService';
import { getCurrentUser } from '../../services/authService';
import type { AddressItem } from '../../types/allTypes';
import { useAuthStore } from '../../store/authStore';

const Profile = () => {
    const { user, setUser, logout } = useAuthStore();

    useEffect(() => {
        document.title = "VivahStore | Profile";
    }, []);

    const [profileOption, setProfileOption] = useState("dashboard");
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);
    const [addresses, setAddresses] = useState<AddressItem[]>([]);
    const [orders, setOrders] = useState<any[]>([]); // Dynamic order state
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Sync current user info from backend
    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res.data?.success && res.data?.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                console.error("Error syncing current user:", err);
            });
    }, [setUser]);

    const fetchAddresses = async () => {
        setLoadingAddresses(true);
        try {
            const res = await getAddresses();
            if (res.data.success) {
                setAddresses(res.data.addresses);
            }
        } catch (err: any) {
            console.error("Failed to fetch addresses:", err);
            setErrorMsg("Could not load addresses from server.");
        } finally {
            setLoadingAddresses(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleDeleteAddress = async (id?: string) => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to delete this address?")) return;
        try {
            const res = await deleteAddress(id);
            if (res.data.success) {
                setAddresses(prev => prev.filter(a => a._id !== id));
            }
        } catch (err) {
            console.error("Failed to delete address:", err);
            alert("Failed to delete address.");
        }
    };

    const handleAddNewClick = () => {
        setEditingAddress(null);
        setShowForm(true);
    };

    const handleEditClick = (address: AddressItem) => {
        setEditingAddress(address);
        setShowForm(true);
    };

    const handleSubmitSuccess = (savedAddress: AddressItem) => {
        setAddresses(prev => {
            const index = prev.findIndex(a => a._id === savedAddress._id);
            if (index !== -1) {
                const updated = [...prev];
                updated[index] = savedAddress;
                return updated;
            }
            return [savedAddress, ...prev];
        });
    };

    return (
        <div className='bg-stone-50 py-8 w-full'>
            <div className='mx-auto max-w-7xl'>
                <Heading title="My Account" />
                <div className='flex md:flex-row flex-col mt-4 md:mt-8 px-6 w-full min-h-150'>
                    <div className={`min-h-full md:flex-1 flex items-center justify-center px-8 md:justify-start md:items-start flex-row md:flex-col gap-6 md:gap-2 text-stone-700 mt-6 md:mt-0`}>
                        <button className={`text-sm md:text-md tracking-wide text-start cursor-pointer ${profileOption === "dashboard" ? "font-semibold text-stone-950" : ""}`} onClick={() => setProfileOption("dashboard")}>
                            Dashboard
                        </button>
                        <button className={`text-sm md:text-md tracking-wide text-start cursor-pointer ${profileOption === "addresses" ? "font-semibold text-stone-950" : ""}`} onClick={() => setProfileOption("addresses")}>
                            Addresses
                        </button>
                        <button className={`text-sm md:text-md tracking-wide text-start cursor-pointer ${profileOption === "wishlist" ? "font-semibold text-stone-950" : ""}`} onClick={() => setProfileOption("wishlist")}>
                            Wishlist
                        </button>
                        <button onClick={logout} className={`text-sm md:text-md tracking-wide text-start cursor-pointer hover:text-red-500 hover:opacity-100 transition-all duration-300 ease-in-out`}>
                            Logout
                        </button>
                    </div>

                    {profileOption === "dashboard" && (
                        <div className='flex-3 mt-10 md:mt-0 h-full tracking-wide'>
                            <p>Hello <span className='font-semibold'>{user?.name || "User"}</span> (not <span className='font-semibold'>{user?.name || "User"}</span>? <button onClick={logout} className='hover:underline cursor-pointer'>Log Out</button>)</p>
                            <div className='mt-10'>
                                <h2 className='mb-6 text-2xl leading-none'>Order History</h2>
                                {!orders.length ? <p className='flex items-center gap-4 md:gap-2 bg-emerald-200 px-3 py-2 rounded-sm text-emerald-700'><MdDone className='size-4.5' /> <Link to={"/products"} className='font-semibold underline'>Make your first order.</Link> You haven't placed any orders yet.</p> : <OrderTable orders={orders} />}
                            </div>
                            <div className='mt-10'>
                                <h2 className='mb-6 text-2xl leading-none'>Account Details</h2>
                                <table className='flex flex-col text-stone-600 text-lg'>
                                    <tbody>
                                        <tr className='block py-3'>
                                            <td className='w-20 md:w-60 text-stone-950'>Name</td>
                                            <td>{user?.name || "N/A"}</td>
                                        </tr>
                                        <tr className='block py-3'>
                                            <td className='w-20 md:w-60 text-stone-950'>Email</td>
                                            <td>{user?.email || "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button onClick={() => setProfileOption("addresses")} className='bg-[#E41F66] mt-10 px-6 py-3 rounded-lg text-stone-50 hover:bg-[#c60b4d] transition-all duration-300 ease-in-out cursor-pointer'>View Addresses ({addresses.length})</button>
                            </div>
                        </div>
                    )}

                    {profileOption === "addresses" && (
                        <div className='flex-3 py-5 text-left'>
                            <h1 className='mb-4 text-2xl font-semibold'>Your Addresses ({addresses.length})</h1>
                            {!showForm && (
                                <button onClick={handleAddNewClick} type='button' className='bg-[#E41F66] px-6 py-3 rounded-lg font-medium text-stone-50 hover:bg-[#c60b4d] transition-all duration-300 ease-in-out cursor-pointer mb-6'>
                                    Add a New Address
                                </button>
                            )}

                            {showForm && (
                                <AddAddressForm
                                    initialData={editingAddress}
                                    cancel={setShowForm}
                                    onSubmitSuccess={handleSubmitSuccess}
                                />
                            )}

                            {loadingAddresses ? (
                                <div className="mt-4 space-y-4">
                                    <AddressSkeleton />
                                    <AddressSkeleton />
                                </div>
                            ) : errorMsg ? (
                                <p className="text-red-500 mt-4">{errorMsg}</p>
                            ) : (
                                <div className='mt-4 md:mt-6 space-y-4'>
                                    {addresses.length === 0 && !showForm && (
                                        <p className="text-stone-500">No saved addresses found.</p>
                                    )}
                                    {addresses.map((addr) => (
                                        <AddressPreview
                                            key={addr._id}
                                            {...addr}
                                            onEdit={() => handleEditClick(addr)}
                                            onDelete={() => handleDeleteAddress(addr._id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {profileOption === "wishlist" && (
                        <div className="flex-3 py-5 text-left">
                            <WishList />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;