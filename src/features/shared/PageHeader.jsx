const pageHeader = ({ title, description }) => {
    return <>
        <div className="px-6 py-5 bg-white border border-gray-200 rounded-2xl mb-6 shadow-sm flex items-center justify-between">

            {/* Title Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {title}
                </h2>

                {description && (
                    <p className="text-sm text-gray-600 mt-1">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-2">
                {/* buttons can go here */}
            </div>

        </div>
    </>
}

export default pageHeader