import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Bank = {
  __typename?: 'Bank';
  createdAt: Scalars['DateTime'];
  history?: Maybe<Array<Maybe<History>>>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  interest_rate: Scalars['Float'];
  loan_term: Scalars['Int'];
  max_loan: Scalars['Int'];
  min_down_pay: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type BankHistoryArgs = {
  user: Scalars['String'];
};

export type History = {
  __typename?: 'History';
  bank?: Maybe<Bank>;
  createdAt: Scalars['DateTime'];
  down_pay: Scalars['Int'];
  id: Scalars['ID'];
  init_loan: Scalars['Int'];
  month_pay: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBank?: Maybe<Scalars['Boolean']>;
  addHistory?: Maybe<Scalars['Boolean']>;
  changeBank?: Maybe<Scalars['Boolean']>;
  deleteBank?: Maybe<Scalars['Boolean']>;
  deleteHistories?: Maybe<Scalars['Boolean']>;
};


export type MutationAddBankArgs = {
  image?: Maybe<Scalars['Upload']>;
  interest_rate: Scalars['Float'];
  loan_term: Scalars['Int'];
  max_loan: Scalars['Int'];
  min_down_pay: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationAddHistoryArgs = {
  bankId: Scalars['ID'];
  down_pay: Scalars['Int'];
  init_loan: Scalars['Int'];
  month_pay: Scalars['Float'];
  user: Scalars['String'];
};


export type MutationChangeBankArgs = {
  id: Scalars['ID'];
  image?: Maybe<Scalars['Upload']>;
  interest_rate?: Maybe<Scalars['Float']>;
  loan_term?: Maybe<Scalars['Int']>;
  max_loan?: Maybe<Scalars['Int']>;
  min_down_pay?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};


export type MutationDeleteBankArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteHistoriesArgs = {
  user: Scalars['String'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  bank?: Maybe<Bank>;
  banks?: Maybe<Array<Maybe<Bank>>>;
  countBanks?: Maybe<Scalars['Int']>;
};


export type RootQueryTypeBankArgs = {
  id: Scalars['ID'];
};


export type RootQueryTypeBanksArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type AddBankMutationVariables = Exact<{
  name: Scalars['String'];
  interestRate: Scalars['Float'];
  maxLoan: Scalars['Int'];
  minDownPay: Scalars['Int'];
  loanTerm: Scalars['Int'];
  image?: Maybe<Scalars['Upload']>;
}>;


export type AddBankMutation = { __typename?: 'Mutation', addBank?: Maybe<boolean> };

export type AddHistoryMutationVariables = Exact<{
  user: Scalars['String'];
  initLoan: Scalars['Int'];
  downPay: Scalars['Int'];
  monthPay: Scalars['Float'];
  id: Scalars['ID'];
}>;


export type AddHistoryMutation = { __typename?: 'Mutation', addHistory?: Maybe<boolean> };

export type ChangeBankMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['Upload']>;
  interestRate?: Maybe<Scalars['Float']>;
  maxLoan?: Maybe<Scalars['Int']>;
  minDownPay?: Maybe<Scalars['Int']>;
  loanTerm?: Maybe<Scalars['Int']>;
}>;


export type ChangeBankMutation = { __typename?: 'Mutation', changeBank?: Maybe<boolean> };

export type DeleteBankMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteBankMutation = { __typename?: 'Mutation', deleteBank?: Maybe<boolean> };

export type DeleteHistoriesMutationVariables = Exact<{
  user: Scalars['String'];
}>;


export type DeleteHistoriesMutation = { __typename?: 'Mutation', deleteHistories?: Maybe<boolean> };

export type AllBanksQueryVariables = Exact<{
  banksSkip?: Maybe<Scalars['Int']>;
  banksTake?: Maybe<Scalars['Int']>;
}>;


export type AllBanksQuery = { __typename?: 'RootQueryType', banks?: Maybe<Array<Maybe<{ __typename?: 'Bank', id: string, name: string, image?: Maybe<string>, interest_rate: number, max_loan: number, min_down_pay: number, loan_term: number }>>> };

export type BankQueryVariables = Exact<{
  id: Scalars['ID'];
  user: Scalars['String'];
}>;


export type BankQuery = { __typename?: 'RootQueryType', bank?: Maybe<{ __typename?: 'Bank', id: string, name: string, image?: Maybe<string>, interest_rate: number, max_loan: number, min_down_pay: number, loan_term: number, history?: Maybe<Array<Maybe<{ __typename?: 'History', id: string, createdAt: any, user: string, init_loan: number, down_pay: number, month_pay: number }>>> }> };

export type CountBanksQueryVariables = Exact<{ [key: string]: never; }>;


export type CountBanksQuery = { __typename?: 'RootQueryType', countBanks?: Maybe<number> };

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Bank: ResolverTypeWrapper<Bank>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  History: ResolverTypeWrapper<History>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  RootQueryType: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Bank: Bank;
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  History: History;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  RootQueryType: {};
  String: Scalars['String'];
  Upload: Scalars['Upload'];
}>;

export type BankResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bank'] = ResolversParentTypes['Bank']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  history?: Resolver<Maybe<Array<Maybe<ResolversTypes['History']>>>, ParentType, ContextType, RequireFields<BankHistoryArgs, 'user'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  interest_rate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  loan_term?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  max_loan?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  min_down_pay?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type HistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['History'] = ResolversParentTypes['History']> = ResolversObject<{
  bank?: Resolver<Maybe<ResolversTypes['Bank']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  down_pay?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  init_loan?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  month_pay?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addBank?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddBankArgs, 'interest_rate' | 'loan_term' | 'max_loan' | 'min_down_pay' | 'name'>>;
  addHistory?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddHistoryArgs, 'bankId' | 'down_pay' | 'init_loan' | 'month_pay' | 'user'>>;
  changeBank?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangeBankArgs, 'id'>>;
  deleteBank?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteBankArgs, 'id'>>;
  deleteHistories?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteHistoriesArgs, 'user'>>;
}>;

