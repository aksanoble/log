function formatDate(date, options) {
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

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

  eleventyConfig.addCollection("feed", (collectionApi) =>
    collectionApi.getFilteredByTag("post").sort((a, b) => b.date - a.date)
  );

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
    pathPrefix: "/log/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
