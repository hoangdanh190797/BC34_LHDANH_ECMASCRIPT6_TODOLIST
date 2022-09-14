const ServiceAPI = {
  getTodo: () => {
    return axios.get("https://6255692652d8738c69217244.mockapi.io/api/Todo");
  },
  postTodo: (Tdo) => {
    return axios.post(
      "https://6255692652d8738c69217244.mockapi.io/api/Todo",
      Tdo
    );
  },
  deleteTodo: (id) => {
    return axios.delete(
      `https://6255692652d8738c69217244.mockapi.io/api/Todo/${id}`
    );
  },
  updateTodo: (tdo) => {
    return axios({
      url: `https://6255692652d8738c69217244.mockapi.io/api/Todo/${tdo.id}`,
      method: "PUT",
      data: tdo,
    });
  },
};
export default ServiceAPI;
