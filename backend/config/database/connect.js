import chalk from 'chalk';
import mongoose from 'mongoose';

// ✌︎︎ Connect DB Function ✌︎︎ //
const connect_db = async () => {
    try {
        await mongoose.connect("mongodb+srv://rohanmakvana90:rohan%403520@cluster0.6nvjj.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0");
        console.log(chalk.yellow(` ★☆ MongoDB Connected ★☆ `));
    } catch (error) {
        console.log(chalk.red(`Error: ${error.message}`));
    }
};

export default connect_db;
