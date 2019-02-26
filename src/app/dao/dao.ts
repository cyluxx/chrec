interface Dao<T> {

    createOrUpdate(fileName: string, object: T , path?: string): Promise<any>;

    read(fileName: string, path?: string): Promise<T>;

    delete(fileName: string, path?: string): Promise<any>;
}