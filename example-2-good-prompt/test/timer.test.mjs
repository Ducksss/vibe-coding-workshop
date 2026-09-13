import assert from 'node:assert/strict'
import test from 'node:test'
import { getBreathPhase } from '../src/timer.js'

test('breathing alternates in five-second intervals and finishes at zero', () => {
  assert.equal(getBreathPhase(60), 'Breathe in')
  assert.equal(getBreathPhase(55), 'Breathe out')
  assert.equal(getBreathPhase(50), 'Breathe in')
  assert.equal(getBreathPhase(0), 'Complete')
})
