import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '../fetcher/customFetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ICreateNoteInput = {
  body: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type IMutation = {
  __typename?: 'Mutation';
  createNote: INote;
};


export type IMutationCreateNoteArgs = {
  input: ICreateNoteInput;
};

export type INote = {
  __typename?: 'Note';
  body: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type IQuery = {
  __typename?: 'Query';
  notes: Array<INote>;
};

export type ICreateNoteMutationVariables = Exact<{
  input: ICreateNoteInput;
}>;


export type ICreateNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'Note', id: string, title: string, body: string, createdAt: string } };

export type IListNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type IListNotesQuery = { __typename?: 'Query', notes: Array<{ __typename?: 'Note', id: string, title: string, body: string, createdAt: string }> };



export const CreateNoteDocument = `
    mutation CreateNote($input: CreateNoteInput!) {
  createNote(input: $input) {
    id
    title
    body
    createdAt
  }
}
    `;

export const useCreateNoteMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<ICreateNoteMutation, TError, ICreateNoteMutationVariables, TContext>) => {
    
    return useMutation<ICreateNoteMutation, TError, ICreateNoteMutationVariables, TContext>(
      {
    mutationKey: ['CreateNote'],
    mutationFn: (variables?: ICreateNoteMutationVariables) => customFetcher<ICreateNoteMutation, ICreateNoteMutationVariables>(CreateNoteDocument, variables)(),
    ...options
  }
    )};


useCreateNoteMutation.fetcher = (variables: ICreateNoteMutationVariables, options?: RequestInit['headers']) => customFetcher<ICreateNoteMutation, ICreateNoteMutationVariables>(CreateNoteDocument, variables, options);

export const ListNotesDocument = `
    query ListNotes {
  notes {
    id
    title
    body
    createdAt
  }
}
    `;

export const useListNotesQuery = <
      TData = IListNotesQuery,
      TError = Error
    >(
      variables?: IListNotesQueryVariables,
      options?: Omit<UseQueryOptions<IListNotesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<IListNotesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<IListNotesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ListNotes'] : ['ListNotes', variables],
    queryFn: customFetcher<IListNotesQuery, IListNotesQueryVariables>(ListNotesDocument, variables),
    ...options
  }
    )};

useListNotesQuery.document = ListNotesDocument;

useListNotesQuery.getKey = (variables?: IListNotesQueryVariables) => variables === undefined ? ['ListNotes'] : ['ListNotes', variables];


useListNotesQuery.fetcher = (variables?: IListNotesQueryVariables, options?: RequestInit['headers']) => customFetcher<IListNotesQuery, IListNotesQueryVariables>(ListNotesDocument, variables, options);
