import {
    exec
} from "child_process";



try {
    console.log("执行autobuild.sh...");

    // 使用child_process模块来执行shell脚本
    await exec('bash ./autobuild.sh', (err, stdout, stderr) => {
        if (err) {
            console.error('执行autobuild.sh时出错：', err);
            return;
        }
        console.log('执行成功，输出：', stdout);
    });

    console.log("执行autobuild.sh完成!");

} catch (error) {
    console.error('执行autobuild.sh时出现异常：', error);
}