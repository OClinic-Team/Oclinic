const mongoose = require('mongoose');

async function connect() {
  const moongoURI ='mongodb+srv://online-clinic-project:123321123321@cluster.mjikz.mongodb.net/test?authSource=admin&replicaSet=atlas-10rvle-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
  const moongo ='mongodb://localhost:27017/online_clinic'
  
  try {
    await mongoose.connect(moongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('ket noi thanh cong');
  } catch (error) {
    console.log('Loi!!!!');
  }
}

module.exports = { connect };