export type RootQueryTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootQueryType'] = ResolversParentTypes['RootQueryType']> = ResolversObject<{
  bank?: Resolver<Maybe<ResolversTypes['Bank']>, ParentType, ContextType, RequireFields<RootQueryTypeBankArgs, 'id'>>;
  banks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Bank']>>>, ParentType, ContextType, RequireFields<RootQueryTypeBanksArgs, never>>;
  countBanks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Bank?: BankResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  History?: HistoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  RootQueryType?: RootQueryTypeResolvers<ContextType>;
  Upload?: GraphQLScalarType;
}>;



export const AddBankDocument = gql`
    mutation AddBank($name: String!, $interestRate: Float!, $maxLoan: Int!, $minDownPay: Int!, $loanTerm: Int!, $image: Upload) {
  addBank(
    name: $name
    interest_rate: $interestRate
    max_loan: $maxLoan
    min_down_pay: $minDownPay
    loan_term: $loanTerm
    image: $image
  )
}
    `;
export type AddBankMutationFn = Apollo.MutationFunction<AddBankMutation, AddBankMutationVariables>;

/**
 * __useAddBankMutation__
 *
 * To run a mutation, you first call `useAddBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBankMutation, { data, loading, error }] = useAddBankMutation({
 *   variables: {
 *      name: // value for 'name'
 *      interestRate: // value for 'interestRate'
 *      maxLoan: // value for 'maxLoan'
 *      minDownPay: // value for 'minDownPay'
 *      loanTerm: // value for 'loanTerm'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useAddBankMutation(baseOptions?: Apollo.MutationHookOptions<AddBankMutation, AddBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBankMutation, AddBankMutationVariables>(AddBankDocument, options);
      }
export type AddBankMutationHookResult = ReturnType<typeof useAddBankMutation>;
export type AddBankMutationResult = Apollo.MutationResult<AddBankMutation>;
export type AddBankMutationOptions = Apollo.BaseMutationOptions<AddBankMutation, AddBankMutationVariables>;
export const AddHistoryDocument = gql`
    mutation AddHistory($user: String!, $initLoan: Int!, $downPay: Int!, $monthPay: Float!, $id: ID!) {
  addHistory(
    user: $user
    init_loan: $initLoan
    down_pay: $downPay
    month_pay: $monthPay
    bankId: $id
  )
}
    `;
export type AddHistoryMutationFn = Apollo.MutationFunction<AddHistoryMutation, AddHistoryMutationVariables>;

/**
 * __useAddHistoryMutation__
 *
 * To run a mutation, you first call `useAddHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHistoryMutation, { data, loading, error }] = useAddHistoryMutation({
 *   variables: {
 *      user: // value for 'user'
 *      initLoan: // value for 'initLoan'
 *      downPay: // value for 'downPay'
 *      monthPay: // value for 'monthPay'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddHistoryMutation(baseOptions?: Apollo.MutationHookOptions<AddHistoryMutation, AddHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddHistoryMutation, AddHistoryMutationVariables>(AddHistoryDocument, options);
      }
export type AddHistoryMutationHookResult = ReturnType<typeof useAddHistoryMutation>;
export type AddHistoryMutationResult = Apollo.MutationResult<AddHistoryMutation>;
export type AddHistoryMutationOptions = Apollo.BaseMutationOptions<AddHistoryMutation, AddHistoryMutationVariables>;
export const ChangeBankDocument = gql`
    mutation ChangeBank($id: ID!, $name: String, $image: Upload, $interestRate: Float, $maxLoan: Int, $minDownPay: Int, $loanTerm: Int) {
  changeBank(
    id: $id
    name: $name
    image: $image
    interest_rate: $interestRate
    max_loan: $maxLoan
    min_down_pay: $minDownPay
    loan_term: $loanTerm
  )
}
    `;
export type ChangeBankMutationFn = Apollo.MutationFunction<ChangeBankMutation, ChangeBankMutationVariables>;

/**
 * __useChangeBankMutation__
 *
 * To run a mutation, you first call `useChangeBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeBankMutation, { data, loading, error }] = useChangeBankMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      image: // value for 'image'
 *      interestRate: // value for 'interestRate'
 *      maxLoan: // value for 'maxLoan'
 *      minDownPay: // value for 'minDownPay'
 *      loanTerm: // value for 'loanTerm'
 *   },
 * });
 */
