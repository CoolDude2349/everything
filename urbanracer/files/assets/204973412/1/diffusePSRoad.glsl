#ifdef MAPCOLOR
uniform vec3 material_diffuse;
#endif

#ifdef MAPTEXTURE
uniform sampler2D texture_diffuseMap;
#endif

uniform sampler2D detail_mask;

uniform vec3 detail_color;

void getAlbedo() {
	dAlbedo = vec3(1.0);

	#ifdef MAPCOLOR
	dAlbedo *= material_diffuse.rgb;
	#endif

	#ifdef MAPTEXTURE
    dAlbedo *= gammaCorrectInput(addAlbedoDetail(texture2D(texture_diffuseMap, vPositionW.xz * 0.1).$CH));
	dAlbedo = mix(dAlbedo,detail_color,texture2D(detail_mask, $UV).$CH);
	#endif

	#ifdef MAPVERTEX
	dAlbedo *= gammaCorrectInput(saturate(vVertexColor.$VC));
	#endif
}