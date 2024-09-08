use serde_json::Value;
use crate::commands::api;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;



#[tauri::command]
pub fn patch_roblox(json: Value) -> Result<(), String> {
    let config: api::Config = api::get_config();

    let client_app_settings_path = format!("{}/{}", config.roblox_path, config.client_app_settings_path);

    if !Path::new(&client_app_settings_path).exists() {
        std::fs::create_dir_all(&client_app_settings_path)
            .map_err(|e| format!("Failed to create directory {}: {}", config.roblox_path, e))?;
    }

    let client_app_settings_file = format!("{}{}", client_app_settings_path, config.client_app_settings_file);

    let mut file = File::create(&client_app_settings_file)
        .map_err(|e| format!("Failed to create file {}: {}", client_app_settings_file, e))?;

    let json_str = serde_json::to_string_pretty(&json)
        .map_err(|e| format!("Failed to serialize JSON: {}", e))?;

    file.write_all(json_str.as_bytes())
        .map_err(|e| format!("Failed to write to file {}: {}", client_app_settings_file, e))?;

    Ok(())
}
