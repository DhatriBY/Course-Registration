const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.post('/login',  controller.getStudentById);
router.get("/home",controller.getStudentInfo);
router.get("/instructor/:instructor_id",controller.getInstructorpage);
router.get("/home/:course_id",controller.getDropcourse);
router.get("/register",controller.getRegdata);
router.get("/register/:searchTerm",controller.getSearchterm);
router.get("/register/:course_id/:section_id",controller.getCoursection);
router.get("/course/running",controller.getCourserunning);
router.get("/course/:course_id",controller.getCoursepage);

router.get("/courses/:dept",controller.getCoursedept);
router.get("/logout", controller.getLoggedout);


module.exports = router;