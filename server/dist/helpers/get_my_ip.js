"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getMyIp;
const os_1 = __importDefault(require("os"));
function getMyIp() {
    const networkInterfaces = os_1.default.networkInterfaces();
    let localIpAddress = "Not Found";
    for (const interfaceName in networkInterfaces) {
        const networkInterface = networkInterfaces[interfaceName];
        for (const iface of networkInterface) {
            if (iface.family === "IPv4" && !iface.internal) {
                localIpAddress = iface.address;
                break;
            }
        }
        if (localIpAddress !== "Not Found") {
            break;
        }
    }
    return localIpAddress;
}
