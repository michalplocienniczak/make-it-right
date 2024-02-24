import os
import shutil
import json

org_folder = 'org'
new_folder = 'new'
filter_file = 'items.json'

if not os.path.exists(new_folder):
    os.makedirs(new_folder)

with open(filter_file, 'r') as file:
    files_to_move = json.load(file)

for file_name in files_to_move:
    org_path = os.path.join(org_folder, file_name)
    new_path = os.path.join(new_folder, file_name)
    
    if os.path.exists(org_path):
        # Przenoszenie pliku
        shutil.move(org_path, new_path)
        print(f"moved: {file_name}")
    else:
        print(f"file doesn't exist: {file_name}")
