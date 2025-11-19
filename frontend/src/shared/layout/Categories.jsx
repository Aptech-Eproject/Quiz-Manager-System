import CategoryCard from '../components/CategoryCard';

export default function Categories() {
    const categories = [
        {
            name: "Programming",
            icon: "💻",
            count: 45
        },
        {
            name: "Science",
            icon: "🔬",
            count: 38
        },
        {
            name: "History",
            icon: "📚",
            count: 52
        },
        {
            name: "Mathematics",
            icon: "🔢",
            count: 33
        },
        {
            name: "Languages",
            icon: "🌍",
            count: 41
        },
        {
            name: "Arts",
            icon: "🎨",
            count: 27
        }
    ];

    return (
        <section className="bg-white min-w-full">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16'>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Popular Categories
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, index) => (
                        <CategoryCard category={category} key={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
