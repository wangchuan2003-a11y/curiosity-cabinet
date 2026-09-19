import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import {
  experiments,
  filterExperiments,
  demoURL,
  sourceURL,
} from "../.test-build/catalog.js";
test("eight unique experiments have real target links and traceable original covers", () => {
  const { sources } = JSON.parse(
    readFileSync(
      new URL("../docs/preview-sources.json", import.meta.url),
      "utf8",
    ),
  );
  assert.deepEqual(
    experiments.map((e) => e.slug),
    [
      "chaos-atlas",
      "veil-lab",
      "orbit-forge",
      "paradox-lens",
      "cooperation-lab",
      "entropy-lab",
      "emergence-lab",
      "pathfinder-arena",
    ],
  );
  assert.equal(new Set(experiments.map((e) => e.slug)).size, 8);
  assert.equal(sources.length, 8);
  for (const e of experiments) {
    assert.equal(
      demoURL(e.slug),
      `https://wangchuan2003-a11y.github.io/${e.slug}/`,
    );
    assert.equal(
      sourceURL(e.slug),
      `https://github.com/wangchuan2003-a11y/${e.slug}`,
    );
    const file = new URL(`../public/previews/${e.preview}`, import.meta.url);
    assert.equal(existsSync(file), true);
    const bytes = readFileSync(file);
    if (e.preview.endsWith(".png"))
      assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    else assert.equal(bytes.readUInt16BE(0), 0xffd8);
    const source = sources.find((item) => item.slug === e.slug);
    assert.ok(source, `Missing source for ${e.slug}`);
    assert.equal(source.preview, e.preview);
    assert.equal(source.repository, `wangchuan2003-a11y/${e.slug}`);
    assert.match(source.commit, /^[a-f0-9]{40}$/);
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      source.sha256,
    );
    assert.ok(e.tryThis.length > 0 && e.boundary.length > 0);
  }
});
test("theme selection and search are combined without mutating the catalog", () => {
  const before = JSON.stringify(experiments);
  for (const [theme, count] of [
    ["数学", 2],
    ["哲学", 2],
    ["科学", 3],
    ["算法", 1],
  ])
    assert.equal(filterExperiments(experiments, theme, "").length, count);
  assert.equal(
    filterExperiments(experiments, "算法", "Dijkstra")[0].slug,
    "pathfinder-arena",
  );
  assert.equal(
    filterExperiments(experiments, "科学", "黏菌")[0].slug,
    "emergence-lab",
  );
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
  assert.equal(filterExperiments(experiments, "全部", "   ").length, 8);
});
test("unknown queries and regex-like text are treated as plain search strings", () => {
  for (const query of ["not-a-real-experiment", "[.*]", "<script>"])
    assert.deepEqual(filterExperiments(experiments, "全部", query), []);
});
