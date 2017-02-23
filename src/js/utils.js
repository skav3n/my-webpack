export function foo() {
  console.log('foo called');
  return false;
}

export function bar() {
  const pi = 3.14;
  const print = `print es6 ${pi}`;
  console.log('print', print);
  return print;
}
