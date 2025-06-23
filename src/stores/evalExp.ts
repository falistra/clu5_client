import { useSessioneStore } from './sessione';
import jsep from 'jsep';
import { Test } from './Test';

jsep.addBinaryOp('gt', 10);
jsep.addBinaryOp('lt', 11);
jsep.addBinaryOp('ge', 12);
jsep.addBinaryOp('le', 13);
jsep.addBinaryOp('eq', 14);

jsep.addBinaryOp(',', 16); // 'OR'

jsep.addBinaryOp('|', 17); // 'OR'
jsep.addBinaryOp('^', 18); // 'AND'
jsep.addUnaryOp('~'); //, 19); // 'NOT'

const binops: { [operator: string]: (op1: number, op2: number) => number } = {
  '+': function (a: number, b: number) {
    return a + b;
  },
  '-': function (a: number, b: number) {
    return a - b;
  },
  '*': function (a: number, b: number) {
    return a * b;
  },
  '/': function (a: number, b: number) {
    return a / b;
  },
  '%': function (a: number, b: number) {
    return a % b;
  },
  gt: function (a: number, b: number) {
    return a > b ? 1 : 0;
  },
  lt: function (a: number, b: number) {
    return a < b ? 1 : 0;
  },
  ge: function (a: number, b: number) {
    return a >= b ? 1 : 0;
  },
  le: function (a: number, b: number) {
    return a <= b ? 1 : 0;
  },
  eq: function (a: number, b: number) {
    return a == b ? 1 : 0;
  },
  ',': function (a: number, b: number) {
    return a || b ? 1 : 0;
  },
  '^': function (a: number, b: number) {
    return a && b ? 1 : 0;
  },
  '|': function (a: number, b: number) {
    return a || b ? 1 : 0;
  },
};

const unops: { [operator: string]: (op1: number) => number } = {
  '-': function (a: number) {
    return -a;
  },
  '+': function (a: number) {
    return a;
  },
  '~': function (a: number) {
    return !a ? 1 : 0;
  },
};

const sessioneStore = useSessioneStore();

export const do_eval = function (
  node: jsep.Expression,
  test: InstanceType<typeof Test>
): number {
  //  console.log(node);
  if (node.type === 'BinaryExpression') {
    if (node.left && node.right) {
      const op1 = do_eval(node.left as jsep.Expression, test);
      const op2 = do_eval(node.right as jsep.Expression, test);
      const result = binops[node.operator as string](op1, op2) as number;
      test.STORIA.push(
        `${test.ServerTime().format('HH:mm:SS')} ${op1} ${
          node.operator
        } ${op2} = ${result}`
      );
      return result;
    }
  } else if (node.type === 'UnaryExpression') {
    return unops[node.operator as string](
      do_eval(node.argument as jsep.Expression, test)
    );
  } else if (node.type === 'Literal') {
    return node.value as jsep.baseTypes as number;
  } else if (node.type === 'Identifier') {
    const result = sessioneStore.punteggiStazioni[node.name as string] || 0;
    test.STORIA.push(
      `${test.ServerTime().format('HH:mm:SS')} ${node.name} = ${result}`
    );
    return result;
  }
  test.STORIA.push(
    `${test.ServerTime().format('HH:mm:SS')} nodo ignoto: ${node.type} = ${
      node.value
    }`
  );
  throw new Error('Valutazione caso se=... fallita');
};
