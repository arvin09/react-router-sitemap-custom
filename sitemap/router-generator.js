import {writeFileSync, promises as fsPromises} from 'fs';

async function createReactRouter(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');

    const paths = contents.match(/path=(["'])(?:(?=(\\?))\2.)*?\1/g);

    const router =`
      import React from "react";
      import { Switch, Route } from "react-router";

      export default (
        <Switch>
      ${paths.map((path) => {
        return `<Route ${path} />`
      }).join('')}
      </Switch>
      )
    ` 
    writeFileSync('./sitemap/router.js', router);
    
    console.log("Routes generated successfully");

  } catch (err) {
    console.log(err);
  }
}

createReactRouter('./src/Routes.tsx');

