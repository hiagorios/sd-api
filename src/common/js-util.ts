export class JSUtil {
    static range(start: number, end: number): number[] {
        if (start === end) return [start];
        return [start, ...this.range(start + 1, end)];
    }
    
    static randomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}