import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const works = JSON.parse(readFileSync(new URL('../src/data/spectrum-works.json', import.meta.url)));
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

test('every representative work has a distinct publication and a usable card', () => {
  const names = [...html.matchAll(/data-work-name="([^"]+)"/g)].map(match => match[1]);
  assert.equal(names.length, 53);
  assert.equal(new Set(names).size, names.length);
  assert.deepEqual(new Set(names), new Set(Object.keys(works)));
  assert.equal(new Set(Object.values(works).map(work => work.href)).size, names.length);
  for(const [name, work] of Object.entries(works)) {
    const url = new URL(work.href);
    assert.equal(url.protocol, 'https:', name);
    assert.ok(work.title.length >= name.length, name);
    assert.ok(work.bibKey && Number.isInteger(work.year), name);
    if(work.icon) {
      assert.ok(existsSync(new URL(`../public${work.icon}`, import.meta.url)), name);
      if(work.icon.endsWith('.svg')) assert.match(readFileSync(new URL(`../public${work.icon}`, import.meta.url), 'utf8'), /<path[^>]+d="[^"]+"/, name);
    } else assert.ok(work.pictogram, name);
  }
  assert.equal((html.match(/class="spectrum-work-card"/g) ?? []).length, names.length);
});

test('publication and institution changes require an updated evidence record', () => {
  const audit = JSON.parse(readFileSync(new URL('../docs/representative-works-audit.json', import.meta.url)));
  assert.deepEqual(new Set(Object.keys(audit.works)), new Set(Object.keys(works)));
  for (const [name, work] of Object.entries(works)) {
    const record = audit.works[name];
    assert.deepEqual(work, record.card, `${name}: re-check and update the audit when changing metadata`);
    assert.equal(work.bibKey, record.bibliography.key);
    assert.ok(record.affiliationEvidence.length > 0, name);
    if (record.linkOrigin === 'manuscript_url') assert.equal(work.href, record.bibliography.url, name);
    if (record.linkOrigin === 'manuscript_arxiv_id') {
      const id = record.bibliography.journal.match(/arXiv:(\d+\.\d+)/)?.[1];
      assert.ok(id && work.href.endsWith(id), name);
    }
  }
  assert.equal(works.AnnaAgent.organization, 'Northeastern University (China)');
  assert.equal(works.AnnaAgent.icon, '/assets/images/works/neu-china.svg', 'Use the verified Chinese NEU emblem');
  const neuSvg = readFileSync(new URL('../public' + works.AnnaAgent.icon, import.meta.url), 'utf8');
  assert.doesNotMatch(neuSvg, /<(?:image|script)\b/i, 'Emblem must be a self-contained vector');
  assert.match(works.AgentHPO.organization, /Guangzhou/);
  assert.match(works.MYCIN.publicationNote, /2012 reprint/);
});

test('keeps similarly named workflow and agent papers distinct', () => {
  assert.match(works.AutoFlow.href, /2407\.12821/);
  assert.match(works.AFLOW.href, /z5uVAKwmjf/);
  assert.match(works.AgentEvolver.href, /2511\.10395/);
  assert.match(works.HarnessBank.href, /2607\.13683/);
});