export function useChangeBankMutation(baseOptions?: Apollo.MutationHookOptions<ChangeBankMutation, ChangeBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeBankMutation, ChangeBankMutationVariables>(ChangeBankDocument, options);
      }
export type ChangeBankMutationHookResult = ReturnType<typeof useChangeBankMutation>;
export type ChangeBankMutationResult = Apollo.MutationResult<ChangeBankMutation>;
export type ChangeBankMutationOptions = Apollo.BaseMutationOptions<ChangeBankMutation, ChangeBankMutationVariables>;
export const DeleteBankDocument = gql`
    mutation DeleteBank($id: ID!) {
  deleteBank(id: $id)
}
    `;
export type DeleteBankMutationFn = Apollo.MutationFunction<DeleteBankMutation, DeleteBankMutationVariables>;

/**
 * __useDeleteBankMutation__
 *
 * To run a mutation, you first call `useDeleteBankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBankMutation, { data, loading, error }] = useDeleteBankMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBankMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBankMutation, DeleteBankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBankMutation, DeleteBankMutationVariables>(DeleteBankDocument, options);
      }
export type DeleteBankMutationHookResult = ReturnType<typeof useDeleteBankMutation>;
export type DeleteBankMutationResult = Apollo.MutationResult<DeleteBankMutation>;
export type DeleteBankMutationOptions = Apollo.BaseMutationOptions<DeleteBankMutation, DeleteBankMutationVariables>;
export const DeleteHistoriesDocument = gql`
    mutation DeleteHistories($user: String!) {
  deleteHistories(user: $user)
}
    `;
export type DeleteHistoriesMutationFn = Apollo.MutationFunction<DeleteHistoriesMutation, DeleteHistoriesMutationVariables>;

/**
 * __useDeleteHistoriesMutation__
 *
 * To run a mutation, you first call `useDeleteHistoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHistoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHistoriesMutation, { data, loading, error }] = useDeleteHistoriesMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useDeleteHistoriesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHistoriesMutation, DeleteHistoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHistoriesMutation, DeleteHistoriesMutationVariables>(DeleteHistoriesDocument, options);
      }
export type DeleteHistoriesMutationHookResult = ReturnType<typeof useDeleteHistoriesMutation>;
export type DeleteHistoriesMutationResult = Apollo.MutationResult<DeleteHistoriesMutation>;
export type DeleteHistoriesMutationOptions = Apollo.BaseMutationOptions<DeleteHistoriesMutation, DeleteHistoriesMutationVariables>;
export const AllBanksDocument = gql`
    query AllBanks($banksSkip: Int, $banksTake: Int) {
  banks(skip: $banksSkip, take: $banksTake) {
    id
    name
    image
    interest_rate
    max_loan
    min_down_pay
    loan_term
  }
}
    `;

/**
 * __useAllBanksQuery__
 *
 * To run a query within a React component, call `useAllBanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBanksQuery({
 *   variables: {
 *      banksSkip: // value for 'banksSkip'
 *      banksTake: // value for 'banksTake'
 *   },
 * });
 */
