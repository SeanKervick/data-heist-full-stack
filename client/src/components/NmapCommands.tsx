// https://refine.dev/blog/typescript-record-type/#best-practices
// record type "a lightweight alternative to creating interfaces or types for objects with simple mappings"
const storedCommands: Record<string, string> = { 
    "nmap --version": "Nmap version 7.94 (https://nmap.org)",
    "ping google.com": 
    `Pinging google.com [142.250.74.14] with 32 bytes of data:
     Reply from 142.250.74.14: bytes=32 time=12ms TTL=117`,
    "whoami": "player-user",
    "clear": " ",

    // scan on router (not a step)
    "nmap 192.168.10.1": 
        `Starting Nmap 7.94 ( https://nmap.org ) at 2025-03-16 12:40 GMT Standard Time
        Nmap scan report for gateway.local (192.168.10.1)
        Host is up (0.0029s latency).
        Not shown: 985 closed tcp ports (reset)

        PORT     STATE    SERVICE
        22/tcp   open     ssh
        53/tcp   open     domain
        80/tcp   open     http
        443/tcp  open     https
        3306/tcp open     mysql

        MAC Address: 12:34:56:78:9A:BC (Alpha Networks Inc.)`,


    // step 1: identify network
    "ipconfig": 
        `Wireless LAN adapter Wi-Fi:

        Connection-specific DNS Suffix. . : office.local
        IPv6 Address. . . . . . . . . . . : jde5:7b23:ab1f:9987:aa76:bf12:3423:9a1b
        Temporary IPv6 Address. . . . . . : jde5:7b23:ab1f:9987:bd65:5a23:ef44
        Link-local IPv6 Address . . . . . : fe81::c4a6:24ff:fe78:8bcd%12
        IPv4 Address. . . . . . . . . . . : 192.168.10.105
        Subnet Mask . . . . . . . . . . . : 255.255.255.0
        Default Gateway . . . . . . . . . : 192.168.10.1

        Ethernet adapter Ethernet:

        Connection-specific DNS Suffix. . : corp.network
        IPv6 Address. . . . . . . . . . . : 2001:db8:abcd:12::1
        Link-local IPv6 Address . . . . . : fe80::1a2b:3c4d:5e6f:7890%3
        IPv4 Address. . . . . . . . . . . : 10.0.0.15
        Subnet Mask . . . . . . . . . . . : 255.255.255.0
        Default Gateway . . . . . . . . . : 10.0.0.1

        Ethernet adapter Bluetooth Network Connection:

        Media State . . . . . . . . . . . : Media disconnected
        Connection-specific DNS Suffix. . :`,

    // step 2: ping all devices
    "nmap -sn 192.168.10.0/24": 
        `Starting Nmap 7.94 ( https://nmap.org ) at 2025-03-16 10:47 GMT Standard Time
        Nmap scan report for gateway.local (192.168.10.1)
        Host is up (0.0028s latency).
        MAC Address: 12:34:56:78:9A:BC (Alpha Networks Inc.)
        Nmap scan report for dev-machine.local (192.168.10.15)
        Host is up (0.045s latency).
        MAC Address: 98:76:54:32:10:FE (Lenovo)
        Nmap scan report for firewall.local (192.168.10.254)
        Host is up (0.065s latency).
        MAC Address: AB:CD:EF:12:34:56 (Cisco Systems)
        Nmap scan report for unknown-device.local (192.168.10.200)
        Host is up (0.049s latency).
        MAC Address: 1A:2B:3C:4D:5E:6F (Unknown)
        Nmap scan report for workstation-1.local (192.168.10.8)
        Host is up.
        Nmap done: 256 IP addresses (5 hosts up) scanned in 3.19 seconds`,

    // step 3: scan for open ports
    "nmap -p 80,443 192.168.10.0/24" : 
        `Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-03-16 11:11 GMT

        Nmap scan report for gateway.local (192.168.10.1)
        Host is up (0.0093s latency).
        PORT   STATE    SERVICE
        80/tcp open     http
        443/tcp open    https
        MAC Address: 12:34:56:78:9A:BC (Alpha Networks Inc.)

        Nmap scan report for dev-machine.local (192.168.10.15)
        Host is up (0.012s latency).
        PORT   STATE    SERVICE
        80/tcp closed   http
        443/tcp closed  https
        MAC Address: 98:76:54:32:10:FE (Lenovo)

        Nmap scan report for firewall.local (192.168.10.254)
        Host is up (0.0050s latency).
        PORT   STATE    SERVICE
        80/tcp closed   http
        443/tcp closed  https
        MAC Address: AB:CD:EF:12:34:56 (Cisco Systems)

        Nmap scan report for unknown-device.local (192.168.10.200)
        Host is up (0.0042s latency).
        PORT   STATE    SERVICE
        80/tcp closed   http
        443/tcp closed  https
        MAC Address: 1A:2B:3C:4D:5E:6F (Unknown)`,

    // step 4: service detection on router
    "nmap -sV -p 80,443 192.168.10.1":
        `Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-03-16 11:17 GMT
        Nmap scan report for gateway.local (192.168.10.1)
        Host is up (0.0035s latency).

        PORT    STATE SERVICE   VERSION
        80/tcp  open  http      Apache httpd 2.4.49
        443/tcp open  https     Apache httpd 2.4.49
        MAC Address: 12:34:56:78:9A:BC (Alpha Networks Inc.)

        Service detection performed. Nmap done: 1 IP address (1 host up) scanned in 2.31 seconds.`,

    // help
    "nmap -h": 
        `USAGE: nmap [Scan Type(s)] [Options] {target specification}

        IDENTIFY THE NETWORK
        ipconfig

        HOST DISCOVERY:
        -sL: List Scan - simply list targets to scan
        nmap -sn <target-network-range> - Ping Scan on All Devices

        SCAN TECHNIQUES:
        -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans

        PORT SPECIFICATION AND SCAN ORDER:
        -p <port ranges>: Only scan specified ports
            Example: nmap -p xx,xxx 192.168.10.0/24

        SERVICE/VERSION DETECTION:
        -sV: Probe open ports to determine service/version info
            Example: nmap -sV -p 80,443 <target-ip>

        OS DETECTION:
        -O: Enable OS detection

        OTHER COMMANDS:
        clear - clean the terminal
        ping google.com - send a ping request to google.com
        nmap -h - help`,
  };
  
  export default storedCommands;
  