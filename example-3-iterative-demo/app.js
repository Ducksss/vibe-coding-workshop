const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.08 });
document.querySelectorAll('.evening, .social-proof, .details, .interest, .faq').forEach(section => { section.classList.add('reveal'); observer.observe(section); });
const form = document.querySelector('#rsvp');
const status = document.querySelector('#status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  status.dataset.state = 'pending';
  status.textContent = 'Saving your interest…';
  try {
    const response = await fetch('/api/interest', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), consent: form.elements.consent.checked })
    });
    if (!response.ok) throw new Error('Submission failed');
    form.reset();
    status.dataset.state = 'success';
    status.textContent = 'You’re on the interest list. Thank you for pulling up a chair. The host will be in touch when details are confirmed.';
  } catch {
    status.dataset.state = 'error';
    status.textContent = 'We couldn’t save your interest. Your details are still here — please try again.';
  } finally { button.disabled = false; }
});

// Keep the form independent of optional GPU support or module loading.
import('/scene.js').then(({ mountDinnerScene }) => mountDinnerScene(document.querySelector('.hero-art'))).catch(() => { /* The CSS menu remains visible when WebGL is unavailable. */ });

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let scrollFrame = 0;
function updateParallax() {
  scrollFrame = 0;
  document.documentElement.style.setProperty('--hero-scroll', `${motionPreference.matches ? 0 : Math.min(scrollY, innerHeight * 1.5)}px`);
}
addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateParallax); }, { passive: true });
motionPreference.addEventListener('change', updateParallax);
updateParallax();
