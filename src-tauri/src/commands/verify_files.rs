

use crate::commands::api;
#[tauri::command]
pub fn verify_files() -> std::string::String {
    let config = api::get_config();

    let roblox_path = std::path::Path::new(&config.roblox_path);

    if !roblox_path.exists() {
        return "no_roblox".to_string();
    }

    return "ok".to_string();

}
