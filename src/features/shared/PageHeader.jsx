const PageHeader = ({ title, description }) => {
    return <>
        <div className="px-5 py-4 bg-white border border-gray-300 rounded mb-5 flex items-center justify-between">

            {/* Title Section */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900">
                    {title}
                </h2>

                {description && (
                    <p className="text-sm text-gray-500 mt-0.5">
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

export default PageHeader