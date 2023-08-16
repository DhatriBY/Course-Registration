const getStudents = "select * from student";
const getStudentById = "select * from user_password where id = $1";
const getStudentInfo = "select * from student where id = $1";
const getPastcourses = "select * from takes where id=$1 and ((year<$2) or (year=$2 and (case when semester='Spring' then 1 when semester = 'Summer' then 2 when semester ='Fall' then 3 when semester='Winter' then 4 else 5 end)<$3)) order by year desc,case when  semester='Spring' then 1 when semester = 'Summer' then 2 when semester ='Fall' then 3 when semester='Winter' then 4 else 5 end desc ";
const getCurrentcourses = "select * from takes where id=$1 and (year,semester) in (select year,semester from reg_dates where start_time < now() order by start_time desc limit 1)";
const getCurcoursebyins = "select * from teaches natural join course where id=$1 and (year,semester) in (select year,semester from reg_dates where start_time <now() order by start_time desc limit 1) order by course_id asc";
const getPrecoursebyins ="select * from teaches natural join course where id=$1 and ((year<$2) or (year=$2 and (case when semester='Spring' then 1 when semester = 'Summer' then 2 when semester ='Fall' then 3 when semester='Winter' then 4 else 5 end)<$3)) order by year desc,case when  semester='Spring' then 1 when semester = 'Summer' then 2 when semester ='Fall' then 3 when semester='Winter' then 4 else 5 end desc ";
const getInsinfo = "select * from instructor where id=$1";
const getDropcourse = "delete from takes where id=$1 and course_id=$2 and (year,semester) in (select year,semester from reg_dates where start_time < now() order by start_time desc limit 1)";
const getStudentinfobyid = "select * from student where id = $1";
const getRegdata ="select * from course natural join section natural join (select year,semester from reg_dates where start_time < now() order by start_time desc limit 1) as A";

module.exports = {
    getStudents,
    getStudentById,
    getStudentInfo,
    getPastcourses,
    getCurrentcourses,
    getCurcoursebyins,
    getPrecoursebyins,
    getInsinfo,
    getDropcourse,
    getStudentinfobyid,
    getRegdata,
}