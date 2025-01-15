import { connect } from "mongoose";

const PORT = 4000;



mongoose_connection = async (app) => {
  connect(process.env.DB_URL)
    .then(() => {

      console.log("db connected success");

      app.listen(PORT, "0.0.0.0", () => {
        console.log(`listening at port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });

}
export default mongoose_connection;