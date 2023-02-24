const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A post must have a title'],
      unique: true,
      trim: true,
      maxlength: [40, 'A post title must have less or equal then 40 characters'],
      // validate: [validator.isAlpha, 'post name must only contain characters']
    },
    slug: String,
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
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
  this.slug = slugify(this.name, { lower: true });
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
// postSchema.pre('find', function(next) {
postSchema.pre(/^find/, function(next) {
  this.find({ secretpost: { $ne: true } });

  this.start = Date.now();
  next();
});

postSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
postSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretpost: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const post = mongoose.model('post', postSchema);

module.exports = post;
