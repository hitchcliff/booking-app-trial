import os from "os";

export default function getMyIp() {
  const networkInterfaces = os.networkInterfaces();
  let localIpAddress = "Not Found";

  for (const interfaceName in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceName];
    for (const iface of networkInterface as any) {
      // Filter out internal (loopback) addresses and non-IPv4 addresses
      if (iface.family === "IPv4" && !iface.internal) {
        localIpAddress = iface.address;
        break; // Found an IPv4 address, no need to check further for this interface
      }
    }
    if (localIpAddress !== "Not Found") {
      break; // Found an IPv4 address, no need to check further interfaces
    }
  }
  return localIpAddress;
}
