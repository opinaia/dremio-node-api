import { schema } from './schema';
export declare type ClusterConfiguration = {
    host: string;
    port?: number;
    ssl?: boolean;
};
export declare namespace raw {
    const LOGIN = "apiv2/login";
    const FIRST_USER = "apiv2/bootstrap/firstuser";
    const USER = "apiv2/user";
    const USERS = "apiv2/users";
    const SQL = "api/v3/sql";
    const JOB = "api/v3/job";
    const CATALOG = "api/v3/catalog";
    const SOURCE = "api/v3/source";
    type Schema<T extends [string, string, string | null, string | null]> = T extends ['post', typeof LOGIN, null, null] ? schema.Login : T extends ['put', typeof FIRST_USER, null, null] ? undefined : T extends ['put', typeof USER, string, string] ? undefined : T extends ['get', typeof USER, string, null] ? schema.User : T extends ['get', typeof USERS, 'all', null] ? schema.Users : T extends ['get', typeof USERS, 'search', null] ? schema.Users : T extends ['post', typeof SQL, null, null] ? schema.Sql : T extends ['get', typeof JOB, string, null] ? schema.JobStatus : T extends ['get', typeof CATALOG, null, null] ? schema.catalog.CatalogEntitiesSummary : T extends ['get', typeof CATALOG, string, null] ? schema.catalog.CatalogEntity : T extends ['post', typeof CATALOG, null, null] ? undefined : T extends ['get', typeof SOURCE, null, null] ? schema.source.Sources : T extends ['get', typeof SOURCE, string, null] ? schema.source.Source : T extends ['post', typeof SOURCE, null, null] ? undefined : never;
    type Body<T extends [string, string, string | null, string | null]> = T extends ['post', typeof LOGIN, null, null] ? schema.LoginBodyArgs : T extends ['put', typeof FIRST_USER, null, null] ? string : T extends ['put', typeof USER, string, null] ? string : T extends ['post', typeof SQL, null, null] ? schema.SqlBodyArgs : T extends ['post', typeof CATALOG, null, null] ? schema.catalog.CatalogEntity : T extends ['post', typeof SOURCE, null, null] ? schema.source.Source : null;
    type UrlArgs<T extends [string, string, string | null, string | null]> = T extends ['get', typeof USERS, 'search', null] ? schema.FilteredUsersUrlArgs : T extends ['get', typeof JOB, string, 'results'] ? schema.JobResultsUrlArgs : null;
    function makeRequest<method extends 'get' | 'put' | 'post' | 'delete', prefix extends string, id extends string | null, suffix extends string | null>(config: ClusterConfiguration, method: method, token: string | null, prefix: prefix, id: id, suffix: suffix, urlArgs: UrlArgs<[method, prefix, id, suffix]>, body: Body<[method, prefix, id, suffix]>, encoding?: any): Promise<Schema<[method, prefix, id, suffix]>>;
}
