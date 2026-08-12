#!/usr/bin/env python3
"""Pak de adviewer2-bundel uit naar bewerkbare bronbestanden.

De viewer (prototypes/adviewer2/index.html) is een zelf-uitpakkende bundel:
de echte app-HTML zit als JSON-string in een <script type="__bundler/template">
en alle assets (afbeeldingen, fonts, JS) staan base64 (tekst-JS gzip't) in een
<script type="__bundler/manifest">.

Gebruik:
    python3 unpack.py <pad/naar/index.html> <uitpakmap>

Schrijft in <uitpakmap>:
    template.html        de app (markup + logica) — dit bewerk je
    asset-<uuid>.<ext>   gedecomprimeerde tekst-assets (JS) — bewerkbaar
    assets-meta.json     metadata per asset (mime, compressed, gewijzigd-of-niet)

Binaire assets (afbeeldingen, fonts) blijven in de bundel staan; repack.py
neemt ze ongewijzigd over.
"""
import base64
import gzip
import json
import os
import re
import sys


def read_block(html, name):
    m = re.search(r'(<script type="__bundler/%s">\s*)(.*?)(\s*</script>)' % name, html, re.S)
    if not m:
        raise SystemExit('blok __bundler/%s niet gevonden' % name)
    return m.group(2)


def main():
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    src, outdir = sys.argv[1], sys.argv[2]
    html = open(src, encoding='utf-8').read()
    os.makedirs(outdir, exist_ok=True)

    template = json.loads(read_block(html, 'template'))
    with open(os.path.join(outdir, 'template.html'), 'w', encoding='utf-8') as f:
        f.write(template)

    manifest = json.loads(read_block(html, 'manifest'))
    meta = {}
    for uuid, entry in manifest.items():
        mime = entry.get('mime', '')
        is_text = 'javascript' in mime or mime.startswith('text/')
        meta[uuid] = {'mime': mime, 'compressed': bool(entry.get('compressed')), 'text': is_text}
        if is_text:
            raw = base64.b64decode(entry['data'])
            if entry.get('compressed'):
                raw = gzip.decompress(raw)
            ext = 'js' if 'javascript' in mime else mime.split('/')[-1]
            with open(os.path.join(outdir, 'asset-%s.%s' % (uuid, ext)), 'wb') as f:
                f.write(raw)
    with open(os.path.join(outdir, 'assets-meta.json'), 'w', encoding='utf-8') as f:
        json.dump(meta, f, indent=1)
    print('uitgepakt naar %s: template.html + %d tekst-assets (%d assets totaal)'
          % (outdir, sum(1 for m in meta.values() if m['text']), len(meta)))


if __name__ == '__main__':
    main()
