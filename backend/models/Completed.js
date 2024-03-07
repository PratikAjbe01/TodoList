import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
      type: String,
      maxlength: 25,
    },
    content: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true
    }
  }, { timestamps: true });
  todoSchema.virtual('date').get(function() {
    return this.time.toISOString().split('T')[0];
});
  
  export const CompleteTodo = mongoose.model('CompleteTodo', todoSchema, 'donrtodos');
  