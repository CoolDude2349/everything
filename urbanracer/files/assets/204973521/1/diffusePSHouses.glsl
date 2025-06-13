#ifdef MAPCOLOR
uniform vec3 material_diffuse;
#endif

#ifdef MAPTEXTURE
uniform sampler2D texture_diffuseMap;
#endif

uniform vec3 color_top;
uniform vec3 color_bottom;

void getAlbedo() {
	dAlbedo = vec3(1.0);

	#ifdef MAPCOLOR
	dAlbedo *= material_diffuse.rgb;
	#endif

	#ifdef MAPTEXTURE
    dAlbedo *= gammaCorrectInput(addAlbedoDetail(texture2D(texture_diffuseMap, $UV).$CH));
    //dAlbedo = mix(color_bottom,dAlbedo,clamp((vPositionW.y * 0.05)+0.1,0.0,1.0));
	dAlbedo *= color_bottom * clamp((vPositionW.y * 0.05)+0.1,0.0,1.0);

	//dAlbedo = mix(dAlbedo,detail_color,texture2D(detail_mask, $UV).$CH);
	#endif

	#ifdef MAPVERTEX
	dAlbedo *= gammaCorrectInput(saturate(vVertexColor.$VC));
	#endif
}