export const getPassword = async (passwordName) => {
  const response = await fetch(`/api/passwords/${passwordName}`);
  //   if (!response.ok) {
  //     throw new Error(response);
  //   }
  const password = await response.text();
  return password;
};
