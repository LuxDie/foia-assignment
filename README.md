# FOIA listing example
This example, which I made for a job proposal, showcases my skill in Angular and
Angular Material. It retrieves data from an API (in this case, the USA Freedom
of Information Act api) and displays it in list and detail views using Material
components.

To be able to pull data from the API you will need to request an API key from
[foia.gov](https://www.foia.gov), and add a json file at the app level, named "**apikey.json**", containing
the following information:
```js
/* apikey.json */
{
  "apiKey": "..." // replace with your API key
}
```
