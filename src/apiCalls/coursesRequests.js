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

export const editCourseRequest = (course) => {
  return async () => {
    axios
      .patch(`http://localhost:3001/api/courses/${course._id}`, course, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => alert("Курс успішно оновлено"))
      .catch((err) => alert(err));
  };
};

export const getAllCoursesRequest = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/courses");
    return response.data;
  } catch (error) {
    alert(error);
    throw error;
  }
};
