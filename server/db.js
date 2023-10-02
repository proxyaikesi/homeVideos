var mongoose = require('mongoose');
var db_str = "mongodb://localhost:27017/video";



mongoose.connect(db_str)
mongoose.connection.on('connected', () => {
    console.log('连接成功')
})
mongoose.connection.on('error', () => {
    console.log('error')
})
mongoose.connection.on('disconnected', () => {
    console.log('断开连接')
})
// const session = client.startSession({ defaultTransactionOptions: { readConcern: { level: 'snapshot' } } });
// session.setOptions({ readPreference: 'primary', readConcern: { level: 'snapshot' }, writeConcern: { w: 'majority' }, causalConsistency: true });

// 在会话中执行操作
// session.withTransaction(async () => {
//     // 设置会话时区
//     session.setTransactionOptions({ readConcern: { level: 'snapshot' } });

//     // 在此处进行你的操作

// });

module.exports = mongoose.connection