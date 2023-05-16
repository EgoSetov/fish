import bcrypt from "bcrypt";

// * генирирует 10 значный пароль
const generatePassword = async (password) => {
  let saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// * проверяет соотвествие паролей
const comparePasswords = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

export { generatePassword, comparePasswords };
