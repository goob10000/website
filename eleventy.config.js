export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("xkcd.css");

  // Add a transform to inject xkcd.css into the HTML output
  eleventyConfig.addTransform("inject-xkcd-css", function(content, outputPath) {
    if(outputPath && outputPath.endsWith(".html")) {
      return content.replace(
        /<head>([\s\S]*?)<\/head>/i,
        function(match, headContent) {
          return `<head>${headContent}\n<link rel=\"stylesheet\" href=\"/xkcd.css\">\n<\/head>`;
        }
      );
    }
    return content;
  });
};