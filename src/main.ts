import "./style.css";
import {
  experiments,
  THEMES,
  filterExperiments,
  demoURL,
  sourceURL,
  type Theme,
} from "./catalog";
const $ = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;
let theme: Theme = "全部";
const search = $<HTMLInputElement>("search");
function render() {
  const result = filterExperiments(experiments, theme, search.value);
  $("experiments").classList.toggle(
    "filtered",
    theme !== "全部" || Boolean(search.value.trim()),
  );
  $("experiments").innerHTML = result
    .map(
      (item) =>
        `<article class="experiment" data-slug="${item.slug}"><a class="experiment-main" href="${demoURL(item.slug)}" target="_blank" rel="noopener noreferrer" aria-label="${item.name}：打开在线实验（新标签页）"><figure><img src="./previews/${item.slug}.jpg" alt="${item.title}的实际页面截图" width="${item.width}" height="${item.height}" loading="lazy" decoding="async"></figure><div class="entry-copy"><div class="entry-meta"><span>${item.theme}</span><span>${item.name}</span></div><h2>${item.question}</h2><h3>${item.title}</h3><p class="try"><span>可以试什么</span>${item.tryThis}</p><span class="open-demo">打开实验</span></div></a><div class="entry-foot"><p><span>模型边界</span>${item.boundary}</p><a class="source-link" href="${sourceURL(item.slug)}" target="_blank" rel="noopener noreferrer" aria-label="${item.name}：查看源码（新标签页）">源码</a></div></article>`,
    )
    .join("");
  $("empty").hidden = result.length !== 0;
  $("experiments").hidden = result.length === 0;
  $("result-count").textContent =
    `${theme === "全部" ? "全部主题" : theme} · ${result.length} 个实验${search.value.trim() ? "符合搜索" : ""}`;
  $("empty-detail").textContent = search.value.trim()
    ? `没有找到与“${search.value.trim()}”匹配的${theme === "全部" ? "" : theme}实验。换个词，或回到全部主题。`
    : `这个主题下还没有实验。`;
  $("clear-search").hidden = !search.value;
  $("themes")
    .querySelectorAll<HTMLButtonElement>("button")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.theme === theme),
      ),
    );
}
for (const name of THEMES) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.theme = name;
  button.textContent = name;
  button.onclick = () => {
    theme = name;
    render();
  };
  $("themes").append(button);
}
search.addEventListener("input", render);
$("focus-search").onclick = () => search.focus();
$("clear-search").onclick = () => {
  search.value = "";
  render();
  search.focus();
};
$("reset").onclick = () => {
  theme = "全部";
  search.value = "";
  render();
  search.focus();
};
window.addEventListener("keydown", (event) => {
  const target = event.target as HTMLElement;
  if (target.closest("input,textarea,select,[contenteditable=true]")) return;
  if (
    (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey) ||
    ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")
  ) {
    event.preventDefault();
    search.focus();
  }
});
render();
