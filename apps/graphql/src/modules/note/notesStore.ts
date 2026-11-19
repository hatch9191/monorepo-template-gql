export type NoteRecord = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
};

export type NotesStore = {
  findMany(): Promise<NoteRecord[]>;
  create(input: { title: string; body: string }): Promise<NoteRecord>;
};
