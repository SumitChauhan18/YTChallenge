import React, { useState, useEffect } from "react";
import { MCQChallenge } from "./MCQChallenge.jsx";

export function ChallengeGenerator() {
    const [challenge, setChallenge] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [difficulty, setDifficulty] = useState("easy");
    const [quota, setQuota] = useState(null);

    useEffect(() => {
        fetchQuota();
    }, []);

    const fetchQuota = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch("/api/quota"); // Replace with actual API endpoint
            if (!response.ok) throw new Error("Failed to fetch quota");
            const data = await response.json();
            setQuota(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const generateChallenge = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`/api/challenge?difficulty=${difficulty}`);
            if (!response.ok) throw new Error("Failed to generate challenge");
            const data = await response.json();
            setChallenge(data);
            // Refresh quota after generation
            fetchQuota();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getNextResetTime = () => {
        if (!quota || !quota.reset_time) return "Unknown";
        const date = new Date(quota.reset_time);
        return date.toLocaleString();
    };

    return (
        <div className="challenge-container">
            <h2>Coding Challenge Generator</h2>

            <div className="quota-display">
                <p>Challenges remaining today: {quota?.quota_remaining ?? 0}</p>
                {quota?.quota_remaining === 0 && (
                    <p>Next Reset: {getNextResetTime()}</p>
                )}
            </div>

            <div className="difficulty-selector">
                <label htmlFor="difficulty">Select Difficulty</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <button
                onClick={generateChallenge}
                disabled={isLoading || quota?.quota_remaining === 0}
            >
                {isLoading ? "Generating..." : "Generate Challenge"}
            </button>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {challenge && <MCQChallenge challenge={challenge} />}
        </div>
    );
}
