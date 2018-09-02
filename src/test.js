// @flow
const Immutable = require('immutable');

const isList = Immutable.List.isList
function merger(a: any, b: any) {
  if (a && a.mergeWith && !isList(a) && !isList(b)) {
    return a.mergeWith(merger, b)
  }
  return b
}

const aList = Immutable.Map({});
const bList = Immutable.fromJS({
  '1': {
    id: 1,
    name: 'y',
    age: 99,
    tests: [ 10 ]
  }
});
const cList = Immutable.fromJS({
  '1': {
    id: 1,
    name: 'c',
    tests: [ 99 ]
  }
});
// Flow does not reduce the type when using isMap.
// I need to cast afterwards.
/*
if(bList instanceof Immutable.Map) {
  const merged = aList.mergeDeep(bList);
  console.log(merged);
  console.log(JSON.stringify(merged));
}
*/
const tmp: any = bList; // type cast
const merged = aList.mergeWith(merger, tmp);
console.log(merged);

const tmp2: any = cList; // type cast
const merged2 = merged.mergeWith(merger, tmp2);
console.log(merged2);
