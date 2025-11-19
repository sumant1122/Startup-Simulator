"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown, Share2 } from "lucide-react";
import { EvaluationResult } from "@/lib/game-logic";

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    result: EvaluationResult | null;
}

export function FeedbackModal({ isOpen, onClose, result }: FeedbackModalProps) {
    if (!result) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 perspective-1000"
                    >
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                            {/* Background Glow */}
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b ${result.success ? "from-emerald-500/20" : "from-red-500/20"
                                } to-transparent blur-2xl opacity-50`} />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className={`w-20 h-20 rounded-full flex items-center justify-center ${result.success
                                            ? "bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                                            : "bg-red-500/10 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                                        } `}
                                >
                                    {result.success ? (
                                        <TrendingUp className="w-10 h-10 text-emerald-400" />
                                    ) : (
                                        <TrendingDown className="w-10 h-10 text-red-400" />
                                    )}
                                </motion.div>

                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold text-white tracking-tight">
                                        {result.success ? "Funding Secured" : "Proposal Rejected"}
                                    </h2>
                                    <div className="flex items-center justify-center gap-2 text-sm text-white/40 uppercase tracking-widest font-medium">
                                        <span>from</span>
                                        <span className="text-white/80">{result.investorName}</span>
                                    </div>
                                </div>

                                <p className="text-lg text-white/80 leading-relaxed font-light">
                                    "{result.message}"
                                </p>

                                <div className="w-full py-6 border-y border-white/5">
                                    <div className="text-sm text-white/40 uppercase tracking-wider mb-1">Valuation Impact</div>
                                    <div
                                        className={`font-mono font-bold text-4xl tracking-tighter ${result.success ? "text-emerald-400 text-glow" : "text-red-400"
                                            } `}
                                    >
                                        {result.valuation > 0 ? "+" : ""}
                                        ${Math.abs(result.valuation).toLocaleString()}
                                    </div>
                                </div>

                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-white/20"
                                    >
                                        Continue
                                    </button>
                                    <button className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-colors">
                                        <Share2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
