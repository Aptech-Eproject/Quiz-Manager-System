export default function Pagination() {
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
                Previous
            </button>
            <button
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
                1
            </button>
            <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
                2
            </button>
            <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
                3
            </button>
            <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
                Next
            </button>
        </div>
    )
}
