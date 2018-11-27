interface Dao<T> {

    create(fileName: string, object: T , path?: string): Promise<any>;

    read(fileName: string, path?: string): Promise<T>;

    update(fileName: string, object: T , path?: string): Promise<any>;

    delete(fileName: string, path?: string): Promise<any>;
}