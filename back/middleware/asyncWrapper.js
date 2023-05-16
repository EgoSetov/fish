// * промежуточная функция, которая позволяет отловить ошибки, при работе с бд и тд
const asyncWrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export { asyncWrapper };
