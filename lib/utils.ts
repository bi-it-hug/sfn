import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getPercentage(value: number, min: number, max: number): number {
    return ((value - min) / (max - min)) * 100
}

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/)

    if (parts.length === 0) {
        return ""
    }

    if (parts.length === 1) {
        return parts[0][0].toUpperCase()
    }

    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export { cn, getRandomInt, getPercentage, getInitials }
