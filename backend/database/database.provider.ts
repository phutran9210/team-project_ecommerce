import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'lamgico123',
        database: 'tnc_store',
        // logging: true ,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      await dataSource
        .initialize()
        .then(() => {
          console.log('Đã kết nối với mySQL');
        })
        .catch((err) => {
          console.error('Error during Data Source initialization', err);
        });

      return dataSource;
    },
  },
];
