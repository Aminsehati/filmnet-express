import mongoose from 'mongoose';
const url = `mongodb+srv://root:8nVVNljbzQGLpJ5Z@filmnet.lnh5m.mongodb.net/?retryWrites=true&w=majority`
function connectDataBase() {
    mongoose.connect(url);
    mongoose.connection.on("error", (err) => {
        console.log("err", err);
    });
    mongoose.connection.on("connected", (err, res) => {
        console.log("mongoose is connected");
    });
}
export default connectDataBase