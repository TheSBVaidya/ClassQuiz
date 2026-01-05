package com.classquiz.systemController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.*;
import java.util.Enumeration;

@RestController
@RequestMapping("/system")
public class SystemController {

    @GetMapping("/ipv4")
    public String getWifiIpv4() throws Exception {

        Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();

        while (interfaces.hasMoreElements()) {
            NetworkInterface ni = interfaces.nextElement();

            if (!ni.isUp() || ni.isLoopback() || ni.isVirtual()) {
                continue;
            }

            String name = ni.getDisplayName().toLowerCase();

            // Only Wi-Fi / Wireless
            if (name.contains("wi-fi") || name.contains("wifi") || name.contains("wireless")) {

                Enumeration<InetAddress> addresses = ni.getInetAddresses();
                while (addresses.hasMoreElements()) {
                    InetAddress addr = addresses.nextElement();

                    if (addr instanceof Inet4Address && !addr.isLoopbackAddress()) {
                        return addr.getHostAddress(); // ✅ ONLY IPv4
                    }
                }
            }
        }

        return "IPv4 not found";
    }
}
