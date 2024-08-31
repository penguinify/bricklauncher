use crate::commands::api;
use expanduser::expanduser;
use serde_json::Value;

use std::io::prelude::*;

#[tauri::command]
pub fn set_cache(json: Value) -> Result<(), String> {
    let config = api::get_config();
    let cache_path = expanduser(&config.cache_path).unwrap();
    let cache_file = cache_path.join(&config.cache_file);

    if !std::path::Path::new(&cache_path).exists() {
        std::fs::create_dir_all(&cache_path).unwrap();
    }

    let mut file = std::fs::File::create(cache_file).unwrap();

    let json = serde_json::to_string_pretty(&json).unwrap();

    file.write_all(json.as_bytes()).unwrap();

    Ok(())
}

#[tauri::command]
pub fn get_cache() -> Result<Value, String> {
    let config = api::get_config();
    let cache_path = expanduser(&config.cache_path).unwrap();
    let cache_file = cache_path.join(&config.cache_file);

    if !std::path::Path::new(&cache_file).exists() {
        return Err("Cache file does not exist".to_string());
    }

    let file = std::fs::File::open(cache_file).unwrap();
    let reader = std::io::BufReader::new(file);

    let json: Value = serde_json::from_reader(reader).unwrap();

    Ok(json)
}
