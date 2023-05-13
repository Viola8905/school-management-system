import React from 'react';
import { useParams } from "react-router-dom";

const SingleCoursePage = () => {
	 const courseId = useParams().id;
	   const courses = [
       {
         id: "1",
         title: "Course 1",
         category: "All Courses",
         description: "This is the first course.",
        
       },
       {
         id: "2",
         title: "Course 2",
         category: "Programming",
         description: "This is a programming course.",
        
       },
       {
         id: "3",
         title: "Course 3",
         category: "Marketing",
         description: "This is a marketing course.",
        
       },
     ];
	 const course = courses.find((item) => item.id === courseId);

	return (
		<div>
			{course.id}
		</div>
	);
};

export default SingleCoursePage;