use serde_json::Value;
use crate::commands::api;
use std::fs::File;
use std::io::prelude::*;


#[tauri::command]
pub fn patch_roblox(json: Value) -> Result<(), String> {
    let config: api::Config = api::get_config();

    let client_app_settings_path = format!("{}/{}", config.roblox_path, config.client_app_settings_path);
    
    if !std::path::Path::new(&client_app_settings_path).exists() {
        std::fs::create_dir_all(&config.roblox_path).unwrap();
    }

    let client_app_settings_file = format!("{}/{}", client_app_settings_path, config.client_app_settings_file);

    let mut file = File::create(client_app_settings_file).unwrap();

    let json = serde_json::to_string_pretty(&json).unwrap();

    file.write_all(json.as_bytes()).unwrap();


    Ok(())

}
