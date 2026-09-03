export function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
        return `${hours}h ${minutes}m`
    }

    return `${minutes}m ${secs}s`
}

export function formatMillimeters(num:number) {
    return Number(num).toFixed(0) + " mm";
}

export function formatPercentage(decimal:number) {
  return decimal * 100;
}

export function kbToMb(kb:number, decimals = 2) {
    if (typeof kb !== 'number' || isNaN(kb)) return '0.00 MB';
    
    const mb = kb / 1024;
    return +mb.toFixed(decimals);
}