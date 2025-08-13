const tester = {
  name: 'Жангир',
  city: 'Almaty',
  age: 21,
};

console.log(tester.name);
tester.age = 24;

for (const key in tester) {
  console.log(key, tester[key]);
}
