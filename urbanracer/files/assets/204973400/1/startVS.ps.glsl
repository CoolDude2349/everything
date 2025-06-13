uniform float uCurv;
uniform float uSlope;

void main(void) {
    gl_Position = getPosition();

    //float dist = sqrt((gl_Position.x * gl_Position.x) + (gl_Position.z * gl_Position.z));
    //gl_Position.y -= dist*0.5;
     
    
    gl_Position.y -= (gl_Position.z * gl_Position.z) * 0.005;
;