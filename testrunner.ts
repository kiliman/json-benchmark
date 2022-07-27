import { deserialize, serialize } from "remix-typedjson";
import superjson from "superjson";
const typedjson = { serialize, deserialize };

const data = {
  string: "string",
  number: 1,
  boolean: true,
  null: null,
  undefined: undefined,
  array: [1, 2, 3],
  object: {
    string: "string",
    bigint2: BigInt(2),
    date2: new Date("2020-01-01"),
  },
  date: new Date(),
  set: new Set([1, 2, 3]),
  map: new Map([
    ["a", 1],
    ["b", 2],
  ]),
  regexp: /regexp/,
  bigint: BigInt(1),
};

const { json, meta } = typedjson.serialize(data) ?? {};
console.log(JSON.stringify(JSON.parse(json!), null, 2));
console.log("--------");
console.log(JSON.stringify(meta, null, 2));
console.log("--------");
console.log(typedjson.deserialize({ json, meta }));

function test() {
  console.log("Serialize data");
  let time = Date.now();
  let iterations = 10_000;
  for (let i = 0; i < iterations; i++) {
    const result = typedjson.serialize(data);
  }
  let elapsed = Date.now() - time;
  console.log(
    `typedjson: ${elapsed}ms ${Math.floor(
      (iterations * 1000) / elapsed
    )} calls/s ${iterations} iterations`
  );

  time = Date.now();
  for (let i = 0; i < iterations; i++) {
    const result = superjson.serialize(data);
  }
  elapsed = Date.now() - time;
  console.log(
    `superjson: ${elapsed}ms ${Math.floor(
      (iterations * 1000) / elapsed
    )} calls/s ${iterations} iterations`
  );
}

function test2() {
  console.log("Deserialize data");
  let time = Date.now();
  let iterations = 10_000;
  let tresult = typedjson.serialize(data) ?? {};
  for (let i = 0; i < iterations; i++) {
    const result = typedjson.deserialize(tresult);
  }
  let elapsed = Date.now() - time;
  console.log(
    `typedjson: ${elapsed}ms ${Math.floor(
      (iterations * 1000) / elapsed
    )} calls/s ${iterations} iterations`
  );

  time = Date.now();
  const sresult = superjson.serialize(data);

  for (let i = 0; i < iterations; i++) {
    const result = superjson.deserialize(sresult);
  }
  elapsed = Date.now() - time;
  console.log(
    `superjson: ${elapsed}ms ${Math.floor(
      (iterations * 1000) / elapsed
    )} calls/s ${iterations} iterations`
  );
}
test();
test2();
