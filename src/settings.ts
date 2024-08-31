type PatchOption = 
    | {
        type: "checkbox",
        default: boolean
        label: string
        description: string
        vmodel: string
      }
    | {
        type: "dropdown",
        default: string
        label: string
        description: string
        vmodel: string
        options: string[]
    }


const PatchSettings = {
    Renderer: [
        {
            type: "dropdown",
            default: "Metal",
            label: "Framework",
            description: "Choose a rendering framework",
            ModelView: "settings.Renderer.Framework",
            options: ["Metal", "Vulkan", "OpenGL"]
        }
    ]
}

export { PatchSettings }
export type { PatchOption }
