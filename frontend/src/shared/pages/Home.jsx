import { useEffect } from "react";

import CTA from "../components/CTA";
import Categories from "../layout/Categories";
import FeaturedQuizzes from "../layout/FeaturedQuizzes";
import UserHeader from "../components/UserHeader";

export default function Home() {
    const contentCTAGuest = {
        title: 'Ready to Start Learning',
        text: 'Join thousands of learners and test your knowledge today!',
        textBtn: 'Get Started Free'
    };

    // const contentCTA = {
    //     title: 'Ready to Start Learning',
    //     text: 'Join thousands of learners and test your knowledge today!',
    //     textBtn: 'Get Started Free'
    // };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <UserHeader />

            {/* Hero Section */}
            <section className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 
            before:bg-[url('/images/background-home.svg')]
            before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-10 before:transform before:-translate-x-1/2 z-20 pt-12">
                <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-18 flex gap-15">
                    <div className="max-w-3xl text-center w-150 bg-slate-150  shadow-[0_10px_25px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.01)] px-10 py-8 rounded-md flex-none self-center">
                        <h1 className="font-bold !leading-[55px] md:!leading-[40px] text-gray-900 text-5xl md:text-4xl text-left">
                            <span className="text-black">
                                Quiz {" "}
                            </span>
                            Online is now much easier
                        </h1>
                        <h3 className="mt-4 text-lg leading-8 text-gray-600 text-left">
                            QuizMaster is an interesting platform that will teach you in more an interactive way.
                        </h3>
                    </div>

                    <div>
                        <img
                            src="../../public/images/student-graduation-2.png"
                            alt=""
                        />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <Categories />

            {/* Featured Quizzes */}
            <FeaturedQuizzes />

            {/* CTA Section */}
            <CTA content={contentCTAGuest} />
        </div>
    );
}
