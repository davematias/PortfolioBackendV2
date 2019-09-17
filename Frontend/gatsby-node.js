/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 //ignore window errors on wowjs - https://www.gatsbyjs.org/docs/debugging-html-builds/
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /wowjs/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  }