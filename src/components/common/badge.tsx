type BadgeVariant = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const Badge = ({ text, variant }: { text: string, variant: BadgeVariant }) => {
    let containerClass = "";
    let dotClass = "";
    let pingClass = "";
    let showDot = true;
    let showPing = true;

    switch (variant) {
        case "delivered":
            containerClass = "border-green-300 bg-green-100 text-green-700";
            showDot = false;
            break;
        case "processing":
            containerClass = "border-blue-300 bg-blue-50 text-blue-700";
            dotClass = "bg-blue-600";
            pingClass = "bg-blue-400";
            break;
        case "shipped":
            containerClass = "border-indigo-300 bg-indigo-50 text-indigo-700";
            dotClass = "bg-indigo-600";
            pingClass = "bg-indigo-400";
            break;
        case "cancelled":
            containerClass = "border-red-300 bg-red-50 text-red-700";
            dotClass = "bg-red-600";
            showPing = false;
            break;
        case "pending":
        default:
            containerClass = "border-yellow-600 bg-yellow-100 text-yellow-650";
            dotClass = "bg-yellow-600";
            pingClass = "bg-yellow-400";
            break;
    }

    return (
        <div className={`flex items-center gap-2 px-3 py-1 border rounded-full w-fit font-medium text-xs ${containerClass}`}>
            {showDot && (
                <div className="relative flex justify-center items-center size-3">
                    {showPing && (
                        <span className={`inline-flex absolute opacity-75 rounded-full w-full h-full animate-ping duration-300 ${pingClass}`}></span>
                    )}
                    <span className={`inline-flex relative rounded-full size-1.5 ${dotClass}`}></span>
                </div>
            )}
            <span>{text}</span>
        </div>
    );
}

export default Badge;

