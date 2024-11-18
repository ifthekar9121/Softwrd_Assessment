export function successRate(successfulLandings, attemptedLandings) {
    if (!attemptedLandings) return '0';
    const rate = (successfulLandings / attemptedLandings) * 100;
    return rate.toFixed(0);
}