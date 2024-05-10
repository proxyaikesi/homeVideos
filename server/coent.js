const { MongoClient } = require("mongodb");  //导入依赖对象mongo客户端

let url="mongodb://127.0.0.1:27017";  //数据库连接字符串

let client=new MongoClient(url);  //实例化一个mongo客户端

async function run(){
    try{
        await client.connect();  //连接
        await client.db("nfit").command({ping:1});  //向数据库nfit发送命令
        console.log("连接数据库成功！");
    }
    finally{
        await client.close();
    }
}

run().catch(console.log);
