"""Check both static pages, local links, assets and event registration wording."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

root = Path(__file__).parent
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids, self.links, self.headings = set(), [], 0
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'Duplicate ID: {attrs["id"]}'
            self.ids.add(attrs['id'])
        if tag == 'h1': self.headings += 1
        for name in ('href', 'src', 'poster'):
            if name in attrs: self.links.append(attrs[name])
        if tag == 'img': assert 'alt' in attrs, 'Image needs alternative text or an explicitly decorative empty alt'

for file in root.glob('*.html'):
    page = Page(file)
    assert page.headings == 1, f'{file.name}: expected one main heading'
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc: continue
        target = root / unquote(url.path) if url.path else file
        assert target.is_file(), f'{file.name}: missing {link}'
        if url.fragment:
            assert url.fragment in Page(target).ids, f'Broken anchor: {link}'
    print(f'{file.name}: local links, assets, anchors and image labels pass')
html = (root / 'index.html').read_text()
assert 'Registration is now closed' in html
assert 'https://www.ascii-magic.com/tools/video-to-ascii' in html
assert all(word in html for word in ('muted', 'loop', 'playsinline', 'video-poster.png'))
print('Registration status and requested video tool link pass')
