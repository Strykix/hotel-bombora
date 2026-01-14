import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    LKR: 'Rs',
  }
  return `${symbols[currency] || '$'}${amount.toLocaleString()}`
}

export function getUnitLabel(unit: string): string {
  const labels: Record<string, string> = {
    per_trip: '/trip',
    per_day: '/day',
    per_person: '/person',
    per_hour: '/hour',
    per_night: '/night',
    flat: '',
  }
  return labels[unit] || ''
}
