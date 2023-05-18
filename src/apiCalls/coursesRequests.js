import axios from "axios";

export const createCourseRequest = (course) => {
  return async () => {
    axios
      .post("http://localhost:3001/api/courses", course, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => alert("Курс успішно створено"))
      .catch((err) => alert(err));
  };
};
