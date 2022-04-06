export declare namespace schema {
    type LoginBodyArgs = {
        userName: string;
        password: string;
    };
    type Login = {
        token: string;
    };
    type User = {
        resourcePath: string;
        userName: string;
        userConfig: {
            uid: {
                id: string;
            };
            userName: string;
            firstName: string;
            lastName: string;
            email: string;
            createdAt: number;
            modifiedAt: number;
            version: number;
        };
        name: string;
        id: string;
        links: {
            [name: string]: string;
        };
    };
    type FilteredUsersUrlArgs = {
        filter: string;
    };
    type Users = {
        users: User[];
    };
    type SqlBodyArgs = {
        sql: string;
        context?: string;
    };
    type Sql = {
        id: string;
    };
    type FieldSchema = {
        name: string;
        type: {
            name: 'STRUCT' | 'LIST' | 'UNION' | 'INTEGER' | 'BIGINT' | 'FLOAT' | 'DOUBLE' | 'VARCHAR' | 'VARBINARY' | 'BOOLEAN' | 'DECIMAL' | 'TIME' | 'DATE' | 'TIMESTAMP' | 'INTERVAL DAY TO SECOND' | 'INTERVAL YEAR TO MONTH';
            subSchema?: FieldSchema[];
            precision?: number;
            scale?: number;
        };
    };
    namespace datasetFormat {
        type DatasetFormat = Text | JSON | Parquet | Excel | XLS | Avro;
        type Text = {
            type: 'Text';
            fieldDelimiter: string;
            lineDelimiter: string;
            quote: string;
            comment: string;
            escape: string;
            skipFirstLine: boolean;
            extractHeader: boolean;
            trimHeader: boolean;
            autoGenerateColumnNames: boolean;
        };
        type JSON = {
            type: 'JSON';
        };
        type Parquet = {
            type: 'Parquet';
        };
        type Excel = {
            type: 'Excel';
            sheetName: string;
            extractHeader: boolean;
            hasMergedCells: boolean;
        };
        type XLS = {
            type: 'XLS';
            sheetName: string;
            extractHeader: boolean;
            hasMergedCells: boolean;
        };
        type Avro = {
            type: 'Avro';
        };
    }
    type JobStatus = {
        jobState: 'NOT_SUBMITTED' | 'STARTING' | 'RUNNING' | 'COMPLETED' | 'CANCELED' | 'FAILED' | 'CANCELLATION_REQUESTED' | 'ENQUEUED';
        queryType: 'UI_RUN' | 'UI_PREVIEW' | 'UI_INTERNAL_PREVIEW' | 'UI_INTERNAL_RUN' | 'UI_EXPORT' | 'ODBC' | 'JDBC' | 'REST' | 'ACCELERATOR_CREATE' | 'ACCELERATOR_DROP' | 'UNKNOWN' | 'PREPARE_INTERNAL' | 'ACCELERATOR_EXPLAIN' | 'UI_INITIAL_PREVIEW';
        startedAt: string;
        endedAt: string;
        rowCount?: number;
        acceleration?: {
            relationships: {
                reflectionId: string;
                datasetId: string;
                relationship: 'CONSIDERED' | 'MATCHED' | 'CHOSEN';
            }[];
        };
        errorMessage?: string;
    };
    type JobResultsUrlArgs = {
        offset?: number;
        limit?: number;
    };
    type JobResults = {
        rowCount: number;
        schema: FieldSchema[];
        rows: object[];
    };
    namespace reflection {
        type Reflection = RawReflection | AggregationReflection;
        type ReflectionField = {
            name: string;
        };
        type ReflectionFieldWithGranularity = ReflectionField & {
            granularity: 'NORMAL' | 'DATE';
        };
        type AbstractReflection = {
            entityType: 'reflection';
            id: string;
            tag: string;
            name: string;
            enabled: boolean;
            createdAt: string;
            updatedAt: string;
            datasetId: string;
            currentSizeBytes: number;
            totalSizeBytes: number;
            status: {
                config: 'OK' | 'INVALID';
                refresh: 'SCHEDULED' | 'RUNNING' | 'GIVEN_UP';
                availability: 'NONE' | 'INCOMPLETE' | 'EXPIRED' | 'AVAILABLE';
                failureCount: number;
                lastRefresh: string;
                expiresAt: string;
            };
            distributionFields?: ReflectionField[];
            partitionFields?: ReflectionField[];
            sortFields?: ReflectionField[];
            partitionDistributionStrategy: 'CONSOLIDATED' | 'STRIPED';
        };
        type RawReflection = AbstractReflection & {
            type: 'RAW';
            displayFields?: ReflectionField[];
        };
        type AggregationReflection = AbstractReflection & {
            type: 'AGGREGATION';
            dimensionFields: ReflectionFieldWithGranularity[];
            measureFields: ReflectionField[];
        };
    }
    namespace catalog {
        type CatalogEntity = File | Folder | Home | Space | Dataset;
        type CatalogEntitiesSummary = {
            data: CatalogEntitySummary[];
        };
        type CatalogEntitySummary = {
            id: string;
            path: string[];
            tag: string;
            type: 'DATASET' | 'CONTAINER' | 'FILE';
            datasetType?: 'VIRTUAL' | 'PROMOTED' | 'DIRECT';
            containerType?: 'SPACE' | 'SOURCE' | 'FOLDER' | 'HOME';
        };
        type Dataset = {
            entityType: 'dataset';
            id: string;
            path: string[];
            tag: string;
            type: 'PHYSICAL_DATASET' | 'VIRTUAL_DATASET';
            fields: FieldSchema[];
            createdAt: string;
            accelerationRefreshPolicy?: {
                refreshPeriodMs: number;
                gracePeriodMs: number;
                method: 'FULL' | 'INCREMENTAL';
                refreshField?: string;
            };
            sql?: string;
            sqlContext?: string[];
            format?: datasetFormat.DatasetFormat;
        };
        type File = {
            entityType: 'file';
            id: string;
            path: string[];
        };
        type Folder = {
            entityType: 'folder';
            id: string;
            path: string[];
            tag: string;
            children?: CatalogEntitySummary[];
        };
        type Home = {
            entityType: 'home';
            id: string;
            name: string;
            tag: string;
            children?: CatalogEntitySummary[];
        };
        type Space = {
            entityType: 'space';
            id: string;
            name: string;
            tag: string;
            createdAt: string;
            children?: CatalogEntitySummary[];
        };
    }
    namespace source {
        type Source = ADL | NAS | HDFS | MAPRFS | S3 | MONGO | ELASTIC | ORACLE | MYSQL | MSSQL | POSTGRES | REDSHIFT | HBASE | HIVE | DB2;
        type Sources = {
            data: Source[];
        };
        type AbstractSource = {
            entityType: 'source';
            id: string;
            name: string;
            description: string;
            tag: string;
            createdAt: string;
            metadataPolicy: {
                authTTLMs: number;
                datasetRefreshAfterMs: number;
                datasetExpireAfterMs: number;
                namesRefreshMs: number;
                datasetUpdateMode: 'PREFETCH' | 'PREFETCH_QUERIED' | 'INLINE';
            };
            state: {
                status: 'good' | 'bad' | 'warn';
                messages: {
                    level: 'INFO' | 'WARN' | 'ERROR';
                    message: string;
                }[];
            };
            accelerationRefreshPeriodMs: number;
            accelerationGracePeriodMs: number;
        };
        type PropertyList = {
            name: string;
            value: string;
        }[];
        type ADL = AbstractSource & {
            type: 'ADL';
            config: {
                mode: 'CLIENT_KEY';
                accountName: string;
                clientId: string;
                clientKeyRefreshUrl: string;
                clientKeyPassword: string;
            };
        };
        type NAS = AbstractSource & {
            type: 'NAS';
            config: {
                path: string;
            };
        };
        type HDFS = AbstractSource & {
            type: 'HDFS';
            config: {
                enableImpersonation: boolean;
                hostname: string;
                port: number;
                rootPath: string;
                propertyList: PropertyList;
            };
        };
        type MAPRFS = AbstractSource & {
            type: 'MAPRFS';
            config: {
                clusterName: string;
                enableImpersonation: boolean;
                secure: boolean;
                rootPath: string;
                propertyList: PropertyList;
            };
        };
        type S3 = AbstractSource & {
            type: 'S3';
            config: {
                accessKey: string;
                accessSecret: string;
                secure: boolean;
                externalBucketList: string[];
                propertyList: PropertyList;
            };
        };
        type MONGO = AbstractSource & {
            type: 'MONGO';
            config: {
                username: string;
                password: string;
                hostList: {
                    hostname: string;
                    port: number;
                }[];
                useSsl: boolean;
                authenticationType: 'ANONYMOUS' | 'MASTER';
                authdatabase: string;
                authenticationTimeoutMillis: number;
                secondaryReadsOnly: boolean;
                subpartitionSize: number;
                propertyList: PropertyList;
            };
        };
        type ELASTIC = AbstractSource & {
            type: 'ELASTIC';
            config: {
                username: string;
                password: string;
                hostList: {
                    hostname: string;
                    port: number;
                }[];
                authenticationType: 'ANONYMOUS' | 'MASTER';
                scriptsEnabled?: boolean;
                showHiddenIndices?: boolean;
                sslEnabled?: boolean;
                showIdColumn?: boolean;
                readTimeoutMillis: number;
                scrollTimeoutMillis: number;
                usePainless?: boolean;
                useWhitelist?: boolean;
                scrollSize?: number;
            };
        };
        type ORACLE = AbstractSource & {
            type: 'ORACLE';
            config: {
                username: string;
                password: string;
                instance: string;
                hostname: string;
                port: string;
                authenticationType: 'ANONYMOUS' | 'MASTER';
                fetchSize: number;
            };
        };
        type MYSQL = AbstractSource & {
            type: 'MYSQL';
            config: {
                username: string;
                password: string;
                hostname: string;
                port: string;
                authenticationType: 'ANONYMOUS' | 'MASTER';
                fetchSize: number;
            };
        };
        type MSSQL = AbstractSource & {
            type: 'MSSQL';
            config: {
                username: string;
                password: string;
                hostname: string;
                port: string;
                authenticationType: 'ANONYMOUS' | 'MASTER';
                fetchSize: number;
                database?: string;
                showOnlyConnectiondatabase?: boolean;
            };
        };
        type POSTGRES = AbstractSource & {
            type: 'POSTGRES';
            config: {
                username: string;
                password: string;
                hostname: string;
                port: string;
                authenticationType: 'ANONYMOUS' | 'MASTER';
                fetchSize: number;
                databaseName: string;
            };
        };
        type REDSHIFT = AbstractSource & {
            type: 'REDSHIFT';
            config: {
                username: string;
                password: string;
                authenticationType: 'ANONYMOUS' | 'MASTER';
                fetchSize: number;
                connectionString: string;
            };
        };
        type HBASE = AbstractSource & {
            type: 'HBASE';
            config: {
                zkQuorum: string;
                port: number;
                isSizeCalcEnabled: boolean;
                propertyList: PropertyList;
            };
        };
        type HIVE = AbstractSource & {
            type: 'HIVE';
            config: {
                hostname: string;
                port: string;
                kerberosPrincipal: string;
                enableSasl?: boolean;
                propertyList: PropertyList;
            };
        };
        type DB2 = AbstractSource & {
            type: 'DB2';
            config: {
                username: string;
                password: string;
                hostname: string;
                port: string;
                databaseName: string;
                authenticationType: 'ANONYMOUS' | 'MASTER';
                fetchSize: number;
            };
        };
    }
}
