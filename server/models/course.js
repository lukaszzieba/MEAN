var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type: String, required: 'PATH is required'},
    featured: {type: Boolean, required: 'PATH is required'},
    published: {type: Date, required: 'PATH is required'},
    tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
    Course.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Course.create({title: 'C# for Sociopaths', featured: true, published: new Date(), tags: ['C#']});
            Course.create({title: 'JADE engine', featured: true, published: new Date(), tags: ['Jade']});
            Course.create({title: 'Mongo db for Beginers', featured: true, published: new Date(), tags: ['Mongo', 'Db', 'JavaScript']});
            Course.create({title: 'Express App', featured: true, published: new Date(), tags: ['JavaScript', 'Server']});
            Course.create({title: 'NodeJS', featured: true, published: new Date(), tags: ['JavaScript', 'Server']});
            Course.create({title: 'C++ for Sociopaths', featured: false, published: new Date(), tags: ['C++']});
            Course.create({title: 'Scala for Sociopaths', featured: false, published: new Date(), tags: ['Scala']});
            Course.create({title: 'JavaScript for Sociopaths', featured: false, published: new Date(), tags: ['JavaScript']});
            Course.create({title: 'Ember for Sociopaths', featured: false, published: new Date(), tags: ['Ember#', 'JavaScript']});
            Course.create({title: 'Understanding JS', featured: false, published: new Date(), tags: ['JavaScript']});
        }
    });
}

exports.createDefaultCourses = createDefaultCourses;
