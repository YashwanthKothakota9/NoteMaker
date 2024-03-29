import { InferSchemaType, model, Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

type Note = InferSchemaType<typeof noteSchema>;
//To create types from the schema, we use the InferSchemaType type from the mongoose package. This type will create a type that matches the schema we created.

export default model<Note>('Note', noteSchema);
