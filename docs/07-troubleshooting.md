# 07. 常见问题排查

## 路由器红灯，是不是刷坏了

不一定。红灯可能是 stock 固件状态、启动中、WAN 未联网、系统未完全启动，也可能是刷机失败。

先做最小排查：

```powershell
ping 192.168.68.1
ping 192.168.1.1
ping 192.168.8.1
```

再扫端口：

```powershell
Test-NetConnection 192.168.68.1 -Port 80
Test-NetConnection 192.168.1.1 -Port 80
Test-NetConnection 192.168.8.1 -Port 80
```

如果 U-Boot Recovery 能进 `192.168.68.1`，通常还能救。  
如果 OpenWrt 能进 `192.168.1.1` 或 `192.168.8.1`，说明系统已启动。

## 电脑同时连手机热点和网线，会不会冲突

可以这样用。关键是：

- 手机热点负责电脑上网。
- 网线只负责访问路由器。
- stock / recovery 阶段，有线网卡静态 IP 设置网关留空。
- OpenWrt 启动后，有线网卡改回 DHCP。

如果电脑突然不能上网，检查有线网卡是不是设置了默认网关。

## 进不去 `192.168.68.1`

确认：

- 电脑有线网卡 IP 是 `192.168.68.2/24`。
- 网线插的是路由器 LAN 口。
- 路由器处于 stock 或 U-Boot Recovery。
- 浏览器不要走代理访问本地地址。

可以临时关闭浏览器代理，或把局域网地址加入直连。

## 进不去 `192.168.1.1`

这通常发生在 OpenWrt 刚刷完：

- 电脑有线网卡要改回 DHCP。
- 等路由器启动 1-3 分钟。
- 如果你已经把 LAN 改成 `192.168.8.1`，就不要再访问 `192.168.1.1`。

## LuCI 想改成中文

安装语言包：

```sh
apk update
apk add luci-i18n-base-zh-cn
```

然后在 LuCI：

```text
System -> System -> Language and Style
```

选择中文并保存。若没有变化，清浏览器缓存或重新登录。

## UPnP 页面空白

正常。UPnP 只有在内网设备申请端口映射时才显示记录。比如游戏、NAS、BT 客户端运行并申请映射后才会出现。

## DNS 配了，为什么有的网站还是打不开

DNS 只解析域名，不改变网络路径。如果目标网站的 IP 本身不可达，换 DNS 没用。  
需要 v2rayA 这类分流代理时，应配置“国内直连，其他按规则代理”。

## v2rayA 节点不显示延迟

排查顺序：

```sh
/etc/init.d/v2raya status
logread -e v2raya
logread -e xray
netstat -lntp | grep -E '2017|20170|20171|20172'
```

常见原因：

- 节点失效。
- 订阅过期。
- 路由器时间不准。
- Xray core 启动超时。
- 节点服务商屏蔽延迟测试。

RE-CP-02 上可以尝试：

```sh
uci set v2raya.config.core_startup_timeout='90'
uci commit v2raya
/etc/init.d/v2raya restart
```

## dynv6 更新失败

先看日志：

```sh
logread -e ddns
```

再确认：

- Token 没复制错。
- 域名是完整域名，例如 `<YOUR_DOMAIN>.dynv6.net`。
- 选择了正确的 IP 来源：IPv4 用 `wan`，IPv6 用 `wan6`。
- 光猫或上级路由是否真的给了公网地址。

查看 WAN6：

```sh
ifstatus wan6
```

## eMMC 扩容后容量没有变

检查：

```sh
df -h /overlay
uci show fstab
block info
mount | grep overlay
```

常见原因：

- `/dev/mmcblk0p1` 没格式化成功。
- `fstab.overlay.device` 写错。
- 复制 overlay 时没有复制隐藏文件。
- 重启前没有 `uci commit fstab`。

## 浏览器代理影响 LuCI

如果电脑开了系统代理或浏览器代理，本地地址可能被错误转发。建议把这些地址加入直连：

```text
192.168.0.0/16
10.0.0.0/8
172.16.0.0/12
localhost
```
