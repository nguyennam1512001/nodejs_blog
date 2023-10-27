const Course = require('../models/Course')
const {mongooseToObject} = require('../../util/mongoose')
class CourseController {

    // [POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCPdLCyGt3rhzGZKsnYbpU5reDNxQ`;
        const course = new Course(formData);
        
        course.save()
            .then(() => res.redirect('/'))
            .catch(next)
    }
    
    // [GET] /courses/:slug 
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then((course)=>{
                res.render('courses/show', { course: mongooseToObject(course) })
            })
            .catch(next)
    }

    // [GET] /courses/create
    create(req, res, next){
        res.render('courses/create')
    }


    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
        .then(()=> res.redirect('/me/stored/courses'))
        .catch(next)
    }

    // [delete] /courses/:id      Xoá mềm
    delete(req, res, next){
        Course.delete({_id: req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
    }

     // [patch] /courses/:id/restore
    restore(req, res, next){
        Course.restore({_id: req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
    }

    // [post] /courses/handle-form-actions
    handleFormActions(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                .then(()=> res.redirect('back'))
                .catch(next)
                break;
            case 'restore':
                Course.restore({_id: {$in: req.body.courseIds}})
                .then(()=> res.redirect('back'))
                .catch(next)
                break;
            default:
                res.json({message: 'Action is invalid'})
        }
    }
}

module.exports = new CourseController();
