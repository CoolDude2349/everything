#ifdef MAPCOLOR
uniform vec3 material_diffuse;
#endif

#ifdef MAPTEXTURE
uniform sampler2D texture_diffuseMap;
#endif

uniform sampler2D detail_mask;
uniform sampler2D dirt_texture;

void getAlbedo() {
	dAlbedo = vec3(1.0);

	#ifdef MAPCOLOR
	dAlbedo *= material_diffuse.rgb;
	#endif

	#ifdef MAPTEXTURE
    //dAlbedo *= gammaCorrectInput(addAlbedoDetail(texture2D(texture_diffuseMap, vPositionW.xz * 0.1).$CH));
	//dAlbedo *= texture2D(detail_mask, vPositionW.xz * 0.01).$CH;

	vec3 grass = texture2D(texture_diffuseMap, vPositionW.xz * 0.1).$CH;
	vec3 dirt = texture2D(dirt_texture, vPositionW.xz * 0.1).$CH;
	vec3 mask = texture2D(detail_mask, vPositionW.xz * 0.01).$CH;

	float edge0 = 0.47;
	float edge1 = 0.53;
	vec3 sm = clamp((mask - edge0) / (edge1 - edge0), 0.0, 1.0);

	//dAlbedo = mix(grass ,dirt , round(mask));
	dAlbedo = mix(grass ,dirt , sm);
	dAlbedo *= mask + 0.9;
	dAlbedo *= gammaCorrectInput(dAlbedo);


	#endif

	#ifdef MAPVERTEX
	dAlbedo *= gammaCorrectInput(saturate(vVertexColor.$VC));
	#endif
}