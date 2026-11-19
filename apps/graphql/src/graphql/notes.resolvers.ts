import type { Resolvers } from "../generated/graphql";

import { createNote } from "../modules/note/createNote/createNote";
import { listNotes } from "../modules/note/listNotes/listNotes";

export const resolvers: Resolvers = {
  Note: {
    id: (parent) => parent.id,
    title: (parent) => parent.title,
    body: (parent) => parent.body,
    createdAt: (parent) => parent.createdAt,
  },
  Query: {
    notes: (_parent, _args, context) => {
      return listNotes(context.notes);
    },
  },
  Mutation: {
    createNote: (_parent, args, context) => {
      return createNote(context.notes, args.input);
    },
  },
};
