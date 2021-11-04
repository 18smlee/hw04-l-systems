#version 300 es
precision highp float;

in vec4 fs_Col;
in vec4 fs_Pos;
in vec4 fs_Nor;
in vec4 fs_LightVec;
in vec2 fs_UV;
in vec4 fs_MeshId;
in vec4 fs_InstanceId;

out vec4 out_Col;
uniform sampler2D u_barkTexture;
uniform sampler2D u_leafTexture;
uniform sampler2D u_potTexture;
uniform sampler2D u_groundTexture;
uniform sampler2D u_appleTexture;
uniform sampler2D u_mulchTexture;

void main()
{
    vec4 diffuseColor = fs_Col;

    // Draws texture depending on the Mesh Id
    if (fs_MeshId[0] == 0.0) {
        diffuseColor = texture(u_barkTexture, fs_UV);
    } else if (fs_MeshId[0] == 1.0) {
        diffuseColor = texture(u_leafTexture, fs_UV);
    } else if (fs_MeshId[0] == 2.0) {
        diffuseColor = texture(u_potTexture, fs_UV);
    } else if (fs_MeshId[0] == 3.0) {
        diffuseColor = texture(u_groundTexture, fs_UV);
    } else if (fs_MeshId[0] == 4.0) {
        diffuseColor = texture(u_appleTexture, fs_UV);
        diffuseColor.r = diffuseColor.r * 1.2;
    } else if (fs_MeshId[0] == 5.0) {
        diffuseColor = texture(u_mulchTexture, fs_UV);
    }
   
    float diffuseTerm = dot(normalize(fs_Nor), normalize(fs_LightVec));
    diffuseTerm = clamp(diffuseTerm, 0.0, 1.0);
    float ambientTerm = 0.4;
    float lightIntensity = diffuseTerm + ambientTerm;

    out_Col = vec4(diffuseColor.rgb * lightIntensity, 1.0);
}
