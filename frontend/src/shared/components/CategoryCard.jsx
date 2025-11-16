
export default function CategoryCard({ category }) {
    return (
        <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer transform hover:scale-105"
        >
            <div className="text-4xl mb-3 text-center">
                {category.icon}
            </div>
            <div className="font-semibold text-gray-900 text-center mb-1">
                {category.name}
            </div>
            <div className="text-sm text-gray-500 text-center">
                {category.count} quizzes
            </div>
        </div>
    )
}
