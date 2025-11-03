#!/usr/bin/env python3
"""
批量处理PNG图像：将纯黑色背景转换为透明背景
处理 cstrike 目录下的所有PNG图像文件
"""

from pathlib import Path
from PIL import Image
import sys
import argparse

def remove_black_background(image_path, threshold=30, alpha_threshold=128, output_path=None):
    """
    将图像中的黑色像素转换为透明，考虑透明度
    
    Args:
        image_path: 输入图像路径
        threshold: 黑色阈值 (0-255)，小于此值的像素将被视为黑色
        alpha_threshold: 透明度阈值 (0-255)，只有alpha大于此值的黑色像素才会被处理
        output_path: 输出路径，如果为None则覆盖原文件
    """
    try:
        # 打开图像
        img = Image.open(image_path)
        
        # 确保图像是RGBA模式（带透明通道）
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # 获取像素数据
        data = img.getdata()
        
        # 创建新的像素列表
        new_data = []
        for item in data:
            r, g, b, a = item
            # 检查是否为黑色（RGB值都小于阈值）
            is_black = r < threshold and g < threshold and b < threshold
            
            if is_black:
                # 只有当像素足够不透明时，才将其转换为完全透明
                # 这样避免处理已经是半透明的像素
                if a > alpha_threshold:
                    # 转换为完全透明
                    new_data.append((0, 0, 0, 0))
                else:
                    # 如果已经是半透明或接近透明的黑色，保持原样或进一步透明化
                    # 可以选择：1) 保持原样 2) 或按比例调整透明度
                    # 这里我们保持原样，因为已经是半透明了
                    new_data.append(item)
            else:
                # 保持原样
                new_data.append(item)
        
        # 更新图像数据
        img.putdata(new_data)
        
        # 保存图像
        if output_path is None:
            output_path = image_path
        
        img.save(output_path, 'PNG')
        print(f"✓ 处理完成: {image_path}")
        return True
        
    except Exception as e:
        print(f"✗ 处理失败 {image_path}: {str(e)}", file=sys.stderr)
        return False

def process_directory(directory_path, threshold=30, alpha_threshold=128, recursive=True, dest_dir=None):
    """
    批量处理目录下的所有PNG文件
    
    Args:
        directory_path: 目录路径
        threshold: 黑色阈值
        alpha_threshold: 透明度阈值
        recursive: 是否递归处理子目录
        dest_dir: 目标输出目录，如果为None则覆盖原文件
    """
    directory = Path(directory_path).resolve()
    
    if not directory.exists():
        print(f"错误: 目录不存在 {directory_path}", file=sys.stderr)
        return
    
    # 如果指定了目标目录，确保它存在
    dest_path = None
    if dest_dir is not None:
        dest_path = Path(dest_dir).resolve()
        dest_path.mkdir(parents=True, exist_ok=True)
    
    # 查找所有PNG文件
    if recursive:
        png_files = list(directory.rglob('*.png'))
    else:
        png_files = list(directory.glob('*.png'))
    
    if not png_files:
        print(f"未找到PNG文件: {directory_path}")
        return
    
    print(f"找到 {len(png_files)} 个PNG文件")
    if dest_dir:
        print(f"输出目录: {dest_path}")
    else:
        print("注意: 将覆盖原文件")
    print(f"开始处理... (黑色阈值: {threshold}, 透明度阈值: {alpha_threshold})")
    print("-" * 50)
    
    success_count = 0
    for png_file in png_files:
        # 计算输出路径
        output_path = None
        if dest_path is not None:
            # 计算相对路径，保持目录结构
            try:
                relative_path = png_file.relative_to(directory)
                output_path = dest_path / relative_path
                # 确保输出目录存在
                output_path.parent.mkdir(parents=True, exist_ok=True)
            except ValueError:
                # 如果无法计算相对路径，使用文件名
                output_path = dest_path / png_file.name
        
        if remove_black_background(png_file, threshold, alpha_threshold, output_path):
            success_count += 1
    
    print("-" * 50)
    print(f"处理完成: {success_count}/{len(png_files)} 个文件成功处理")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='批量处理PNG图像：将纯黑色背景转换为透明背景'
    )
    parser.add_argument(
        '--src-dir',
        type=str,
        default=None,
        help='源目录路径（默认为 public/cstrike）'
    )
    parser.add_argument(
        '--dest-dir',
        type=str,
        default=None,
        help='目标输出目录（如果不指定则覆盖原文件）'
    )
    parser.add_argument(
        '--threshold',
        type=int,
        default=30,
        help='黑色阈值 (0-255)，小于此值的像素将被视为黑色（默认: 30）'
    )
    parser.add_argument(
        '--alpha-threshold',
        type=int,
        default=128,
        help='透明度阈值 (0-255)，只有alpha大于此值的黑色像素才会被处理（默认: 128）'
    )
    parser.add_argument(
        '--no-recursive',
        action='store_true',
        help='不递归处理子目录'
    )
    
    args = parser.parse_args()
    
    # 获取项目根目录
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    # 确定源目录
    if args.src_dir:
        cstrike_dir = Path(args.src_dir).resolve()
    else:
        cstrike_dir = project_root / 'public' / 'cstrike'
    
    # 检查目录是否存在
    if not cstrike_dir.exists():
        print(f"错误: 目录不存在 {cstrike_dir}", file=sys.stderr)
        sys.exit(1)
    
    # 处理 cstrike 目录及其子目录
    print("=" * 50)
    print("批量处理PNG图像 - 移除黑色背景")
    print("=" * 50)
    process_directory(
        cstrike_dir,
        threshold=args.threshold,
        alpha_threshold=args.alpha_threshold,
        recursive=not args.no_recursive,
        dest_dir=args.dest_dir
    )

