function formatDate(date, options) {
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function toDate(value) {
  if (!value) return null;
  return value instanceof Date ? value : new Date(value);
}

function toIsoString(value) {
  const date = toDate(value);
  if (!date || Number.isNaN(date.getTime())) return "";
  return date.toISOString();
}

function toRfc822String(value) {
  const date = toDate(value);
  if (!date || Number.isNaN(date.getTime())) return "";
  return date.toUTCString();
}

function absoluteUrl(path, base) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (!base) return path;
  return new URL(path, base).toString();
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");

  eleventyConfig.addFilter("dateShort", (date) =>
    formatDate(date, { month: "short", day: "numeric" })
  );
  eleventyConfig.addFilter("dateLong", (date) =>
    formatDate(date, { year: "numeric", month: "long", day: "numeric" })
  );
  eleventyConfig.addFilter("excerpt", (content, length = 140) => {
    if (!content) return "";
    const text = content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length <= length) return text;
    return `${text.slice(0, length).replace(/\s+\S*$/, "")}...`;
  });

  eleventyConfig.addFilter("truncate", (value, length = 120) => {
    if (!value) return "";
    const text = String(value).replace(/\s+/g, " ").trim();
    if (text.length <= length) return text;
    return `${text.slice(0, length).replace(/\s+\S*$/, "")}...`;
  });

  eleventyConfig.addFilter("absoluteUrl", (path, base) =>
    absoluteUrl(path, base)
  );
  eleventyConfig.addFilter("dateIso", (value) => toIsoString(value));
  eleventyConfig.addFilter("dateRfc822", (value) => toRfc822String(value));
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  eleventyConfig.addCollection("feed", (collectionApi) =>
    collectionApi.getFilteredByTag("post").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("sitemap", (collectionApi) => {
    return collectionApi.getAll().filter((item) => {
      if (!item.url) return false;
      if (item.data && item.data.sitemap === false) return false;
      if (item.data && item.data.eleventyExcludeFromCollections) return false;
      if (item.url === "/sitemap.xml") return false;
      if (item.url === "/robots.txt") return false;
      if (item.url === "/feed.xml") return false;
      return true;
    });
  });

  eleventyConfig.addCollection("archive", (collectionApi) => {
    const posts = collectionApi
      .getFilteredByTag("post")
      .sort((a, b) => b.date - a.date);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const byYear = new Map();

    for (const post of posts) {
      const year = post.date.getFullYear();
      const monthIndex = post.date.getMonth();
      const monthName = months[monthIndex];

      if (!byYear.has(year)) {
        byYear.set(year, new Map());
      }

      const yearMap = byYear.get(year);
      if (!yearMap.has(monthName)) {
        yearMap.set(monthName, []);
      }

      yearMap.get(monthName).push(post);
    }

    return Array.from(byYear.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([year, monthsMap]) => {
        const monthsList = Array.from(monthsMap.entries())
          .sort((a, b) => months.indexOf(b[0]) - months.indexOf(a[0]))
          .map(([name, items]) => ({
            name,
            posts: items.sort((a, b) => b.date - a.date),
          }));

        return { year, months: monthsList };
      });
  });

  return {
    dir: {
      input: "src",
      output: "docs",
    },
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
