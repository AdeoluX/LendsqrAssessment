/**
 * Define Various Queries for the specific Table Name.
 */
const userDTO = (data) => {
  const { name, email, phone, status } = data;
  const user = {
    name,
    email,
    phone,
    status,
  };
  return user;
};

module.exports = {
  userDTO,
};
