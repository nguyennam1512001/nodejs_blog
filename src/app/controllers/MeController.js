const Course = require('../models/Course')
const {mutipleMongooseToObject} = require('../../util/mongoose')
class MeController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        let courseQuery = Course.find({})
        
        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column] : req.query.type
            })
        }
        Promise.all([courseQuery, Course.countDocumentsDeleted(), Course.countDocuments()])
            .then(([courses, deletedCount, notDelete])=>{
                const result = deletedCount - notDelete;
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                    result
                })
            })
            .catch(next)
        
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => {
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses)
                });
                // console.log(courses);
            })
            .catch(next);
    }


    
}

module.exports = new MeController();
