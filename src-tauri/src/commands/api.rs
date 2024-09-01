use serde::{Deserialize, Serialize};
use serde_json;
use expanduser::expanduser;
use std::fs;

#[derive(Serialize, Deserialize)]
pub struct Config {
    pub roblox_path: String,
    pub client_app_settings_path: String,
    pub client_app_settings_file: String,
    pub version: String,
    pub cache_path: String,
    pub cache_file: String,
}


impl Config {
    pub fn new() -> Config {
        Config {
            roblox_path: "/Applications/Roblox.app/".to_string(),
            client_app_settings_path: "Contents/MacOS/ClientSettings/".to_string(),
            client_app_settings_file: "ClientAppSettings.json".to_string(),
            version: "0.1.0".to_string(),
            cache_path: "~/.cache/bricklauncher/".to_string(),
            cache_file: "cache.json".to_string(),
        }
    }
}



pub fn get_config() -> Config {

    let path = expanduser("~/.config/bricklauncher/").expect("Failed to expand user");

    if !path.exists() {
        fs::create_dir_all(&path).unwrap();
    }

    let config_path = path.join("config.json");

    if !config_path.exists() {
        let config = Config::new();
        let config_json = serde_json::to_string(&config).unwrap();
        fs::write(&config_path, config_json).expect("Failed to write config file");
        return config;
    }

    let config_json = fs::read_to_string(&config_path).expect("Failed to read config file");

    let config: Config = serde_json::from_str(&config_json).expect("Failed to parse config file");

    return config;

}
