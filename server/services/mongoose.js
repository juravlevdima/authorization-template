import mongoose from "mongoose"
import chalk from "chalk"

const dbConnect = () => {
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }

  mongoose
    .connect(process.env.MONGO_URL, mongooseOptions)
    .then(() => console.log(chalk.green(`DB is successfully connected`)))
    .catch((err) => console.log(chalk.red(`DB connect ERROR - ${err}`)))
}

export default dbConnect
