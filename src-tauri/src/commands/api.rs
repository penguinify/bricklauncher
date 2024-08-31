use serde::{Deserialize, Serialize};
use std::env::current_dir;

#[derive(Serialize, Deserialize)]
pub struct Config {
    pub roblox_path: String,
    pub client_app_settings_path: String,
    pub client_app_settings_file: String,
    pub version: String,
    pub cache_path: String,
    pub cache_file: String,
}

pub fn get_config() -> Config {

    let mut path = current_dir().unwrap();
    path.push("config.json");

    let config = std::fs::read_to_string(path).unwrap();
    let config: Config = serde_json::from_str(&config).unwrap();
    config
}
