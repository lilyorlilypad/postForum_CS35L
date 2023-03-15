const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer
});

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A title must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A title must have less or equal then 40 characters'],

    },
    slug: String,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A post must have a summary']
    },
    description: {
      type: String,
      trim: true
    },
    idea: String,
    images: [fileSchema],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretPost: {
      type: Boolean,
      default: false
    },
    price: {
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

postSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
postSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// postSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// postSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
//postSchema.pre('find', function(next) {
postSchema.pre(/^find/, function(next) {
  this.find({ secretPost: { $ne: true } });

  this.stsart = Date.now();
  next();
});

postSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
postSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretPost: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Post = mongoose.model('Post', postSchema);


module.exports = Post;

