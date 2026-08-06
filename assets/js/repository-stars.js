(() => {
  const cachePrefix = "repository-stars:";
  const cacheLifetime = 30 * 60 * 1000;
  const formatter = new Intl.NumberFormat("en-US");

  function updateCount(element, count) {
    const countElement = element.querySelector(".repo-star-count");
    if (countElement && Number.isFinite(count)) {
      countElement.textContent = formatter.format(count);
      element.setAttribute("aria-label", `${formatter.format(count)} GitHub stars`);
    }
  }

  document.querySelectorAll("[data-repository-stars]").forEach(async (element) => {
    const repository = element.dataset.repositoryStars;
    const cacheKey = `${cachePrefix}${repository}`;

    try {
      const cached = JSON.parse(sessionStorage.getItem(cacheKey));
      if (cached && Date.now() - cached.savedAt < cacheLifetime) {
        updateCount(element, cached.count);
        return;
      }
    } catch (_error) {
      // Keep the build-time fallback value when storage is unavailable.
    }

    try {
      const path = repository
        .split("/")
        .map((part) => encodeURIComponent(part))
        .join("/");
      const response = await fetch(`https://api.github.com/repos/${path}`, {
        headers: { Accept: "application/vnd.github+json" },
      });

      if (!response.ok) return;

      const data = await response.json();
      const count = Number(data.stargazers_count);
      if (!Number.isFinite(count)) return;

      updateCount(element, count);

      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ count, savedAt: Date.now() }));
      } catch (_error) {
        // The visible count is already updated; caching is optional.
      }
    } catch (_error) {
      // Network failures should never hide the build-time fallback value.
    }
  });
})();
