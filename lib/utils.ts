import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getPercentage(value: number, min: number, max: number): number {
    return ((value - min) / (max - min)) * 100
}

export { cn, randomInt, getPercentage }
