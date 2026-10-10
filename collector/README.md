# GAME PULSE 多平台收集器

服务器部署、前后端分离部署、缓存迁移和更新步骤见 [项目部署文档](../README.md)。该服务采集 Nintendo、PlayStation 和 Steam 官方数据，包含：

- `switch1`：日服前 50 名
- `switch2`：日服前 30 名
- `switch1_hk`：港服前 30 名
- `switch2_hk`：港服前 30 名
- PlayStation 港服及日服
- Steam 中国区及全球热销榜

## 开发验证

生产服务由服务器运行，本机修改后推送 GitHub 触发更新，详见 [自动部署文档](../deploy/GITHUB-AUTO-DEPLOY.md)。本机安装依赖并验证：

```powershell
cd collector
npm ci
npm test
```

首次启动会立即采集，之后默认每 60 分钟更新。缓存保存在 `data/nintendo-cache.json`，官方页面临时限流或排队时会继续返回上次成功数据。
港服封面由 `/api/nintendo/image` 转发官方图片，缩小后仅在内存中缓存最多64张；不创建 assets 图片文件。

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
- `GET /api/nintendo/image?url=官方图片地址`：转发港服封面，仅允许任天堂官方图片域名

## Docker 部署

在仓库根目录运行，构建上下文需要包含前端快照和图片：

```bash
docker compose -f compose.collector.yaml up -d --build --wait
```

Compose 自动把宿主机 `deploy/data/` 挂载到 `/app/collector/data`，包含全部缓存和港服图片。需要从其他服务器访问时，按项目部署文档设置 `COLLECTOR_BIND` 和防火墙规则。
