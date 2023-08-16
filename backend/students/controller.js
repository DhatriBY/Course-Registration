const client = require('../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');
var session;
// console.log(client);

const getStudents = async (req,res) => {
    client.query(queries.getStudents, (error,results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
    
};

const getStudentById = async (req,res) => {
    // console.log(req);
    console.log("hi");
    console.log(req.body);

    const id = req.body.userid;
    session=req.session;
    const passw = req.body.password;
    console.log(id);
    console.log(passw);
    client.query('select year,semester from reg_dates where start_time < now() order by start_time desc limit 1',(errorss,response)=>{
    client.query(queries.getStudentById, [id], (error,results) => {     
        console.log(results.rows[0].id);
        console.log(results.rows[0]['hashed_password'])
        if(error) {
            console.log(error);
        }
        else{
            console.log(results.rows.length);
            if(results.rows.length==1){
                client.query(queries.getStudentInfo, [id], (errs,ress) => {
                  console.log(ress.rows[0]);
                  if(ress.rows.length>=1){
                        console.log("in bcrpt");
                        console.log(passw,results.rows[0]['hashed_password']);
                        bcrypt.compare(passw,results.rows[0]['hashed_password'],function(err,result){
                        if(err) {res.send("error");}
                        else{
                            if(result){
                              session.userid = id;
                              // session.year
                              console.log(response.rows[0]);
                              session.year=response.rows[0].year;
                              session.semester=response.rows[0].semester;
                              session.isuser = true;
                              session.isinstr = false;
                              console.log(session.year,session.semester,session.isuser);
                              console.log(session.userid);
                              res.send(["successful"]);
                            // }
                            // else{
                            //     res.send(["Notsuccessful"]);
                            }
                        }
                        })
                  }
                  else{
                    console.log("in checking instructor");
                    console.log(passw,results.rows[0]['hashed_password']);
                    bcrypt.compare(passw,results.rows[0]['hashed_password'],function(err,result){
                    if(err) {res.send("error");}
                    else{
                        if(result){
                          session.userid = id;
                          // session.year
                          console.log(response.rows[0]);
                          session.year=response.rows[0].year;
                          session.semester=response.rows[0].semester;
                          session.isuser = false;
                          session.isinstr = true;
                          console.log(session.year,session.semester,session.isuser);
                          console.log(session.userid);
                          res.send(["successful"]);
                        }
                        else{
                            res.send(["Notsuccessful"]);
                        }
                    }
                    })
                  }

                
                })
            }

            else res.send(["Notsuccessful"]);
        }
        // res.status(200).json(results.rows);
    });
});
};

const getStudentInfo = async (req,res) => {
    // console.log(session);
    console.log("in home");
    console.log(session);

    if(session == undefined){
      res.send(["cantaccess"]);
      return;
    }
    if(!session.isuser && !session.isinstr){
      res.send(["cantaccess"]);
      return;
    }
    if(session.isinstr){
      console.log("insstructor in home pate");
      res.send(["instructor",session.userid]);
      return;
    }
    console.log("in studetn info");
    console.log(session);
    // if(!session.isuser){
    //   res.send(["cantaccess"]);
    // }
    const id=session.userid;
    const year = session.year;
    const semester = session.semester;
    const d = {'Spring': 1,'Summer':2,'Fall':3,'Winter':4};
    const query1 = new Promise((resolve, reject) => { client.query(queries.getStudentinfobyid, [id], (error,result1) => {resolve(result1);});});
    const query2 = new Promise((resolve, reject) => { client.query(queries.getPastcourses, [id,year,d[session.semester]], (error,result2) => {resolve(result2);});});
    const query3 = new Promise((resolve, reject) => { client.query(queries.getCurrentcourses, [id], (error,result3) => {resolve(result3);});});
    
    Promise.all([query1, query2,query3])
        .then(results => {
          const [result1,result2,result3] = results;
          const final = {userexist:true, info:result1.rows[0], prevsem:result2.rows, cursem:result3.rows};
        //   console.log(final);
          res.status(200).json(final);
        })
        .catch(error => {
            console.log(error.message);
        });
};
const getInstructorpage = async (req,res) => {
    const id = req.params.instructor_id;
    // console.log(id);
    // console.log("reached instructor page");
    if(session == undefined){
      res.send("cantaccess");
      return;
    }
    if(!session.isuser && !session.isinstr){
      res.send("cantaccess");
      return;
    }
    
    // if(!session.isuser){
    //   return res.send("cantaccess");
    // }
    const year = session.year;
    const semester = session.semester;
    const d = {'Spring': 1,'Summer':2,'Fall':3,'Winter':4};
    const query1 = new Promise((resolve, reject) => { client.query(queries.getInsinfo, [id], (error,result1) => {resolve(result1);});});
    const query2 = new Promise((resolve, reject) => { client.query(queries.getPrecoursebyins, [id,year,d[semester]], (error,result2) => {resolve(result2);});});
    const query3 = new Promise((resolve, reject) => { client.query(queries.getCurcoursebyins, [id], (error,result3) => { resolve(result3);});});
    Promise.all([query1, query2,query3])
        .then(results => {
          const [result1,result2,result3] = results;
          const final = {info:result1.rows[0], prevsem:result2.rows, cursem:result3.rows};
        //   console.log(final);
          res.status(200).json(final);
        })
        .catch(error => {
            console.log(error.message);
        });
};

const getDropcourse = async (req,res) => {

  if(session == undefined){
    res.send(["cantaccess"]);
    return;
  }
  if(!session.isuser && !session.isinstr){
    res.send(["cantaccess"]);
    return;
  }
  if(session.isinstr){
    console.log("insstructor in home pate");
    res.send(["instructor",session.userid]);
    return;
  }
    const course_id = String(req.params.course_id);
    // console.log(course_id);
    // const id = '98988';
    const id=session.userid;
    // console.log('reched backend');
    client.query(queries.getDropcourse, [id,course_id], (error,results) => {
        // console.log(results.rowCount);
        // console.log("delteing");
        // console.log(results);
        // res.status(200).json(results.rows);s
    });

    console.log("came out");
    const query1 = new Promise((resolve, reject) => { client.query(queries.getStudentById, [id], (error,result1) => {resolve(result1);});});
    const query2 = new Promise((resolve, reject) => { client.query(queries.getPastcourses, [id], (error,result2) => {resolve(result2);});});
    const query3 = new Promise((resolve, reject) => { client.query(queries.getCurrentcourses, [id], (error,result3) => { resolve(result3);});});
    Promise.all([query1, query2,query3])
        .then(results => {
          const [result1,result2,result3] = results;
          const final = {info:result1.rows[0], prevsem:result2.rows, cursem:result3.rows};
          res.status(200).json(final);
        })
        .catch(error => {
            console.log(error.message);
        });
}

const getRegdata = async (req,res) => {
    const dict ={}
    const dict_all={}
    console.log("came to regdata function");

    // console.log(session.userexist);
    if(session == undefined){
      res.send(["cantaccess"]);
      return;
    }

    if(!session.isuser && !session.isinstr){
      res.send(["cantaccess"]);
      return;
    }
    if(session.isinstr){
      console.log("insstructor in home pate");
      res.send(["instructor",session.userid]);
      return;
    }
    // console.log(session.isuser);
    client.query(queries.getRegdata ,(err,resp)=>{
      if(err){
        console.log(err);
      }
      else{ 
     console.log("query completeed");
    //   console.log(resp.rows);
      resp.rows.forEach(({semester,year,course_id,title,dept_name,credits,sec_id,building,room_number,time_slot_id})=>
      course_id in dict? dict[course_id].push(sec_id):dict[course_id]=[sec_id])
    //   console.log(dict);
      dict_all['section']=dict
      const mappy = resp.rows.map(({course_id,title,dept_name})=>({course_id,title,dept_name}))
    //   console.log(mappy)
      let distinctArray = Array.from(new Set(mappy.map(JSON.stringify)), JSON.parse);
    //   console.log(distinctArray)
        dict_all['course']=distinctArray
        // console.log(dict_all);
      res.send(dict_all);}
    })


}

const getSearchterm = async(req,res) => {

    console.log("came to search term");
    if(session == undefined){
      res.send(["cantaccess"]);
      return;
    }

    if(!session.isuser && !session.isinstr){
      res.send(["cantaccess"]);
      return;
    }
    if(session.isinstr){
      console.log("insstructor in home pate");
      res.send(["instructor",session.userid]);
      return;
    }
    console.log(req.params.searchTerm);
  const query = req.params.searchTerm;
  let data =[]
  const dict ={}
  const dict_all={}
  // console.log(req.query.q);
  if(!query || query===undefined){
    console.log("no query");
    const result = await client.query('select * from course natural join section natural join (select year,semester from reg_dates where start_time < now() order by start_time desc limit 1) as A');
    data = result.rows;
  }
  else{
    console.log("got the query");
    console.log(query);
    console.log("query completed");
    const result = await client.query('select * from course natural join section natural join (select year,semester from reg_dates where start_time < now() order by start_time desc limit 1) as A where (course_id ilike $1 or title ilike $1)',['%'+query+'%']);
    data=result.rows;
  }
  data.forEach(({semester,year,course_id,title,dept_name,credits,sec_id,building,room_number,time_slot_id})=>
    course_id in dict? dict[course_id].push(sec_id):dict[course_id]=[sec_id])
    // console.log(dict);
    dict_all['section']=dict
    const mappy = data.map(({course_id,title,dept_name})=>({course_id,title,dept_name}))
    // console.log(mappy)
    let distinctArray = Array.from(new Set(mappy.map(JSON.stringify)), JSON.parse);
    // console.log(distinctArray)
      dict_all['course']=distinctArray
    console.log("done");
    // console.log(dict_all);
    res.send(dict_all);


}

const getCoursection = async(req,response) => {
    console.log("getcoursection");

    const course_id=req.params.course_id;
    const section_id=req.params.section_id;
    const id_user = session.userid;
    const d = {'Spring': 1,'Summer':2,'Fall':3,'Winter':4};
    console.log(session,course_id,section_id)
    // console.log(course)
    client.query('select * from takes where course_id=$1 and id=$2 and semester=$3 and year=$4 and sec_id=$5',[course_id,id_user,session.semester,session.year,section_id],(errrrr,respppp)=>{
      console.log(respppp.rows)
      if(respppp.rows.length>0){ response.send("already registered")}
      else{
    client.query("select prereq_id from prereq where course_id=$4 except (select course_id from takes where ((year<$1) or (year=$1 and (case when  semester='Spring' then 1 when semester = 'Summer' then 2 when semester ='Fall' then 3 when semester='Winter' then 4 else 5 end)<$2)) and id=$3 and grade<>'F' and (grade is not null))" ,
    [session.year,d[session.semester],id_user,course_id],(err,res)=>{
      if(err) console.log(err);
      else
      console.log(res.rows)
      if(res.rows.length>0) response.send("Pre_req not satisfied");
      else{
        console.log(section_id,course_id,session.year,session.semester,id_user)
        client.query('select time_slot_id from section where sec_id=$1 and course_id=$2 and year=$3 and semester=$4 except select time_slot_id from takes natural join section where id=$5 and year=$3 and semester=$4',
        [section_id,course_id,session.year,session.semester,id_user],(error,resp)=>{
          console.log(resp.rows)
          if(resp.rows.length==0) response.send("Slot clash");
          else{
            client.query('insert into takes(id,course_id,sec_id,semester,year) values($1,$2,$3,$4,$5) returning *',
            [id_user,course_id,section_id,session.semester,session.year],(errr,ress)=>{
              console.log(ress)
              if(!errr){ 
                // client.query('select credits from course where course_id=$1',[course_id],(errr,respp)=>{
                   response.send("successful");
                  // })
                
              }
            })
          }
        })
      }
    })
  }
})
}

const getCoursepage = async(req,response) => {
  if(session == undefined){
    response.send("cantaccess");
    return;
  }

  if(!session.isuser && !session.isinstr){
    response.send("cantaccess");
    return;
  }
    const query = req.params.course_id;

    data={}
    client.query('select year,semester from reg_dates where start_time < now() order by start_time desc limit 1',(err,res)=>{
      // console.log(res);
    client.query('select distinct course_id,title,credits from course where course_id ilike $1',[query],(err1,res1)=>{
      if (err1) throw err1;
      // console.log(res1.rows);
      data['courses']=res1.rows;
      client.query('(select distinct prereq.prereq_id,course.title from prereq,course where prereq.course_id ilike $1 and prereq.prereq_id=course.course_id) ',[query],(err2,res2)=>{
        if(err2) throw err2;
        // console.log(res2.rows);
        // console.log(res.rows[0].year);
        data['prereq']=res2.rows;
        client.query('select distinct id,name from instructor natural join teaches where course_id ilike $1 and semester = $2 and year = $3',[query,res.rows[0].semester,res.rows[0].year],(err3,res3)=>{
          if(err3) throw err3;
          // console.log(res3.rows);
          data['instructor']=res3.rows;
          console.log(data);
          response.send(data);
  
        })
        
        // client.end();
  
      })
    })
  });
}

const getCourserunning = async(req,response) => {
  if(session == undefined){
    response.send("cantaccess");
    return;
  }

  if(!session.isuser && !session.isinstr){
    response.send("cantaccess");
    return;
  }
    client.query('select distinct dept_name from course natural join section natural join (select year,semester from reg_dates where start_time < now() order by start_time desc limit 1) as A',(err,res)=>{
        if(err) console.log(err);
    
        console.log(res.rows);
        response.send(res.rows);
      });
}
 
const getCoursedept = async(req,response) => {
  if(session == undefined){
    response.send("cantaccess");
    return;
  }

  if(!session.isuser && !session.isinstr){
    response.send("cantaccess");
    return;
  }
    const query = req.params.dept;
    // if(!session.userexist) console.log("you cannot view")
    console.log(query);
    client.query('select distinct course_id,title from course natural join section natural join (select year,semester from reg_dates where start_time < now() order by start_time desc limit 1) as A where dept_name ilike $1',[query],(err,res)=>{
      if(err) console.log(err);
  
      console.log(res.rows);
      response.send(res.rows);
    });

}

const getLoggedout = async(req,res) =>{
  console.log(session);
  session.isuser = false;
  session.isinstr = false;
  console.log(session);
  // session.destroy((err) => {
  //   if (err) {
  //     res.status(500).send({ error: 'Failed to log out' });
  //   } else {
  //     res.send({ message: 'Successfully logged out' });
  //   }
  // });
  res.send(["successful"]);
}


module.exports = {
    getStudents,
    getStudentById,
    getStudentInfo,
    getInstructorpage,
    getDropcourse,
    getRegdata,
    getSearchterm,
    getCoursection,
    getCoursepage,
    getCourserunning,
    getCoursedept,
    getLoggedout,

};