export function useAllBanksQuery(baseOptions?: Apollo.QueryHookOptions<AllBanksQuery, AllBanksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBanksQuery, AllBanksQueryVariables>(AllBanksDocument, options);
      }
export function useAllBanksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBanksQuery, AllBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBanksQuery, AllBanksQueryVariables>(AllBanksDocument, options);
        }
export type AllBanksQueryHookResult = ReturnType<typeof useAllBanksQuery>;
export type AllBanksLazyQueryHookResult = ReturnType<typeof useAllBanksLazyQuery>;
export type AllBanksQueryResult = Apollo.QueryResult<AllBanksQuery, AllBanksQueryVariables>;
export const BankDocument = gql`
    query Bank($id: ID!, $user: String!) {
  bank(id: $id) {
    id
    name
    image
    interest_rate
    max_loan
    min_down_pay
    loan_term
    history(user: $user) {
      id
      createdAt
      user
      init_loan
      down_pay
      month_pay
    }
  }
}
    `;

/**
 * __useBankQuery__
 *
 * To run a query within a React component, call `useBankQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankQuery({
 *   variables: {
 *      id: // value for 'id'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useBankQuery(baseOptions: Apollo.QueryHookOptions<BankQuery, BankQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BankQuery, BankQueryVariables>(BankDocument, options);
      }
export function useBankLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BankQuery, BankQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BankQuery, BankQueryVariables>(BankDocument, options);
        }
export type BankQueryHookResult = ReturnType<typeof useBankQuery>;
export type BankLazyQueryHookResult = ReturnType<typeof useBankLazyQuery>;
export type BankQueryResult = Apollo.QueryResult<BankQuery, BankQueryVariables>;
export const CountBanksDocument = gql`
    query CountBanks {
  countBanks
}
    `;

/**
 * __useCountBanksQuery__
 *
 * To run a query within a React component, call `useCountBanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountBanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountBanksQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountBanksQuery(baseOptions?: Apollo.QueryHookOptions<CountBanksQuery, CountBanksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountBanksQuery, CountBanksQueryVariables>(CountBanksDocument, options);
      }
export function useCountBanksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountBanksQuery, CountBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountBanksQuery, CountBanksQueryVariables>(CountBanksDocument, options);
        }
export type CountBanksQueryHookResult = ReturnType<typeof useCountBanksQuery>;
export type CountBanksLazyQueryHookResult = ReturnType<typeof useCountBanksLazyQuery>;
export type CountBanksQueryResult = Apollo.QueryResult<CountBanksQuery, CountBanksQueryVariables>;