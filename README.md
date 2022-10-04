# json-benchmark

This is a simple benchmark comparing [`remix-typedjson`](https://github.com/kiliman/remix-typedjson) with [`superson`](https://github.com/blitz-js/superjson).

NOTE: Although faster, `remix-typedjson` is nowhere near as flexible as `superjson`. It only supports a subset of types with no extensibility. If you need the advanced features of `superjson`, then I definitely recommend it.

The primary motivation was to provide the smallest (and secondarily fastest) JSON serializer that supported _most_ non-JSON types to use in my Remix apps. Although Remix recently added type-inference for the `json` => `useLoaderData` path, the resulting type was converted to the _serialized_ type, i.e. `Date` was converted to `string`. This more accurately represented what was happening under the covers. Your data object was being stringified to JSON and then parsed back into your _data_, without the necessary type conversions to make it full-fidelity.

Since `superjson` supported so many use cases and was much more flexible, it also resulted in a much bigger bundle. A typical minified production bundle weighed in at 9KB. For huge apps or ones that are mainly client-side JS, the bundle size is relatively small compared to the rest of the app.

With Remix, most JavaScript is run on the server, so less JavaScript makes it to the client. So every extra KB adds up. The minified version of `remix-typejson` is only around 2.5KB.

Anyway, this was not meant to be a comprehensive benchmark. I was mostly interested in relative performance. I was surprised when it was a lot faster. I originally thought I was doing something wrong, but the resulting data did match the original data. I think the main reason it is faster is that in order for `superjson` to support all of its features, it had to walk the object structure manually. Whereas I used the native `JSON.stringify(replacer)` function. That's just a guess, but I think it is a reasonable assumption.

To run this benchmark, simply

```bash
npm install
npm start
```

The _tj.min.js_ and _tj.esm.min.js_ files are just the minified versions using esbuild. This is just for gauging relative file sizes.

```bash
esbuild --format=esm --minify
```
