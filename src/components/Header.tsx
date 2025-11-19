"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

interface HeaderProps {
    balance: number;
}

export function Header({ balance }: HeaderProps) {
    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-panel rounded-full px-6 py-3 flex items-center gap-6 pointer-events-auto"
            >
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 hidden sm:block">
                        Startup Simulator
                    </h1>
                </div>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-emerald-400" />
                    <motion.span
                        key={balance}
                        initial={{ scale: 1.2, color: "#34d399" }}
                        animate={{ scale: 1, color: "#ffffff" }}
                        className="font-mono font-bold text-lg tabular-nums"
                    >
                        ${balance.toLocaleString()}
                    </motion.span>
                </div>
            </motion.div>
        </header>
    );
}
