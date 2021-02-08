import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type UserPayloadType = {
  __typename?: 'UserPayloadType';
  id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type LoginType = {
  __typename?: 'LoginType';
  user: UserPayloadType;
  token: Scalars['String'];
};

export type WhoAmIType = {
  __typename?: 'WhoAmIType';
  id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  friendIds?: Maybe<Array<Scalars['String']>>;
  friendRequests?: Maybe<Array<Scalars['String']>>;
  friendRequestSubmissions?: Maybe<Array<Scalars['String']>>;
  firstname?: Maybe<Scalars['String']>;
  team?: Maybe<Scalars['String']>;
  food?: Maybe<Scalars['String']>;
  race?: Maybe<Scalars['String']>;
  family?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  twitter?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
};

export type PublicUserType = {
  __typename?: 'PublicUserType';
  id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  team?: Maybe<Scalars['String']>;
  food?: Maybe<Scalars['String']>;
  race?: Maybe<Scalars['String']>;
  family?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  twitter?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
};

export type RegisterType = {
  __typename?: 'RegisterType';
  email: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  refreshToken: Scalars['String'];
  whoAmI: WhoAmIType;
  searchUser: Array<PublicUserType>;
  users: Array<PublicUserType>;
};


export type QuerySearchUserArgs = {
  search: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginType;
  register: RegisterType;
  inviteUser: RegisterType;
  updateProfile: WhoAmIType;
  addFriend: WhoAmIType;
  acceptFriend: WhoAmIType;
  removeFriend: WhoAmIType;
};


export type MutationLoginArgs = {
  payload: LoginInput;
};


export type MutationRegisterArgs = {
  payload: RegisterInput;
};


export type MutationInviteUserArgs = {
  payload: RegisterInput;
};


export type MutationUpdateProfileArgs = {
  profile: ProfileInput;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationAcceptFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationRemoveFriendArgs = {
  friendId: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  age: Scalars['Float'];
  firstname: Scalars['String'];
};

export type ProfileInput = {
  firstname?: Maybe<Scalars['String']>;
  team?: Maybe<Scalars['String']>;
  food?: Maybe<Scalars['String']>;
  race?: Maybe<Scalars['String']>;
  family?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  twitter?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
};

export const WhoAmIFieldsFragmentDoc = gql`
    fragment whoAmIFields on WhoAmIType {
  id
  username
  email
  facebook
  family
  twitter
  team
  age
  food
  race
  firstname
  friendIds
  friendRequestSubmissions
  friendRequests
}
    `;
export const LoginDocument = gql`
    mutation login($payload: LoginInput!) {
  login(payload: $payload) {
    user {
      id
      username
      email
    }
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateProfileDocument = gql`
    mutation updateProfile($profile: ProfileInput!) {
  updateProfile(profile: $profile) {
    ...whoAmIFields
  }
}
    ${WhoAmIFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateProfileGQL extends Apollo.Mutation<UpdateProfileMutation, UpdateProfileMutationVariables> {
    document = UpdateProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterDocument = gql`
    mutation register($payload: RegisterInput!) {
  register(payload: $payload) {
    username
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterGQL extends Apollo.Mutation<RegisterMutation, RegisterMutationVariables> {
    document = RegisterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const WhoAmIDocument = gql`
    query whoAmI {
  whoAmI {
    ...whoAmIFields
  }
}
    ${WhoAmIFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class WhoAmIGQL extends Apollo.Query<WhoAmIQuery, WhoAmIQueryVariables> {
    document = WhoAmIDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UsersDocument = gql`
    query users {
  users {
    id
    username
    email
    facebook
    family
    twitter
    firstname
    team
    age
    food
    race
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    document = UsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SearchUserDocument = gql`
    query searchUser($search: String!) {
  searchUser(search: $search) {
    username
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchUserGQL extends Apollo.Query<SearchUserQuery, SearchUserQueryVariables> {
    document = SearchUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const InviteUserDocument = gql`
    mutation inviteUser($payload: RegisterInput!) {
  inviteUser(payload: $payload) {
    username
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class InviteUserGQL extends Apollo.Mutation<InviteUserMutation, InviteUserMutationVariables> {
    document = InviteUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddFriendDocument = gql`
    mutation addFriend($friendId: String!) {
  addFriend(friendId: $friendId) {
    ...whoAmIFields
  }
}
    ${WhoAmIFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AddFriendGQL extends Apollo.Mutation<AddFriendMutation, AddFriendMutationVariables> {
    document = AddFriendDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AcceptFriendDocument = gql`
    mutation acceptFriend($friendId: String!) {
  acceptFriend(friendId: $friendId) {
    ...whoAmIFields
  }
}
    ${WhoAmIFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AcceptFriendGQL extends Apollo.Mutation<AcceptFriendMutation, AcceptFriendMutationVariables> {
    document = AcceptFriendDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveFriendDocument = gql`
    mutation removeFriend($friendId: String!) {
  removeFriend(friendId: $friendId) {
    ...whoAmIFields
  }
}
    ${WhoAmIFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveFriendGQL extends Apollo.Mutation<RemoveFriendMutation, RemoveFriendMutationVariables> {
    document = RemoveFriendDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
export type ResolversTypes = {
  UserPayloadType: ResolverTypeWrapper<UserPayloadType>;
  String: ResolverTypeWrapper<Scalars['String']>;
  LoginType: ResolverTypeWrapper<LoginType>;
  WhoAmIType: ResolverTypeWrapper<WhoAmIType>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  PublicUserType: ResolverTypeWrapper<PublicUserType>;
  RegisterType: ResolverTypeWrapper<RegisterType>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  LoginInput: LoginInput;
  RegisterInput: RegisterInput;
  ProfileInput: ProfileInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  UserPayloadType: UserPayloadType;
  String: Scalars['String'];
  LoginType: LoginType;
  WhoAmIType: WhoAmIType;
  Float: Scalars['Float'];
  PublicUserType: PublicUserType;
  RegisterType: RegisterType;
  Query: {};
  Mutation: {};
  LoginInput: LoginInput;
  RegisterInput: RegisterInput;
  ProfileInput: ProfileInput;
  Boolean: Scalars['Boolean'];
};

export type NgModuleDirectiveArgs = {   module: Scalars['String']; };

export type NgModuleDirectiveResolver<Result, Parent, ContextType = any, Args = NgModuleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type NamedClientDirectiveArgs = {   name: Scalars['String']; };

export type NamedClientDirectiveResolver<Result, Parent, ContextType = any, Args = NamedClientDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UserPayloadTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPayloadType'] = ResolversParentTypes['UserPayloadType']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginType'] = ResolversParentTypes['LoginType']> = {
  user?: Resolver<ResolversTypes['UserPayloadType'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WhoAmITypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WhoAmIType'] = ResolversParentTypes['WhoAmIType']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friendIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  friendRequests?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  friendRequestSubmissions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  food?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  race?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  family?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  age?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicUserTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicUserType'] = ResolversParentTypes['PublicUserType']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  food?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  race?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  family?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  age?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterType'] = ResolversParentTypes['RegisterType']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  whoAmI?: Resolver<ResolversTypes['WhoAmIType'], ParentType, ContextType>;
  searchUser?: Resolver<Array<ResolversTypes['PublicUserType']>, ParentType, ContextType, RequireFields<QuerySearchUserArgs, 'search'>>;
  users?: Resolver<Array<ResolversTypes['PublicUserType']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['LoginType'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'payload'>>;
  register?: Resolver<ResolversTypes['RegisterType'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'payload'>>;
  inviteUser?: Resolver<ResolversTypes['RegisterType'], ParentType, ContextType, RequireFields<MutationInviteUserArgs, 'payload'>>;
  updateProfile?: Resolver<ResolversTypes['WhoAmIType'], ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'profile'>>;
  addFriend?: Resolver<ResolversTypes['WhoAmIType'], ParentType, ContextType, RequireFields<MutationAddFriendArgs, 'friendId'>>;
  acceptFriend?: Resolver<ResolversTypes['WhoAmIType'], ParentType, ContextType, RequireFields<MutationAcceptFriendArgs, 'friendId'>>;
  removeFriend?: Resolver<ResolversTypes['WhoAmIType'], ParentType, ContextType, RequireFields<MutationRemoveFriendArgs, 'friendId'>>;
};

export type Resolvers<ContextType = any> = {
  UserPayloadType?: UserPayloadTypeResolvers<ContextType>;
  LoginType?: LoginTypeResolvers<ContextType>;
  WhoAmIType?: WhoAmITypeResolvers<ContextType>;
  PublicUserType?: PublicUserTypeResolvers<ContextType>;
  RegisterType?: RegisterTypeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  NgModule?: NgModuleDirectiveResolver<any, any, ContextType>;
  namedClient?: NamedClientDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
export type LoginMutationVariables = Exact<{
  payload: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginType' }
    & Pick<LoginType, 'token'>
    & { user: (
      { __typename?: 'UserPayloadType' }
      & Pick<UserPayloadType, 'id' | 'username' | 'email'>
    ) }
  ) }
);

export type UpdateProfileMutationVariables = Exact<{
  profile: ProfileInput;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile: (
    { __typename?: 'WhoAmIType' }
    & WhoAmIFieldsFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  payload: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterType' }
    & Pick<RegisterType, 'username' | 'email'>
  ) }
);

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = (
  { __typename?: 'Query' }
  & { whoAmI: (
    { __typename?: 'WhoAmIType' }
    & WhoAmIFieldsFragment
  ) }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'PublicUserType' }
    & Pick<PublicUserType, 'id' | 'username' | 'email' | 'facebook' | 'family' | 'twitter' | 'firstname' | 'team' | 'age' | 'food' | 'race'>
  )> }
);

export type SearchUserQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchUserQuery = (
  { __typename?: 'Query' }
  & { searchUser: Array<(
    { __typename?: 'PublicUserType' }
    & Pick<PublicUserType, 'username' | 'email'>
  )> }
);

export type InviteUserMutationVariables = Exact<{
  payload: RegisterInput;
}>;


export type InviteUserMutation = (
  { __typename?: 'Mutation' }
  & { inviteUser: (
    { __typename?: 'RegisterType' }
    & Pick<RegisterType, 'username' | 'email'>
  ) }
);

export type AddFriendMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;


export type AddFriendMutation = (
  { __typename?: 'Mutation' }
  & { addFriend: (
    { __typename?: 'WhoAmIType' }
    & WhoAmIFieldsFragment
  ) }
);

export type AcceptFriendMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;


export type AcceptFriendMutation = (
  { __typename?: 'Mutation' }
  & { acceptFriend: (
    { __typename?: 'WhoAmIType' }
    & WhoAmIFieldsFragment
  ) }
);

export type RemoveFriendMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;


export type RemoveFriendMutation = (
  { __typename?: 'Mutation' }
  & { removeFriend: (
    { __typename?: 'WhoAmIType' }
    & WhoAmIFieldsFragment
  ) }
);

export type WhoAmIFieldsFragment = (
  { __typename?: 'WhoAmIType' }
  & Pick<WhoAmIType, 'id' | 'username' | 'email' | 'facebook' | 'family' | 'twitter' | 'team' | 'age' | 'food' | 'race' | 'firstname' | 'friendIds' | 'friendRequestSubmissions' | 'friendRequests'>
);
