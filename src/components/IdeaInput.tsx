"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface IdeaInputProps {
    onSubmit: (idea: string) => void;
    isSubmitting: boolean;
}

export function IdeaInput({ onSubmit, isSubmitting }: IdeaInputProps) {
    const [idea, setIdea] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (idea.trim() && !isSubmitting) {
            onSubmit(idea);
            setIdea("");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mx-auto"
        >
            <form onSubmit={handleSubmit} className="relative group">
                <div
                    className={cn(
                        "absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 group-hover:opacity-40 transition duration-1000 blur-xl",
                        isFocused && "opacity-60 group-hover:opacity-80"
                    )}
                />

                <div className="relative flex flex-col md:flex-row items-stretch md:items-center bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-2 transition-all duration-300">
                    <div className="pl-6 pr-4 py-4 md:py-0">
                        <Sparkles className={cn("w-6 h-6 transition-colors duration-300", isFocused ? "text-purple-400" : "text-white/20")} />
                    </div>

                    <input
                        type="text"
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Describe your billion dollar idea..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/20 py-4 px-2 text-xl md:text-2xl font-light"
                        disabled={isSubmitting}
                    />

                    <button
                        type="submit"
                        disabled={!idea.trim() || isSubmitting}
                        className={cn(
                            "m-2 px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg shadow-lg",
                            idea.trim() && !isSubmitting
                                ? "bg-white text-black hover:scale-105 hover:shadow-white/20"
                                : "bg-white/5 text-white/20 cursor-not-allowed"
                        )}
                    >
                        <span>Pitch</span>
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
