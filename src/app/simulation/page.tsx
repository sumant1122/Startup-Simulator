"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { FeedbackModal } from "@/components/FeedbackModal";
import { Slider } from "@/components/ui/Slider";
import { evaluateIdea, type EvaluationResult, type SimulationMetrics } from "@/lib/game-logic";
import { ArrowRight, Sparkles, Activity, Users, DollarSign, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SimulationPage() {
    const [balance, setBalance] = useState(100000);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentResult, setCurrentResult] = useState<EvaluationResult | null>(null);

    const [idea, setIdea] = useState("");
    const [metrics, setMetrics] = useState<SimulationMetrics>({
        users: 1000,
        revenue: 5000,
        burnRate: 10000,
        runway: 12,
    });

    const handleRunSimulation = async () => {
        if (!idea.trim()) return;

        setIsSubmitting(true);
        try {
            const result = await evaluateIdea(idea, metrics);
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
        <main className="min-h-screen relative overflow-hidden selection:bg-purple-500/30 pb-20">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px]" />
            </div>

            <Header balance={balance} />

            <div className="container mx-auto px-4 pt-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                            <Activity className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Traction & Simulation</h1>
                            <p className="text-white/60">Input your startup metrics to simulate investor interest.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Pitch */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="glass-panel rounded-3xl p-8 h-full flex flex-col">
                                <div className="flex items-center gap-3 mb-6">
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                    <h2 className="text-xl font-bold">The Pitch</h2>
                                </div>

                                <textarea
                                    value={idea}
                                    onChange={(e) => setIdea(e.target.value)}
                                    placeholder="Describe your startup in detail. What problem are you solving? What is your unfair advantage?"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 text-lg text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none min-h-[300px]"
                                />
                            </div>
                        </div>

                        {/* Right Column: Metrics */}
                        <div className="space-y-6">
                            <div className="glass-panel rounded-3xl p-8 space-y-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <Users className="w-5 h-5 text-blue-400" />
                                    <h2 className="text-xl font-bold">Growth Metrics</h2>
                                </div>

                                <Slider
                                    label="Monthly Active Users"
                                    value={metrics.users}
                                    min={0}
                                    max={1000000}
                                    step={1000}
                                    onChange={(v) => setMetrics(m => ({ ...m, users: v }))}
                                    formatValue={(v) => v.toLocaleString()}
                                />

                                <Slider
                                    label="Monthly Revenue (MRR)"
                                    value={metrics.revenue}
                                    min={0}
                                    max={500000}
                                    step={1000}
                                    onChange={(v) => setMetrics(m => ({ ...m, revenue: v }))}
                                    formatValue={(v) => `$${v.toLocaleString()}`}
                                />
                            </div>

                            <div className="glass-panel rounded-3xl p-8 space-y-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <Flame className="w-5 h-5 text-orange-400" />
                                    <h2 className="text-xl font-bold">Burn & Runway</h2>
                                </div>

                                <Slider
                                    label="Monthly Burn Rate"
                                    value={metrics.burnRate}
                                    min={1000}
                                    max={200000}
                                    step={1000}
                                    onChange={(v) => setMetrics(m => ({ ...m, burnRate: v }))}
                                    formatValue={(v) => `$${v.toLocaleString()}`}
                                />

                                <Slider
                                    label="Runway (Months)"
                                    value={metrics.runway}
                                    min={1}
                                    max={36}
                                    onChange={(v) => setMetrics(m => ({ ...m, runway: v }))}
                                    formatValue={(v) => `${v} mo`}
                                />
                            </div>

                            <button
                                onClick={handleRunSimulation}
                                disabled={!idea.trim() || isSubmitting}
                                className={cn(
                                    "w-full py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-lg",
                                    idea.trim() && !isSubmitting
                                        ? "bg-white text-black hover:scale-[1.02] hover:shadow-white/20"
                                        : "bg-white/10 text-white/40 cursor-not-allowed"
                                )}
                            >
                                <span>Run Simulation</span>
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <FeedbackModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                result={currentResult}
            />
        </main>
    );
}
