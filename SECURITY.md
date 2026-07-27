# Security Policy

## 不要提交这些内容

请不要在 issue、PR 或截图里提交：

- OpenWrt root 密码
- WiFi 密码
- SSH 私钥或公钥
- dynv6 Token、域名管理 Token
- v2rayA 订阅链接、节点地址、UUID、Reality 私钥、公钥组合
- 家庭公网 IP、MAC、SN、宽带账号
- 带有个人信息的 LuCI、v2rayA、dynv6、运营商后台截图

## 报告安全问题

如果你发现文档里有会导致泄露隐私、误删数据或误刷设备的问题，请提交 issue，并尽量使用占位符描述敏感内容，例如：

- `<YOUR_ROUTER_IP>`
- `<YOUR_WIFI_PASSWORD>`
- `<YOUR_DYNV6_TOKEN>`
- `<YOUR_SUBSCRIPTION_URL>`

## 使用边界

本项目只面向自己拥有或被授权维护的设备。不要把文档或脚本用于未授权的设备访问、绕过他人网络管理或泄露他人配置。
