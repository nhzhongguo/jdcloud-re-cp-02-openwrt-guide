# 03. OpenWrt 首次启动

## 1. 登录 LuCI

刷入后电脑有线网卡改回自动获取 IP，然后打开：

```text
http://192.168.1.1/
```

OpenWrt 初始用户通常是：

```text
用户名：root
密码：空
```

第一次进入后立刻设置 root 密码。

## 2. 修改 LAN 地址

如果家里已有光猫或主路由使用 `192.168.1.1`，建议把 OpenWrt 改成其他网段，例如：

```text
192.168.8.1
```

LuCI 路径：

```text
Network -> Interfaces -> LAN -> Edit -> IPv4 address
```

改完保存应用。浏览器地址也要改成：

```text
http://192.168.8.1/
```

命令行方式：

```sh
uci set network.lan.ipaddr='192.168.8.1'
uci commit network
/etc/init.d/network restart
```

重启网络后 SSH 地址也变成：

```sh
ssh root@192.168.8.1
```

## 3. 确认 WAN 可以联网

把路由器 WAN 口接光猫或上级路由器。确认：

```sh
ping -c 4 223.5.5.5
ping -c 4 openwrt.org
```

如果 IP 能通、域名不通，优先检查 DNS。  
如果都不通，优先检查 WAN 口 DHCP、光猫拨号模式、网线和接口。

## 4. 安装中文界面和基础工具

OpenWrt 25.12 使用 `apk` 包管理器。先更新索引：

```sh
apk update
```

安装中文语言包、磁盘工具、ext4 和挂载组件：

```sh
apk add luci-i18n-base-zh-cn lsblk e2fsprogs kmod-fs-ext4 block-mount
```

如果软件源慢，可以把源换成镜像源。示例：

```sh
cp /etc/apk/repositories.d/distfeeds.list /etc/apk/repositories.d/distfeeds.list.bak
sed -i 's/downloads.openwrt.org/mirrors.tuna.tsinghua.edu.cn\/openwrt/g' /etc/apk/repositories.d/distfeeds.list
apk update
```

## 5. 配置 WiFi

LuCI 路径：

```text
Network -> Wireless
```

建议：

- 国家码选择 `CN`。
- 2.4G 和 5G 可以用同一个 SSID，也可以分开。
- 加密选择 WPA2-PSK 或 WPA2/WPA3 Mixed。
- WiFi 密码至少 16 位，混合大小写、数字、符号。

示例占位：

```text
SSID：OpenWrt-RECP02
Password：<YOUR_WIFI_PASSWORD>
```

命令行示例，实际 radio 名称可能不同，先用 `uci show wireless` 查看：

```sh
uci set wireless.radio0.country='CN'
uci set wireless.default_radio0.ssid='OpenWrt-RECP02'
uci set wireless.default_radio0.encryption='sae-mixed'
uci set wireless.default_radio0.key='<YOUR_WIFI_PASSWORD>'
uci commit wireless
wifi reload
```

## 6. 建议开启 SSH 密钥登录

把你的公钥放到：

```text
/etc/dropbear/authorized_keys
```

不要把私钥上传到仓库，也不要把公钥截图公开。公钥虽然不是私密密码，但也能暴露你的设备关系和用户名习惯。
