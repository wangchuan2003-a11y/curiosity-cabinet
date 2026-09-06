import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  experiments,
  filterExperiments,
  demoURL,
  sourceURL,
} from "../.test-build/catalog.js";
test("six unique experiments have real target links and local original covers", () => {
  assert.equal(experiments.length, 6);
  assert.equal(new Set(experiments.map((e) => e.slug)).size, 6);
  for (const e of experiments) {
    assert.equal(
      demoURL(e.slug),
      `https://wangchuan2003-a11y.github.io/${e.slug}/`,
    );
    assert.equal(
      sourceURL(e.slug),
      `https://github.com/wangchuan2003-a11y/${e.slug}`,
    );
    const file = new URL(`../public/previews/${e.slug}.jpg`, import.meta.url);
    assert.equal(existsSync(file), true);
    assert.equal(readFileSync(file).readUInt16BE(0), 0xffd8);
    assert.ok(e.tryThis.length > 0 && e.boundary.length > 0);
  }
});
test("theme selection and search are combined without mutating the catalog", () => {
  const before = JSON.stringify(experiments);
  for (const theme of ["数学", "哲学", "科学"])
    assert.equal(filterExperiments(experiments, theme, "").length, 2);
  assert.equal(
    filterExperiments(experiments, "哲学", "Rawls")[0].slug,
    "veil-lab",
  );
  assert.equal(filterExperiments(experiments, "数学", "Rawls").length, 0);
  assert.equal(JSON.stringify(experiments), before);
});
test("keyword search normalizes case, width and whitespace and requires every word", () => {
  assert.equal(
    filterExperiments(experiments, "全部", "  ＣＨＡＯＳ atlas  ")[0].slug,
    "chaos-atlas",
  );
  assert.equal(
    filterExperiments(experiments, "全部", "引力 轨道")[0].slug,
    "orbit-forge",
  );
  assert.equal(filterExperiments(experiments, "全部", "引力 Rawls").length, 0);
  assert.equal(filterExperiments(experiments, "全部", "   ").length, 6);
});
test("unknown queries and regex-like text are treated as plain search strings", () => {
  for (const query of ["not-a-real-experiment", "[.*]", "<script>"])
    assert.deepEqual(filterExperiments(experiments, "全部", query), []);
});
