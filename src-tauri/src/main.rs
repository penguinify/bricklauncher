// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::launch_roblox::launch_roblox,
            commands::patch_roblox::patch_roblox,
            commands::get_version::get_version,
            commands::cache::set_cache,
            commands::cache::get_cache,
            commands::verify_files::verify_files,
            commands::api::edit_config,
            commands::api::get_config,
            commands::cache::set_custom_fflags_cache,
            commands::cache::get_custom_fflags_cache,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");


}
