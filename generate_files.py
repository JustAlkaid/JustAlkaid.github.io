import os
import json

# 目标目录
directory = "docs/zh/articles"
base_url = "/docs/zh/articles/"  # 基础路径

# 获取目录及其子目录下的所有 .md 文件
files = []
for root, _, filenames in os.walk(directory):
    for filename in filenames:
        if filename.endswith(".md"):
            # 构建相对路径
            relative_path = os.path.relpath(os.path.join(root, filename), directory)
            files.append(relative_path)

# 生成 JSON 数据
pages_data = [base_url + file for file in files]

# 写入 JSON 文件
output_file = os.path.join(directory, "pages.json")
with open(output_file, "w") as json_file:
    json.dump(pages_data, json_file, ensure_ascii=False, indent=4)

print("pages.json 文件已生成！")
