import os
import json

folder_path = 'new'

output_file = 'items_out.json'

files_in_folder = [file for file in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, file))]

with open(output_file, 'w') as file:
    json.dump(files_in_folder, file)


print(f"Zapisano nazwy plików do {output_file}.")
