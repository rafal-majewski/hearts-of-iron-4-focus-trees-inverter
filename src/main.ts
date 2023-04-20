import Hello from "./hello/Hello.js";
import appConfig from "./app_config/appConfig.js";

const hello = new Hello(appConfig.OPTIONAL_HELLO_MESSAGE);
console.log(hello.getMessage());
