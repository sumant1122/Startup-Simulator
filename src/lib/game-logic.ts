export interface SimulationMetrics {
    users: number;
    revenue: number;
    burnRate: number;
    runway: number;
}

export interface EvaluationResult {
    success: boolean;
    message: string;
    valuation: number;
    investorName: string;
}

const INVESTORS = [
    "Sequoia Capital",
    "Andreessen Horowitz",
    "Y Combinator",
    "Benchmark",
    "Lightspeed",
    "Founders Fund",
    "Index Ventures",
];

const SUCCESS_MESSAGES = [
    "This is exactly what the market needs right now.",
    "I love the vision. Here's a seed check.",
    "The unit economics look incredible.",
    "This is a category-defining product.",
    "I'm in. Let's build the future.",
    "The growth metrics are undeniable.",
    "You're solving a hair-on-fire problem.",
];

const REJECTION_MESSAGES = [
    "The market is too small.",
    "I don't see a clear path to monetization.",
    "It's a crowded space with too many competitors.",
    "Come back when you have more traction.",
    "Great team, but I'm not convinced by the idea.",
    "Burn rate is too high for this stage.",
    "Unit economics don't make sense yet.",
];

export async function evaluateIdea(idea: string, metrics?: SimulationMetrics): Promise<EvaluationResult> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    let successProbability = 0.4; // Base 40%
    let valuationMultiplier = 1;

    // Adjust based on metrics if provided
    if (metrics) {
        if (metrics.revenue > 50000) {
            successProbability += 0.3;
            valuationMultiplier += 2;
        } else if (metrics.revenue > 10000) {
            successProbability += 0.1;
            valuationMultiplier += 1.2;
        }

        if (metrics.users > 100000) {
            successProbability += 0.2;
            valuationMultiplier += 1.5;
        }

        if (metrics.burnRate > metrics.revenue * 2) {
            successProbability -= 0.2; // High burn is risky
        }

        if (metrics.runway < 6) {
            successProbability -= 0.1; // Desperation
        }
    }

    const isSuccess = Math.random() < successProbability;

    const investor = INVESTORS[Math.floor(Math.random() * INVESTORS.length)];

    if (isSuccess) {
        let baseValuation = Math.floor(Math.random() * 50000) + 10000;
        if (metrics) {
            // Revenue multiple valuation
            const revenueValuation = metrics.revenue * 12 * (Math.random() * 5 + 5); // 5-10x ARR
            baseValuation = Math.max(baseValuation, revenueValuation);
        }

        const valuation = Math.floor(baseValuation * valuationMultiplier);
        const message = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
        return {
            success: true,
            message,
            valuation,
            investorName: investor,
        };
    } else {
        const burn = metrics ? metrics.burnRate : 5000;
        const valuation = -Math.floor(burn * (Math.random() * 2 + 1)); // Lose 1-3 months of burn
        const message = REJECTION_MESSAGES[Math.floor(Math.random() * REJECTION_MESSAGES.length)];
        return {
            success: false,
            message,
            valuation,
            investorName: investor,
        };
    }
}
