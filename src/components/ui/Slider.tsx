"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface SliderProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    label: string;
    formatValue?: (value: number) => string;
    className?: string;
}

export function Slider({
    value,
    min,
    max,
    step = 1,
    onChange,
    label,
    formatValue = (v) => v.toString(),
    className,
}: SliderProps) {
    const [isDragging, setIsDragging] = React.useState(false);
    const constraintsRef = React.useRef<HTMLDivElement>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);

    // Calculate percentage for initial position
    const percentage = (value - min) / (max - min);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const newPercentage = x / rect.width;
        const newValue = Math.round((min + newPercentage * (max - min)) / step) * step;
        onChange(Math.max(min, Math.min(max, newValue)));
    };

    return (
        <div className={cn("space-y-3", className)}>
            <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-white/60 uppercase tracking-wider">
                    {label}
                </label>
                <div className="font-mono font-bold text-xl text-white tabular-nums">
                    {formatValue(value)}
                </div>
            </div>

            <div
                className="relative h-6 flex items-center cursor-pointer touch-none group"
                onPointerDown={handlePointerDown}
                ref={trackRef}
            >
                {/* Track Background */}
                <div className="absolute w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    {/* Fill */}
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${percentage * 100}%` }}
                        layoutId={`slider-fill-${label}`}
                    />
                </div>

                {/* Thumb */}
                <motion.div
                    className="absolute w-6 h-6 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] border-2 border-purple-500 z-10 flex items-center justify-center"
                    style={{ left: `calc(${percentage * 100}% - 12px)` }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                </motion.div>

                {/* Glow effect on hover */}
                <div
                    className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        left: `calc(${percentage * 100}% - 20px)`,
                        width: '40px'
                    }}
                />
            </div>
        </div>
    );
}
