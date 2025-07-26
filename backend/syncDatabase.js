// import { sequelize } from './config.js';
// import { Book } from './model/bookModel.js';

// sequelize.sync({ force: true }).then(() => {
//   console.log('Database & tables created!');
// }).catch((error) => {
//   console.error('Error syncing database:', error);
// });


// Connects to the MySQL database using the sequelize instance.
// Synchronizes the Book model with the database:
// If the Book table doesn't exist, it creates it.
// If the force: true option is used, it drops and recreates the table.
// Logs a success message if the synchronization is successful.
// Logs an error message if something goes wrong.