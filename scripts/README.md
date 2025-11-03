# 图像处理脚本

## remove_black_background.py

批量处理PNG图像，将纯黑色背景转换为透明背景。

### 功能

- 自动扫描 `public/cstrike` 目录下的所有PNG文件（包括子目录）
- 将黑色像素（RGB值 < 30）转换为透明
- 保持原图像的其他颜色不变
- 支持指定输出目录，保留原文件
- 保持原有的目录结构

### 使用方法

1. 确保已安装Python 3
2. 安装依赖（首次使用）：
```bash
# 激活虚拟环境
source scripts/venv/bin/activate

# 安装依赖
pip install -r scripts/requirements.txt
```

3. 运行脚本：

**覆盖原文件模式（默认）**：
```bash
source scripts/venv/bin/activate
python3 scripts/remove_black_background.py
```

**指定输出目录（推荐）**：
```bash
source scripts/venv/bin/activate
python3 scripts/remove_black_background.py --dest-dir output/cstrike
```

### 命令行参数

- `--dest-dir`: 目标输出目录，如果不指定则覆盖原文件
- `--src-dir`: 源目录路径（默认为 `public/cstrike`）
- `--threshold`: 黑色阈值 (0-255)，小于此值的像素将被视为黑色（默认: 30）
- `--no-recursive`: 不递归处理子目录

### 使用示例

```bash
# 处理到指定目录，保留原文件
python3 scripts/remove_black_background.py --dest-dir output/cstrike

# 指定源目录和目标目录
python3 scripts/remove_black_background.py --src-dir path/to/images --dest-dir path/to/output

# 调整黑色阈值（更严格，只处理非常黑的像素）
python3 scripts/remove_black_background.py --dest-dir output --threshold 20

# 只处理当前目录，不递归子目录
python3 scripts/remove_black_background.py --dest-dir output --no-recursive

# 查看帮助
python3 scripts/remove_black_background.py --help
```

### 注意事项

- 如果不指定 `--dest-dir`，脚本会**覆盖原文件**，建议先备份
- 如果指定了 `--dest-dir`，输出目录会自动创建，并保持与原目录相同的结构
- 处理后的图像将包含透明通道（RGBA模式）
- 只处理 `.png` 格式的文件

