interface Dao<T> {

    createOrUpdate(fileName: string, object: T, path?: string): Promise<void>;

    read(fileName: string, path?: string): Promise<T>;

    delete(fileName: string, path?: string): Promise<void>;
}
