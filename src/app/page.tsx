"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { IdeaInput } from "@/components/IdeaInput";
import { FeedbackModal } from "@/components/FeedbackModal";
import { evaluateIdea, type EvaluationResult } from "@/lib/game-logic";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
    const [balance, setBalance] = useState(100000);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentResult, setCurrentResult] = useState<EvaluationResult | null>(
        null
    );

    const handleIdeaSubmit = async (idea: string) => {
        setIsSubmitting(true);
        try {
            const result = await evaluateIdea(idea);
            setCurrentResult(result);
            setBalance((prev) => prev + result.valuation);
            setModalOpen(true);
        } catch (error) {
            console.error("Failed to evaluate idea:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen relative overflow-hidden selection:bg-purple-500/30">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px]" />
            </div>

            <Header balance={balance} />

            <div className="container mx-auto px-4 pt-40 pb-20 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/60 mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Market is Open
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                            Build the Next{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient bg-300%">
                                Unicorn
                            </span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                            You have seed funding. You have the vision. Pitch your startup idea
                            to top investors and see if you can survive the valley.
                        </p>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto">
                        <IdeaInput onSubmit={handleIdeaSubmit} isSubmitting={isSubmitting} />
                    </div>

                    <div className="flex justify-center">
                        <a
                            href="/simulation"
                            className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 border-b border-transparent hover:border-white/40 pb-0.5"
                        >
                            <span>Advanced Mode: Traction & Metrics</span>
                            <ArrowRight className="w-3 h-3" />
                        </a>
                    </div>

                    {/* Ticker / Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-white/5"
                    >
                        {[
                            { label: "Active Startups", value: "12,403" },
                            { label: "Total Funding", value: "$4.2B" },
                            { label: "Exits", value: "892" },
                            { label: "Failed", value: "11,201" },
                        ].map((stat, i) => (
                            <div key={i} className="p-4">
                                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <FeedbackModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                result={currentResult}
            />
        </main>
    );
}
