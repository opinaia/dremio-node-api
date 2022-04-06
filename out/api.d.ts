import { ClusterConfiguration } from './raw';
import { schema } from './schema';
export declare type User = {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
};
export declare type ExistingUser = User & {
    createdAt: Date;
    modifiedAt: Date;
};
export declare type API = {
    token: string;
    user: {
        createUser(user: User, password: string): Promise<undefined>;
        getUsers(filter?: string): Promise<ExistingUser[]>;
        getUser(userName: string): Promise<ExistingUser>;
    };
    catalog: {
        getAllTopLevelContainers(): Promise<schema.catalog.CatalogEntitySummary[]>;
        getEntity(id: string): Promise<schema.catalog.CatalogEntity>;
        createEntity(catalog: schema.catalog.CatalogEntity): Promise<undefined>;
    };
    reflection: {};
    job: {
        getStatus(jobId: string): Promise<schema.JobStatus>;
        getResults(jobId: string, offset?: number, limit?: number): Promise<schema.JobResults>;
    };
    source: {
        getSources(): Promise<schema.source.Source[]>;
        getSource(id: string): Promise<schema.source.Source>;
        createSource(source: schema.source.Source): Promise<undefined>;
    };
    sql: {
        runQuery(sql: string): Promise<string>;
        runQueryAndGetResults(sql: string, pollTime?: number, offset?: number, limit?: number, _timeout?: number): Promise<schema.JobResults>;
    };
};
export declare function createFirstUser(config: ClusterConfiguration, user: User, password: string): Promise<undefined>;
export declare function getDatasetsFromSQL(sql: string): string[][];
export declare function createAPI(config: ClusterConfiguration, login: schema.LoginBodyArgs): Promise<API>;
