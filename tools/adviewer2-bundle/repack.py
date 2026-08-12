#!/usr/bin/env python3
"""Bouw de adviewer2-bundel opnieuw op vanuit de uitgepakte bronbestanden.

Gebruik:
    python3 repack.py <uitpakmap> <pad/naar/index.html>

Neemt template.html en de asset-<uuid>.*-bestanden uit <uitpakmap> en schrijft
ze terug in de bundel (index.html). Alles buiten de __bundler-blokken —
inclusief de Usersnap-snippet, het feedback-onboarding-script en de
account-layer — blijft byte-voor-byte ongemoeid, net als alle binaire assets.

De template wordt gecodeerd zoals de bundler dat deed: JSON-string waarin elke
"</" als "<\\u002F" is geschreven, zodat de inhoud de omliggende <script>-tag
niet kan afsluiten.
"""
import base64
import glob
import gzip
import json
import os
import re
import sys


def encode_template(text):
    s = json.dumps(text, ensure_ascii=False)
    return s.replace('</', '<\\u002F')


def replace_block(html, name, new_content):
    pattern = r'(<script type="__bundler/%s">\s*)(.*?)(\s*</script>)' % name
    m = re.search(pattern, html, re.S)
    if not m:
        raise SystemExit('blok __bundler/%s niet gevonden' % name)
    return html[:m.start(2)] + new_content + html[m.end(2):]


def main():
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    indir, dst = sys.argv[1], sys.argv[2]
    html = open(dst, encoding='utf-8').read()

    template = open(os.path.join(indir, 'template.html'), encoding='utf-8').read()
    html = replace_block(html, 'template', encode_template(template))

    meta = json.load(open(os.path.join(indir, 'assets-meta.json'), encoding='utf-8'))
    manifest_txt = re.search(r'<script type="__bundler/manifest">\s*(.*?)\s*</script>', html, re.S).group(1)
    changed = 0
    for path in sorted(glob.glob(os.path.join(indir, 'asset-*.*'))):
        uuid = re.match(r'asset-([0-9a-f-]{36})\.', os.path.basename(path)).group(1)
        m = meta.get(uuid)
        if not m:
            raise SystemExit('onbekende asset %s (niet in assets-meta.json)' % uuid)
        raw = open(path, 'rb').read()
        if m['compressed']:
            payload = gzip.compress(raw, mtime=0)
        else:
            payload = raw
        b64 = base64.b64encode(payload).decode('ascii')
        entry_re = re.compile(r'("%s":\{[^{}]*?"data":")[A-Za-z0-9+/=]*(")' % re.escape(uuid))
        if not entry_re.search(manifest_txt):
            raise SystemExit('asset %s niet gevonden in manifest' % uuid)
        new_manifest, n = entry_re.subn(lambda mm: mm.group(1) + b64 + mm.group(2), manifest_txt, count=1)
        if new_manifest != manifest_txt:
            changed += 1
        manifest_txt = new_manifest
    html = replace_block(html, 'manifest', manifest_txt)

    with open(dst, 'w', encoding='utf-8') as f:
        f.write(html)
    print('bundel herbouwd: template (%d tekens) + %d asset(s) bijgewerkt -> %s'
          % (len(template), changed, dst))


if __name__ == '__main__':
    main()
