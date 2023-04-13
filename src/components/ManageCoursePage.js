import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
import * as courseAPI from "../api/courseApi";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: "",
    category: "",
  });

  useEffect(() => {
    const slug = props.match.params.slug; // from the path `/courses/:slug`
    if (slug) {
      courseAPI.getCourseBySlug(slug).then((_course) => {
        setCourse(_course);
      });
    }
  }, [props.match.params.slug]);

  function handleChange(event) {
    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value,
    };
    setCourse(updatedCourse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseAPI.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved!");
    });
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required!";
    if (!course.authorId) _errors.authorId = "Author ID is required!";
    if (!course.category) _errors.category = "Category is required!";

    setErrors(_errors);
    // Form is valid if the errors object has no properties

    return Object.keys(_errors).length === 0;
  }

  return (
    <React.Fragment>
      <h2>Manage Courses</h2>
      <Prompt when={true} message="Are You sure you want to leave?"></Prompt>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      ></CourseForm>
    </React.Fragment>
  );
};

export default ManageCoursePage;
