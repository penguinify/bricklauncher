
use crate::commands::api;
#[tauri::command]
pub fn get_version() -> Result<String, String> {
    let config = api::get_config();

    Ok(config.version)
}
