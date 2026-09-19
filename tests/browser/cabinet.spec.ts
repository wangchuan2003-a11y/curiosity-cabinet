import { test, expect } from "@playwright/test";
test("themes, keyword intersection, empty results and recovery work", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator(".experiment")).toHaveCount(8);
  await page.getByRole("button", { name: "科学", exact: true }).click();
  await expect(page.locator(".experiment")).toHaveCount(3);
  await page.getByRole("searchbox", { name: "搜索实验" }).fill("轨道");
  await expect(page.locator(".experiment")).toHaveCount(1);
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-slug",
    "orbit-forge",
  );
  await page.locator("#search").fill("不存在的实验");
  await expect(page.locator("#empty")).toBeVisible();
  await expect(page.locator(".experiment")).toHaveCount(0);
  await page.locator("#reset").click();
  await expect(page.locator(".experiment")).toHaveCount(8);
  await expect(page.locator("#search")).toBeFocused();
  await page.getByRole("button", { name: "算法", exact: true }).click();
  await expect(page.locator(".experiment")).toHaveCount(1);
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-slug",
    "pathfinder-arena",
  );
  expect(errors).toEqual([]);
});
test("search keyboard shortcut and original cover loading work", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("/");
  await expect(page.locator("#search")).toBeFocused();
  await page.keyboard.type("ＣＨＡＯＳ");
  await expect(page.locator(".experiment")).toHaveCount(1);
  await expect(page.locator(".experiment")).toHaveAttribute(
    "data-slug",
    "chaos-atlas",
  );
  await page.locator(".experiment img").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".experiment img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await page.locator("#clear-search").click();
  await expect(page.locator(".experiment")).toHaveCount(8);
  for (const slug of ["emergence-lab", "pathfinder-arena"]) {
    const card = page.locator(`[data-slug="${slug}"]`);
    const cover = card.locator("img");
    await cover.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        cover.evaluate(
          (img: HTMLImageElement) =>
            img.complete &&
            img.naturalWidth === 1425 &&
            img.naturalHeight === 990,
        ),
      )
      .toBe(true);
    await expect(card.locator(".experiment-main")).toHaveAttribute(
      "href",
      `https://wangchuan2003-a11y.github.io/${slug}/`,
    );
    await expect(card.locator(".source-link")).toHaveAttribute(
      "href",
      `https://github.com/wangchuan2003-a11y/${slug}`,
    );
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});
test("card and independent source links open their real target URLs", async ({
  page,
  context,
}) => {
  // Verify navigation wiring without making CI depend on another site's uptime.
  await context.route("https://wangchuan2003-a11y.github.io/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<title>Demo destination</title>",
    }),
  );
  await context.route("https://github.com/wangchuan2003-a11y/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<title>Source destination</title>",
    }),
  );
  await page.goto("/");
  const card = page.locator('[data-slug="veil-lab"]');
  await expect(card.locator(".experiment-main")).toHaveAttribute(
    "href",
    "https://wangchuan2003-a11y.github.io/veil-lab/",
  );
  await expect(card.locator(".source-link")).toHaveAttribute(
    "href",
    "https://github.com/wangchuan2003-a11y/veil-lab",
  );
  const demoEvent = page.waitForEvent("popup");
  await card.locator(".experiment-main").click();
  const demo = await demoEvent;
  await demo.waitForLoadState();
  expect(demo.url()).toBe("https://wangchuan2003-a11y.github.io/veil-lab/");
  await demo.close();
  const sourceEvent = page.waitForEvent("popup");
  await card.locator(".source-link").click();
  const source = await sourceEvent;
  await source.waitForLoadState();
  expect(source.url()).toBe("https://github.com/wangchuan2003-a11y/veil-lab");
  await source.close();
});
