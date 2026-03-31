const pageHeader = ({ title, description }) => {
    return <>
        <div className="px-5 py-4 bg-white border border-gray-200 rounded-xl mb-6 shadow-sm flex items-center justify-between">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 tracking-tight">{title}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{description}</p>
            </div>
        </div>
    </>
}

export default pageHeader