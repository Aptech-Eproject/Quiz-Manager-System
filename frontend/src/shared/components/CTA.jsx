
export default function CTA({ content }) {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-26 my-22">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
                <h2 className="text-4xl font-bold mb-4">
                    {content.title}
                </h2>
                <p className="text-xl mb-8 opacity-90">
                    {content.text}
                </p>
                <button
                    className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
                >
                    {content.textBtn}
                </button>
            </div>
        </section>
    )
}
