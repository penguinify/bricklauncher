
use std::env;

#[tauri::command]
pub fn get_version() -> Result<String, String> {    
    let version = env!("CARGO_PKG_VERSION");
    Ok(version.to_string())

    
}
