export class Util {
    public static randBetween(min: number, max: number): number {
        min = Math.floor(min); // Ensure min is an integer
        max = Math.floor(max); // Ensure max is an integer
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}