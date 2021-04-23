import { Document, Model, model, Types, Schema, Query } from 'mongoose';

export interface IBook extends Document {
  isbn: string;
  title: string;
  author: string;
  dateAdded: Date;
  // favorite / interested functions
}

// TODO where to put validators and formatters
// ISBN must be 10 or 13 digits after stripping any non-digit characters (stricly allow only hyphen and digits)
// formatter to display with hyphens
// formatter to prepend 987 to 10-digit isbn
// ^ good to know the answers, could also use for title normalization,
// and rather have some default isbn library if possible

// node-isbn resolves isbn from third party servers https://www.npmjs.com/package/node-isbn
// isbn3 An ISBN JavaScript Library providing parse, hyphenate etc. https://www.npmjs.com/package/isbn3

const BookSchema : Schema = new Schema({
    isbn: {
      type: String,
      required: true,
      unique: true,
      index: true // you should create your indexes using the MongoDB shell rather than relying on mongoose to do it for you
      // https://stackoverflow.com/questions/22602598/how-to-make-a-variable-a-unique-key-in-mongoose
    },
    title: {
      type: String
    },
    author: {
      type: String
    },
    dateAdded: {
      type: Date,
      default: Date.now,
      reuqired: true
    }
});

export const Book = model<IBook>('Book', BookSchema);
