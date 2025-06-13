uniform sampler2D texture_normalMap;
uniform float material_bumpiness;

void getNormal() {
	
	#ifdef MAPTEXTURE
    vec3 normalMap = unpackNormal(texture2D(texture_normalMap, vPositionW.xz * 0.1, textureBias));
    normalMap = mix(vec3(0.0, 0.0, 1.0), normalMap, material_bumpiness);
    dNormalW = normalize(dTBN * addNormalDetail(normalMap));
	#else
		dNormalW = dVertexNormalW;
	#endif
}

