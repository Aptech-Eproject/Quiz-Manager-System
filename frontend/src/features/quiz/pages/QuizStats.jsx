import {
    DollarSign,
    Eye,
    ShoppingCart,
    Users
} from "lucide-react"
import { useEffect } from "react";

import StatsGrid from "../layout/StatsGrid";

export default function QuizStats() {
    const stats = [
        {
            title: 'Total Revenue',
            value: '$124,563',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'from-emerald-500 to-teal-600',
            bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
            textColor: 'text-emerald-600 dark:text-emerald-400'
        },
        {
            title: 'Active Users',
            value: '8,549',
            change: '+8.2%',
            trend: 'up',
            icon: Users,
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            textColor: 'text-blue-600 dark:text-blue-400'
        },
        {
            title: 'Total Orders',
            value: '2,847',
            change: '+15.3%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'from-purple-500 to-pink-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            textColor: 'text-purple-600 dark:text-purple-400'
        },
        {
            title: 'Page Views',
            value: '45,892',
            change: '-2.1%',
            trend: 'down',
            icon: Eye,
            color: 'from-orange-500 to-red-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
            textColor: 'text-orange-600 dark:text-orange-400'
        }
    ];

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="bg-white flex-1 shadow-[0_0_10px_rgba(0,0,0,0.15)] border border-gray-400">
            <div className="max-w-7xl mx-auto"></div>

            <div className="gap-4 px-12">
                <StatsGrid stats={stats} />
            </div>
        </div>
    )

}
