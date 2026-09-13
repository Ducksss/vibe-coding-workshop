async page => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('http://localhost:5183');
  await page.locator('.three-ready canvas').waitFor();
  await page.locator('.hero-copy').evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished)));
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  assert(await page.locator('.testimonial-grid figure').count() === 3, 'Three testimonials required');
  assert(await page.locator('.proof-metrics dd').count() === 3, 'Three event totals required');
  assert((await page.locator('.sample-badge').textContent()).includes('Sample content'), 'Missing sample disclosure');
  await page.evaluate(() => window.scrollTo({ top: 220, behavior: 'instant' }));
  await page.waitForFunction(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hero-scroll')) > 100);
  assert(await page.locator('.hero-copy').evaluate(el => getComputedStyle(el).translate !== 'none'), 'Missing scroll parallax');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert(await page.locator('.hero-copy').evaluate(el => getComputedStyle(el).translate === 'none'), 'Reduced motion must disable parallax');
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}px`);
  }
  await page.getByText('Do I need to have raised funding?', { exact: false }).click();
  assert(await page.locator('.faq details').first().evaluate(el => el.open), 'FAQ must open');
  await page.locator('nav').getByRole('link', { name: 'Register interest' }).click();
  await page.getByRole('button', { name: 'Register interest' }).click();
  assert(await page.locator('#rsvp').evaluate(form => !form.checkValidity()), 'Empty form must fail validation');
  await page.getByLabel('Your name', { exact: true }).fill('UI Check');
  await page.getByLabel('Email address', { exact: true }).fill('check@example.com');
  await page.getByLabel('What are you building?', { exact: true }).fill('Test');
  await page.getByLabel('Where are you based?', { exact: true }).fill('Singapore');
  await page.getByRole('checkbox').check();
  await page.route('**/api/interest', route => route.abort());
  await page.getByRole('button', { name: 'Register interest' }).click();
  await page.getByRole('status').filter({ hasText: 'couldn’t save' }).waitFor();
  assert(await page.getByLabel('Your name', { exact: true }).inputValue() === 'UI Check', 'Failed submission must preserve input');
  await page.unroute('**/api/interest');
  await page.goto('http://localhost:5183');
  await page.locator('.three-ready canvas').waitFor();
}
