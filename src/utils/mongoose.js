module.exports = {
  multipleMongooseToObject: (mongooses) =>
    mongooses.map((item) => item.toObject()),

  mongooseToObject: (mongoose) => (mongoose ? mongoose.toObject() : mongoose),
};
