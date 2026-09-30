# GAME PULSE 多平台收集器

服务器部署、前后端分离部署、缓存迁移和更新步骤见 [项目部署文档](../README.md)。该服务采集 Nintendo、PlayStation 和 Steam 官方数据，包含：

- `switch1`：日服前 50 名
- `switch2`：日服前 30 名
- `switch1_hk`：港服前 30 名
- `switch2_hk`：港服前 30 名
- PlayStation 港服及日服
- Steam 中国区及全球热销榜

## 本地运行

最省事的方式是在项目根目录双击：

- `Start-GamePulse.cmd`（推荐，英文文件名兼容性最好）
- 选择 `1`：仅本机使用，打开 `http://127.0.0.1:8787`
- 选择 `2`：本机 + 临时公网 HTTPS 地址，脚本会自动下载 Cloudflare Tunnel 并打开公网地址
- 停止服务时双击项目根目录的 `Stop-GamePulse.cmd`

公网模式生成的是 `trycloudflare.com` 临时地址，每次重启可能变化；电脑关机、休眠或停止脚本运行后，公网地址会失效。

也可以手动运行：

```powershell
cd collector
npm ci
npx playwright install chromium
npm start
```

首次启动会立即采集，之后默认每 60 分钟更新。缓存保存在 `data/nintendo-cache.json`，官方页面临时限流或排队时会继续返回上次成功数据。
港服榜单的高清图片会保存在 `../dist/assets/nintendo-hk/`，避免官方图片地址在榜单页外加载失败。

接口：

- `GET /health`
- `GET /api/nintendo/rankings?platform=switch1`
- `GET /api/nintendo/rankings?platform=switch2`
- `GET /api/nintendo/rankings?platform=switch1_hk`
- `GET /api/nintendo/rankings?platform=switch2_hk`
- `GET /api/nintendo/rankings?platform=switch1&refresh=1`
- `POST /api/nintendo/refresh`
- `GET /api/ps5/rankings`、`POST /api/ps5/refresh`
- `GET /api/ps5-jp/rankings`、`POST /api/ps5-jp/refresh`
- `GET /api/steam/rankings`、`POST /api/steam/refresh`
- `GET /api/steam-global/rankings`、`POST /api/steam-global/refresh`
- `POST /api/settings`：修改检查周期，允许 5、15、30、60 分钟
- `GET /assets/nintendo-hk/文件名`：独立部署时也提供封面图片

## Docker 部署

在仓库根目录运行，构建上下文需要包含前端快照和图片：

```bash
docker compose -f compose.collector.yaml up -d --build --wait
```

Compose 自动把宿主机 `deploy/data/` 挂载到 `/app/collector/data`，包含全部缓存和港服图片。需要从其他服务器访问时，按项目部署文档设置 `COLLECTOR_BIND` 和防火墙规则。
