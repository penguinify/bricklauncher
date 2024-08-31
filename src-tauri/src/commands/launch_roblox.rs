


use std::process::Command;
#[tauri::command]
pub fn launch_roblox() -> Result<(), String> {
    let output = Command::new("open")
        .args(&["/Applications/Roblox.app"])
        .output()
        .expect("failed to execute process");

    if output.status.success() {
        Ok(())
    } else {
        Err("failed to launch Roblox".to_string())
    }
}
