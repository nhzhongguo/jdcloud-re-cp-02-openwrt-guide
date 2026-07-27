# Firmware 文件说明

本目录故意不放固件二进制。

请自行准备：

```text
u-boot-mt7621-68.bin
openwrt-25.12.x-ramips-mt7621-jdcloud_re-cp-02-squashfs-sysupgrade.bin
openwrt-ramips-mt7621-jdcloud_re-cp-02-initramfs-kernel.bin  # 可选
```

不要把下面这些文件提交到公开仓库：

```text
*.bin
*.img
*.backup
*.zip
*.7z
```

下载后请校验 SHA256：

```powershell
certutil -hashfile .\openwrt-25.12.x-ramips-mt7621-jdcloud_re-cp-02-squashfs-sysupgrade.bin SHA256
```

刷机前确认文件名里包含：

```text
ramips-mt7621-jdcloud_re-cp-02
squashfs-sysupgrade
```

不要拿其他 MT7621 设备的固件混刷。
