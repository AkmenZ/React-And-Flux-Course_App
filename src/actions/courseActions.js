import dispatcher from "../AppDispatcher";
import * as courseAPI from "../api/courseApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
  return courseAPI.saveCourse(course).then((savedCourse) => {
    // Hey dispatcher, tell all the stores that a course was just created!
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse,
    });
  });
}

export function loadCourses() {
  return courseAPI.getCourses().then((courses) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses,
    });
  });
}

export function deleteCourse(id) {
  return courseAPI.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id
    });
  });
}
