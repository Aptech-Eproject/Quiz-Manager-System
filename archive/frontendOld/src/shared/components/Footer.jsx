import { Zap } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">
                                    <Zap className="w-5 h-5" />
                                </span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                QuizMaster
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            The ultimate platform for testing and improving your knowledge.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition">How It Works</a></li>
                            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition">
                                Programming
                            </a></li>
                            <li><a href="#" className="hover:text-white transition">
                                Science
                            </a></li>
                            <li><a href="#" className="hover:text-white transition">
                                Mathematics
                            </a></li>
                            <li><a href="#" className="hover:text-white transition">
                                Languages
                            </a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition">
                                Help Center
                            </a></li>
                            <li><a href="#" className="hover:text-white transition">
                                Terms of Service
                            </a></li>
                            <li><a href="#" className="hover:text-white transition">
                                Privacy Policy
                            </a></li>
                            <li><a href="#" className="hover:text-white transition">
                                FAQ
                            </a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                    © 2025 QuizMaster. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
