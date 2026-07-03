import type { AddressPreviewProps } from "../../types/allTypes";

const AddressPreview = (props: AddressPreviewProps) => {
    return (
        <div className='border border-stone-300 rounded-md p-4 mb-4 mt-8 md:mt-0'>
            <h2 className='text-lg font-semibold'>{props.address} {props.apartment ? `(${props.apartment})` : ''}</h2>
            <table className='text-stone-600 text-sm mt-2'>
                <tbody>
                    <tr>
                        <td className='md:w-40 w-30 text-stone-950'>Name</td>
                        <td>{props.firstName} {props.lastName}</td>
                    </tr>
                    {props.company && (
                        <tr>
                            <td className='md:w-40 w-30 text-stone-950'>Company</td>
                            <td>{props.company}</td>
                        </tr>
                    )}
                    <tr>
                        <td className='md:w-40 w-30 text-stone-950'>Address</td>
                        <td>{props.address}{props.apartment ? `, ${props.apartment}` : ''}</td>
                    </tr>
                    <tr>
                        <td className='md:w-40 w-30 text-stone-950'>City</td>
                        <td>{props.city}</td>
                    </tr>
                    <tr>
                        <td className='md:w-40 w-30 text-stone-950'>Country</td>
                        <td>{props.country}</td>
                    </tr>
                    <tr>
                        <td className='md:w-40 w-30 text-stone-950'>Postal/Zip Code</td>
                        <td>{props.postalCode}</td>
                    </tr>
                    <tr>
                        <td className='md:w-40 w-30 text-stone-950'>Phone</td>
                        <td>{props.phone}</td>
                    </tr>
                </tbody>
            </table>
            <div className='mt-4 flex space-x-4'>
                <button className='bg-stone-800 text-stone-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-stone-900 hover:scale-103 transition-all duration-300 ease-in-out' onClick={props.onEdit}>
                    Edit
                </button>
                <button className='bg-red-500 text-stone-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 hover:scale-103 transition-all duration-300 ease-in-out' onClick={props.onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AddressPreview;