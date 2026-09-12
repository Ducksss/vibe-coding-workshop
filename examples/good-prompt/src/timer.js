export function getBreathPhase(remaining) {
  if (remaining <= 0) return 'Complete'
  return (60 - remaining) % 10 < 5 ? 'Breathe in' : 'Breathe out'
}
