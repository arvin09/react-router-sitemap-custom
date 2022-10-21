# react-router-sitemap-custom
react-router-sitemap npm module does not support react-router-dom, so this is a custom solution.

## Solution
1. Read the router file using extract all the paths from the router file
2. Generate the router file with react-router
3. Pass the generated file to react-router-sitemap
4. use the `npm run sitemap`
