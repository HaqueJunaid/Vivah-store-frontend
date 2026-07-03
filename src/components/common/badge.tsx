const Badge = ({ text, variant }: { text: string, variant: 'pending' | 'delivered' }) => {
    return (
        <div className={variant === "delivered" ? "flex items-center gap-2 px-3 py-1.5 border border-green-300 bg-green-100 rounded-full w-fit text-green-600" : "flex items-center gap-2 px-3 py-1.5 border border-yellow-600 bg-yellow-100 rounded-full w-fit text-yellow-600"}>
            {variant === 'delivered' ? null : <div className="relative flex justify-center items-center size-3.5">
                <span className="inline-flex absolute bg-yellow-400 opacity-75 rounded-full w-full h-full animate-ping duration-300"></span>
                <span className="inline-flex relative bg-yellow-600 rounded-full size-2"></span>
            </div>}
            <span className="text-sm">{text}</span>
        </div>
    );
}

export default Badge
