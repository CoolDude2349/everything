function createUnityInstance(e, t, n) {
    function r(e) {
        var t = "unhandledrejection" == e.type && "object" == typeof e.reason ? e.reason : "object" == typeof e.error ? e.error : null
          , n = t ? t.toString() : "string" == typeof e.message ? e.message : "string" == typeof e.reason ? e.reason : "";
        if (t && "string" == typeof t.stack && (n += "\n" + t.stack.substring(t.stack.lastIndexOf(n, 0) ? 0 : n.length).replace(/(^\n*|\n*$)/g, "")),
        n && c.stackTraceRegExp && c.stackTraceRegExp.test(n)) {
            var r = e instanceof ErrorEvent ? e.filename : t && "string" == typeof t.fileName ? t.fileName : t && "string" == typeof t.sourceURL ? t.sourceURL : ""
              , o = e instanceof ErrorEvent ? e.lineno : t && "number" == typeof t.lineNumber ? t.lineNumber : t && "number" == typeof t.line ? t.line : 0;
            i(n, r, o)
        }
    }
    function o(e) {
        e.preventDefault()
    }
    function i(e, t, n) {
        if (c.startupErrorHandler)
            return void c.startupErrorHandler(e, t, n);
        if (!(c.errorHandler && c.errorHandler(e, t, n) || (console.log("Invoking error handler due to\n" + e),
        "function" == typeof dump && dump("Invoking error handler due to\n" + e),
        e.indexOf("UnknownError") != -1 || e.indexOf("Program terminated with exit(0)") != -1 || i.didShowErrorMessage))) {
            var e = "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" + e;
            e.indexOf("DISABLE_EXCEPTION_CATCHING") != -1 ? e = "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace." : e.indexOf("Cannot enlarge memory arrays") != -1 ? e = "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings." : e.indexOf("Invalid array buffer length") == -1 && e.indexOf("Invalid typed array length") == -1 && e.indexOf("out of memory") == -1 && e.indexOf("could not allocate memory") == -1 || (e = "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."),
            alert(e),
            i.didShowErrorMessage = !0
        }
    }
    function s(e, t) {
        if ("symbolsUrl" != e) {
            var r = c.downloadProgress[e];
            r || (r = c.downloadProgress[e] = {
                started: !1,
                finished: !1,
                lengthComputable: !1,
                total: 0,
                loaded: 0
            }),
            "object" != typeof t || "progress" != t.type && "load" != t.type || (r.started || (r.started = !0,
            r.lengthComputable = t.lengthComputable,
            r.total = t.total),
            r.loaded = t.loaded,
            "load" == t.type && (r.finished = !0));
            var o = 0
              , i = 0
              , s = 0
              , a = 0
              , d = 0;
            for (var e in c.downloadProgress) {
                var r = c.downloadProgress[e];
                if (!r.started)
                    return 0;
                s++,
                r.lengthComputable ? (o += r.loaded,
                i += r.total,
                a++) : r.finished || d++
            }
            var f = s ? (s - d - (i ? a * (i - o) / i : 0)) / s : 0;
            n(.9 * f)
        }
    }
    function a(e, t, n) {
        for (var r in w)
            if (w[r].hasUnityMarker(e)) {
                t && console.log('You can reduce startup time if you configure your web server to add "Content-Encoding: ' + r + '" response header when serving "' + t + '" file.');
                var o = w[r];
                if (!o.worker) {
                    var i = URL.createObjectURL(new Blob(["this.require = ", o.require.toString(), "; this.decompress = ", o.decompress.toString(), "; this.onmessage = ", function(e) {
                        var t = {
                            id: e.data.id,
                            decompressed: this.decompress(e.data.compressed)
                        };
                        postMessage(t, t.decompressed ? [t.decompressed.buffer] : [])
                    }
                    .toString(), "; postMessage({ ready: true });"],{
                        type: "application/javascript"
                    }));
                    o.worker = new Worker(i),
                    o.worker.onmessage = function(e) {
                        return e.data.ready ? void URL.revokeObjectURL(i) : (this.callbacks[e.data.id](e.data.decompressed),
                        void delete this.callbacks[e.data.id])
                    }
                    ,
                    o.worker.callbacks = {},
                    o.worker.nextCallbackId = 0
                }
                var s = o.worker.nextCallbackId++;
                return o.worker.callbacks[s] = n,
                void o.worker.postMessage({
                    id: s,
                    compressed: e
                }, [e.buffer])
            }
        n(e)
    }
    function d(e) {
        return new Promise(function(t, n) {
            s(e);
            var r = c.companyName && c.productName ? new c.XMLHttpRequest({
                companyName: c.companyName,
                productName: c.productName,
                cacheControl: c.cacheControl(c[e])
            }) : new XMLHttpRequest;
            r.open("GET", c[e]),
            r.responseType = "arraybuffer",
            r.addEventListener("progress", function(t) {
                s(e, t)
            }),
            r.addEventListener("load", function(n) {
                s(e, n),
                a(new Uint8Array(r.response), c[e], t)
            }),
            r.send()
        }
        )
    }
    function f() {
        return d("frameworkUrl").then(function(e) {
            e = `
            function unityFramework(Module) {
    var Module = typeof Module !== "undefined" ? Module : {};
    ;var stackTraceReference = "(^|\\n)(\\s+at\\s+|)jsStackTrace(\\s+\\(|@)([^\\n]+):\\d+:\\d+(\\)|)(\\n|$)";
    var stackTraceReferenceMatch = jsStackTrace().match(new RegExp(stackTraceReference));
    if (stackTraceReferenceMatch)
        Module.stackTraceRegExp = new RegExp(stackTraceReference.replace("([^\\n]+)", stackTraceReferenceMatch[4].replace(/[\\^${}[\]().*+?|]/g, "\\$&")).replace("jsStackTrace", "[^\\n]+"));
    var abort = (function(what) {
        if (ABORT)
            return;
        ABORT = true;
        EXITSTATUS = 1;
        if (typeof ENVIRONMENT_IS_PTHREAD !== "undefined" && ENVIRONMENT_IS_PTHREAD)
            console.error("Pthread aborting at " + (new Error).stack);
        if (what !== undefined) {
            out(what);
            err(what);
            what = JSON.stringify(what)
        } else {
            what = ""
        }
        var message = "abort(" + what + ") at " + stackTrace();
        if (Module.abortHandler && Module.abortHandler(message))
            return;
        throw message
    }
    );
    if (typeof ENVIRONMENT_IS_PTHREAD === "undefined" || !ENVIRONMENT_IS_PTHREAD) {
        Module["preRun"].push((function() {
            var unityFileSystemInit = Module["unityFileSystemInit"] || (function() {
                FS.mkdir("/idbfs");
                FS.mount(IDBFS, {}, "/idbfs");
                Module.addRunDependency("JS_FileSystem_Mount");
                FS.syncfs(true, (function(err) {
                    if (err)
                        console.log("IndexedDB is not available. Data will not persist in cache and PlayerPrefs will not be saved.");
                    Module.removeRunDependency("JS_FileSystem_Mount")
                }
                ))
            }
            );
            unityFileSystemInit()
        }
        ))
    }
    Module["SetFullscreen"] = (function(fullscreen) {
        if (typeof runtimeInitialized === "undefined" || !runtimeInitialized) {
            console.log("Runtime not initialized yet.")
        } else if (typeof JSEvents === "undefined") {
            console.log("Player not loaded yet.")
        } else {
            var tmp = JSEvents.canPerformEventHandlerRequests;
            JSEvents.canPerformEventHandlerRequests = (function() {
                return 1
            }
            );
            Module.ccall("SetFullscreen", null, ["number"], [fullscreen]);
            JSEvents.canPerformEventHandlerRequests = tmp
        }
    }
    );
    var MediaDevices = [];
    if (typeof ENVIRONMENT_IS_PTHREAD === "undefined" || !ENVIRONMENT_IS_PTHREAD) {
        Module["preRun"].push((function() {
            var enumerateMediaDevices = (function() {
                var getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
                if (!getMedia)
                    return;
                function addDevice(label) {
                    label = label ? label : "device #" + MediaDevices.length;
                    var device = {
                        deviceName: label,
                        refCount: 0,
                        video: null
                    };
                    MediaDevices.push(device)
                }
                if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                    if (typeof MediaStreamTrack == "undefined" || typeof MediaStreamTrack.getSources == "undefined") {
                        console.log("Media Devices cannot be enumerated on this browser.");
                        return
                    }
                    function gotSources(sourceInfos) {
                        for (var i = 0; i !== sourceInfos.length; ++i) {
                            var sourceInfo = sourceInfos[i];
                            if (sourceInfo.kind === "video")
                                addDevice(sourceInfo.label)
                        }
                    }
                    MediaStreamTrack.getSources(gotSources)
                }
                navigator.mediaDevices.enumerateDevices().then((function(devices) {
                    devices.forEach((function(device) {
                        if (device.kind == "videoinput")
                            addDevice(device.label)
                    }
                    ))
                }
                )).catch((function(err) {
                    console.log(err.name + ": " + error.message)
                }
                ))
            }
            );
            enumerateMediaDevices()
        }
        ))
    }
    function SendMessage(gameObject, func, param) {
        if (param === undefined)
            Module.ccall("SendMessage", null, ["string", "string"], [gameObject, func]);
        else if (typeof param === "string")
            Module.ccall("SendMessageString", null, ["string", "string", "string"], [gameObject, func, param]);
        else if (typeof param === "number")
            Module.ccall("SendMessageFloat", null, ["string", "string", "number"], [gameObject, func, param]);
        else
            throw "" + param + " is does not have a type which is supported by SendMessage."
    }
    Module["SendMessage"] = SendMessage;
    var moduleOverrides = {};
    var key;
    for (key in Module) {
        if (Module.hasOwnProperty(key)) {
            moduleOverrides[key] = Module[key]
        }
    }
    Module["arguments"] = [];
    Module["thisProgram"] = "./this.program";
    Module["quit"] = (function(status, toThrow) {
        throw toThrow
    }
    );
    Module["preRun"] = [];
    Module["postRun"] = [];
    var ENVIRONMENT_IS_WEB = false;
    var ENVIRONMENT_IS_WORKER = false;
    var ENVIRONMENT_IS_NODE = false;
    var ENVIRONMENT_IS_SHELL = false;
    ENVIRONMENT_IS_WEB = typeof window === "object";
    ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
    ENVIRONMENT_IS_NODE = typeof process === "object" && typeof require === "function" && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
    ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
    var scriptDirectory = "";
    function locateFile(path) {
        if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory)
        } else {
            return scriptDirectory + path
        }
    }
    if (ENVIRONMENT_IS_NODE) {
        scriptDirectory = __dirname + "/";
        var nodeFS;
        var nodePath;
        Module["read"] = function shell_read(filename, binary) {
            var ret;
            if (!nodeFS)
                nodeFS = require("fs");
            if (!nodePath)
                nodePath = require("path");
            filename = nodePath["normalize"](filename);
            ret = nodeFS["readFileSync"](filename);
            return binary ? ret : ret.toString()
        }
        ;
        Module["readBinary"] = function readBinary(filename) {
            var ret = Module["read"](filename, true);
            if (!ret.buffer) {
                ret = new Uint8Array(ret)
            }
            assert(ret.buffer);
            return ret
        }
        ;
        if (process["argv"].length > 1) {
            Module["thisProgram"] = process["argv"][1].replace(/\\/g, "/")
        }
        Module["arguments"] = process["argv"].slice(2);
        if (typeof module !== "undefined") {
            module["exports"] = Module
        }
        process["on"]("uncaughtException", (function(ex) {
            if (!(ex instanceof ExitStatus)) {
                throw ex
            }
        }
        ));
        process["on"]("unhandledRejection", (function(reason, p) {
            process["exit"](1)
        }
        ));
        Module["quit"] = (function(status) {
            process["exit"](status)
        }
        );
        Module["inspect"] = (function() {
            return "[Emscripten Module object]"
        }
        )
    } else if (ENVIRONMENT_IS_SHELL) {
        if (typeof read != "undefined") {
            Module["read"] = function shell_read(f) {
                return read(f)
            }
        }
        Module["readBinary"] = function readBinary(f) {
            var data;
            if (typeof readbuffer === "function") {
                return new Uint8Array(readbuffer(f))
            }
            data = read(f, "binary");
            assert(typeof data === "object");
            return data
        }
        ;
        if (typeof scriptArgs != "undefined") {
            Module["arguments"] = scriptArgs
        } else if (typeof arguments != "undefined") {
            Module["arguments"] = arguments
        }
        if (typeof quit === "function") {
            Module["quit"] = (function(status) {
                quit(status)
            }
            )
        }
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WEB) {
            if (document.currentScript) {
                scriptDirectory = document.currentScript.src
            }
        } else {
            scriptDirectory = self.location.href
        }
        if (scriptDirectory.indexOf("blob:") !== 0) {
            scriptDirectory = scriptDirectory.split("/").slice(0, -1).join("/") + "/"
        } else {
            scriptDirectory = ""
        }
        Module["read"] = function shell_read(url) {
            var xhr = new XMLHttpRequest;
            xhr.open("GET", url, false);
            xhr.send(null);
            return xhr.responseText
        }
        ;
        if (ENVIRONMENT_IS_WORKER) {
            Module["readBinary"] = function readBinary(url) {
                var xhr = new XMLHttpRequest;
                xhr.open("GET", url, false);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
                return new Uint8Array(xhr.response)
            }
        }
        Module["readAsync"] = function readAsync(url, onload, onerror) {
            var xhr = new XMLHttpRequest;
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = function xhr_onload() {
                if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                    onload(xhr.response);
                    return
                }
                onerror()
            }
            ;
            xhr.onerror = onerror;
            xhr.send(null)
        }
        ;
        Module["setWindowTitle"] = (function(title) {
            document.title = title
        }
        )
    } else {}
    var out = Module["print"] || (typeof console !== "undefined" ? console.log.bind(console) : typeof print !== "undefined" ? print : null);
    var err = Module["printErr"] || (typeof printErr !== "undefined" ? printErr : typeof console !== "undefined" && console.warn.bind(console) || out);
    for (key in moduleOverrides) {
        if (moduleOverrides.hasOwnProperty(key)) {
            Module[key] = moduleOverrides[key]
        }
    }
    moduleOverrides = undefined;
    var STACK_ALIGN = 16;
    function staticAlloc(size) {
        var ret = STATICTOP;
        STATICTOP = STATICTOP + size + 15 & -16;
        return ret
    }
    function dynamicAlloc(size) {
        var ret = HEAP32[DYNAMICTOP_PTR >> 2];
        var end = ret + size + 15 & -16;
        HEAP32[DYNAMICTOP_PTR >> 2] = end;
        if (end >= TOTAL_MEMORY) {
            var success = enlargeMemory();
            if (!success) {
                HEAP32[DYNAMICTOP_PTR >> 2] = ret;
                return 0
            }
        }
        return ret
    }
    function alignMemory(size, factor) {
        if (!factor)
            factor = STACK_ALIGN;
        var ret = size = Math.ceil(size / factor) * factor;
        return ret
    }
    function getNativeTypeSize(type) {
        switch (type) {
        case "i1":
        case "i8":
            return 1;
        case "i16":
            return 2;
        case "i32":
            return 4;
        case "i64":
            return 8;
        case "float":
            return 4;
        case "double":
            return 8;
        default:
            {
                if (type[type.length - 1] === "*") {
                    return 4
                } else if (type[0] === "i") {
                    var bits = parseInt(type.substr(1));
                    assert(bits % 8 === 0);
                    return bits / 8
                } else {
                    return 0
                }
            }
        }
    }
    function warnOnce(text) {
        if (!warnOnce.shown)
            warnOnce.shown = {};
        if (!warnOnce.shown[text]) {
            warnOnce.shown[text] = 1;
            err(text)
        }
    }
    var asm2wasmImports = {
        "f64-rem": (function(x, y) {
            return x % y
        }
        ),
        "debugger": (function() {
            debugger
        }
        )
    };
    var jsCallStartIndex = 1;
    var functionPointers = new Array(0);
    function addFunction(func, sig) {
        var base = 0;
        for (var i = base; i < base + 0; i++) {
            if (!functionPointers[i]) {
                functionPointers[i] = func;
                return jsCallStartIndex + i
            }
        }
        throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."
    }
    var funcWrappers = {};
    function getFuncWrapper(func, sig) {
        if (!func)
            return;
        assert(sig);
        if (!funcWrappers[sig]) {
            funcWrappers[sig] = {}
        }
        var sigCache = funcWrappers[sig];
        if (!sigCache[func]) {
            if (sig.length === 1) {
                sigCache[func] = function dynCall_wrapper() {
                    return dynCall(sig, func)
                }
            } else if (sig.length === 2) {
                sigCache[func] = function dynCall_wrapper(arg) {
                    return dynCall(sig, func, [arg])
                }
            } else {
                sigCache[func] = function dynCall_wrapper() {
                    return dynCall(sig, func, Array.prototype.slice.call(arguments))
                }
            }
        }
        return sigCache[func]
    }
    function makeBigInt(low, high, unsigned) {
        return unsigned ? +(low >>> 0) + +(high >>> 0) * 4294967296 : +(low >>> 0) + +(high | 0) * 4294967296
    }
    function dynCall(sig, ptr, args) {
        if (args && args.length) {
            return Module["dynCall_" + sig].apply(null, [ptr].concat(args))
        } else {
            return Module["dynCall_" + sig].call(null, ptr)
        }
    }
    var GLOBAL_BASE = 1024;
    var ABORT = 0;
    var EXITSTATUS = 0;
    function assert(condition, text) {
        if (!condition) {
            abort("Assertion failed: " + text)
        }
    }
    function getCFunc(ident) {
        var func = Module["_" + ident];
        assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
        return func
    }
    var JSfuncs = {
        "stackSave": (function() {
            stackSave()
        }
        ),
        "stackRestore": (function() {
            stackRestore()
        }
        ),
        "arrayToC": (function(arr) {
            var ret = stackAlloc(arr.length);
            writeArrayToMemory(arr, ret);
            return ret
        }
        ),
        "stringToC": (function(str) {
            var ret = 0;
            if (str !== null && str !== undefined && str !== 0) {
                var len = (str.length << 2) + 1;
                ret = stackAlloc(len);
                stringToUTF8(str, ret, len)
            }
            return ret
        }
        )
    };
    var toC = {
        "string": JSfuncs["stringToC"],
        "array": JSfuncs["arrayToC"]
    };
    function ccall(ident, returnType, argTypes, args, opts) {
        function convertReturnValue(ret) {
            if (returnType === "string")
                return Pointer_stringify(ret);
            if (returnType === "boolean")
                return Boolean(ret);
            return ret
        }
        var func = getCFunc(ident);
        var cArgs = [];
        var stack = 0;
        if (args) {
            for (var i = 0; i < args.length; i++) {
                var converter = toC[argTypes[i]];
                if (converter) {
                    if (stack === 0)
                        stack = stackSave();
                    cArgs[i] = converter(args[i])
                } else {
                    cArgs[i] = args[i]
                }
            }
        }
        var ret = func.apply(null, cArgs);
        ret = convertReturnValue(ret);
        if (stack !== 0)
            stackRestore(stack);
        return ret
    }
    function cwrap(ident, returnType, argTypes, opts) {
        argTypes = argTypes || [];
        var numericArgs = argTypes.every((function(type) {
            return type === "number"
        }
        ));
        var numericRet = returnType !== "string";
        if (numericRet && numericArgs && !opts) {
            return getCFunc(ident)
        }
        return (function() {
            return ccall(ident, returnType, argTypes, arguments, opts)
        }
        )
    }
    function setValue(ptr, value, type, noSafe) {
        type = type || "i8";
        if (type.charAt(type.length - 1) === "*")
            type = "i32";
        switch (type) {
        case "i1":
            HEAP8[ptr >> 0] = value;
            break;
        case "i8":
            HEAP8[ptr >> 0] = value;
            break;
        case "i16":
            HEAP16[ptr >> 1] = value;
            break;
        case "i32":
            HEAP32[ptr >> 2] = value;
            break;
        case "i64":
            tempI64 = [value >>> 0, (tempDouble = value,
            +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
            HEAP32[ptr >> 2] = tempI64[0],
            HEAP32[ptr + 4 >> 2] = tempI64[1];
            break;
        case "float":
            HEAPF32[ptr >> 2] = value;
            break;
        case "double":
            HEAPF64[ptr >> 3] = value;
            break;
        default:
            abort("invalid type for setValue: " + type)
        }
    }
    var ALLOC_NORMAL = 0;
    var ALLOC_STACK = 1;
    var ALLOC_STATIC = 2;
    var ALLOC_NONE = 4;
    function allocate(slab, types, allocator, ptr) {
        var zeroinit, size;
        if (typeof slab === "number") {
            zeroinit = true;
            size = slab
        } else {
            zeroinit = false;
            size = slab.length
        }
        var singleType = typeof types === "string" ? types : null;
        var ret;
        if (allocator == ALLOC_NONE) {
            ret = ptr
        } else {
            ret = [typeof _malloc === "function" ? _malloc : staticAlloc, stackAlloc, staticAlloc, dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length))
        }
        if (zeroinit) {
            var stop;
            ptr = ret;
            assert((ret & 3) == 0);
            stop = ret + (size & ~3);
            for (; ptr < stop; ptr += 4) {
                HEAP32[ptr >> 2] = 0
            }
            stop = ret + size;
            while (ptr < stop) {
                HEAP8[ptr++ >> 0] = 0
            }
            return ret
        }
        if (singleType === "i8") {
            if (slab.subarray || slab.slice) {
                HEAPU8.set(slab, ret)
            } else {
                HEAPU8.set(new Uint8Array(slab), ret)
            }
            return ret
        }
        var i = 0, type, typeSize, previousType;
        while (i < size) {
            var curr = slab[i];
            type = singleType || types[i];
            if (type === 0) {
                i++;
                continue
            }
            if (type == "i64")
                type = "i32";
            setValue(ret + i, curr, type);
            if (previousType !== type) {
                typeSize = getNativeTypeSize(type);
                previousType = type
            }
            i += typeSize
        }
        return ret
    }
    function getMemory(size) {
        if (!staticSealed)
            return staticAlloc(size);
        if (!runtimeInitialized)
            return dynamicAlloc(size);
        return _malloc(size)
    }
    function Pointer_stringify(ptr, length) {
        if (length === 0 || !ptr)
            return "";
        var hasUtf = 0;
        var t;
        var i = 0;
        while (1) {
            t = HEAPU8[ptr + i >> 0];
            hasUtf |= t;
            if (t == 0 && !length)
                break;
            i++;
            if (length && i == length)
                break
        }
        if (!length)
            length = i;
        var ret = "";
        if (hasUtf < 128) {
            var MAX_CHUNK = 1024;
            var curr;
            while (length > 0) {
                curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
                ret = ret ? ret + curr : curr;
                ptr += MAX_CHUNK;
                length -= MAX_CHUNK
            }
            return ret
        }
        return UTF8ToString(ptr)
    }
    var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
    function UTF8ArrayToString(u8Array, idx) {
        var endPtr = idx;
        while (u8Array[endPtr])
            ++endPtr;
        if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
            return UTF8Decoder.decode(u8Array.subarray(idx, endPtr))
        } else {
            var u0, u1, u2, u3, u4, u5;
            var str = "";
            while (1) {
                u0 = u8Array[idx++];
                if (!u0)
                    return str;
                if (!(u0 & 128)) {
                    str += String.fromCharCode(u0);
                    continue
                }
                u1 = u8Array[idx++] & 63;
                if ((u0 & 224) == 192) {
                    str += String.fromCharCode((u0 & 31) << 6 | u1);
                    continue
                }
                u2 = u8Array[idx++] & 63;
                if ((u0 & 240) == 224) {
                    u0 = (u0 & 15) << 12 | u1 << 6 | u2
                } else {
                    u3 = u8Array[idx++] & 63;
                    if ((u0 & 248) == 240) {
                        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u3
                    } else {
                        u4 = u8Array[idx++] & 63;
                        if ((u0 & 252) == 248) {
                            u0 = (u0 & 3) << 24 | u1 << 18 | u2 << 12 | u3 << 6 | u4
                        } else {
                            u5 = u8Array[idx++] & 63;
                            u0 = (u0 & 1) << 30 | u1 << 24 | u2 << 18 | u3 << 12 | u4 << 6 | u5
                        }
                    }
                }
                if (u0 < 65536) {
                    str += String.fromCharCode(u0)
                } else {
                    var ch = u0 - 65536;
                    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
                }
            }
        }
    }
    function UTF8ToString(ptr) {
        return UTF8ArrayToString(HEAPU8, ptr)
    }
    function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0))
            return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343) {
                var u1 = str.charCodeAt(++i);
                u = 65536 + ((u & 1023) << 10) | u1 & 1023
            }
            if (u <= 127) {
                if (outIdx >= endIdx)
                    break;
                outU8Array[outIdx++] = u
            } else if (u <= 2047) {
                if (outIdx + 1 >= endIdx)
                    break;
                outU8Array[outIdx++] = 192 | u >> 6;
                outU8Array[outIdx++] = 128 | u & 63
            } else if (u <= 65535) {
                if (outIdx + 2 >= endIdx)
                    break;
                outU8Array[outIdx++] = 224 | u >> 12;
                outU8Array[outIdx++] = 128 | u >> 6 & 63;
                outU8Array[outIdx++] = 128 | u & 63
            } else if (u <= 2097151) {
                if (outIdx + 3 >= endIdx)
                    break;
                outU8Array[outIdx++] = 240 | u >> 18;
                outU8Array[outIdx++] = 128 | u >> 12 & 63;
                outU8Array[outIdx++] = 128 | u >> 6 & 63;
                outU8Array[outIdx++] = 128 | u & 63
            } else if (u <= 67108863) {
                if (outIdx + 4 >= endIdx)
                    break;
                outU8Array[outIdx++] = 248 | u >> 24;
                outU8Array[outIdx++] = 128 | u >> 18 & 63;
                outU8Array[outIdx++] = 128 | u >> 12 & 63;
                outU8Array[outIdx++] = 128 | u >> 6 & 63;
                outU8Array[outIdx++] = 128 | u & 63
            } else {
                if (outIdx + 5 >= endIdx)
                    break;
                outU8Array[outIdx++] = 252 | u >> 30;
                outU8Array[outIdx++] = 128 | u >> 24 & 63;
                outU8Array[outIdx++] = 128 | u >> 18 & 63;
                outU8Array[outIdx++] = 128 | u >> 12 & 63;
                outU8Array[outIdx++] = 128 | u >> 6 & 63;
                outU8Array[outIdx++] = 128 | u & 63
            }
        }
        outU8Array[outIdx] = 0;
        return outIdx - startIdx
    }
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
    }
    function lengthBytesUTF8(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343)
                u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
            if (u <= 127) {
                ++len
            } else if (u <= 2047) {
                len += 2
            } else if (u <= 65535) {
                len += 3
            } else if (u <= 2097151) {
                len += 4
            } else if (u <= 67108863) {
                len += 5
            } else {
                len += 6
            }
        }
        return len
    }
    var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;
    function allocateUTF8(str) {
        var size = lengthBytesUTF8(str) + 1;
        var ret = _malloc(size);
        if (ret)
            stringToUTF8Array(str, HEAP8, ret, size);
        return ret
    }
    function allocateUTF8OnStack(str) {
        var size = lengthBytesUTF8(str) + 1;
        var ret = stackAlloc(size);
        stringToUTF8Array(str, HEAP8, ret, size);
        return ret
    }
    function demangle(func) {
        return func
    }
    function demangleAll(text) {
        var regex = /__Z[\w\d_]+/g;
        return text.replace(regex, (function(x) {
            var y = demangle(x);
            return x === y ? x : x + " [" + y + "]"
        }
        ))
    }
    function jsStackTrace() {
        var err = new Error;
        if (!err.stack) {
            try {
                throw new Error(0)
            } catch (e) {
                err = e
            }
            if (!err.stack) {
                return "(no stack trace available)"
            }
        }
        return err.stack.toString()
    }
    function stackTrace() {
        var js = jsStackTrace();
        if (Module["extraStackTrace"])
            js += "\n" + Module["extraStackTrace"]();
        return demangleAll(js)
    }
    var PAGE_SIZE = 16384;
    var WASM_PAGE_SIZE = 65536;
    var ASMJS_PAGE_SIZE = 16777216;
    var MIN_TOTAL_MEMORY = 16777216;
    function alignUp(x, multiple) {
        if (x % multiple > 0) {
            x += multiple - x % multiple
        }
        return x
    }
    var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
    function updateGlobalBuffer(buf) {
        Module["buffer"] = buffer = buf
    }
    function updateGlobalBufferViews() {
        Module["HEAP8"] = HEAP8 = new Int8Array(buffer);
        Module["HEAP16"] = HEAP16 = new Int16Array(buffer);
        Module["HEAP32"] = HEAP32 = new Int32Array(buffer);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(buffer);
        Module["HEAPU16"] = HEAPU16 = new Uint16Array(buffer);
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(buffer);
        Module["HEAPF32"] = HEAPF32 = new Float32Array(buffer);
        Module["HEAPF64"] = HEAPF64 = new Float64Array(buffer)
    }
    var STATIC_BASE, STATICTOP, staticSealed;
    var STACK_BASE, STACKTOP, STACK_MAX;
    var DYNAMIC_BASE, DYNAMICTOP_PTR;
    STATIC_BASE = STATICTOP = STACK_BASE = STACKTOP = STACK_MAX = DYNAMIC_BASE = DYNAMICTOP_PTR = 0;
    staticSealed = false;
    function abortOnCannotGrowMemory() {
        abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + TOTAL_MEMORY + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")
    }
    if (!Module["reallocBuffer"])
        Module["reallocBuffer"] = (function(size) {
            var ret;
            try {
                if (ArrayBuffer.transfer) {
                    ret = ArrayBuffer.transfer(buffer, size)
                } else {
                    var oldHEAP8 = HEAP8;
                    ret = new ArrayBuffer(size);
                    var temp = new Int8Array(ret);
                    temp.set(oldHEAP8)
                }
            } catch (e) {
                return false
            }
            var success = _emscripten_replace_memory(ret);
            if (!success)
                return false;
            return ret
        }
        );
    function enlargeMemory() {
        var PAGE_MULTIPLE = Module["usingWasm"] ? WASM_PAGE_SIZE : ASMJS_PAGE_SIZE;
        var LIMIT = 2147483648 - PAGE_MULTIPLE;
        if (HEAP32[DYNAMICTOP_PTR >> 2] > LIMIT) {
            return false
        }
        var OLD_TOTAL_MEMORY = TOTAL_MEMORY;
        TOTAL_MEMORY = Math.max(TOTAL_MEMORY, MIN_TOTAL_MEMORY);
        while (TOTAL_MEMORY < HEAP32[DYNAMICTOP_PTR >> 2]) {
            if (TOTAL_MEMORY <= 536870912) {
                TOTAL_MEMORY = alignUp(2 * TOTAL_MEMORY, PAGE_MULTIPLE)
            } else {
                TOTAL_MEMORY = Math.min(alignUp((3 * TOTAL_MEMORY + 2147483648) / 4, PAGE_MULTIPLE), LIMIT)
            }
        }
        var replacement = Module["reallocBuffer"](TOTAL_MEMORY);
        if (!replacement || replacement.byteLength != TOTAL_MEMORY) {
            TOTAL_MEMORY = OLD_TOTAL_MEMORY;
            return false
        }
        updateGlobalBuffer(replacement);
        updateGlobalBufferViews();
        return true
    }
    var byteLength;
    try {
        byteLength = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get);
        byteLength(new ArrayBuffer(4))
    } catch (e) {
        byteLength = (function(buffer) {
            return buffer.byteLength
        }
        )
    }
    var TOTAL_STACK = Module["TOTAL_STACK"] || 5242880;
    var TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 33554432;
    if (TOTAL_MEMORY < TOTAL_STACK)
        err("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + TOTAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")");
    if (Module["buffer"]) {
        buffer = Module["buffer"]
    } else {
        if (typeof WebAssembly === "object" && typeof WebAssembly.Memory === "function") {
            Module["wasmMemory"] = new WebAssembly.Memory({
                "initial": TOTAL_MEMORY / WASM_PAGE_SIZE
            });
            buffer = Module["wasmMemory"].buffer
        } else {
            buffer = new ArrayBuffer(TOTAL_MEMORY)
        }
        Module["buffer"] = buffer
    }
    updateGlobalBufferViews();
    function getTotalMemory() {
        return TOTAL_MEMORY
    }
    function callRuntimeCallbacks(callbacks) {
        while (callbacks.length > 0) {
            var callback = callbacks.shift();
            if (typeof callback == "function") {
                callback();
                continue
            }
            var func = callback.func;
            if (typeof func === "number") {
                if (callback.arg === undefined) {
                    Module["dynCall_v"](func)
                } else {
                    Module["dynCall_vi"](func, callback.arg)
                }
            } else {
                func(callback.arg === undefined ? null : callback.arg)
            }
        }
    }
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATMAIN__ = [];
    var __ATEXIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    var runtimeExited = false;
    function preRun() {
        if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function")
                Module["preRun"] = [Module["preRun"]];
            while (Module["preRun"].length) {
                addOnPreRun(Module["preRun"].shift())
            }
        }
        callRuntimeCallbacks(__ATPRERUN__)
    }
    function ensureInitRuntime() {
        if (runtimeInitialized)
            return;
        runtimeInitialized = true;
        callRuntimeCallbacks(__ATINIT__)
    }
    function preMain() {
        callRuntimeCallbacks(__ATMAIN__)
    }
    function exitRuntime() {
        callRuntimeCallbacks(__ATEXIT__);
        runtimeExited = true
    }
    function postRun() {
        if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function")
                Module["postRun"] = [Module["postRun"]];
            while (Module["postRun"].length) {
                addOnPostRun(Module["postRun"].shift())
            }
        }
        callRuntimeCallbacks(__ATPOSTRUN__)
    }
    function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb)
    }
    function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb)
    }
    function writeArrayToMemory(array, buffer) {
        HEAP8.set(array, buffer)
    }
    function writeAsciiToMemory(str, buffer, dontAddNull) {
        for (var i = 0; i < str.length; ++i) {
            HEAP8[buffer++ >> 0] = str.charCodeAt(i)
        }
        if (!dontAddNull)
            HEAP8[buffer >> 0] = 0
    }
    function unSign(value, bits, ignore) {
        if (value >= 0) {
            return value
        }
        return bits <= 32 ? 2 * Math.abs(1 << bits - 1) + value : Math.pow(2, bits) + value
    }
    function reSign(value, bits, ignore) {
        if (value <= 0) {
            return value
        }
        var half = bits <= 32 ? Math.abs(1 << bits - 1) : Math.pow(2, bits - 1);
        if (value >= half && (bits <= 32 || value > half)) {
            value = -2 * half + value
        }
        return value
    }
    var Math_abs = Math.abs;
    var Math_sqrt = Math.sqrt;
    var Math_ceil = Math.ceil;
    var Math_floor = Math.floor;
    var Math_pow = Math.pow;
    var Math_min = Math.min;
    var Math_clz32 = Math.clz32;
    var Math_trunc = Math.trunc;
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;
    function getUniqueRunDependency(id) {
        return id
    }
    function addRunDependency(id) {
        runDependencies++;
        if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies)
        }
    }
    function removeRunDependency(id) {
        runDependencies--;
        if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies)
        }
        if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
                clearInterval(runDependencyWatcher);
                runDependencyWatcher = null
            }
            if (dependenciesFulfilled) {
                var callback = dependenciesFulfilled;
                dependenciesFulfilled = null;
                callback()
            }
        }
    }
    Module["preloadedImages"] = {};
    Module["preloadedAudios"] = {};
    var dataURIPrefix = "data:application/octet-stream;base64,";
    function isDataURI(filename) {
        return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0
    }
    function integrateWasmJS() {
        var wasmTextFile = "build.wast";
        var wasmBinaryFile = "build.wasm";
        var asmjsCodeFile = "build.temp.asm.js";
        if (!isDataURI(wasmTextFile)) {
            wasmTextFile = locateFile(wasmTextFile)
        }
        if (!isDataURI(wasmBinaryFile)) {
            wasmBinaryFile = locateFile(wasmBinaryFile)
        }
        if (!isDataURI(asmjsCodeFile)) {
            asmjsCodeFile = locateFile(asmjsCodeFile)
        }
        var wasmPageSize = 64 * 1024;
        var info = {
            "global": null,
            "env": null,
            "asm2wasm": asm2wasmImports,
            "parent": Module
        };
        var exports = null;
        function mergeMemory(newBuffer) {
            var oldBuffer = Module["buffer"];
            if (newBuffer.byteLength < oldBuffer.byteLength) {
                err("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here")
            }
            var oldView = new Int8Array(oldBuffer);
            var newView = new Int8Array(newBuffer);
            newView.set(oldView);
            updateGlobalBuffer(newBuffer);
            updateGlobalBufferViews()
        }
        function fixImports(imports) {
            return imports
        }
        function getBinary() {
            try {
                if (Module["wasmBinary"]) {
                    return new Uint8Array(Module["wasmBinary"])
                }
                if (Module["readBinary"]) {
                    return Module["readBinary"](wasmBinaryFile)
                } else {
                    throw "both async and sync fetching of the wasm failed"
                }
            } catch (err) {
                abort(err)
            }
        }
        function getBinaryPromise() {
            if (!Module["wasmBinary"] && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function") {
                return fetch(wasmBinaryFile, {
                    credentials: "same-origin"
                }).then((function(response) {
                    if (!response["ok"]) {
                        throw "failed to load wasm binary file at '" + wasmBinaryFile + "'"
                    }
                    return response["arrayBuffer"]()
                }
                )).catch((function() {
                    return getBinary()
                }
                ))
            }
            return new Promise((function(resolve, reject) {
                resolve(getBinary())
            }
            ))
        }
        function doNativeWasm(global, env, providedBuffer) {
            if (typeof WebAssembly !== "object") {
                err("no native wasm support detected");
                return false
            }
            if (!(Module["wasmMemory"]instanceof WebAssembly.Memory)) {
                err("no native wasm Memory in use");
                return false
            }
            env["memory"] = Module["wasmMemory"];
            info["global"] = {
                "NaN": NaN,
                "Infinity": Infinity
            };
            info["global.Math"] = Math;
            info["env"] = env;
            function receiveInstance(instance, module) {
                exports = instance.exports;
                if (exports.memory)
                    mergeMemory(exports.memory);
                Module["asm"] = exports;
                Module["usingWasm"] = true;
                removeRunDependency("wasm-instantiate")
            }
            addRunDependency("wasm-instantiate");
            if (Module["instantiateWasm"]) {
                try {
                    return Module["instantiateWasm"](info, receiveInstance)
                } catch (e) {
                    err("Module.instantiateWasm callback failed with error: " + e);
                    return false
                }
            }
            function receiveInstantiatedSource(output) {
                receiveInstance(output["instance"], output["module"])
            }
            function instantiateArrayBuffer(receiver) {
                getBinaryPromise().then((function(binary) {
                    return WebAssembly.instantiate(binary, info)
                }
                )).then(receiver).catch((function(reason) {
                    err("failed to asynchronously prepare wasm: " + reason);
                    abort(reason)
                }
                ))
            }
            if (!Module["wasmBinary"] && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
                WebAssembly.instantiateStreaming(fetch(wasmBinaryFile, {
                    credentials: "same-origin"
                }), info).then(receiveInstantiatedSource).catch((function(reason) {
                    err("wasm streaming compile failed: " + reason);
                    err("falling back to ArrayBuffer instantiation");
                    instantiateArrayBuffer(receiveInstantiatedSource)
                }
                ))
            } else {
                instantiateArrayBuffer(receiveInstantiatedSource)
            }
            return {}
        }
        Module["asmPreload"] = Module["asm"];
        var asmjsReallocBuffer = Module["reallocBuffer"];
        var wasmReallocBuffer = (function(size) {
            var PAGE_MULTIPLE = Module["usingWasm"] ? WASM_PAGE_SIZE : ASMJS_PAGE_SIZE;
            size = alignUp(size, PAGE_MULTIPLE);
            var old = Module["buffer"];
            var oldSize = old.byteLength;
            if (Module["usingWasm"]) {
                try {
                    var result = Module["wasmMemory"].grow((size - oldSize) / wasmPageSize);
                    if (result !== (-1 | 0)) {
                        return Module["buffer"] = Module["wasmMemory"].buffer
                    } else {
                        return null
                    }
                } catch (e) {
                    return null
                }
            }
        }
        );
        Module["reallocBuffer"] = (function(size) {
            if (finalMethod === "asmjs") {
                return asmjsReallocBuffer(size)
            } else {
                return wasmReallocBuffer(size)
            }
        }
        );
        var finalMethod = "";
        Module["asm"] = (function(global, env, providedBuffer) {
            env = fixImports(env);
            if (!env["table"]) {
                var TABLE_SIZE = Module["wasmTableSize"];
                if (TABLE_SIZE === undefined)
                    TABLE_SIZE = 1024;
                var MAX_TABLE_SIZE = Module["wasmMaxTableSize"];
                if (typeof WebAssembly === "object" && typeof WebAssembly.Table === "function") {
                    if (MAX_TABLE_SIZE !== undefined) {
                        env["table"] = new WebAssembly.Table({
                            "initial": TABLE_SIZE,
                            "maximum": MAX_TABLE_SIZE,
                            "element": "anyfunc"
                        })
                    } else {
                        env["table"] = new WebAssembly.Table({
                            "initial": TABLE_SIZE,
                            element: "anyfunc"
                        })
                    }
                } else {
                    env["table"] = new Array(TABLE_SIZE)
                }
                Module["wasmTable"] = env["table"]
            }
            if (!env["memoryBase"]) {
                env["memoryBase"] = Module["STATIC_BASE"]
            }
            if (!env["tableBase"]) {
                env["tableBase"] = 0
            }
            var exports;
            exports = doNativeWasm(global, env, providedBuffer);
            assert(exports, "no binaryen method succeeded.");
            return exports
        }
        );
    }
    integrateWasmJS();
    var ASM_CONSTS = [(function() {
        return Module.webglContextAttributes.premultipliedAlpha
    }
    ), (function() {
        return Module.webglContextAttributes.preserveDrawingBuffer
    }
    ), (function($0) {
        throw new Error('Internal Unity error: gles::GetProcAddress("' + Pointer_stringify($0) + '") was called but gles::GetProcAddress() is not implemented on Unity WebGL. Please report a bug.')
    }
    ), (function() {
        return typeof Module.shouldQuit != "undefined"
    }
    ), (function() {
        for (var id in Module.intervals) {
            window.clearInterval(id)
        }
        Module.intervals = {};
        for (var i = 0; i < Module.deinitializers.length; i++) {
            Module.deinitializers[i]()
        }
        Module.deinitializers = [];
        if (typeof Module.onQuit == "function")
            Module.onQuit()
    }
    )];
    function _emscripten_asm_const_i(code) {
        return ASM_CONSTS[code]()
    }
    function _emscripten_asm_const_sync_on_main_thread_i(code) {
        return ASM_CONSTS[code]()
    }
    function _emscripten_asm_const_ii(code, a0) {
        return ASM_CONSTS[code](a0)
    }
    STATIC_BASE = GLOBAL_BASE;
    STATICTOP = STATIC_BASE + 2308192;
    __ATINIT__.push({
        func: (function() {
            __GLOBAL__sub_I_AccessibilityScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_AIScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_AndroidJNIScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_AnimationScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Animation_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Animation_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Animation_7_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Animation_Constraints_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_AnimationClip_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_AssetBundleScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_AssetBundle_Public_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_AudioScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Video_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Audio_Public_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Audio_Public_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Audio_Public_3_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Audio_Public_ScriptBindings_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Audio_Public_sound_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_ClothScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Cloth_0_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_18()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_nvcloth_src_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_nvcloth_src_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_SwInterCollision_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_SwSolverKernel_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_artifacts_WebGL_codegenerator_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_GfxDevice_opengles_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_VirtualFileSystem_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Input_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_GfxDeviceNull_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_External_ProphecySDK_BlitOperations_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_2D_Renderer_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_2D_Sorting_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_2D_SpriteAtlas_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Allocator_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Application_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_BaseClasses_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_BaseClasses_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_BaseClasses_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_BaseClasses_3_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Burst_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Camera_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Camera_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Camera_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Camera_6_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Camera_7_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Camera_8_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Shadows_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Camera_Culling_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_GUITexture_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Camera_RenderLoops_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Camera_RenderLoops_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Containers_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Core_Callbacks_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_File_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Geometry_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_0_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_104()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_4_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_5_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_6_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_8_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_10_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_11_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_Billboard_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_CommandBuffer_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_LOD_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_Mesh_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_Mesh_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_Mesh_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_Mesh_4_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_Mesh_5_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Graphics_ScriptableRenderLoop_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Interfaces_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Interfaces_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Interfaces_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Jobs_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Jobs_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Jobs_Internal_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Jobs_ScriptBindings_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Math_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Math_Random_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Misc_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Misc_2_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_131()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Misc_4_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Misc_5_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_PreloadManager_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Profiler_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Profiler_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Profiler_ExternalGPUProfiler_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Profiler_ScriptBindings_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_SceneManager_0_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_7754()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Shaders_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Shaders_3_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Shaders_GpuPrograms_0_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_9()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Shaders_ShaderImpl_2_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_8911()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Transform_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Transform_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Utilities_2_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_9307()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Utilities_5_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Utilities_6_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Utilities_7_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Utilities_9_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_AssetBundleFileSystem_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Modules_0_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_18_1173()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_19()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_20()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Profiler_Public_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Profiler_Runtime_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Export_Unsafe_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_GfxDevice_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_GfxDevice_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_GfxDevice_3_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_GfxDevice_4_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_GfxDevice_5_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_PluginInterface_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Director_Core_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_ScriptingBackend_Il2Cpp_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Scripting_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Scripting_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Scripting_3_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Mono_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_TemplateInstantiations_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Scripting_APIUpdating_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Serialize_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Serialize_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_PlatformDependent_WebGL_Source_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_PlatformDependent_WebGL_Source_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Mesh_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_LogAssert_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Shader_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_PlatformDependent_WebGL_External_baselib_builds_Source_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_DirectorScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_DSPGraph_Public_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_GridScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Grid_Public_0_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_3780()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_IMGUIScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_IMGUI_0_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_23()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_IMGUI_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_InputLegacyScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_InputScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Input_Private_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_ParticleSystemScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_ParticleSystem_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_ShapeModule_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_UVModule_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Physics2DScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Physics2D_Public_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Physics2D_Public_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_PhysicsScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Physics_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Physics_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_PhysicsQuery_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_SubsystemsScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Subsystems_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_TerrainScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Terrain_Public_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Terrain_Public_1_cpp()
        }
        )
    }, {
        func: (function() {
            ___cxx_global_var_init_89()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Terrain_Public_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Terrain_Public_3_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Terrain_VR_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_TextCoreScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_TextCore_Native_FontEngine_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_TextRenderingScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_TextRendering_Public_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_TilemapScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Tilemap_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Tilemap_Public_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_UIElementsNativeScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_External_Yoga_Yoga_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_UIScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_UI_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_UI_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_UI_2_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_umbra_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_UnityAnalyticsScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_UnityAdsSettings_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_UnityWebRequestScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_UnityWebRequest_Public_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_VFXScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_VFX_Public_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_VFX_Public_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_VFX_Public_Systems_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_VisualEffectAsset_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_VideoScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_Video_Public_Base_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_VRScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_VR_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_VR_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_PluginInterfaceVR_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Wind_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_XRScriptingClasses_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_XR_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_XRAudio_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_XRPreInit_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_XR_Public_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_XR_Stats_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_XR_Subsystems_Display_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_1_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_XR_Subsystems_Meshing_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Modules_XR_Tracing_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_XRWindowsLocatableCamera_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_External_il2cpp_builds_external_baselib_Platforms_WebGL_Source_0_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Lump_libil2cpp_os_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Lump_libil2cpp_icalls_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Lump_libil2cpp_vm_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Lump_libil2cpp_metadata_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Lump_libil2cpp_utils_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Lump_libil2cpp_vm_utils_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Lump_libil2cpp_mono_cpp()
        }
        )
    }, {
        func: (function() {
            __GLOBAL__sub_I_Lump_libil2cpp_gc_cpp()
        }
        )
    }, {
        func: (function() {
            ___emscripten_environ_constructor()
        }
        )
    });
    var STATIC_BUMP = 2308192;
    Module["STATIC_BASE"] = STATIC_BASE;
    Module["STATIC_BUMP"] = STATIC_BUMP;
    var tempDoublePtr = STATICTOP;
    STATICTOP += 16;
    function _AuthenticateUser() {
        err("missing function: AuthenticateUser");
        abort(-1)
    }
    function _GerReward() {
        err("missing function: GerReward");
        abort(-1)
    }
    function _GetUserData() {
        err("missing function: GetUserData");
        abort(-1)
    }
    function _InitPurchases() {
        err("missing function: InitPurchases");
        abort(-1)
    }
    function _JS_Cursor_SetImage(ptr, length) {
        var binary = "";
        for (var i = 0; i < length; i++)
            binary += String.fromCharCode(HEAPU8[ptr + i]);
        Module.canvas.style.cursor = "url(data:image/cur;base64," + btoa(binary) + "),default"
    }
    function _JS_Cursor_SetShow(show) {
        Module.canvas.style.cursor = show ? "default" : "none"
    }
    function _JS_Eval_ClearInterval(id) {
        window.clearInterval(id)
    }
    function _JS_Eval_SetInterval(func, arg, millis) {
        Module["noExitRuntime"] = true;
        function wrapper() {
            getFuncWrapper(func, "vi")(arg)
        }
        return Browser.safeSetInterval(wrapper, millis)
    }
    var fs = {
        numPendingSync: 0,
        syncInternal: 1e3,
        syncInProgress: false,
        sync: (function(onlyPendingSync) {
            if (onlyPendingSync) {
                if (fs.numPendingSync == 0)
                    return
            } else if (fs.syncInProgress) {
                fs.numPendingSync++;
                return
            }
            fs.syncInProgress = true;
            FS.syncfs(false, (function(err) {
                fs.syncInProgress = false
            }
            ));
            fs.numPendingSync = 0
        }
        )
    };
    function _JS_FileSystem_Initialize() {
        Module.setInterval((function() {
            fs.sync(true)
        }
        ), fs.syncInternal)
    }
    function _JS_FileSystem_Sync() {
        fs.sync(false)
    }
    function _JS_Log_Dump(ptr, type) {
        var str = Pointer_stringify(ptr);
        if (typeof dump == "function")
            dump(str);
        switch (type) {
        case 0:
        case 1:
        case 4:
            console.error(str);
            return;
        case 2:
            console.warn(str);
            return;
        case 3:
        case 5:
            console.log(str);
            return;
        default:
            console.error("Unknown console message type!");
            console.error(str)
        }
    }
    function _JS_Log_StackTrace(buffer, bufferSize) {
        var trace = stackTrace();
        if (buffer)
            stringToUTF8(trace, buffer, bufferSize);
        return lengthBytesUTF8(trace)
    }
    var WEBAudio = {
        audioInstances: [],
        audioContext: {},
        audioWebEnabled: 0
    };
    function _JS_Sound_Create_Channel(callback, userData) {
        if (WEBAudio.audioWebEnabled == 0)
            return;
        var channel = {
            gain: WEBAudio.audioContext.createGain(),
            panner: WEBAudio.audioContext.createPanner(),
            threeD: false,
            playBuffer: (function(delay, buffer, offset) {
                this.source.buffer = buffer;
                var chan = this;
                this.source.onended = (function() {
                    if (callback)
                        dynCall("vi", callback, [userData]);
                    chan.setup()
                }
                );
                this.source.start(delay, offset)
            }
            ),
            setup: (function() {
                this.source = WEBAudio.audioContext.createBufferSource();
                this.setupPanning()
            }
            ),
            setupPanning: (function() {
                if (this.threeD) {
                    this.source.disconnect();
                    this.source.connect(this.panner);
                    this.panner.connect(this.gain)
                } else {
                    this.panner.disconnect();
                    this.source.connect(this.gain)
                }
            }
            )
        };
        channel.panner.rolloffFactor = 0;
        channel.gain.connect(WEBAudio.audioContext.destination);
        channel.setup();
        return WEBAudio.audioInstances.push(channel) - 1
    }
    function _JS_Sound_GetLength(bufferInstance) {
        if (WEBAudio.audioWebEnabled == 0)
            return 0;
        var sound = WEBAudio.audioInstances[bufferInstance];
        var sampleRateRatio = 44100 / sound.buffer.sampleRate;
        return sound.buffer.length * sampleRateRatio
    }
    function _JS_Sound_GetLoadState(bufferInstance) {
        if (WEBAudio.audioWebEnabled == 0)
            return 2;
        var sound = WEBAudio.audioInstances[bufferInstance];
        if (sound.error)
            return 2;
        if (sound.buffer)
            return 0;
        return 1
    }
    function _JS_Sound_Init() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            WEBAudio.audioContext = new AudioContext;
            var tryToResumeAudioContext = (function() {
                if (WEBAudio.audioContext.state === "suspended")
                    WEBAudio.audioContext.resume();
                else
                    Module.clearInterval(resumeInterval)
            }
            );
            var resumeInterval = Module.setInterval(tryToResumeAudioContext, 400);
            WEBAudio.audioWebEnabled = 1
        } catch (e) {
            alert("Web Audio API is not supported in this browser")
        }
    }
    function _JS_Sound_Load(ptr, length) {
        if (WEBAudio.audioWebEnabled == 0)
            return 0;
        var sound = {
            buffer: null,
            error: false
        };
        var instance = WEBAudio.audioInstances.push(sound) - 1;
        var audioData = HEAPU8.buffer.slice(ptr, ptr + length);
        WEBAudio.audioContext.decodeAudioData(audioData, (function(buffer) {
            sound.buffer = buffer
        }
        ), (function() {
            sound.error = true;
            console.log("Decode error.")
        }
        ));
        return instance
    }
    function _JS_Sound_Load_PCM(channels, length, sampleRate, ptr) {
        if (WEBAudio.audioWebEnabled == 0)
            return 0;
        var sound = {
            buffer: WEBAudio.audioContext.createBuffer(channels, length, sampleRate),
            error: false
        };
        for (var i = 0; i < channels; i++) {
            var offs = (ptr >> 2) + length * i;
            var buffer = sound.buffer;
            var copyToChannel = buffer["copyToChannel"] || (function(source, channelNumber, startInChannel) {
                var clipped = source.subarray(0, Math.min(source.length, this.length - (startInChannel | 0)));
                this.getChannelData(channelNumber | 0).set(clipped, startInChannel | 0)
            }
            );
            copyToChannel.apply(buffer, [HEAPF32.subarray(offs, offs + length), i, 0])
        }
        var instance = WEBAudio.audioInstances.push(sound) - 1;
        return instance
    }
    function _JS_Sound_Play(bufferInstance, channelInstance, offset, delay) {
        _JS_Sound_Stop(channelInstance, 0);
        if (WEBAudio.audioWebEnabled == 0)
            return;
        var sound = WEBAudio.audioInstances[bufferInstance];
        var channel = WEBAudio.audioInstances[channelInstance];
        if (sound.buffer) {
            try {
                channel.playBuffer(WEBAudio.audioContext.currentTime + delay, sound.buffer, offset)
            } catch (e) {
                console.error("playBuffer error. Exception: " + e)
            }
        } else
            console.log("Trying to play sound which is not loaded.")
    }
    function _JS_Sound_ReleaseInstance(instance) {
        WEBAudio.audioInstances[instance] = null
    }
    function _JS_Sound_ResumeIfNeeded() {
        if (WEBAudio.audioWebEnabled == 0)
            return;
        if (WEBAudio.audioContext.state === "suspended")
            WEBAudio.audioContext.resume()
    }
    function _JS_Sound_Set3D(channelInstance, threeD) {
        var channel = WEBAudio.audioInstances[channelInstance];
        if (channel.threeD != threeD) {
            channel.threeD = threeD;
            channel.setupPanning()
        }
    }
    function _JS_Sound_SetListenerOrientation(x, y, z, xUp, yUp, zUp) {
        if (WEBAudio.audioWebEnabled == 0)
            return;
        if (WEBAudio.audioContext.listener.forwardX) {
            WEBAudio.audioContext.listener.forwardX.setValueAtTime(-x, WEBAudio.audioContext.currentTime);
            WEBAudio.audioContext.listener.forwardY.setValueAtTime(-y, WEBAudio.audioContext.currentTime);
            WEBAudio.audioContext.listener.forwardZ.setValueAtTime(-z, WEBAudio.audioContext.currentTime);
            WEBAudio.audioContext.listener.upX.setValueAtTime(xUp, WEBAudio.audioContext.currentTime);
            WEBAudio.audioContext.listener.upY.setValueAtTime(yUp, WEBAudio.audioContext.currentTime);
            WEBAudio.audioContext.listener.upZ.setValueAtTime(zUp, WEBAudio.audioContext.currentTime)
        } else {
            WEBAudio.audioContext.listener.setOrientation(-x, -y, -z, xUp, yUp, zUp)
        }
    }
    function _JS_Sound_SetListenerPosition(x, y, z) {
        if (WEBAudio.audioWebEnabled == 0)
            return;
        if (WEBAudio.audioContext.listener.positionX) {
            WEBAudio.audioContext.listener.positionX.setValueAtTime(x, WEBAudio.audioContext.currentTime);
            WEBAudio.audioContext.listener.positionY.setValueAtTime(y, WEBAudio.audioContext.currentTime);
            WEBAudio.audioContext.listener.positionZ.setValueAtTime(z, WEBAudio.audioContext.currentTime)
        } else {
            WEBAudio.audioContext.listener.setPosition(x, y, z)
        }
    }
    function _JS_Sound_SetLoop(channelInstance, loop) {
        if (WEBAudio.audioWebEnabled == 0)
            return;
        WEBAudio.audioInstances[channelInstance].source.loop = loop
    }
    function _JS_Sound_SetLoopPoints(channelInstance, loopStart, loopEnd) {
        if (WEBAudio.audioWebEnabled == 0)
            return;
        var channel = WEBAudio.audioInstances[channelInstance];
        channel.source.loopStart = loopStart;
        channel.source.loopEnd = loopEnd
    }
    function _JS_Sound_SetPitch(channelInstance, v) {
        if (WEBAudio.audioWebEnabled == 0)
            return;
        try {
            WEBAudio.audioInstances[channelInstance].source.playbackRate.setValueAtTime(v, WEBAudio.audioContext.currentTime)
        } catch (e) {
            console.error("Invalid audio pitch " + v + " specified to WebAudio backend!")
        }
    }
    function _JS_Sound_SetPosition(channelInstance, x, y, z) {
        if (WEBAudio.audioWebEnabled == 0)
            return;
        WEBAudio.audioInstances[channelInstance].panner.setPosition(x, y, z)
    }
    function _JS_Sound_SetVolume(channelInstance, v) {
        if (WEBAudio.audioWebEnabled == 0)
            return;
        try {
            WEBAudio.audioInstances[channelInstance].gain.gain.setValueAtTime(v, WEBAudio.audioContext.currentTime)
        } catch (e) {
            console.error("Invalid audio volume " + v + " specified to WebAudio backend!")
        }
    }
    function _JS_Sound_Stop(channelInstance, delay) {
        if (WEBAudio.audioWebEnabled == 0)
            return;
        var channel = WEBAudio.audioInstances[channelInstance];
        if (channel.source.buffer) {
            try {
                channel.source.stop(WEBAudio.audioContext.currentTime + delay)
            } catch (e) {
                channel.source.disconnect()
            }
            if (delay == 0) {
                channel.source.onended = (function() {}
                );
                channel.setup()
            }
        }
    }
    function _JS_SystemInfo_GetCanvasClientSize(domElementSelector, outWidth, outHeight) {
        var selector = UTF8ToString(domElementSelector);
        var canvas = selector == "#canvas" ? Module["canvas"] : document.querySelector(selector);
        HEAPF64[outWidth >> 3] = canvas ? canvas.clientWidth : 0;
        HEAPF64[outHeight >> 3] = canvas ? canvas.clientHeight : 0
    }
    function _JS_SystemInfo_GetDocumentURL(buffer, bufferSize) {
        if (buffer)
            stringToUTF8(document.URL, buffer, bufferSize);
        return lengthBytesUTF8(document.URL)
    }
    function _JS_SystemInfo_GetGPUInfo(buffer, bufferSize) {
        var gpuinfo = Module.SystemInfo.gpu;
        if (buffer)
            stringToUTF8(gpuinfo, buffer, bufferSize);
        return lengthBytesUTF8(gpuinfo)
    }
    function _JS_SystemInfo_GetLanguage(buffer, bufferSize) {
        var language = Module.SystemInfo.language;
        if (buffer)
            stringToUTF8(language, buffer, bufferSize);
        return lengthBytesUTF8(language)
    }
    function _JS_SystemInfo_GetMatchWebGLToCanvasSize() {
        return Module.matchWebGLToCanvasSize || Module.matchWebGLToCanvasSize === undefined
    }
    function _JS_SystemInfo_GetMemory() {
        return TOTAL_MEMORY / (1024 * 1024)
    }
    function _JS_SystemInfo_GetOS(buffer, bufferSize) {
        var browser = Module.SystemInfo.os + " " + Module.SystemInfo.osVersion;
        if (buffer)
            stringToUTF8(browser, buffer, bufferSize);
        return lengthBytesUTF8(browser)
    }
    function _JS_SystemInfo_GetPreferredDevicePixelRatio() {
        return Module.devicePixelRatio || window.devicePixelRatio || 1
    }
    function _JS_SystemInfo_GetScreenSize(outWidth, outHeight) {
        HEAPF64[outWidth >> 3] = Module.SystemInfo.width;
        HEAPF64[outHeight >> 3] = Module.SystemInfo.height
    }
    function _JS_SystemInfo_HasCursorLock() {
        return Module.SystemInfo.hasCursorLock
    }
    function _JS_SystemInfo_HasFullscreen() {
        return Module.SystemInfo.hasFullscreen
    }
    function _JS_SystemInfo_HasWebGL() {
        return Module.SystemInfo.hasWebGL
    }
    function _OpenNewTab(url) {
        url = Pointer_stringify(url);
        window.open(url, "_blank")
    }
    function _Purchase() {
        err("missing function: Purchase");
        abort(-1)
    }
    function _SDK_Init(gameKey) {
        gameKey = Pointer_stringify(gameKey);
        window["GD_OPTIONS"] = {
            debug: false,
            gameId: gameKey,
            onEvent: (function(event) {
                switch (event.name) {
                case "SDK_GAME_START":
                    SendMessage("GameDistribution", "ResumeGameCallback");
                    break;
                case "SDK_GAME_PAUSE":
                    SendMessage("GameDistribution", "PauseGameCallback");
                    break;
                case "SDK_ERROR":
                    break
                }
            }
            )
        };
        ((function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id))
                return;
            js = d.createElement(s);
            js.id = id;
            js.src = "";
            fjs.parentNode.insertBefore(js, fjs)
        }
        ))(document, "script", "gamedistribution-jssdk")
    }
    function _SDK_PreloadAd() {
        if (typeof gdsdk !== "undefined" && typeof gdsdk.preloadAd !== "undefined") {
            gdsdk.preloadAd(gdsdk.AdType.Rewarded).then((function(response) {
                SendMessage("GameDistribution", "PreloadRewardedVideoCallback", 1)
            }
            )).catch((function(error) {
                SendMessage("GameDistribution", "PreloadRewardedVideoCallback", 0)
            }
            ))
        }
    }
    function _SDK_ShowAd(adType) {
        if (typeof gdsdk !== "undefined" && typeof gdsdk.showAd !== "undefined") {
            adType = Pointer_stringify(adType) || gdsdk.AdType.Interstitial;
            gdsdk.showAd(adType).then((function(response) {
                if (adType === gdsdk.AdType.Rewarded) {
                    SendMessage("GameDistribution", "RewardedVideoSuccessCallback")
                }
            }
            )).catch((function(error) {
                if (adType === gdsdk.AdType.Rewarded) {
                    SendMessage("GameDistribution", "RewardedVideoFailureCallback")
                }
            }
            ))
        }
    }
    function _SaveData(level, isSound, isRussian) {
        saveData(level, isSound, isRussian)
    }
    function _ShowFullscreenAd() {
        showFullscrenAd()
    }
    function _ShowRewardedAd(id) {
        showRewardedAd(id)
    }
    function _SyncFiles() {
        FS.syncfs(false, (function(err) {}
        ))
    }
    function ___atomic_compare_exchange_8(ptr, expected, desiredl, desiredh, weak, success_memmodel, failure_memmodel) {
        var pl = HEAP32[ptr >> 2];
        var ph = HEAP32[ptr + 4 >> 2];
        var el = HEAP32[expected >> 2];
        var eh = HEAP32[expected + 4 >> 2];
        if (pl === el && ph === eh) {
            HEAP32[ptr >> 2] = desiredl;
            HEAP32[ptr + 4 >> 2] = desiredh;
            return 1
        } else {
            HEAP32[expected >> 2] = pl;
            HEAP32[expected + 4 >> 2] = ph;
            return 0
        }
    }
    function ___atomic_fetch_add_8(ptr, vall, valh, memmodel) {
        var l = HEAP32[ptr >> 2];
        var h = HEAP32[ptr + 4 >> 2];
        HEAP32[ptr >> 2] = _i64Add(l, h, vall, valh);
        HEAP32[ptr + 4 >> 2] = getTempRet0();
        return (setTempRet0(h),
        l) | 0
    }
    var ENV = {};
    function ___buildEnvironment(environ) {
        var MAX_ENV_VALUES = 64;
        var TOTAL_ENV_SIZE = 1024;
        var poolPtr;
        var envPtr;
        if (!___buildEnvironment.called) {
            ___buildEnvironment.called = true;
            ENV["USER"] = ENV["LOGNAME"] = "web_user";
            ENV["PATH"] = "/";
            ENV["PWD"] = "/";
            ENV["HOME"] = "/home/web_user";
            ENV["LANG"] = "C.UTF-8";
            ENV["_"] = Module["thisProgram"];
            poolPtr = getMemory(TOTAL_ENV_SIZE);
            envPtr = getMemory(MAX_ENV_VALUES * 4);
            HEAP32[envPtr >> 2] = poolPtr;
            HEAP32[environ >> 2] = envPtr
        } else {
            envPtr = HEAP32[environ >> 2];
            poolPtr = HEAP32[envPtr >> 2]
        }
        var strings = [];
        var totalSize = 0;
        for (var key in ENV) {
            if (typeof ENV[key] === "string") {
                var line = key + "=" + ENV[key];
                strings.push(line);
                totalSize += line.length
            }
        }
        if (totalSize > TOTAL_ENV_SIZE) {
            throw new Error("Environment size exceeded TOTAL_ENV_SIZE!")
        }
        var ptrSize = 4;
        for (var i = 0; i < strings.length; i++) {
            var line = strings[i];
            writeAsciiToMemory(line, poolPtr);
            HEAP32[envPtr + i * ptrSize >> 2] = poolPtr;
            poolPtr += line.length + 1
        }
        HEAP32[envPtr + strings.length * ptrSize >> 2] = 0
    }
    function ___cxa_allocate_exception(size) {
        return _malloc(size)
    }
    function __ZSt18uncaught_exceptionv() {
        return !!__ZSt18uncaught_exceptionv.uncaught_exception
    }
    var EXCEPTIONS = {
        last: 0,
        caught: [],
        infos: {},
        deAdjust: (function(adjusted) {
            if (!adjusted || EXCEPTIONS.infos[adjusted])
                return adjusted;
            for (var key in EXCEPTIONS.infos) {
                var ptr = +key;
                var info = EXCEPTIONS.infos[ptr];
                if (info.adjusted === adjusted) {
                    return ptr
                }
            }
            return adjusted
        }
        ),
        addRef: (function(ptr) {
            if (!ptr)
                return;
            var info = EXCEPTIONS.infos[ptr];
            info.refcount++
        }
        ),
        decRef: (function(ptr) {
            if (!ptr)
                return;
            var info = EXCEPTIONS.infos[ptr];
            assert(info.refcount > 0);
            info.refcount--;
            if (info.refcount === 0 && !info.rethrown) {
                if (info.destructor) {
                    Module["dynCall_vi"](info.destructor, ptr)
                }
                delete EXCEPTIONS.infos[ptr];
                ___cxa_free_exception(ptr)
            }
        }
        ),
        clearRef: (function(ptr) {
            if (!ptr)
                return;
            var info = EXCEPTIONS.infos[ptr];
            info.refcount = 0
        }
        )
    };
    function ___cxa_begin_catch(ptr) {
        var info = EXCEPTIONS.infos[ptr];
        if (info && !info.caught) {
            info.caught = true;
            __ZSt18uncaught_exceptionv.uncaught_exception--
        }
        if (info)
            info.rethrown = false;
        EXCEPTIONS.caught.push(ptr);
        EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(ptr));
        return ptr
    }
    function ___cxa_free_exception(ptr) {
        try {
            return _free(ptr)
        } catch (e) {}
    }
    function ___cxa_end_catch() {
        Module["setThrew"](0);
        var ptr = EXCEPTIONS.caught.pop();
        if (ptr) {
            EXCEPTIONS.decRef(EXCEPTIONS.deAdjust(ptr));
            EXCEPTIONS.last = 0
        }
    }
    function ___cxa_find_matching_catch_2() {
        return ___cxa_find_matching_catch.apply(null, arguments)
    }
    function ___cxa_find_matching_catch_3() {
        return ___cxa_find_matching_catch.apply(null, arguments)
    }
    function ___cxa_find_matching_catch_4() {
        return ___cxa_find_matching_catch.apply(null, arguments)
    }
    function ___cxa_pure_virtual() {
        ABORT = true;
        throw "Pure virtual function called!"
    }
    function ___cxa_rethrow() {
        var ptr = EXCEPTIONS.caught.pop();
        ptr = EXCEPTIONS.deAdjust(ptr);
        if (!EXCEPTIONS.infos[ptr].rethrown) {
            EXCEPTIONS.caught.push(ptr);
            EXCEPTIONS.infos[ptr].rethrown = true
        }
        EXCEPTIONS.last = ptr;
        throw ptr
    }
    function ___resumeException(ptr) {
        if (!EXCEPTIONS.last) {
            EXCEPTIONS.last = ptr
        }
        throw ptr
    }
    function ___cxa_find_matching_catch() {
        var thrown = EXCEPTIONS.last;
        if (!thrown) {
            return (setTempRet0(0),
            0) | 0
        }
        var info = EXCEPTIONS.infos[thrown];
        var throwntype = info.type;
        if (!throwntype) {
            return (setTempRet0(0),
            thrown) | 0
        }
        var typeArray = Array.prototype.slice.call(arguments);
        var pointer = Module["___cxa_is_pointer_type"](throwntype);
        if (!___cxa_find_matching_catch.buffer)
            ___cxa_find_matching_catch.buffer = _malloc(4);
        HEAP32[___cxa_find_matching_catch.buffer >> 2] = thrown;
        thrown = ___cxa_find_matching_catch.buffer;
        for (var i = 0; i < typeArray.length; i++) {
            if (typeArray[i] && Module["___cxa_can_catch"](typeArray[i], throwntype, thrown)) {
                thrown = HEAP32[thrown >> 2];
                info.adjusted = thrown;
                return (setTempRet0(typeArray[i]),
                thrown) | 0
            }
        }
        thrown = HEAP32[thrown >> 2];
        return (setTempRet0(throwntype),
        thrown) | 0
    }
    function ___cxa_throw(ptr, type, destructor) {
        EXCEPTIONS.infos[ptr] = {
            ptr: ptr,
            adjusted: ptr,
            type: type,
            destructor: destructor,
            refcount: 0,
            caught: false,
            rethrown: false
        };
        EXCEPTIONS.last = ptr;
        if (!("uncaught_exception"in __ZSt18uncaught_exceptionv)) {
            __ZSt18uncaught_exceptionv.uncaught_exception = 1
        } else {
            __ZSt18uncaught_exceptionv.uncaught_exception++
        }
        throw ptr
    }
    function ___gxx_personality_v0() {}
    function ___lock() {}
    var ERRNO_CODES = {
        EPERM: 1,
        ENOENT: 2,
        ESRCH: 3,
        EINTR: 4,
        EIO: 5,
        ENXIO: 6,
        E2BIG: 7,
        ENOEXEC: 8,
        EBADF: 9,
        ECHILD: 10,
        EAGAIN: 11,
        EWOULDBLOCK: 11,
        ENOMEM: 12,
        EACCES: 13,
        EFAULT: 14,
        ENOTBLK: 15,
        EBUSY: 16,
        EEXIST: 17,
        EXDEV: 18,
        ENODEV: 19,
        ENOTDIR: 20,
        EISDIR: 21,
        EINVAL: 22,
        ENFILE: 23,
        EMFILE: 24,
        ENOTTY: 25,
        ETXTBSY: 26,
        EFBIG: 27,
        ENOSPC: 28,
        ESPIPE: 29,
        EROFS: 30,
        EMLINK: 31,
        EPIPE: 32,
        EDOM: 33,
        ERANGE: 34,
        ENOMSG: 42,
        EIDRM: 43,
        ECHRNG: 44,
        EL2NSYNC: 45,
        EL3HLT: 46,
        EL3RST: 47,
        ELNRNG: 48,
        EUNATCH: 49,
        ENOCSI: 50,
        EL2HLT: 51,
        EDEADLK: 35,
        ENOLCK: 37,
        EBADE: 52,
        EBADR: 53,
        EXFULL: 54,
        ENOANO: 55,
        EBADRQC: 56,
        EBADSLT: 57,
        EDEADLOCK: 35,
        EBFONT: 59,
        ENOSTR: 60,
        ENODATA: 61,
        ETIME: 62,
        ENOSR: 63,
        ENONET: 64,
        ENOPKG: 65,
        EREMOTE: 66,
        ENOLINK: 67,
        EADV: 68,
        ESRMNT: 69,
        ECOMM: 70,
        EPROTO: 71,
        EMULTIHOP: 72,
        EDOTDOT: 73,
        EBADMSG: 74,
        ENOTUNIQ: 76,
        EBADFD: 77,
        EREMCHG: 78,
        ELIBACC: 79,
        ELIBBAD: 80,
        ELIBSCN: 81,
        ELIBMAX: 82,
        ELIBEXEC: 83,
        ENOSYS: 38,
        ENOTEMPTY: 39,
        ENAMETOOLONG: 36,
        ELOOP: 40,
        EOPNOTSUPP: 95,
        EPFNOSUPPORT: 96,
        ECONNRESET: 104,
        ENOBUFS: 105,
        EAFNOSUPPORT: 97,
        EPROTOTYPE: 91,
        ENOTSOCK: 88,
        ENOPROTOOPT: 92,
        ESHUTDOWN: 108,
        ECONNREFUSED: 111,
        EADDRINUSE: 98,
        ECONNABORTED: 103,
        ENETUNREACH: 101,
        ENETDOWN: 100,
        ETIMEDOUT: 110,
        EHOSTDOWN: 112,
        EHOSTUNREACH: 113,
        EINPROGRESS: 115,
        EALREADY: 114,
        EDESTADDRREQ: 89,
        EMSGSIZE: 90,
        EPROTONOSUPPORT: 93,
        ESOCKTNOSUPPORT: 94,
        EADDRNOTAVAIL: 99,
        ENETRESET: 102,
        EISCONN: 106,
        ENOTCONN: 107,
        ETOOMANYREFS: 109,
        EUSERS: 87,
        EDQUOT: 122,
        ESTALE: 116,
        ENOTSUP: 95,
        ENOMEDIUM: 123,
        EILSEQ: 84,
        EOVERFLOW: 75,
        ECANCELED: 125,
        ENOTRECOVERABLE: 131,
        EOWNERDEAD: 130,
        ESTRPIPE: 86
    };
    function ___setErrNo(value) {
        if (Module["___errno_location"])
            HEAP32[Module["___errno_location"]() >> 2] = value;
        return value
    }
    function ___map_file(pathname, size) {
        ___setErrNo(ERRNO_CODES.EPERM);
        return -1
    }
    var ERRNO_MESSAGES = {
        0: "Success",
        1: "Not super-user",
        2: "No such file or directory",
        3: "No such process",
        4: "Interrupted system call",
        5: "I/O error",
        6: "No such device or address",
        7: "Arg list too long",
        8: "Exec format error",
        9: "Bad file number",
        10: "No children",
        11: "No more processes",
        12: "Not enough core",
        13: "Permission denied",
        14: "Bad address",
        15: "Block device required",
        16: "Mount device busy",
        17: "File exists",
        18: "Cross-device link",
        19: "No such device",
        20: "Not a directory",
        21: "Is a directory",
        22: "Invalid argument",
        23: "Too many open files in system",
        24: "Too many open files",
        25: "Not a typewriter",
        26: "Text file busy",
        27: "File too large",
        28: "No space left on device",
        29: "Illegal seek",
        30: "Read only file system",
        31: "Too many links",
        32: "Broken pipe",
        33: "Math arg out of domain of func",
        34: "Math result not representable",
        35: "File locking deadlock error",
        36: "File or path name too long",
        37: "No record locks available",
        38: "Function not implemented",
        39: "Directory not empty",
        40: "Too many symbolic links",
        42: "No message of desired type",
        43: "Identifier removed",
        44: "Channel number out of range",
        45: "Level 2 not synchronized",
        46: "Level 3 halted",
        47: "Level 3 reset",
        48: "Link number out of range",
        49: "Protocol driver not attached",
        50: "No CSI structure available",
        51: "Level 2 halted",
        52: "Invalid exchange",
        53: "Invalid request descriptor",
        54: "Exchange full",
        55: "No anode",
        56: "Invalid request code",
        57: "Invalid slot",
        59: "Bad font file fmt",
        60: "Device not a stream",
        61: "No data (for no delay io)",
        62: "Timer expired",
        63: "Out of streams resources",
        64: "Machine is not on the network",
        65: "Package not installed",
        66: "The object is remote",
        67: "The link has been severed",
        68: "Advertise error",
        69: "Srmount error",
        70: "Communication error on send",
        71: "Protocol error",
        72: "Multihop attempted",
        73: "Cross mount point (not really error)",
        74: "Trying to read unreadable message",
        75: "Value too large for defined data type",
        76: "Given log. name not unique",
        77: "f.d. invalid for this operation",
        78: "Remote address changed",
        79: "Can   access a needed shared lib",
        80: "Accessing a corrupted shared lib",
        81: ".lib section in a.out corrupted",
        82: "Attempting to link in too many libs",
        83: "Attempting to exec a shared library",
        84: "Illegal byte sequence",
        86: "Streams pipe error",
        87: "Too many users",
        88: "Socket operation on non-socket",
        89: "Destination address required",
        90: "Message too long",
        91: "Protocol wrong type for socket",
        92: "Protocol not available",
        93: "Unknown protocol",
        94: "Socket type not supported",
        95: "Not supported",
        96: "Protocol family not supported",
        97: "Address family not supported by protocol family",
        98: "Address already in use",
        99: "Address not available",
        100: "Network interface is not configured",
        101: "Network is unreachable",
        102: "Connection reset by network",
        103: "Connection aborted",
        104: "Connection reset by peer",
        105: "No buffer space available",
        106: "Socket is already connected",
        107: "Socket is not connected",
        108: "Can't send after socket shutdown",
        109: "Too many references",
        110: "Connection timed out",
        111: "Connection refused",
        112: "Host is down",
        113: "Host is unreachable",
        114: "Socket already connected",
        115: "Connection already in progress",
        116: "Stale file handle",
        122: "Quota exceeded",
        123: "No medium (in tape drive)",
        125: "Operation canceled",
        130: "Previous owner died",
        131: "State not recoverable"
    };
    var PATH = {
        splitPath: (function(filename) {
            var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
            return splitPathRe.exec(filename).slice(1)
        }
        ),
        normalizeArray: (function(parts, allowAboveRoot) {
            var up = 0;
            for (var i = parts.length - 1; i >= 0; i--) {
                var last = parts[i];
                if (last === ".") {
                    parts.splice(i, 1)
                } else if (last === "..") {
                    parts.splice(i, 1);
                    up++
                } else if (up) {
                    parts.splice(i, 1);
                    up--
                }
            }
            if (allowAboveRoot) {
                for (; up; up--) {
                    parts.unshift("..")
                }
            }
            return parts
        }
        ),
        normalize: (function(path) {
            var isAbsolute = path.charAt(0) === "/"
              , trailingSlash = path.substr(-1) === "/";
            path = PATH.normalizeArray(path.split("/").filter((function(p) {
                return !!p
            }
            )), !isAbsolute).join("/");
            if (!path && !isAbsolute) {
                path = "."
            }
            if (path && trailingSlash) {
                path += "/"
            }
            return (isAbsolute ? "/" : "") + path
        }
        ),
        dirname: (function(path) {
            var result = PATH.splitPath(path)
              , root = result[0]
              , dir = result[1];
            if (!root && !dir) {
                return "."
            }
            if (dir) {
                dir = dir.substr(0, dir.length - 1)
            }
            return root + dir
        }
        ),
        basename: (function(path) {
            if (path === "/")
                return "/";
            var lastSlash = path.lastIndexOf("/");
            if (lastSlash === -1)
                return path;
            return path.substr(lastSlash + 1)
        }
        ),
        extname: (function(path) {
            return PATH.splitPath(path)[3]
        }
        ),
        join: (function() {
            var paths = Array.prototype.slice.call(arguments, 0);
            return PATH.normalize(paths.join("/"))
        }
        ),
        join2: (function(l, r) {
            return PATH.normalize(l + "/" + r)
        }
        ),
        resolve: (function() {
            var resolvedPath = ""
              , resolvedAbsolute = false;
            for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                var path = i >= 0 ? arguments[i] : FS.cwd();
                if (typeof path !== "string") {
                    throw new TypeError("Arguments to path.resolve must be strings")
                } else if (!path) {
                    return ""
                }
                resolvedPath = path + "/" + resolvedPath;
                resolvedAbsolute = path.charAt(0) === "/"
            }
            resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((function(p) {
                return !!p
            }
            )), !resolvedAbsolute).join("/");
            return (resolvedAbsolute ? "/" : "") + resolvedPath || "."
        }
        ),
        relative: (function(from, to) {
            from = PATH.resolve(from).substr(1);
            to = PATH.resolve(to).substr(1);
            function trim(arr) {
                var start = 0;
                for (; start < arr.length; start++) {
                    if (arr[start] !== "")
                        break
                }
                var end = arr.length - 1;
                for (; end >= 0; end--) {
                    if (arr[end] !== "")
                        break
                }
                if (start > end)
                    return [];
                return arr.slice(start, end - start + 1)
            }
            var fromParts = trim(from.split("/"));
            var toParts = trim(to.split("/"));
            var length = Math.min(fromParts.length, toParts.length);
            var samePartsLength = length;
            for (var i = 0; i < length; i++) {
                if (fromParts[i] !== toParts[i]) {
                    samePartsLength = i;
                    break
                }
            }
            var outputParts = [];
            for (var i = samePartsLength; i < fromParts.length; i++) {
                outputParts.push("..")
            }
            outputParts = outputParts.concat(toParts.slice(samePartsLength));
            return outputParts.join("/")
        }
        )
    };
    var TTY = {
        ttys: [],
        init: (function() {}
        ),
        shutdown: (function() {}
        ),
        register: (function(dev, ops) {
            TTY.ttys[dev] = {
                input: [],
                output: [],
                ops: ops
            };
            FS.registerDevice(dev, TTY.stream_ops)
        }
        ),
        stream_ops: {
            open: (function(stream) {
                var tty = TTY.ttys[stream.node.rdev];
                if (!tty) {
                    throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
                }
                stream.tty = tty;
                stream.seekable = false
            }
            ),
            close: (function(stream) {
                stream.tty.ops.flush(stream.tty)
            }
            ),
            flush: (function(stream) {
                stream.tty.ops.flush(stream.tty)
            }
            ),
            read: (function(stream, buffer, offset, length, pos) {
                if (!stream.tty || !stream.tty.ops.get_char) {
                    throw new FS.ErrnoError(ERRNO_CODES.ENXIO)
                }
                var bytesRead = 0;
                for (var i = 0; i < length; i++) {
                    var result;
                    try {
                        result = stream.tty.ops.get_char(stream.tty)
                    } catch (e) {
                        throw new FS.ErrnoError(ERRNO_CODES.EIO)
                    }
                    if (result === undefined && bytesRead === 0) {
                        throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
                    }
                    if (result === null || result === undefined)
                        break;
                    bytesRead++;
                    buffer[offset + i] = result
                }
                if (bytesRead) {
                    stream.node.timestamp = Date.now()
                }
                return bytesRead
            }
            ),
            write: (function(stream, buffer, offset, length, pos) {
                if (!stream.tty || !stream.tty.ops.put_char) {
                    throw new FS.ErrnoError(ERRNO_CODES.ENXIO)
                }
                for (var i = 0; i < length; i++) {
                    try {
                        stream.tty.ops.put_char(stream.tty, buffer[offset + i])
                    } catch (e) {
                        throw new FS.ErrnoError(ERRNO_CODES.EIO)
                    }
                }
                if (length) {
                    stream.node.timestamp = Date.now()
                }
                return i
            }
            )
        },
        default_tty_ops: {
            get_char: (function(tty) {
                if (!tty.input.length) {
                    var result = null;
                    if (ENVIRONMENT_IS_NODE) {
                        var BUFSIZE = 256;
                        var buf = new Buffer(BUFSIZE);
                        var bytesRead = 0;
                        var isPosixPlatform = process.platform != "win32";
                        var fd = process.stdin.fd;
                        if (isPosixPlatform) {
                            var usingDevice = false;
                            try {
                                fd = fs.openSync("/dev/stdin", "r");
                                usingDevice = true
                            } catch (e) {}
                        }
                        try {
                            bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null)
                        } catch (e) {
                            if (e.toString().indexOf("EOF") != -1)
                                bytesRead = 0;
                            else
                                throw e
                        }
                        if (usingDevice) {
                            fs.closeSync(fd)
                        }
                        if (bytesRead > 0) {
                            result = buf.slice(0, bytesRead).toString("utf-8")
                        } else {
                            result = null
                        }
                    } else if (typeof window != "undefined" && typeof window.prompt == "function") {
                        result = window.prompt("Input: ");
                        if (result !== null) {
                            result += "\n"
                        }
                    } else if (typeof readline == "function") {
                        result = readline();
                        if (result !== null) {
                            result += "\n"
                        }
                    }
                    if (!result) {
                        return null
                    }
                    tty.input = intArrayFromString(result, true)
                }
                return tty.input.shift()
            }
            ),
            put_char: (function(tty, val) {
                if (val === null || val === 10) {
                    out(UTF8ArrayToString(tty.output, 0));
                    tty.output = []
                } else {
                    if (val != 0)
                        tty.output.push(val)
                }
            }
            ),
            flush: (function(tty) {
                if (tty.output && tty.output.length > 0) {
                    out(UTF8ArrayToString(tty.output, 0));
                    tty.output = []
                }
            }
            )
        },
        default_tty1_ops: {
            put_char: (function(tty, val) {
                if (val === null || val === 10) {
                    err(UTF8ArrayToString(tty.output, 0));
                    tty.output = []
                } else {
                    if (val != 0)
                        tty.output.push(val)
                }
            }
            ),
            flush: (function(tty) {
                if (tty.output && tty.output.length > 0) {
                    err(UTF8ArrayToString(tty.output, 0));
                    tty.output = []
                }
            }
            )
        }
    };
    var MEMFS = {
        ops_table: null,
        mount: (function(mount) {
            return MEMFS.createNode(null, "/", 16384 | 511, 0)
        }
        ),
        createNode: (function(parent, name, mode, dev) {
            if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            if (!MEMFS.ops_table) {
                MEMFS.ops_table = {
                    dir: {
                        node: {
                            getattr: MEMFS.node_ops.getattr,
                            setattr: MEMFS.node_ops.setattr,
                            lookup: MEMFS.node_ops.lookup,
                            mknod: MEMFS.node_ops.mknod,
                            rename: MEMFS.node_ops.rename,
                            unlink: MEMFS.node_ops.unlink,
                            rmdir: MEMFS.node_ops.rmdir,
                            readdir: MEMFS.node_ops.readdir,
                            symlink: MEMFS.node_ops.symlink
                        },
                        stream: {
                            llseek: MEMFS.stream_ops.llseek
                        }
                    },
                    file: {
                        node: {
                            getattr: MEMFS.node_ops.getattr,
                            setattr: MEMFS.node_ops.setattr
                        },
                        stream: {
                            llseek: MEMFS.stream_ops.llseek,
                            read: MEMFS.stream_ops.read,
                            write: MEMFS.stream_ops.write,
                            allocate: MEMFS.stream_ops.allocate,
                            mmap: MEMFS.stream_ops.mmap,
                            msync: MEMFS.stream_ops.msync
                        }
                    },
                    link: {
                        node: {
                            getattr: MEMFS.node_ops.getattr,
                            setattr: MEMFS.node_ops.setattr,
                            readlink: MEMFS.node_ops.readlink
                        },
                        stream: {}
                    },
                    chrdev: {
                        node: {
                            getattr: MEMFS.node_ops.getattr,
                            setattr: MEMFS.node_ops.setattr
                        },
                        stream: FS.chrdev_stream_ops
                    }
                }
            }
            var node = FS.createNode(parent, name, mode, dev);
            if (FS.isDir(node.mode)) {
                node.node_ops = MEMFS.ops_table.dir.node;
                node.stream_ops = MEMFS.ops_table.dir.stream;
                node.contents = {}
            } else if (FS.isFile(node.mode)) {
                node.node_ops = MEMFS.ops_table.file.node;
                node.stream_ops = MEMFS.ops_table.file.stream;
                node.usedBytes = 0;
                node.contents = null
            } else if (FS.isLink(node.mode)) {
                node.node_ops = MEMFS.ops_table.link.node;
                node.stream_ops = MEMFS.ops_table.link.stream
            } else if (FS.isChrdev(node.mode)) {
                node.node_ops = MEMFS.ops_table.chrdev.node;
                node.stream_ops = MEMFS.ops_table.chrdev.stream
            }
            node.timestamp = Date.now();
            if (parent) {
                parent.contents[name] = node
            }
            return node
        }
        ),
        getFileDataAsRegularArray: (function(node) {
            if (node.contents && node.contents.subarray) {
                var arr = [];
                for (var i = 0; i < node.usedBytes; ++i)
                    arr.push(node.contents[i]);
                return arr
            }
            return node.contents
        }
        ),
        getFileDataAsTypedArray: (function(node) {
            if (!node.contents)
                return new Uint8Array;
            if (node.contents.subarray)
                return node.contents.subarray(0, node.usedBytes);
            return new Uint8Array(node.contents)
        }
        ),
        expandFileStorage: (function(node, newCapacity) {
            if (node.contents && node.contents.subarray && newCapacity > node.contents.length) {
                node.contents = MEMFS.getFileDataAsRegularArray(node);
                node.usedBytes = node.contents.length
            }
            if (!node.contents || node.contents.subarray) {
                var prevCapacity = node.contents ? node.contents.length : 0;
                if (prevCapacity >= newCapacity)
                    return;
                var CAPACITY_DOUBLING_MAX = 1024 * 1024;
                newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) | 0);
                if (prevCapacity != 0)
                    newCapacity = Math.max(newCapacity, 256);
                var oldContents = node.contents;
                node.contents = new Uint8Array(newCapacity);
                if (node.usedBytes > 0)
                    node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
                return
            }
            if (!node.contents && newCapacity > 0)
                node.contents = [];
            while (node.contents.length < newCapacity)
                node.contents.push(0)
        }
        ),
        resizeFileStorage: (function(node, newSize) {
            if (node.usedBytes == newSize)
                return;
            if (newSize == 0) {
                node.contents = null;
                node.usedBytes = 0;
                return
            }
            if (!node.contents || node.contents.subarray) {
                var oldContents = node.contents;
                node.contents = new Uint8Array(new ArrayBuffer(newSize));
                if (oldContents) {
                    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)))
                }
                node.usedBytes = newSize;
                return
            }
            if (!node.contents)
                node.contents = [];
            if (node.contents.length > newSize)
                node.contents.length = newSize;
            else
                while (node.contents.length < newSize)
                    node.contents.push(0);
            node.usedBytes = newSize
        }
        ),
        node_ops: {
            getattr: (function(node) {
                var attr = {};
                attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
                attr.ino = node.id;
                attr.mode = node.mode;
                attr.nlink = 1;
                attr.uid = 0;
                attr.gid = 0;
                attr.rdev = node.rdev;
                if (FS.isDir(node.mode)) {
                    attr.size = 4096
                } else if (FS.isFile(node.mode)) {
                    attr.size = node.usedBytes
                } else if (FS.isLink(node.mode)) {
                    attr.size = node.link.length
                } else {
                    attr.size = 0
                }
                attr.atime = new Date(node.timestamp);
                attr.mtime = new Date(node.timestamp);
                attr.ctime = new Date(node.timestamp);
                attr.blksize = 4096;
                attr.blocks = Math.ceil(attr.size / attr.blksize);
                return attr
            }
            ),
            setattr: (function(node, attr) {
                if (attr.mode !== undefined) {
                    node.mode = attr.mode
                }
                if (attr.timestamp !== undefined) {
                    node.timestamp = attr.timestamp
                }
                if (attr.size !== undefined) {
                    MEMFS.resizeFileStorage(node, attr.size)
                }
            }
            ),
            lookup: (function(parent, name) {
                throw FS.genericErrors[ERRNO_CODES.ENOENT]
            }
            ),
            mknod: (function(parent, name, mode, dev) {
                return MEMFS.createNode(parent, name, mode, dev)
            }
            ),
            rename: (function(old_node, new_dir, new_name) {
                if (FS.isDir(old_node.mode)) {
                    var new_node;
                    try {
                        new_node = FS.lookupNode(new_dir, new_name)
                    } catch (e) {}
                    if (new_node) {
                        for (var i in new_node.contents) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)
                        }
                    }
                }
                delete old_node.parent.contents[old_node.name];
                old_node.name = new_name;
                new_dir.contents[new_name] = old_node;
                old_node.parent = new_dir
            }
            ),
            unlink: (function(parent, name) {
                delete parent.contents[name]
            }
            ),
            rmdir: (function(parent, name) {
                var node = FS.lookupNode(parent, name);
                for (var i in node.contents) {
                    throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)
                }
                delete parent.contents[name]
            }
            ),
            readdir: (function(node) {
                var entries = [".", ".."];
                for (var key in node.contents) {
                    if (!node.contents.hasOwnProperty(key)) {
                        continue
                    }
                    entries.push(key)
                }
                return entries
            }
            ),
            symlink: (function(parent, newname, oldpath) {
                var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
                node.link = oldpath;
                return node
            }
            ),
            readlink: (function(node) {
                if (!FS.isLink(node.mode)) {
                    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
                }
                return node.link
            }
            )
        },
        stream_ops: {
            read: (function(stream, buffer, offset, length, position) {
                var contents = stream.node.contents;
                if (position >= stream.node.usedBytes)
                    return 0;
                var size = Math.min(stream.node.usedBytes - position, length);
                assert(size >= 0);
                if (size > 8 && contents.subarray) {
                    buffer.set(contents.subarray(position, position + size), offset)
                } else {
                    for (var i = 0; i < size; i++)
                        buffer[offset + i] = contents[position + i]
                }
                return size
            }
            ),
            write: (function(stream, buffer, offset, length, position, canOwn) {
                if (!length)
                    return 0;
                var node = stream.node;
                node.timestamp = Date.now();
                if (buffer.subarray && (!node.contents || node.contents.subarray)) {
                    if (canOwn) {
                        node.contents = buffer.subarray(offset, offset + length);
                        node.usedBytes = length;
                        return length
                    } else if (node.usedBytes === 0 && position === 0) {
                        node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
                        node.usedBytes = length;
                        return length
                    } else if (position + length <= node.usedBytes) {
                        node.contents.set(buffer.subarray(offset, offset + length), position);
                        return length
                    }
                }
                MEMFS.expandFileStorage(node, position + length);
                if (node.contents.subarray && buffer.subarray)
                    node.contents.set(buffer.subarray(offset, offset + length), position);
                else {
                    for (var i = 0; i < length; i++) {
                        node.contents[position + i] = buffer[offset + i]
                    }
                }
                node.usedBytes = Math.max(node.usedBytes, position + length);
                return length
            }
            ),
            llseek: (function(stream, offset, whence) {
                var position = offset;
                if (whence === 1) {
                    position += stream.position
                } else if (whence === 2) {
                    if (FS.isFile(stream.node.mode)) {
                        position += stream.node.usedBytes
                    }
                }
                if (position < 0) {
                    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
                }
                return position
            }
            ),
            allocate: (function(stream, offset, length) {
                MEMFS.expandFileStorage(stream.node, offset + length);
                stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
            }
            ),
            mmap: (function(stream, buffer, offset, length, position, prot, flags) {
                if (!FS.isFile(stream.node.mode)) {
                    throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
                }
                var ptr;
                var allocated;
                var contents = stream.node.contents;
                if (!(flags & 2) && (contents.buffer === buffer || contents.buffer === buffer.buffer)) {
                    allocated = false;
                    ptr = contents.byteOffset
                } else {
                    if (position > 0 || position + length < stream.node.usedBytes) {
                        if (contents.subarray) {
                            contents = contents.subarray(position, position + length)
                        } else {
                            contents = Array.prototype.slice.call(contents, position, position + length)
                        }
                    }
                    allocated = true;
                    var fromHeap = buffer.buffer == HEAP8.buffer;
                    ptr = _malloc(length);
                    if (!ptr) {
                        throw new FS.ErrnoError(ERRNO_CODES.ENOMEM)
                    }
                    (fromHeap ? HEAP8 : buffer).set(contents, ptr)
                }
                return {
                    ptr: ptr,
                    allocated: allocated
                }
            }
            ),
            msync: (function(stream, buffer, offset, length, mmapFlags) {
                if (!FS.isFile(stream.node.mode)) {
                    throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
                }
                if (mmapFlags & 2) {
                    return 0
                }
                var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
                return 0
            }
            )
        }
    };
    var IDBFS = {
        dbs: {},
        indexedDB: (function() {
            if (typeof indexedDB !== "undefined")
                return indexedDB;
            var ret = null;
            if (typeof window === "object")
                ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            assert(ret, "IDBFS used, but indexedDB not supported");
            return ret
        }
        ),
        DB_VERSION: 21,
        DB_STORE_NAME: "FILE_DATA",
        mount: (function(mount) {
            return MEMFS.mount.apply(null, arguments)
        }
        ),
        syncfs: (function(mount, populate, callback) {
            IDBFS.getLocalSet(mount, (function(err, local) {
                if (err)
                    return callback(err);
                IDBFS.getRemoteSet(mount, (function(err, remote) {
                    if (err)
                        return callback(err);
                    var src = populate ? remote : local;
                    var dst = populate ? local : remote;
                    IDBFS.reconcile(src, dst, callback)
                }
                ))
            }
            ))
        }
        ),
        getDB: (function(name, callback) {
            var db = IDBFS.dbs[name];
            if (db) {
                return callback(null, db)
            }
            var req;
            try {
                req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION)
            } catch (e) {
                return callback(e)
            }
            if (!req) {
                return callback("Unable to connect to IndexedDB")
            }
            req.onupgradeneeded = (function(e) {
                var db = e.target.result;
                var transaction = e.target.transaction;
                var fileStore;
                if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
                    fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME)
                } else {
                    fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME)
                }
                if (!fileStore.indexNames.contains("timestamp")) {
                    fileStore.createIndex("timestamp", "timestamp", {
                        unique: false
                    })
                }
            }
            );
            req.onsuccess = (function() {
                db = req.result;
                IDBFS.dbs[name] = db;
                callback(null, db)
            }
            );
            req.onerror = (function(e) {
                callback(this.error);
                e.preventDefault()
            }
            )
        }
        ),
        getLocalSet: (function(mount, callback) {
            var entries = {};
            function isRealDir(p) {
                return p !== "." && p !== ".."
            }
            function toAbsolute(root) {
                return (function(p) {
                    return PATH.join2(root, p)
                }
                )
            }
            var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
            while (check.length) {
                var path = check.pop();
                var stat;
                try {
                    stat = FS.stat(path)
                } catch (e) {
                    return callback(e)
                }
                if (FS.isDir(stat.mode)) {
                    check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)))
                }
                entries[path] = {
                    timestamp: stat.mtime
                }
            }
            return callback(null, {
                type: "local",
                entries: entries
            })
        }
        ),
        getRemoteSet: (function(mount, callback) {
            var entries = {};
            IDBFS.getDB(mount.mountpoint, (function(err, db) {
                if (err)
                    return callback(err);
                try {
                    var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readonly");
                    transaction.onerror = (function(e) {
                        callback(this.error);
                        e.preventDefault()
                    }
                    );
                    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
                    var index = store.index("timestamp");
                    index.openKeyCursor().onsuccess = (function(event) {
                        var cursor = event.target.result;
                        if (!cursor) {
                            return callback(null, {
                                type: "remote",
                                db: db,
                                entries: entries
                            })
                        }
                        entries[cursor.primaryKey] = {
                            timestamp: cursor.key
                        };
                        cursor.continue()
                    }
                    )
                } catch (e) {
                    return callback(e)
                }
            }
            ))
        }
        ),
        loadLocalEntry: (function(path, callback) {
            var stat, node;
            try {
                var lookup = FS.lookupPath(path);
                node = lookup.node;
                stat = FS.stat(path)
            } catch (e) {
                return callback(e)
            }
            if (FS.isDir(stat.mode)) {
                return callback(null, {
                    timestamp: stat.mtime,
                    mode: stat.mode
                })
            } else if (FS.isFile(stat.mode)) {
                node.contents = MEMFS.getFileDataAsTypedArray(node);
                return callback(null, {
                    timestamp: stat.mtime,
                    mode: stat.mode,
                    contents: node.contents
                })
            } else {
                return callback(new Error("node type not supported"))
            }
        }
        ),
        storeLocalEntry: (function(path, entry, callback) {
            try {
                if (FS.isDir(entry.mode)) {
                    FS.mkdir(path, entry.mode)
                } else if (FS.isFile(entry.mode)) {
                    FS.writeFile(path, entry.contents, {
                        canOwn: true
                    })
                } else {
                    return callback(new Error("node type not supported"))
                }
                FS.chmod(path, entry.mode);
                FS.utime(path, entry.timestamp, entry.timestamp)
            } catch (e) {
                return callback(e)
            }
            callback(null)
        }
        ),
        removeLocalEntry: (function(path, callback) {
            try {
                var lookup = FS.lookupPath(path);
                var stat = FS.stat(path);
                if (FS.isDir(stat.mode)) {
                    FS.rmdir(path)
                } else if (FS.isFile(stat.mode)) {
                    FS.unlink(path)
                }
            } catch (e) {
                return callback(e)
            }
            callback(null)
        }
        ),
        loadRemoteEntry: (function(store, path, callback) {
            var req = store.get(path);
            req.onsuccess = (function(event) {
                callback(null, event.target.result)
            }
            );
            req.onerror = (function(e) {
                callback(this.error);
                e.preventDefault()
            }
            )
        }
        ),
        storeRemoteEntry: (function(store, path, entry, callback) {
            var req = store.put(entry, path);
            req.onsuccess = (function() {
                callback(null)
            }
            );
            req.onerror = (function(e) {
                callback(this.error);
                e.preventDefault()
            }
            )
        }
        ),
        removeRemoteEntry: (function(store, path, callback) {
            var req = store.delete(path);
            req.onsuccess = (function() {
                callback(null)
            }
            );
            req.onerror = (function(e) {
                callback(this.error);
                e.preventDefault()
            }
            )
        }
        ),
        reconcile: (function(src, dst, callback) {
            var total = 0;
            var create = [];
            Object.keys(src.entries).forEach((function(key) {
                var e = src.entries[key];
                var e2 = dst.entries[key];
                if (!e2 || e.timestamp > e2.timestamp) {
                    create.push(key);
                    total++
                }
            }
            ));
            var remove = [];
            Object.keys(dst.entries).forEach((function(key) {
                var e = dst.entries[key];
                var e2 = src.entries[key];
                if (!e2) {
                    remove.push(key);
                    total++
                }
            }
            ));
            if (!total) {
                return callback(null)
            }
            var completed = 0;
            var db = src.type === "remote" ? src.db : dst.db;
            var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readwrite");
            var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
            function done(err) {
                if (err) {
                    if (!done.errored) {
                        done.errored = true;
                        return callback(err)
                    }
                    return
                }
                if (++completed >= total) {
                    return callback(null)
                }
            }
            transaction.onerror = (function(e) {
                done(this.error);
                e.preventDefault()
            }
            );
            create.sort().forEach((function(path) {
                if (dst.type === "local") {
                    IDBFS.loadRemoteEntry(store, path, (function(err, entry) {
                        if (err)
                            return done(err);
                        IDBFS.storeLocalEntry(path, entry, done)
                    }
                    ))
                } else {
                    IDBFS.loadLocalEntry(path, (function(err, entry) {
                        if (err)
                            return done(err);
                        IDBFS.storeRemoteEntry(store, path, entry, done)
                    }
                    ))
                }
            }
            ));
            remove.sort().reverse().forEach((function(path) {
                if (dst.type === "local") {
                    IDBFS.removeLocalEntry(path, done)
                } else {
                    IDBFS.removeRemoteEntry(store, path, done)
                }
            }
            ))
        }
        )
    };
    var NODEFS = {
        isWindows: false,
        staticInit: (function() {
            NODEFS.isWindows = !!process.platform.match(/^win/);
            var flags = process["binding"]("constants");
            if (flags["fs"]) {
                flags = flags["fs"]
            }
            NODEFS.flagsForNodeMap = {
                "1024": flags["O_APPEND"],
                "64": flags["O_CREAT"],
                "128": flags["O_EXCL"],
                "0": flags["O_RDONLY"],
                "2": flags["O_RDWR"],
                "4096": flags["O_SYNC"],
                "512": flags["O_TRUNC"],
                "1": flags["O_WRONLY"]
            }
        }
        ),
        bufferFrom: (function(arrayBuffer) {
            return Buffer.alloc ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer)
        }
        ),
        mount: (function(mount) {
            assert(ENVIRONMENT_IS_NODE);
            return NODEFS.createNode(null, "/", NODEFS.getMode(mount.opts.root), 0)
        }
        ),
        createNode: (function(parent, name, mode, dev) {
            if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            var node = FS.createNode(parent, name, mode);
            node.node_ops = NODEFS.node_ops;
            node.stream_ops = NODEFS.stream_ops;
            return node
        }
        ),
        getMode: (function(path) {
            var stat;
            try {
                stat = fs.lstatSync(path);
                if (NODEFS.isWindows) {
                    stat.mode = stat.mode | (stat.mode & 292) >> 2
                }
            } catch (e) {
                if (!e.code)
                    throw e;
                throw new FS.ErrnoError(ERRNO_CODES[e.code])
            }
            return stat.mode
        }
        ),
        realPath: (function(node) {
            var parts = [];
            while (node.parent !== node) {
                parts.push(node.name);
                node = node.parent
            }
            parts.push(node.mount.opts.root);
            parts.reverse();
            return PATH.join.apply(null, parts)
        }
        ),
        flagsForNode: (function(flags) {
            flags &= ~2097152;
            flags &= ~2048;
            flags &= ~32768;
            flags &= ~524288;
            var newFlags = 0;
            for (var k in NODEFS.flagsForNodeMap) {
                if (flags & k) {
                    newFlags |= NODEFS.flagsForNodeMap[k];
                    flags ^= k
                }
            }
            if (!flags) {
                return newFlags
            } else {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
        }
        ),
        node_ops: {
            getattr: (function(node) {
                var path = NODEFS.realPath(node);
                var stat;
                try {
                    stat = fs.lstatSync(path)
                } catch (e) {
                    if (!e.code)
                        throw e;
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
                if (NODEFS.isWindows && !stat.blksize) {
                    stat.blksize = 4096
                }
                if (NODEFS.isWindows && !stat.blocks) {
                    stat.blocks = (stat.size + stat.blksize - 1) / stat.blksize | 0
                }
                return {
                    dev: stat.dev,
                    ino: stat.ino,
                    mode: stat.mode,
                    nlink: stat.nlink,
                    uid: stat.uid,
                    gid: stat.gid,
                    rdev: stat.rdev,
                    size: stat.size,
                    atime: stat.atime,
                    mtime: stat.mtime,
                    ctime: stat.ctime,
                    blksize: stat.blksize,
                    blocks: stat.blocks
                }
            }
            ),
            setattr: (function(node, attr) {
                var path = NODEFS.realPath(node);
                try {
                    if (attr.mode !== undefined) {
                        fs.chmodSync(path, attr.mode);
                        node.mode = attr.mode
                    }
                    if (attr.timestamp !== undefined) {
                        var date = new Date(attr.timestamp);
                        fs.utimesSync(path, date, date)
                    }
                    if (attr.size !== undefined) {
                        fs.truncateSync(path, attr.size)
                    }
                } catch (e) {
                    if (!e.code)
                        throw e;
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
            }
            ),
            lookup: (function(parent, name) {
                var path = PATH.join2(NODEFS.realPath(parent), name);
                var mode = NODEFS.getMode(path);
                return NODEFS.createNode(parent, name, mode)
            }
            ),
            mknod: (function(parent, name, mode, dev) {
                var node = NODEFS.createNode(parent, name, mode, dev);
                var path = NODEFS.realPath(node);
                try {
                    if (FS.isDir(node.mode)) {
                        fs.mkdirSync(path, node.mode)
                    } else {
                        fs.writeFileSync(path, "", {
                            mode: node.mode
                        })
                    }
                } catch (e) {
                    if (!e.code)
                        throw e;
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
                return node
            }
            ),
            rename: (function(oldNode, newDir, newName) {
                var oldPath = NODEFS.realPath(oldNode);
                var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
                try {
                    fs.renameSync(oldPath, newPath)
                } catch (e) {
                    if (!e.code)
                        throw e;
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
            }
            ),
            unlink: (function(parent, name) {
                var path = PATH.join2(NODEFS.realPath(parent), name);
                try {
                    fs.unlinkSync(path)
                } catch (e) {
                    if (!e.code)
                        throw e;
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
            }
            ),
            rmdir: (function(parent, name) {
                var path = PATH.join2(NODEFS.realPath(parent), name);
                try {
                    fs.rmdirSync(path)
                } catch (e) {
                    if (!e.code)
                        throw e;
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
            }
            ),
            readdir: (function(node) {
                var path = NODEFS.realPath(node);
                try {
                    return fs.readdirSync(path)
                } catch (e) {
                    if (!e.code)
                        throw e;
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
            }
            ),
            symlink: (function(parent, newName, oldPath) {
                var newPath = PATH.join2(NODEFS.realPath(parent), newName);
                try {
                    fs.symlinkSync(oldPath, newPath)
                } catch (e) {
                    if (!e.code)
                        throw e;
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
            }
            ),
            readlink: (function(node) {
                var path = NODEFS.realPath(node);
                try {
                    path = fs.readlinkSync(path);
                    path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
                    return path
                } catch (e) {
                    if (!e.code)
                        throw e;
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
            }
            )
        },
        stream_ops: {
            open: (function(stream) {
                var path = NODEFS.realPath(stream.node);
                try {
                    if (FS.isFile(stream.node.mode)) {
                        stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags))
                    }
                } catch (e) {
                    if (!e.code)
                        throw e;
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
            }
            ),
            close: (function(stream) {
                try {
                    if (FS.isFile(stream.node.mode) && stream.nfd) {
                        fs.closeSync(stream.nfd)
                    }
                } catch (e) {
                    if (!e.code)
                        throw e;
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
            }
            ),
            read: (function(stream, buffer, offset, length, position) {
                if (length === 0)
                    return 0;
                try {
                    return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position)
                } catch (e) {
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
            }
            ),
            write: (function(stream, buffer, offset, length, position) {
                try {
                    return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position)
                } catch (e) {
                    throw new FS.ErrnoError(ERRNO_CODES[e.code])
                }
            }
            ),
            llseek: (function(stream, offset, whence) {
                var position = offset;
                if (whence === 1) {
                    position += stream.position
                } else if (whence === 2) {
                    if (FS.isFile(stream.node.mode)) {
                        try {
                            var stat = fs.fstatSync(stream.nfd);
                            position += stat.size
                        } catch (e) {
                            throw new FS.ErrnoError(ERRNO_CODES[e.code])
                        }
                    }
                }
                if (position < 0) {
                    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
                }
                return position
            }
            )
        }
    };
    var WORKERFS = {
        DIR_MODE: 16895,
        FILE_MODE: 33279,
        reader: null,
        mount: (function(mount) {
            assert(ENVIRONMENT_IS_WORKER);
            if (!WORKERFS.reader)
                WORKERFS.reader = new FileReaderSync;
            var root = WORKERFS.createNode(null, "/", WORKERFS.DIR_MODE, 0);
            var createdParents = {};
            function ensureParent(path) {
                var parts = path.split("/");
                var parent = root;
                for (var i = 0; i < parts.length - 1; i++) {
                    var curr = parts.slice(0, i + 1).join("/");
                    if (!createdParents[curr]) {
                        createdParents[curr] = WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0)
                    }
                    parent = createdParents[curr]
                }
                return parent
            }
            function base(path) {
                var parts = path.split("/");
                return parts[parts.length - 1]
            }
            Array.prototype.forEach.call(mount.opts["files"] || [], (function(file) {
                WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate)
            }
            ));
            (mount.opts["blobs"] || []).forEach((function(obj) {
                WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"])
            }
            ));
            (mount.opts["packages"] || []).forEach((function(pack) {
                pack["metadata"].files.forEach((function(file) {
                    var name = file.filename.substr(1);
                    WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack["blob"].slice(file.start, file.end))
                }
                ))
            }
            ));
            return root
        }
        ),
        createNode: (function(parent, name, mode, dev, contents, mtime) {
            var node = FS.createNode(parent, name, mode);
            node.mode = mode;
            node.node_ops = WORKERFS.node_ops;
            node.stream_ops = WORKERFS.stream_ops;
            node.timestamp = (mtime || new Date).getTime();
            assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE);
            if (mode === WORKERFS.FILE_MODE) {
                node.size = contents.size;
                node.contents = contents
            } else {
                node.size = 4096;
                node.contents = {}
            }
            if (parent) {
                parent.contents[name] = node
            }
            return node
        }
        ),
        node_ops: {
            getattr: (function(node) {
                return {
                    dev: 1,
                    ino: undefined,
                    mode: node.mode,
                    nlink: 1,
                    uid: 0,
                    gid: 0,
                    rdev: undefined,
                    size: node.size,
                    atime: new Date(node.timestamp),
                    mtime: new Date(node.timestamp),
                    ctime: new Date(node.timestamp),
                    blksize: 4096,
                    blocks: Math.ceil(node.size / 4096)
                }
            }
            ),
            setattr: (function(node, attr) {
                if (attr.mode !== undefined) {
                    node.mode = attr.mode
                }
                if (attr.timestamp !== undefined) {
                    node.timestamp = attr.timestamp
                }
            }
            ),
            lookup: (function(parent, name) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
            }
            ),
            mknod: (function(parent, name, mode, dev) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            ),
            rename: (function(oldNode, newDir, newName) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            ),
            unlink: (function(parent, name) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            ),
            rmdir: (function(parent, name) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            ),
            readdir: (function(node) {
                var entries = [".", ".."];
                for (var key in node.contents) {
                    if (!node.contents.hasOwnProperty(key)) {
                        continue
                    }
                    entries.push(key)
                }
                return entries
            }
            ),
            symlink: (function(parent, newName, oldPath) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            ),
            readlink: (function(node) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            )
        },
        stream_ops: {
            read: (function(stream, buffer, offset, length, position) {
                if (position >= stream.node.size)
                    return 0;
                var chunk = stream.node.contents.slice(position, position + length);
                var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
                buffer.set(new Uint8Array(ab), offset);
                return chunk.size
            }
            ),
            write: (function(stream, buffer, offset, length, position) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO)
            }
            ),
            llseek: (function(stream, offset, whence) {
                var position = offset;
                if (whence === 1) {
                    position += stream.position
                } else if (whence === 2) {
                    if (FS.isFile(stream.node.mode)) {
                        position += stream.node.size
                    }
                }
                if (position < 0) {
                    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
                }
                return position
            }
            )
        }
    };
    STATICTOP += 16;
    STATICTOP += 16;
    STATICTOP += 16;
    var FS = {
        root: null,
        mounts: [],
        devices: {},
        streams: [],
        nextInode: 1,
        nameTable: null,
        currentPath: "/",
        initialized: false,
        ignorePermissions: true,
        trackingDelegate: {},
        tracking: {
            openFlags: {
                READ: 1,
                WRITE: 2
            }
        },
        ErrnoError: null,
        genericErrors: {},
        filesystems: null,
        syncFSRequests: 0,
        handleFSError: (function(e) {
            if (!(e instanceof FS.ErrnoError))
                throw e + " : " + stackTrace();
            return ___setErrNo(e.errno)
        }
        ),
        lookupPath: (function(path, opts) {
            path = PATH.resolve(FS.cwd(), path);
            opts = opts || {};
            if (!path)
                return {
                    path: "",
                    node: null
                };
            var defaults = {
                follow_mount: true,
                recurse_count: 0
            };
            for (var key in defaults) {
                if (opts[key] === undefined) {
                    opts[key] = defaults[key]
                }
            }
            if (opts.recurse_count > 8) {
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP)
            }
            var parts = PATH.normalizeArray(path.split("/").filter((function(p) {
                return !!p
            }
            )), false);
            var current = FS.root;
            var current_path = "/";
            for (var i = 0; i < parts.length; i++) {
                var islast = i === parts.length - 1;
                if (islast && opts.parent) {
                    break
                }
                current = FS.lookupNode(current, parts[i]);
                current_path = PATH.join2(current_path, parts[i]);
                if (FS.isMountpoint(current)) {
                    if (!islast || islast && opts.follow_mount) {
                        current = current.mounted.root
                    }
                }
                if (!islast || opts.follow) {
                    var count = 0;
                    while (FS.isLink(current.mode)) {
                        var link = FS.readlink(current_path);
                        current_path = PATH.resolve(PATH.dirname(current_path), link);
                        var lookup = FS.lookupPath(current_path, {
                            recurse_count: opts.recurse_count
                        });
                        current = lookup.node;
                        if (count++ > 40) {
                            throw new FS.ErrnoError(ERRNO_CODES.ELOOP)
                        }
                    }
                }
            }
            return {
                path: current_path,
                node: current
            }
        }
        ),
        getPath: (function(node) {
            var path;
            while (true) {
                if (FS.isRoot(node)) {
                    var mount = node.mount.mountpoint;
                    if (!path)
                        return mount;
                    return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path
                }
                path = path ? node.name + "/" + path : node.name;
                node = node.parent
            }
        }
        ),
        hashName: (function(parentid, name) {
            var hash = 0;
            for (var i = 0; i < name.length; i++) {
                hash = (hash << 5) - hash + name.charCodeAt(i) | 0
            }
            return (parentid + hash >>> 0) % FS.nameTable.length
        }
        ),
        hashAddNode: (function(node) {
            var hash = FS.hashName(node.parent.id, node.name);
            node.name_next = FS.nameTable[hash];
            FS.nameTable[hash] = node
        }
        ),
        hashRemoveNode: (function(node) {
            var hash = FS.hashName(node.parent.id, node.name);
            if (FS.nameTable[hash] === node) {
                FS.nameTable[hash] = node.name_next
            } else {
                var current = FS.nameTable[hash];
                while (current) {
                    if (current.name_next === node) {
                        current.name_next = node.name_next;
                        break
                    }
                    current = current.name_next
                }
            }
        }
        ),
        lookupNode: (function(parent, name) {
            var err = FS.mayLookup(parent);
            if (err) {
                throw new FS.ErrnoError(err,parent)
            }
            var hash = FS.hashName(parent.id, name);
            for (var node = FS.nameTable[hash]; node; node = node.name_next) {
                var nodeName = node.name;
                if (node.parent.id === parent.id && nodeName === name) {
                    return node
                }
            }
            return FS.lookup(parent, name)
        }
        ),
        createNode: (function(parent, name, mode, rdev) {
            if (!FS.FSNode) {
                FS.FSNode = (function(parent, name, mode, rdev) {
                    if (!parent) {
                        parent = this
                    }
                    this.parent = parent;
                    this.mount = parent.mount;
                    this.mounted = null;
                    this.id = FS.nextInode++;
                    this.name = name;
                    this.mode = mode;
                    this.node_ops = {};
                    this.stream_ops = {};
                    this.rdev = rdev
                }
                );
                FS.FSNode.prototype = {};
                var readMode = 292 | 73;
                var writeMode = 146;
                Object.defineProperties(FS.FSNode.prototype, {
                    read: {
                        get: (function() {
                            return (this.mode & readMode) === readMode
                        }
                        ),
                        set: (function(val) {
                            val ? this.mode |= readMode : this.mode &= ~readMode
                        }
                        )
                    },
                    write: {
                        get: (function() {
                            return (this.mode & writeMode) === writeMode
                        }
                        ),
                        set: (function(val) {
                            val ? this.mode |= writeMode : this.mode &= ~writeMode
                        }
                        )
                    },
                    isFolder: {
                        get: (function() {
                            return FS.isDir(this.mode)
                        }
                        )
                    },
                    isDevice: {
                        get: (function() {
                            return FS.isChrdev(this.mode)
                        }
                        )
                    }
                })
            }
            var node = new FS.FSNode(parent,name,mode,rdev);
            FS.hashAddNode(node);
            return node
        }
        ),
        destroyNode: (function(node) {
            FS.hashRemoveNode(node)
        }
        ),
        isRoot: (function(node) {
            return node === node.parent
        }
        ),
        isMountpoint: (function(node) {
            return !!node.mounted
        }
        ),
        isFile: (function(mode) {
            return (mode & 61440) === 32768
        }
        ),
        isDir: (function(mode) {
            return (mode & 61440) === 16384
        }
        ),
        isLink: (function(mode) {
            return (mode & 61440) === 40960
        }
        ),
        isChrdev: (function(mode) {
            return (mode & 61440) === 8192
        }
        ),
        isBlkdev: (function(mode) {
            return (mode & 61440) === 24576
        }
        ),
        isFIFO: (function(mode) {
            return (mode & 61440) === 4096
        }
        ),
        isSocket: (function(mode) {
            return (mode & 49152) === 49152
        }
        ),
        flagModes: {
            "r": 0,
            "rs": 1052672,
            "r+": 2,
            "w": 577,
            "wx": 705,
            "xw": 705,
            "w+": 578,
            "wx+": 706,
            "xw+": 706,
            "a": 1089,
            "ax": 1217,
            "xa": 1217,
            "a+": 1090,
            "ax+": 1218,
            "xa+": 1218
        },
        modeStringToFlags: (function(str) {
            var flags = FS.flagModes[str];
            if (typeof flags === "undefined") {
                throw new Error("Unknown file open mode: " + str)
            }
            return flags
        }
        ),
        flagsToPermissionString: (function(flag) {
            var perms = ["r", "w", "rw"][flag & 3];
            if (flag & 512) {
                perms += "w"
            }
            return perms
        }
        ),
        nodePermissions: (function(node, perms) {
            if (FS.ignorePermissions) {
                return 0
            }
            if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
                return ERRNO_CODES.EACCES
            } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
                return ERRNO_CODES.EACCES
            } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
                return ERRNO_CODES.EACCES
            }
            return 0
        }
        ),
        mayLookup: (function(dir) {
            var err = FS.nodePermissions(dir, "x");
            if (err)
                return err;
            if (!dir.node_ops.lookup)
                return ERRNO_CODES.EACCES;
            return 0
        }
        ),
        mayCreate: (function(dir, name) {
            try {
                var node = FS.lookupNode(dir, name);
                return ERRNO_CODES.EEXIST
            } catch (e) {}
            return FS.nodePermissions(dir, "wx")
        }
        ),
        mayDelete: (function(dir, name, isdir) {
            var node;
            try {
                node = FS.lookupNode(dir, name)
            } catch (e) {
                return e.errno
            }
            var err = FS.nodePermissions(dir, "wx");
            if (err) {
                return err
            }
            if (isdir) {
                if (!FS.isDir(node.mode)) {
                    return ERRNO_CODES.ENOTDIR
                }
                if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                    return ERRNO_CODES.EBUSY
                }
            } else {
                if (FS.isDir(node.mode)) {
                    return ERRNO_CODES.EISDIR
                }
            }
            return 0
        }
        ),
        mayOpen: (function(node, flags) {
            if (!node) {
                return ERRNO_CODES.ENOENT
            }
            if (FS.isLink(node.mode)) {
                return ERRNO_CODES.ELOOP
            } else if (FS.isDir(node.mode)) {
                if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
                    return ERRNO_CODES.EISDIR
                }
            }
            return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
        }
        ),
        MAX_OPEN_FDS: 4096,
        nextfd: (function(fd_start, fd_end) {
            fd_start = fd_start || 0;
            fd_end = fd_end || FS.MAX_OPEN_FDS;
            for (var fd = fd_start; fd <= fd_end; fd++) {
                if (!FS.streams[fd]) {
                    return fd
                }
            }
            throw new FS.ErrnoError(ERRNO_CODES.EMFILE)
        }
        ),
        getStream: (function(fd) {
            return FS.streams[fd]
        }
        ),
        createStream: (function(stream, fd_start, fd_end) {
            if (!FS.FSStream) {
                FS.FSStream = (function() {}
                );
                FS.FSStream.prototype = {};
                Object.defineProperties(FS.FSStream.prototype, {
                    object: {
                        get: (function() {
                            return this.node
                        }
                        ),
                        set: (function(val) {
                            this.node = val
                        }
                        )
                    },
                    isRead: {
                        get: (function() {
                            return (this.flags & 2097155) !== 1
                        }
                        )
                    },
                    isWrite: {
                        get: (function() {
                            return (this.flags & 2097155) !== 0
                        }
                        )
                    },
                    isAppend: {
                        get: (function() {
                            return this.flags & 1024
                        }
                        )
                    }
                })
            }
            var newStream = new FS.FSStream;
            for (var p in stream) {
                newStream[p] = stream[p]
            }
            stream = newStream;
            var fd = FS.nextfd(fd_start, fd_end);
            stream.fd = fd;
            FS.streams[fd] = stream;
            return stream
        }
        ),
        closeStream: (function(fd) {
            FS.streams[fd] = null
        }
        ),
        chrdev_stream_ops: {
            open: (function(stream) {
                var device = FS.getDevice(stream.node.rdev);
                stream.stream_ops = device.stream_ops;
                if (stream.stream_ops.open) {
                    stream.stream_ops.open(stream)
                }
            }
            ),
            llseek: (function() {
                throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)
            }
            )
        },
        major: (function(dev) {
            return dev >> 8
        }
        ),
        minor: (function(dev) {
            return dev & 255
        }
        ),
        makedev: (function(ma, mi) {
            return ma << 8 | mi
        }
        ),
        registerDevice: (function(dev, ops) {
            FS.devices[dev] = {
                stream_ops: ops
            }
        }
        ),
        getDevice: (function(dev) {
            return FS.devices[dev]
        }
        ),
        getMounts: (function(mount) {
            var mounts = [];
            var check = [mount];
            while (check.length) {
                var m = check.pop();
                mounts.push(m);
                check.push.apply(check, m.mounts)
            }
            return mounts
        }
        ),
        syncfs: (function(populate, callback) {
            if (typeof populate === "function") {
                callback = populate;
                populate = false
            }
            FS.syncFSRequests++;
            if (FS.syncFSRequests > 1) {
                console.log("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work")
            }
            var mounts = FS.getMounts(FS.root.mount);
            var completed = 0;
            function doCallback(err) {
                assert(FS.syncFSRequests > 0);
                FS.syncFSRequests--;
                return callback(err)
            }
            function done(err) {
                if (err) {
                    if (!done.errored) {
                        done.errored = true;
                        return doCallback(err)
                    }
                    return
                }
                if (++completed >= mounts.length) {
                    doCallback(null)
                }
            }
            mounts.forEach((function(mount) {
                if (!mount.type.syncfs) {
                    return done(null)
                }
                mount.type.syncfs(mount, populate, done)
            }
            ))
        }
        ),
        mount: (function(type, opts, mountpoint) {
            var root = mountpoint === "/";
            var pseudo = !mountpoint;
            var node;
            if (root && FS.root) {
                throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
            } else if (!root && !pseudo) {
                var lookup = FS.lookupPath(mountpoint, {
                    follow_mount: false
                });
                mountpoint = lookup.path;
                node = lookup.node;
                if (FS.isMountpoint(node)) {
                    throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
                }
                if (!FS.isDir(node.mode)) {
                    throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR)
                }
            }
            var mount = {
                type: type,
                opts: opts,
                mountpoint: mountpoint,
                mounts: []
            };
            var mountRoot = type.mount(mount);
            mountRoot.mount = mount;
            mount.root = mountRoot;
            if (root) {
                FS.root = mountRoot
            } else if (node) {
                node.mounted = mount;
                if (node.mount) {
                    node.mount.mounts.push(mount)
                }
            }
            return mountRoot
        }
        ),
        unmount: (function(mountpoint) {
            var lookup = FS.lookupPath(mountpoint, {
                follow_mount: false
            });
            if (!FS.isMountpoint(lookup.node)) {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            var node = lookup.node;
            var mount = node.mounted;
            var mounts = FS.getMounts(mount);
            Object.keys(FS.nameTable).forEach((function(hash) {
                var current = FS.nameTable[hash];
                while (current) {
                    var next = current.name_next;
                    if (mounts.indexOf(current.mount) !== -1) {
                        FS.destroyNode(current)
                    }
                    current = next
                }
            }
            ));
            node.mounted = null;
            var idx = node.mount.mounts.indexOf(mount);
            assert(idx !== -1);
            node.mount.mounts.splice(idx, 1)
        }
        ),
        lookup: (function(parent, name) {
            return parent.node_ops.lookup(parent, name)
        }
        ),
        mknod: (function(path, mode, dev) {
            var lookup = FS.lookupPath(path, {
                parent: true
            });
            var parent = lookup.node;
            var name = PATH.basename(path);
            if (!name || name === "." || name === "..") {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            var err = FS.mayCreate(parent, name);
            if (err) {
                throw new FS.ErrnoError(err)
            }
            if (!parent.node_ops.mknod) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            return parent.node_ops.mknod(parent, name, mode, dev)
        }
        ),
        create: (function(path, mode) {
            mode = mode !== undefined ? mode : 438;
            mode &= 4095;
            mode |= 32768;
            return FS.mknod(path, mode, 0)
        }
        ),
        mkdir: (function(path, mode) {
            mode = mode !== undefined ? mode : 511;
            mode &= 511 | 512;
            mode |= 16384;
            return FS.mknod(path, mode, 0)
        }
        ),
        mkdirTree: (function(path, mode) {
            var dirs = path.split("/");
            var d = "";
            for (var i = 0; i < dirs.length; ++i) {
                if (!dirs[i])
                    continue;
                d += "/" + dirs[i];
                try {
                    FS.mkdir(d, mode)
                } catch (e) {
                    if (e.errno != ERRNO_CODES.EEXIST)
                        throw e
                }
            }
        }
        ),
        mkdev: (function(path, mode, dev) {
            if (typeof dev === "undefined") {
                dev = mode;
                mode = 438
            }
            mode |= 8192;
            return FS.mknod(path, mode, dev)
        }
        ),
        symlink: (function(oldpath, newpath) {
            if (!PATH.resolve(oldpath)) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
            }
            var lookup = FS.lookupPath(newpath, {
                parent: true
            });
            var parent = lookup.node;
            if (!parent) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
            }
            var newname = PATH.basename(newpath);
            var err = FS.mayCreate(parent, newname);
            if (err) {
                throw new FS.ErrnoError(err)
            }
            if (!parent.node_ops.symlink) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            return parent.node_ops.symlink(parent, newname, oldpath)
        }
        ),
        rename: (function(old_path, new_path) {
            var old_dirname = PATH.dirname(old_path);
            var new_dirname = PATH.dirname(new_path);
            var old_name = PATH.basename(old_path);
            var new_name = PATH.basename(new_path);
            var lookup, old_dir, new_dir;
            try {
                lookup = FS.lookupPath(old_path, {
                    parent: true
                });
                old_dir = lookup.node;
                lookup = FS.lookupPath(new_path, {
                    parent: true
                });
                new_dir = lookup.node
            } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
            }
            if (!old_dir || !new_dir)
                throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
            if (old_dir.mount !== new_dir.mount) {
                throw new FS.ErrnoError(ERRNO_CODES.EXDEV)
            }
            var old_node = FS.lookupNode(old_dir, old_name);
            var relative = PATH.relative(old_path, new_dirname);
            if (relative.charAt(0) !== ".") {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            relative = PATH.relative(new_path, old_dirname);
            if (relative.charAt(0) !== ".") {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY)
            }
            var new_node;
            try {
                new_node = FS.lookupNode(new_dir, new_name)
            } catch (e) {}
            if (old_node === new_node) {
                return
            }
            var isdir = FS.isDir(old_node.mode);
            var err = FS.mayDelete(old_dir, old_name, isdir);
            if (err) {
                throw new FS.ErrnoError(err)
            }
            err = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
            if (err) {
                throw new FS.ErrnoError(err)
            }
            if (!old_dir.node_ops.rename) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
                throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
            }
            if (new_dir !== old_dir) {
                err = FS.nodePermissions(old_dir, "w");
                if (err) {
                    throw new FS.ErrnoError(err)
                }
            }
            try {
                if (FS.trackingDelegate["willMovePath"]) {
                    FS.trackingDelegate["willMovePath"](old_path, new_path)
                }
            } catch (e) {
                console.log("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message)
            }
            FS.hashRemoveNode(old_node);
            try {
                old_dir.node_ops.rename(old_node, new_dir, new_name)
            } catch (e) {
                throw e
            } finally {
                FS.hashAddNode(old_node)
            }
            try {
                if (FS.trackingDelegate["onMovePath"])
                    FS.trackingDelegate["onMovePath"](old_path, new_path)
            } catch (e) {
                console.log("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message)
            }
        }
        ),
        rmdir: (function(path) {
            var lookup = FS.lookupPath(path, {
                parent: true
            });
            var parent = lookup.node;
            var name = PATH.basename(path);
            var node = FS.lookupNode(parent, name);
            var err = FS.mayDelete(parent, name, true);
            if (err) {
                throw new FS.ErrnoError(err)
            }
            if (!parent.node_ops.rmdir) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            if (FS.isMountpoint(node)) {
                throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
            }
            try {
                if (FS.trackingDelegate["willDeletePath"]) {
                    FS.trackingDelegate["willDeletePath"](path)
                }
            } catch (e) {
                console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message)
            }
            parent.node_ops.rmdir(parent, name);
            FS.destroyNode(node);
            try {
                if (FS.trackingDelegate["onDeletePath"])
                    FS.trackingDelegate["onDeletePath"](path)
            } catch (e) {
                console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message)
            }
        }
        ),
        readdir: (function(path) {
            var lookup = FS.lookupPath(path, {
                follow: true
            });
            var node = lookup.node;
            if (!node.node_ops.readdir) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR)
            }
            return node.node_ops.readdir(node)
        }
        ),
        unlink: (function(path) {
            var lookup = FS.lookupPath(path, {
                parent: true
            });
            var parent = lookup.node;
            var name = PATH.basename(path);
            var node = FS.lookupNode(parent, name);
            var err = FS.mayDelete(parent, name, false);
            if (err) {
                throw new FS.ErrnoError(err)
            }
            if (!parent.node_ops.unlink) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            if (FS.isMountpoint(node)) {
                throw new FS.ErrnoError(ERRNO_CODES.EBUSY)
            }
            try {
                if (FS.trackingDelegate["willDeletePath"]) {
                    FS.trackingDelegate["willDeletePath"](path)
                }
            } catch (e) {
                console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message)
            }
            parent.node_ops.unlink(parent, name);
            FS.destroyNode(node);
            try {
                if (FS.trackingDelegate["onDeletePath"])
                    FS.trackingDelegate["onDeletePath"](path)
            } catch (e) {
                console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message)
            }
        }
        ),
        readlink: (function(path) {
            var lookup = FS.lookupPath(path);
            var link = lookup.node;
            if (!link) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
            }
            if (!link.node_ops.readlink) {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            return PATH.resolve(FS.getPath(link.parent), link.node_ops.readlink(link))
        }
        ),
        stat: (function(path, dontFollow) {
            var lookup = FS.lookupPath(path, {
                follow: !dontFollow
            });
            var node = lookup.node;
            if (!node) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
            }
            if (!node.node_ops.getattr) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            return node.node_ops.getattr(node)
        }
        ),
        lstat: (function(path) {
            return FS.stat(path, true)
        }
        ),
        chmod: (function(path, mode, dontFollow) {
            var node;
            if (typeof path === "string") {
                var lookup = FS.lookupPath(path, {
                    follow: !dontFollow
                });
                node = lookup.node
            } else {
                node = path
            }
            if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            node.node_ops.setattr(node, {
                mode: mode & 4095 | node.mode & ~4095,
                timestamp: Date.now()
            })
        }
        ),
        lchmod: (function(path, mode) {
            FS.chmod(path, mode, true)
        }
        ),
        fchmod: (function(fd, mode) {
            var stream = FS.getStream(fd);
            if (!stream) {
                throw new FS.ErrnoError(ERRNO_CODES.EBADF)
            }
            FS.chmod(stream.node, mode)
        }
        ),
        chown: (function(path, uid, gid, dontFollow) {
            var node;
            if (typeof path === "string") {
                var lookup = FS.lookupPath(path, {
                    follow: !dontFollow
                });
                node = lookup.node
            } else {
                node = path
            }
            if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            node.node_ops.setattr(node, {
                timestamp: Date.now()
            })
        }
        ),
        lchown: (function(path, uid, gid) {
            FS.chown(path, uid, gid, true)
        }
        ),
        fchown: (function(fd, uid, gid) {
            var stream = FS.getStream(fd);
            if (!stream) {
                throw new FS.ErrnoError(ERRNO_CODES.EBADF)
            }
            FS.chown(stream.node, uid, gid)
        }
        ),
        truncate: (function(path, len) {
            if (len < 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            var node;
            if (typeof path === "string") {
                var lookup = FS.lookupPath(path, {
                    follow: true
                });
                node = lookup.node
            } else {
                node = path
            }
            if (!node.node_ops.setattr) {
                throw new FS.ErrnoError(ERRNO_CODES.EPERM)
            }
            if (FS.isDir(node.mode)) {
                throw new FS.ErrnoError(ERRNO_CODES.EISDIR)
            }
            if (!FS.isFile(node.mode)) {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            var err = FS.nodePermissions(node, "w");
            if (err) {
                throw new FS.ErrnoError(err)
            }
            node.node_ops.setattr(node, {
                size: len,
                timestamp: Date.now()
            })
        }
        ),
        ftruncate: (function(fd, len) {
            var stream = FS.getStream(fd);
            if (!stream) {
                throw new FS.ErrnoError(ERRNO_CODES.EBADF)
            }
            if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            FS.truncate(stream.node, len)
        }
        ),
        utime: (function(path, atime, mtime) {
            var lookup = FS.lookupPath(path, {
                follow: true
            });
            var node = lookup.node;
            node.node_ops.setattr(node, {
                timestamp: Math.max(atime, mtime)
            })
        }
        ),
        open: (function(path, flags, mode, fd_start, fd_end) {
            if (path === "") {
                throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
            }
            flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
            mode = typeof mode === "undefined" ? 438 : mode;
            if (flags & 64) {
                mode = mode & 4095 | 32768
            } else {
                mode = 0
            }
            var node;
            if (typeof path === "object") {
                node = path
            } else {
                path = PATH.normalize(path);
                try {
                    var lookup = FS.lookupPath(path, {
                        follow: !(flags & 131072)
                    });
                    node = lookup.node
                } catch (e) {}
            }
            var created = false;
            if (flags & 64) {
                if (node) {
                    if (flags & 128) {
                        throw new FS.ErrnoError(ERRNO_CODES.EEXIST)
                    }
                } else {
                    node = FS.mknod(path, mode, 0);
                    created = true
                }
            }
            if (!node) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
            }
            if (FS.isChrdev(node.mode)) {
                flags &= ~512
            }
            if (flags & 65536 && !FS.isDir(node.mode)) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR)
            }
            if (!created) {
                var err = FS.mayOpen(node, flags);
                if (err) {
                    throw new FS.ErrnoError(err)
                }
            }
            if (flags & 512) {
                FS.truncate(node, 0)
            }
            flags &= ~(128 | 512);
            var stream = FS.createStream({
                node: node,
                path: FS.getPath(node),
                flags: flags,
                seekable: true,
                position: 0,
                stream_ops: node.stream_ops,
                ungotten: [],
                error: false
            }, fd_start, fd_end);
            if (stream.stream_ops.open) {
                stream.stream_ops.open(stream)
            }
            if (Module["logReadFiles"] && !(flags & 1)) {
                if (!FS.readFiles)
                    FS.readFiles = {};
                if (!(path in FS.readFiles)) {
                    FS.readFiles[path] = 1;
                    err("read file: " + path)
                }
            }
            try {
                if (FS.trackingDelegate["onOpenFile"]) {
                    var trackingFlags = 0;
                    if ((flags & 2097155) !== 1) {
                        trackingFlags |= FS.tracking.openFlags.READ
                    }
                    if ((flags & 2097155) !== 0) {
                        trackingFlags |= FS.tracking.openFlags.WRITE
                    }
                    FS.trackingDelegate["onOpenFile"](path, trackingFlags)
                }
            } catch (e) {
                console.log("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message)
            }
            return stream
        }
        ),
        close: (function(stream) {
            if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(ERRNO_CODES.EBADF)
            }
            if (stream.getdents)
                stream.getdents = null;
            try {
                if (stream.stream_ops.close) {
                    stream.stream_ops.close(stream)
                }
            } catch (e) {
                throw e
            } finally {
                FS.closeStream(stream.fd)
            }
            stream.fd = null
        }
        ),
        isClosed: (function(stream) {
            return stream.fd === null
        }
        ),
        llseek: (function(stream, offset, whence) {
            if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(ERRNO_CODES.EBADF)
            }
            if (!stream.seekable || !stream.stream_ops.llseek) {
                throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)
            }
            stream.position = stream.stream_ops.llseek(stream, offset, whence);
            stream.ungotten = [];
            return stream.position
        }
        ),
        read: (function(stream, buffer, offset, length, position) {
            if (length < 0 || position < 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(ERRNO_CODES.EBADF)
            }
            if ((stream.flags & 2097155) === 1) {
                throw new FS.ErrnoError(ERRNO_CODES.EBADF)
            }
            if (FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(ERRNO_CODES.EISDIR)
            }
            if (!stream.stream_ops.read) {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            var seeking = typeof position !== "undefined";
            if (!seeking) {
                position = stream.position
            } else if (!stream.seekable) {
                throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)
            }
            var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
            if (!seeking)
                stream.position += bytesRead;
            return bytesRead
        }
        ),
        write: (function(stream, buffer, offset, length, position, canOwn) {
            if (length < 0 || position < 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(ERRNO_CODES.EBADF)
            }
            if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EBADF)
            }
            if (FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(ERRNO_CODES.EISDIR)
            }
            if (!stream.stream_ops.write) {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            if (stream.flags & 1024) {
                FS.llseek(stream, 0, 2)
            }
            var seeking = typeof position !== "undefined";
            if (!seeking) {
                position = stream.position
            } else if (!stream.seekable) {
                throw new FS.ErrnoError(ERRNO_CODES.ESPIPE)
            }
            var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
            if (!seeking)
                stream.position += bytesWritten;
            try {
                if (stream.path && FS.trackingDelegate["onWriteToFile"])
                    FS.trackingDelegate["onWriteToFile"](stream.path)
            } catch (e) {
                console.log("FS.trackingDelegate['onWriteToFile']('" + path + "') threw an exception: " + e.message)
            }
            return bytesWritten
        }
        ),
        allocate: (function(stream, offset, length) {
            if (FS.isClosed(stream)) {
                throw new FS.ErrnoError(ERRNO_CODES.EBADF)
            }
            if (offset < 0 || length <= 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
            }
            if ((stream.flags & 2097155) === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EBADF)
            }
            if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
                throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
            }
            if (!stream.stream_ops.allocate) {
                throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)
            }
            stream.stream_ops.allocate(stream, offset, length)
        }
        ),
        mmap: (function(stream, buffer, offset, length, position, prot, flags) {
            if ((stream.flags & 2097155) === 1) {
                throw new FS.ErrnoError(ERRNO_CODES.EACCES)
            }
            if (!stream.stream_ops.mmap) {
                throw new FS.ErrnoError(ERRNO_CODES.ENODEV)
            }
            return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags)
        }
        ),
        msync: (function(stream, buffer, offset, length, mmapFlags) {
            if (!stream || !stream.stream_ops.msync) {
                return 0
            }
            return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
        }
        ),
        munmap: (function(stream) {
            return 0
        }
        ),
        ioctl: (function(stream, cmd, arg) {
            if (!stream.stream_ops.ioctl) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTTY)
            }
            return stream.stream_ops.ioctl(stream, cmd, arg)
        }
        ),
        readFile: (function(path, opts) {
            opts = opts || {};
            opts.flags = opts.flags || "r";
            opts.encoding = opts.encoding || "binary";
            if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
                throw new Error('Invalid encoding type "' + opts.encoding + '"')
            }
            var ret;
            var stream = FS.open(path, opts.flags);
            var stat = FS.stat(path);
            var length = stat.size;
            var buf = new Uint8Array(length);
            FS.read(stream, buf, 0, length, 0);
            if (opts.encoding === "utf8") {
                ret = UTF8ArrayToString(buf, 0)
            } else if (opts.encoding === "binary") {
                ret = buf
            }
            FS.close(stream);
            return ret
        }
        ),
        writeFile: (function(path, data, opts) {
            opts = opts || {};
            opts.flags = opts.flags || "w";
            var stream = FS.open(path, opts.flags, opts.mode);
            if (typeof data === "string") {
                var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
                var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
                FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
            } else if (ArrayBuffer.isView(data)) {
                FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
            } else {
                throw new Error("Unsupported data type")
            }
            FS.close(stream)
        }
        ),
        cwd: (function() {
            return FS.currentPath
        }
        ),
        chdir: (function(path) {
            var lookup = FS.lookupPath(path, {
                follow: true
            });
            if (lookup.node === null) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOENT)
            }
            if (!FS.isDir(lookup.node.mode)) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR)
            }
            var err = FS.nodePermissions(lookup.node, "x");
            if (err) {
                throw new FS.ErrnoError(err)
            }
            FS.currentPath = lookup.path
        }
        ),
        createDefaultDirectories: (function() {
            FS.mkdir("/tmp");
            FS.mkdir("/home");
            FS.mkdir("/home/web_user")
        }
        ),
        createDefaultDevices: (function() {
            FS.mkdir("/dev");
            FS.registerDevice(FS.makedev(1, 3), {
                read: (function() {
                    return 0
                }
                ),
                write: (function(stream, buffer, offset, length, pos) {
                    return length
                }
                )
            });
            FS.mkdev("/dev/null", FS.makedev(1, 3));
            TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
            TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
            FS.mkdev("/dev/tty", FS.makedev(5, 0));
            FS.mkdev("/dev/tty1", FS.makedev(6, 0));
            var random_device;
            if (typeof crypto !== "undefined") {
                var randomBuffer = new Uint8Array(1);
                random_device = (function() {
                    crypto.getRandomValues(randomBuffer);
                    return randomBuffer[0]
                }
                )
            } else if (ENVIRONMENT_IS_NODE) {
                random_device = (function() {
                    return require("crypto")["randomBytes"](1)[0]
                }
                )
            } else {
                random_device = (function() {
                    return Math.random() * 256 | 0
                }
                )
            }
            FS.createDevice("/dev", "random", random_device);
            FS.createDevice("/dev", "urandom", random_device);
            FS.mkdir("/dev/shm");
            FS.mkdir("/dev/shm/tmp")
        }
        ),
        createSpecialDirectories: (function() {
            FS.mkdir("/proc");
            FS.mkdir("/proc/self");
            FS.mkdir("/proc/self/fd");
            FS.mount({
                mount: (function() {
                    var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
                    node.node_ops = {
                        lookup: (function(parent, name) {
                            var fd = +name;
                            var stream = FS.getStream(fd);
                            if (!stream)
                                throw new FS.ErrnoError(ERRNO_CODES.EBADF);
                            var ret = {
                                parent: null,
                                mount: {
                                    mountpoint: "fake"
                                },
                                node_ops: {
                                    readlink: (function() {
                                        return stream.path
                                    }
                                    )
                                }
                            };
                            ret.parent = ret;
                            return ret
                        }
                        )
                    };
                    return node
                }
                )
            }, {}, "/proc/self/fd")
        }
        ),
        createStandardStreams: (function() {
            if (Module["stdin"]) {
                FS.createDevice("/dev", "stdin", Module["stdin"])
            } else {
                FS.symlink("/dev/tty", "/dev/stdin")
            }
            if (Module["stdout"]) {
                FS.createDevice("/dev", "stdout", null, Module["stdout"])
            } else {
                FS.symlink("/dev/tty", "/dev/stdout")
            }
            if (Module["stderr"]) {
                FS.createDevice("/dev", "stderr", null, Module["stderr"])
            } else {
                FS.symlink("/dev/tty1", "/dev/stderr")
            }
            var stdin = FS.open("/dev/stdin", "r");
            assert(stdin.fd === 0, "invalid handle for stdin (" + stdin.fd + ")");
            var stdout = FS.open("/dev/stdout", "w");
            assert(stdout.fd === 1, "invalid handle for stdout (" + stdout.fd + ")");
            var stderr = FS.open("/dev/stderr", "w");
            assert(stderr.fd === 2, "invalid handle for stderr (" + stderr.fd + ")")
        }
        ),
        ensureErrnoError: (function() {
            if (FS.ErrnoError)
                return;
            FS.ErrnoError = function ErrnoError(errno, node) {
                this.node = node;
                this.setErrno = (function(errno) {
                    this.errno = errno;
                    for (var key in ERRNO_CODES) {
                        if (ERRNO_CODES[key] === errno) {
                            this.code = key;
                            break
                        }
                    }
                }
                );
                this.setErrno(errno);
                this.message = ERRNO_MESSAGES[errno];
                if (this.stack)
                    Object.defineProperty(this, "stack", {
                        value: (new Error).stack,
                        writable: true
                    })
            }
            ;
            FS.ErrnoError.prototype = new Error;
            FS.ErrnoError.prototype.constructor = FS.ErrnoError;
            [ERRNO_CODES.ENOENT].forEach((function(code) {
                FS.genericErrors[code] = new FS.ErrnoError(code);
                FS.genericErrors[code].stack = "<generic error, no stack>"
            }
            ))
        }
        ),
        staticInit: (function() {
            FS.ensureErrnoError();
            FS.nameTable = new Array(4096);
            FS.mount(MEMFS, {}, "/");
            FS.createDefaultDirectories();
            FS.createDefaultDevices();
            FS.createSpecialDirectories();
            FS.filesystems = {
                "MEMFS": MEMFS,
                "IDBFS": IDBFS,
                "NODEFS": NODEFS,
                "WORKERFS": WORKERFS
            }
        }
        ),
        init: (function(input, output, error) {
            assert(!FS.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
            FS.init.initialized = true;
            FS.ensureErrnoError();
            Module["stdin"] = input || Module["stdin"];
            Module["stdout"] = output || Module["stdout"];
            Module["stderr"] = error || Module["stderr"];
            FS.createStandardStreams()
        }
        ),
        quit: (function() {
            FS.init.initialized = false;
            var fflush = Module["_fflush"];
            if (fflush)
                fflush(0);
            for (var i = 0; i < FS.streams.length; i++) {
                var stream = FS.streams[i];
                if (!stream) {
                    continue
                }
                FS.close(stream)
            }
        }
        ),
        getMode: (function(canRead, canWrite) {
            var mode = 0;
            if (canRead)
                mode |= 292 | 73;
            if (canWrite)
                mode |= 146;
            return mode
        }
        ),
        joinPath: (function(parts, forceRelative) {
            var path = PATH.join.apply(null, parts);
            if (forceRelative && path[0] == "/")
                path = path.substr(1);
            return path
        }
        ),
        absolutePath: (function(relative, base) {
            return PATH.resolve(base, relative)
        }
        ),
        standardizePath: (function(path) {
            return PATH.normalize(path)
        }
        ),
        findObject: (function(path, dontResolveLastLink) {
            var ret = FS.analyzePath(path, dontResolveLastLink);
            if (ret.exists) {
                return ret.object
            } else {
                ___setErrNo(ret.error);
                return null
            }
        }
        ),
        analyzePath: (function(path, dontResolveLastLink) {
            try {
                var lookup = FS.lookupPath(path, {
                    follow: !dontResolveLastLink
                });
                path = lookup.path
            } catch (e) {}
            var ret = {
                isRoot: false,
                exists: false,
                error: 0,
                name: null,
                path: null,
                object: null,
                parentExists: false,
                parentPath: null,
                parentObject: null
            };
            try {
                var lookup = FS.lookupPath(path, {
                    parent: true
                });
                ret.parentExists = true;
                ret.parentPath = lookup.path;
                ret.parentObject = lookup.node;
                ret.name = PATH.basename(path);
                lookup = FS.lookupPath(path, {
                    follow: !dontResolveLastLink
                });
                ret.exists = true;
                ret.path = lookup.path;
                ret.object = lookup.node;
                ret.name = lookup.node.name;
                ret.isRoot = lookup.path === "/"
            } catch (e) {
                ret.error = e.errno
            }
            return ret
        }
        ),
        createFolder: (function(parent, name, canRead, canWrite) {
            var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
            var mode = FS.getMode(canRead, canWrite);
            return FS.mkdir(path, mode)
        }
        ),
        createPath: (function(parent, path, canRead, canWrite) {
            parent = typeof parent === "string" ? parent : FS.getPath(parent);
            var parts = path.split("/").reverse();
            while (parts.length) {
                var part = parts.pop();
                if (!part)
                    continue;
                var current = PATH.join2(parent, part);
                try {
                    FS.mkdir(current)
                } catch (e) {}
                parent = current
            }
            return current
        }
        ),
        createFile: (function(parent, name, properties, canRead, canWrite) {
            var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
            var mode = FS.getMode(canRead, canWrite);
            return FS.create(path, mode)
        }
        ),
        createDataFile: (function(parent, name, data, canRead, canWrite, canOwn) {
            var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
            var mode = FS.getMode(canRead, canWrite);
            var node = FS.create(path, mode);
            if (data) {
                if (typeof data === "string") {
                    var arr = new Array(data.length);
                    for (var i = 0, len = data.length; i < len; ++i)
                        arr[i] = data.charCodeAt(i);
                    data = arr
                }
                FS.chmod(node, mode | 146);
                var stream = FS.open(node, "w");
                FS.write(stream, data, 0, data.length, 0, canOwn);
                FS.close(stream);
                FS.chmod(node, mode)
            }
            return node
        }
        ),
        createDevice: (function(parent, name, input, output) {
            var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
            var mode = FS.getMode(!!input, !!output);
            if (!FS.createDevice.major)
                FS.createDevice.major = 64;
            var dev = FS.makedev(FS.createDevice.major++, 0);
            FS.registerDevice(dev, {
                open: (function(stream) {
                    stream.seekable = false
                }
                ),
                close: (function(stream) {
                    if (output && output.buffer && output.buffer.length) {
                        output(10)
                    }
                }
                ),
                read: (function(stream, buffer, offset, length, pos) {
                    var bytesRead = 0;
                    for (var i = 0; i < length; i++) {
                        var result;
                        try {
                            result = input()
                        } catch (e) {
                            throw new FS.ErrnoError(ERRNO_CODES.EIO)
                        }
                        if (result === undefined && bytesRead === 0) {
                            throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
                        }
                        if (result === null || result === undefined)
                            break;
                        bytesRead++;
                        buffer[offset + i] = result
                    }
                    if (bytesRead) {
                        stream.node.timestamp = Date.now()
                    }
                    return bytesRead
                }
                ),
                write: (function(stream, buffer, offset, length, pos) {
                    for (var i = 0; i < length; i++) {
                        try {
                            output(buffer[offset + i])
                        } catch (e) {
                            throw new FS.ErrnoError(ERRNO_CODES.EIO)
                        }
                    }
                    if (length) {
                        stream.node.timestamp = Date.now()
                    }
                    return i
                }
                )
            });
            return FS.mkdev(path, mode, dev)
        }
        ),
        createLink: (function(parent, name, target, canRead, canWrite) {
            var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
            return FS.symlink(target, path)
        }
        ),
        forceLoadFile: (function(obj) {
            if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
                return true;
            var success = true;
            if (typeof XMLHttpRequest !== "undefined") {
                throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")
            } else if (Module["read"]) {
                try {
                    obj.contents = intArrayFromString(Module["read"](obj.url), true);
                    obj.usedBytes = obj.contents.length
                } catch (e) {
                    success = false
                }
            } else {
                throw new Error("Cannot load without read() or XMLHttpRequest.")
            }
            if (!success)
                ___setErrNo(ERRNO_CODES.EIO);
            return success
        }
        ),
        createLazyFile: (function(parent, name, url, canRead, canWrite) {
            function LazyUint8Array() {
                this.lengthKnown = false;
                this.chunks = []
            }
            LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
                if (idx > this.length - 1 || idx < 0) {
                    return undefined
                }
                var chunkOffset = idx % this.chunkSize;
                var chunkNum = idx / this.chunkSize | 0;
                return this.getter(chunkNum)[chunkOffset]
            }
            ;
            LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
                this.getter = getter
            }
            ;
            LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
                var xhr = new XMLHttpRequest;
                xhr.open("HEAD", url, false);
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                    throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                var datalength = Number(xhr.getResponseHeader("Content-length"));
                var header;
                var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
                var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
                var chunkSize = 1024 * 1024;
                if (!hasByteServing)
                    chunkSize = datalength;
                var doXHR = (function(from, to) {
                    if (from > to)
                        throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                    if (to > datalength - 1)
                        throw new Error("only " + datalength + " bytes available! programmer error!");
                    var xhr = new XMLHttpRequest;
                    xhr.open("GET", url, false);
                    if (datalength !== chunkSize)
                        xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
                    if (typeof Uint8Array != "undefined")
                        xhr.responseType = "arraybuffer";
                    if (xhr.overrideMimeType) {
                        xhr.overrideMimeType("text/plain; charset=x-user-defined")
                    }
                    xhr.send(null);
                    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                        throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                    if (xhr.response !== undefined) {
                        return new Uint8Array(xhr.response || [])
                    } else {
                        return intArrayFromString(xhr.responseText || "", true)
                    }
                }
                );
                var lazyArray = this;
                lazyArray.setDataGetter((function(chunkNum) {
                    var start = chunkNum * chunkSize;
                    var end = (chunkNum + 1) * chunkSize - 1;
                    end = Math.min(end, datalength - 1);
                    if (typeof lazyArray.chunks[chunkNum] === "undefined") {
                        lazyArray.chunks[chunkNum] = doXHR(start, end)
                    }
                    if (typeof lazyArray.chunks[chunkNum] === "undefined")
                        throw new Error("doXHR failed!");
                    return lazyArray.chunks[chunkNum]
                }
                ));
                if (usesGzip || !datalength) {
                    chunkSize = datalength = 1;
                    datalength = this.getter(0).length;
                    chunkSize = datalength;
                    console.log("LazyFiles on gzip forces download of the whole file when length is accessed")
                }
                this._length = datalength;
                this._chunkSize = chunkSize;
                this.lengthKnown = true
            }
            ;
            if (typeof XMLHttpRequest !== "undefined") {
                if (!ENVIRONMENT_IS_WORKER)
                    throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                var lazyArray = new LazyUint8Array;
                Object.defineProperties(lazyArray, {
                    length: {
                        get: (function() {
                            if (!this.lengthKnown) {
                                this.cacheLength()
                            }
                            return this._length
                        }
                        )
                    },
                    chunkSize: {
                        get: (function() {
                            if (!this.lengthKnown) {
                                this.cacheLength()
                            }
                            return this._chunkSize
                        }
                        )
                    }
                });
                var properties = {
                    isDevice: false,
                    contents: lazyArray
                }
            } else {
                var properties = {
                    isDevice: false,
                    url: url
                }
            }
            var node = FS.createFile(parent, name, properties, canRead, canWrite);
            if (properties.contents) {
                node.contents = properties.contents
            } else if (properties.url) {
                node.contents = null;
                node.url = properties.url
            }
            Object.defineProperties(node, {
                usedBytes: {
                    get: (function() {
                        return this.contents.length
                    }
                    )
                }
            });
            var stream_ops = {};
            var keys = Object.keys(node.stream_ops);
            keys.forEach((function(key) {
                var fn = node.stream_ops[key];
                stream_ops[key] = function forceLoadLazyFile() {
                    if (!FS.forceLoadFile(node)) {
                        throw new FS.ErrnoError(ERRNO_CODES.EIO)
                    }
                    return fn.apply(null, arguments)
                }
            }
            ));
            stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
                if (!FS.forceLoadFile(node)) {
                    throw new FS.ErrnoError(ERRNO_CODES.EIO)
                }
                var contents = stream.node.contents;
                if (position >= contents.length)
                    return 0;
                var size = Math.min(contents.length - position, length);
                assert(size >= 0);
                if (contents.slice) {
                    for (var i = 0; i < size; i++) {
                        buffer[offset + i] = contents[position + i]
                    }
                } else {
                    for (var i = 0; i < size; i++) {
                        buffer[offset + i] = contents.get(position + i)
                    }
                }
                return size
            }
            ;
            node.stream_ops = stream_ops;
            return node
        }
        ),
        createPreloadedFile: (function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
            Browser.init();
            var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
            var dep = getUniqueRunDependency("cp " + fullname);
            function processData(byteArray) {
                function finish(byteArray) {
                    if (preFinish)
                        preFinish();
                    if (!dontCreateFile) {
                        FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
                    }
                    if (onload)
                        onload();
                    removeRunDependency(dep)
                }
                var handled = false;
                Module["preloadPlugins"].forEach((function(plugin) {
                    if (handled)
                        return;
                    if (plugin["canHandle"](fullname)) {
                        plugin["handle"](byteArray, fullname, finish, (function() {
                            if (onerror)
                                onerror();
                            removeRunDependency(dep)
                        }
                        ));
                        handled = true
                    }
                }
                ));
                if (!handled)
                    finish(byteArray)
            }
            addRunDependency(dep);
            if (typeof url == "string") {
                Browser.asyncLoad(url, (function(byteArray) {
                    processData(byteArray)
                }
                ), onerror)
            } else {
                processData(url)
            }
        }
        ),
        indexedDB: (function() {
            return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        }
        ),
        DB_NAME: (function() {
            return "EM_FS_" + window.location.pathname
        }
        ),
        DB_VERSION: 20,
        DB_STORE_NAME: "FILE_DATA",
        saveFilesToDB: (function(paths, onload, onerror) {
            onload = onload || (function() {}
            );
            onerror = onerror || (function() {}
            );
            var indexedDB = FS.indexedDB();
            try {
                var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
            } catch (e) {
                return onerror(e)
            }
            openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
                console.log("creating db");
                var db = openRequest.result;
                db.createObjectStore(FS.DB_STORE_NAME)
            }
            ;
            openRequest.onsuccess = function openRequest_onsuccess() {
                var db = openRequest.result;
                var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
                var files = transaction.objectStore(FS.DB_STORE_NAME);
                var ok = 0
                  , fail = 0
                  , total = paths.length;
                function finish() {
                    if (fail == 0)
                        onload();
                    else
                        onerror()
                }
                paths.forEach((function(path) {
                    var putRequest = files.put(FS.analyzePath(path).object.contents, path);
                    putRequest.onsuccess = function putRequest_onsuccess() {
                        ok++;
                        if (ok + fail == total)
                            finish()
                    }
                    ;
                    putRequest.onerror = function putRequest_onerror() {
                        fail++;
                        if (ok + fail == total)
                            finish()
                    }
                }
                ));
                transaction.onerror = onerror
            }
            ;
            openRequest.onerror = onerror
        }
        ),
        loadFilesFromDB: (function(paths, onload, onerror) {
            onload = onload || (function() {}
            );
            onerror = onerror || (function() {}
            );
            var indexedDB = FS.indexedDB();
            try {
                var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
            } catch (e) {
                return onerror(e)
            }
            openRequest.onupgradeneeded = onerror;
            openRequest.onsuccess = function openRequest_onsuccess() {
                var db = openRequest.result;
                try {
                    var transaction = db.transaction([FS.DB_STORE_NAME], "readonly")
                } catch (e) {
                    onerror(e);
                    return
                }
                var files = transaction.objectStore(FS.DB_STORE_NAME);
                var ok = 0
                  , fail = 0
                  , total = paths.length;
                function finish() {
                    if (fail == 0)
                        onload();
                    else
                        onerror()
                }
                paths.forEach((function(path) {
                    var getRequest = files.get(path);
                    getRequest.onsuccess = function getRequest_onsuccess() {
                        if (FS.analyzePath(path).exists) {
                            FS.unlink(path)
                        }
                        FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
                        ok++;
                        if (ok + fail == total)
                            finish()
                    }
                    ;
                    getRequest.onerror = function getRequest_onerror() {
                        fail++;
                        if (ok + fail == total)
                            finish()
                    }
                }
                ));
                transaction.onerror = onerror
            }
            ;
            openRequest.onerror = onerror
        }
        )
    };
    var SYSCALLS = {
        DEFAULT_POLLMASK: 5,
        mappings: {},
        umask: 511,
        calculateAt: (function(dirfd, path) {
            if (path[0] !== "/") {
                var dir;
                if (dirfd === -100) {
                    dir = FS.cwd()
                } else {
                    var dirstream = FS.getStream(dirfd);
                    if (!dirstream)
                        throw new FS.ErrnoError(ERRNO_CODES.EBADF);
                    dir = dirstream.path
                }
                path = PATH.join2(dir, path)
            }
            return path
        }
        ),
        doStat: (function(func, path, buf) {
            try {
                var stat = func(path)
            } catch (e) {
                if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
                    return -ERRNO_CODES.ENOTDIR
                }
                throw e
            }
            HEAP32[buf >> 2] = stat.dev;
            HEAP32[buf + 4 >> 2] = 0;
            HEAP32[buf + 8 >> 2] = stat.ino;
            HEAP32[buf + 12 >> 2] = stat.mode;
            HEAP32[buf + 16 >> 2] = stat.nlink;
            HEAP32[buf + 20 >> 2] = stat.uid;
            HEAP32[buf + 24 >> 2] = stat.gid;
            HEAP32[buf + 28 >> 2] = stat.rdev;
            HEAP32[buf + 32 >> 2] = 0;
            HEAP32[buf + 36 >> 2] = stat.size;
            HEAP32[buf + 40 >> 2] = 4096;
            HEAP32[buf + 44 >> 2] = stat.blocks;
            HEAP32[buf + 48 >> 2] = stat.atime.getTime() / 1e3 | 0;
            HEAP32[buf + 52 >> 2] = 0;
            HEAP32[buf + 56 >> 2] = stat.mtime.getTime() / 1e3 | 0;
            HEAP32[buf + 60 >> 2] = 0;
            HEAP32[buf + 64 >> 2] = stat.ctime.getTime() / 1e3 | 0;
            HEAP32[buf + 68 >> 2] = 0;
            HEAP32[buf + 72 >> 2] = stat.ino;
            return 0
        }
        ),
        doMsync: (function(addr, stream, len, flags) {
            var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
            FS.msync(stream, buffer, 0, len, flags)
        }
        ),
        doMkdir: (function(path, mode) {
            path = PATH.normalize(path);
            if (path[path.length - 1] === "/")
                path = path.substr(0, path.length - 1);
            FS.mkdir(path, mode, 0);
            return 0
        }
        ),
        doMknod: (function(path, mode, dev) {
            switch (mode & 61440) {
            case 32768:
            case 8192:
            case 24576:
            case 4096:
            case 49152:
                break;
            default:
                return -ERRNO_CODES.EINVAL
            }
            FS.mknod(path, mode, dev);
            return 0
        }
        ),
        doReadlink: (function(path, buf, bufsize) {
            if (bufsize <= 0)
                return -ERRNO_CODES.EINVAL;
            var ret = FS.readlink(path);
            var len = Math.min(bufsize, lengthBytesUTF8(ret));
            var endChar = HEAP8[buf + len];
            stringToUTF8(ret, buf, bufsize + 1);
            HEAP8[buf + len] = endChar;
            return len
        }
        ),
        doAccess: (function(path, amode) {
            if (amode & ~7) {
                return -ERRNO_CODES.EINVAL
            }
            var node;
            var lookup = FS.lookupPath(path, {
                follow: true
            });
            node = lookup.node;
            var perms = "";
            if (amode & 4)
                perms += "r";
            if (amode & 2)
                perms += "w";
            if (amode & 1)
                perms += "x";
            if (perms && FS.nodePermissions(node, perms)) {
                return -ERRNO_CODES.EACCES
            }
            return 0
        }
        ),
        doDup: (function(path, flags, suggestFD) {
            var suggest = FS.getStream(suggestFD);
            if (suggest)
                FS.close(suggest);
            return FS.open(path, flags, 0, suggestFD, suggestFD).fd
        }
        ),
        doReadv: (function(stream, iov, iovcnt, offset) {
            var ret = 0;
            for (var i = 0; i < iovcnt; i++) {
                var ptr = HEAP32[iov + i * 8 >> 2];
                var len = HEAP32[iov + (i * 8 + 4) >> 2];
                var curr = FS.read(stream, HEAP8, ptr, len, offset);
                if (curr < 0)
                    return -1;
                ret += curr;
                if (curr < len)
                    break
            }
            return ret
        }
        ),
        doWritev: (function(stream, iov, iovcnt, offset) {
            var ret = 0;
            for (var i = 0; i < iovcnt; i++) {
                var ptr = HEAP32[iov + i * 8 >> 2];
                var len = HEAP32[iov + (i * 8 + 4) >> 2];
                var curr = FS.write(stream, HEAP8, ptr, len, offset);
                if (curr < 0)
                    return -1;
                ret += curr
            }
            return ret
        }
        ),
        varargs: 0,
        get: (function(varargs) {
            SYSCALLS.varargs += 4;
            var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
            return ret
        }
        ),
        getStr: (function() {
            var ret = Pointer_stringify(SYSCALLS.get());
            return ret
        }
        ),
        getStreamFromFD: (function() {
            var stream = FS.getStream(SYSCALLS.get());
            if (!stream)
                throw new FS.ErrnoError(ERRNO_CODES.EBADF);
            return stream
        }
        ),
        getSocketFromFD: (function() {
            var socket = SOCKFS.getSocket(SYSCALLS.get());
            if (!socket)
                throw new FS.ErrnoError(ERRNO_CODES.EBADF);
            return socket
        }
        ),
        getSocketAddress: (function(allowNull) {
            var addrp = SYSCALLS.get()
              , addrlen = SYSCALLS.get();
            if (allowNull && addrp === 0)
                return null;
            var info = __read_sockaddr(addrp, addrlen);
            if (info.errno)
                throw new FS.ErrnoError(info.errno);
            info.addr = DNS.lookup_addr(info.addr) || info.addr;
            return info
        }
        ),
        get64: (function() {
            var low = SYSCALLS.get()
              , high = SYSCALLS.get();
            if (low >= 0)
                assert(high === 0);
            else
                assert(high === -1);
            return low
        }
        ),
        getZero: (function() {
            assert(SYSCALLS.get() === 0)
        }
        )
    };
    function ___syscall10(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var path = SYSCALLS.getStr();
            FS.unlink(path);
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    var SOCKFS = {
        mount: (function(mount) {
            Module["websocket"] = Module["websocket"] && "object" === typeof Module["websocket"] ? Module["websocket"] : {};
            Module["websocket"]._callbacks = {};
            Module["websocket"]["on"] = (function(event, callback) {
                if ("function" === typeof callback) {
                    this._callbacks[event] = callback
                }
                return this
            }
            );
            Module["websocket"].emit = (function(event, param) {
                if ("function" === typeof this._callbacks[event]) {
                    this._callbacks[event].call(this, param)
                }
            }
            );
            return FS.createNode(null, "/", 16384 | 511, 0)
        }
        ),
        createSocket: (function(family, type, protocol) {
            var streaming = type == 1;
            if (protocol) {
                assert(streaming == (protocol == 6))
            }
            var sock = {
                family: family,
                type: type,
                protocol: protocol,
                server: null,
                error: null,
                peers: {},
                pending: [],
                recv_queue: [],
                sock_ops: SOCKFS.websocket_sock_ops
            };
            var name = SOCKFS.nextname();
            var node = FS.createNode(SOCKFS.root, name, 49152, 0);
            node.sock = sock;
            var stream = FS.createStream({
                path: name,
                node: node,
                flags: FS.modeStringToFlags("r+"),
                seekable: false,
                stream_ops: SOCKFS.stream_ops
            });
            sock.stream = stream;
            return sock
        }
        ),
        getSocket: (function(fd) {
            var stream = FS.getStream(fd);
            if (!stream || !FS.isSocket(stream.node.mode)) {
                return null
            }
            return stream.node.sock
        }
        ),
        stream_ops: {
            poll: (function(stream) {
                var sock = stream.node.sock;
                return sock.sock_ops.poll(sock)
            }
            ),
            ioctl: (function(stream, request, varargs) {
                var sock = stream.node.sock;
                return sock.sock_ops.ioctl(sock, request, varargs)
            }
            ),
            read: (function(stream, buffer, offset, length, position) {
                var sock = stream.node.sock;
                var msg = sock.sock_ops.recvmsg(sock, length);
                if (!msg) {
                    return 0
                }
                buffer.set(msg.buffer, offset);
                return msg.buffer.length
            }
            ),
            write: (function(stream, buffer, offset, length, position) {
                var sock = stream.node.sock;
                return sock.sock_ops.sendmsg(sock, buffer, offset, length)
            }
            ),
            close: (function(stream) {
                var sock = stream.node.sock;
                sock.sock_ops.close(sock)
            }
            )
        },
        nextname: (function() {
            if (!SOCKFS.nextname.current) {
                SOCKFS.nextname.current = 0
            }
            return "socket[" + SOCKFS.nextname.current++ + "]"
        }
        ),
        websocket_sock_ops: {
            createPeer: (function(sock, addr, port) {
                var ws;
                if (typeof addr === "object") {
                    ws = addr;
                    addr = null;
                    port = null
                }
                if (ws) {
                    if (ws._socket) {
                        addr = ws._socket.remoteAddress;
                        port = ws._socket.remotePort
                    } else {
                        var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
                        if (!result) {
                            throw new Error("WebSocket URL must be in the format ws(s)://address:port")
                        }
                        addr = result[1];
                        port = parseInt(result[2], 10)
                    }
                } else {
                    try {
                        var runtimeConfig = Module["websocket"] && "object" === typeof Module["websocket"];
                        var url = "ws:#".replace("#", "//");
                        if (runtimeConfig) {
                            if ("string" === typeof Module["websocket"]["url"]) {
                                url = Module["websocket"]["url"]
                            }
                        }
                        if (url === "ws://" || url === "wss://") {
                            var parts = addr.split("/");
                            url = url + parts[0] + ":" + port + "/" + parts.slice(1).join("/")
                        }
                        var subProtocols = "binary";
                        if (runtimeConfig) {
                            if ("string" === typeof Module["websocket"]["subprotocol"]) {
                                subProtocols = Module["websocket"]["subprotocol"]
                            }
                        }
                        subProtocols = subProtocols.replace(/^ +| +$/g, "").split(/ *, */);
                        var opts = ENVIRONMENT_IS_NODE ? {
                            "protocol": subProtocols.toString()
                        } : subProtocols;
                        if (runtimeConfig && null === Module["websocket"]["subprotocol"]) {
                            subProtocols = "null";
                            opts = undefined
                        }
                        var WebSocketConstructor;
                        if (ENVIRONMENT_IS_NODE) {
                            WebSocketConstructor = require("ws")
                        } else if (ENVIRONMENT_IS_WEB) {
                            WebSocketConstructor = window["WebSocket"]
                        } else {
                            WebSocketConstructor = WebSocket
                        }
                        ws = new WebSocketConstructor(url,opts);
                        ws.binaryType = "arraybuffer"
                    } catch (e) {
                        throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH)
                    }
                }
                var peer = {
                    addr: addr,
                    port: port,
                    socket: ws,
                    dgram_send_queue: []
                };
                SOCKFS.websocket_sock_ops.addPeer(sock, peer);
                SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
                if (sock.type === 2 && typeof sock.sport !== "undefined") {
                    peer.dgram_send_queue.push(new Uint8Array([255, 255, 255, 255, "p".charCodeAt(0), "o".charCodeAt(0), "r".charCodeAt(0), "t".charCodeAt(0), (sock.sport & 65280) >> 8, sock.sport & 255]))
                }
                return peer
            }
            ),
            getPeer: (function(sock, addr, port) {
                return sock.peers[addr + ":" + port]
            }
            ),
            addPeer: (function(sock, peer) {
                sock.peers[peer.addr + ":" + peer.port] = peer
            }
            ),
            removePeer: (function(sock, peer) {
                delete sock.peers[peer.addr + ":" + peer.port]
            }
            ),
            handlePeerEvents: (function(sock, peer) {
                var first = true;
                var handleOpen = (function() {
                    Module["websocket"].emit("open", sock.stream.fd);
                    try {
                        var queued = peer.dgram_send_queue.shift();
                        while (queued) {
                            peer.socket.send(queued);
                            queued = peer.dgram_send_queue.shift()
                        }
                    } catch (e) {
                        peer.socket.close()
                    }
                }
                );
                function handleMessage(data) {
                    assert(typeof data !== "string" && data.byteLength !== undefined);
                    if (data.byteLength == 0) {
                        return
                    }
                    data = new Uint8Array(data);
                    var wasfirst = first;
                    first = false;
                    if (wasfirst && data.length === 10 && data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 && data[4] === "p".charCodeAt(0) && data[5] === "o".charCodeAt(0) && data[6] === "r".charCodeAt(0) && data[7] === "t".charCodeAt(0)) {
                        var newport = data[8] << 8 | data[9];
                        SOCKFS.websocket_sock_ops.removePeer(sock, peer);
                        peer.port = newport;
                        SOCKFS.websocket_sock_ops.addPeer(sock, peer);
                        return
                    }
                    sock.recv_queue.push({
                        addr: peer.addr,
                        port: peer.port,
                        data: data
                    });
                    Module["websocket"].emit("message", sock.stream.fd)
                }
                if (ENVIRONMENT_IS_NODE) {
                    peer.socket.on("open", handleOpen);
                    peer.socket.on("message", (function(data, flags) {
                        if (!flags.binary) {
                            return
                        }
                        handleMessage((new Uint8Array(data)).buffer)
                    }
                    ));
                    peer.socket.on("close", (function() {
                        Module["websocket"].emit("close", sock.stream.fd)
                    }
                    ));
                    peer.socket.on("error", (function(error) {
                        sock.error = ERRNO_CODES.ECONNREFUSED;
                        Module["websocket"].emit("error", [sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused"])
                    }
                    ))
                } else {
                    peer.socket.onopen = handleOpen;
                    peer.socket.onclose = (function() {
                        Module["websocket"].emit("close", sock.stream.fd)
                    }
                    );
                    peer.socket.onmessage = function peer_socket_onmessage(event) {
                        handleMessage(event.data)
                    }
                    ;
                    peer.socket.onerror = (function(error) {
                        sock.error = ERRNO_CODES.ECONNREFUSED;
                        Module["websocket"].emit("error", [sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused"])
                    }
                    )
                }
            }
            ),
            poll: (function(sock) {
                if (sock.type === 1 && sock.server) {
                    return sock.pending.length ? 64 | 1 : 0
                }
                var mask = 0;
                var dest = sock.type === 1 ? SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) : null;
                if (sock.recv_queue.length || !dest || dest && dest.socket.readyState === dest.socket.CLOSING || dest && dest.socket.readyState === dest.socket.CLOSED) {
                    mask |= 64 | 1
                }
                if (!dest || dest && dest.socket.readyState === dest.socket.OPEN) {
                    mask |= 4
                }
                if (dest && dest.socket.readyState === dest.socket.CLOSING || dest && dest.socket.readyState === dest.socket.CLOSED) {
                    mask |= 16
                }
                return mask
            }
            ),
            ioctl: (function(sock, request, arg) {
                switch (request) {
                case 21531:
                    var bytes = 0;
                    if (sock.recv_queue.length) {
                        bytes = sock.recv_queue[0].data.length
                    }
                    HEAP32[arg >> 2] = bytes;
                    return 0;
                default:
                    return ERRNO_CODES.EINVAL
                }
            }
            ),
            close: (function(sock) {
                if (sock.server) {
                    try {
                        sock.server.close()
                    } catch (e) {}
                    sock.server = null
                }
                var peers = Object.keys(sock.peers);
                for (var i = 0; i < peers.length; i++) {
                    var peer = sock.peers[peers[i]];
                    try {
                        peer.socket.close()
                    } catch (e) {}
                    SOCKFS.websocket_sock_ops.removePeer(sock, peer)
                }
                return 0
            }
            ),
            bind: (function(sock, addr, port) {
                if (typeof sock.saddr !== "undefined" || typeof sock.sport !== "undefined") {
                    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
                }
                sock.saddr = addr;
                sock.sport = port;
                if (sock.type === 2) {
                    if (sock.server) {
                        sock.server.close();
                        sock.server = null
                    }
                    try {
                        sock.sock_ops.listen(sock, 0)
                    } catch (e) {
                        if (!(e instanceof FS.ErrnoError))
                            throw e;
                        if (e.errno !== ERRNO_CODES.EOPNOTSUPP)
                            throw e
                    }
                }
            }
            ),
            connect: (function(sock, addr, port) {
                if (sock.server) {
                    throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)
                }
                if (typeof sock.daddr !== "undefined" && typeof sock.dport !== "undefined") {
                    var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
                    if (dest) {
                        if (dest.socket.readyState === dest.socket.CONNECTING) {
                            throw new FS.ErrnoError(ERRNO_CODES.EALREADY)
                        } else {
                            throw new FS.ErrnoError(ERRNO_CODES.EISCONN)
                        }
                    }
                }
                var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
                sock.daddr = peer.addr;
                sock.dport = peer.port;
                throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS)
            }
            ),
            listen: (function(sock, backlog) {
                if (!ENVIRONMENT_IS_NODE) {
                    throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP)
                }
                if (sock.server) {
                    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
                }
                var WebSocketServer = require("ws").Server;
                var host = sock.saddr;
                sock.server = new WebSocketServer({
                    host: host,
                    port: sock.sport
                });
                Module["websocket"].emit("listen", sock.stream.fd);
                sock.server.on("connection", (function(ws) {
                    if (sock.type === 1) {
                        var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
                        var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
                        newsock.daddr = peer.addr;
                        newsock.dport = peer.port;
                        sock.pending.push(newsock);
                        Module["websocket"].emit("connection", newsock.stream.fd)
                    } else {
                        SOCKFS.websocket_sock_ops.createPeer(sock, ws);
                        Module["websocket"].emit("connection", sock.stream.fd)
                    }
                }
                ));
                sock.server.on("closed", (function() {
                    Module["websocket"].emit("close", sock.stream.fd);
                    sock.server = null
                }
                ));
                sock.server.on("error", (function(error) {
                    sock.error = ERRNO_CODES.EHOSTUNREACH;
                    Module["websocket"].emit("error", [sock.stream.fd, sock.error, "EHOSTUNREACH: Host is unreachable"])
                }
                ))
            }
            ),
            accept: (function(listensock) {
                if (!listensock.server) {
                    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
                }
                var newsock = listensock.pending.shift();
                newsock.stream.flags = listensock.stream.flags;
                return newsock
            }
            ),
            getname: (function(sock, peer) {
                var addr, port;
                if (peer) {
                    if (sock.daddr === undefined || sock.dport === undefined) {
                        throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
                    }
                    addr = sock.daddr;
                    port = sock.dport
                } else {
                    addr = sock.saddr || 0;
                    port = sock.sport || 0
                }
                return {
                    addr: addr,
                    port: port
                }
            }
            ),
            sendmsg: (function(sock, buffer, offset, length, addr, port) {
                if (sock.type === 2) {
                    if (addr === undefined || port === undefined) {
                        addr = sock.daddr;
                        port = sock.dport
                    }
                    if (addr === undefined || port === undefined) {
                        throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ)
                    }
                } else {
                    addr = sock.daddr;
                    port = sock.dport
                }
                var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
                if (sock.type === 1) {
                    if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                        throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
                    } else if (dest.socket.readyState === dest.socket.CONNECTING) {
                        throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
                    }
                }
                if (ArrayBuffer.isView(buffer)) {
                    offset += buffer.byteOffset;
                    buffer = buffer.buffer
                }
                var data;
                data = buffer.slice(offset, offset + length);
                if (sock.type === 2) {
                    if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
                        if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                            dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port)
                        }
                        dest.dgram_send_queue.push(data);
                        return length
                    }
                }
                try {
                    dest.socket.send(data);
                    return length
                } catch (e) {
                    throw new FS.ErrnoError(ERRNO_CODES.EINVAL)
                }
            }
            ),
            recvmsg: (function(sock, length) {
                if (sock.type === 1 && sock.server) {
                    throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
                }
                var queued = sock.recv_queue.shift();
                if (!queued) {
                    if (sock.type === 1) {
                        var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
                        if (!dest) {
                            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN)
                        } else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                            return null
                        } else {
                            throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
                        }
                    } else {
                        throw new FS.ErrnoError(ERRNO_CODES.EAGAIN)
                    }
                }
                var queuedLength = queued.data.byteLength || queued.data.length;
                var queuedOffset = queued.data.byteOffset || 0;
                var queuedBuffer = queued.data.buffer || queued.data;
                var bytesRead = Math.min(length, queuedLength);
                var res = {
                    buffer: new Uint8Array(queuedBuffer,queuedOffset,bytesRead),
                    addr: queued.addr,
                    port: queued.port
                };
                if (sock.type === 1 && bytesRead < queuedLength) {
                    var bytesRemaining = queuedLength - bytesRead;
                    queued.data = new Uint8Array(queuedBuffer,queuedOffset + bytesRead,bytesRemaining);
                    sock.recv_queue.unshift(queued)
                }
                return res
            }
            )
        }
    };
    function __inet_pton4_raw(str) {
        var b = str.split(".");
        for (var i = 0; i < 4; i++) {
            var tmp = Number(b[i]);
            if (isNaN(tmp))
                return null;
            b[i] = tmp
        }
        return (b[0] | b[1] << 8 | b[2] << 16 | b[3] << 24) >>> 0
    }
    function __inet_pton6_raw(str) {
        var words;
        var w, offset, z;
        var valid6regx = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;
        var parts = [];
        if (!valid6regx.test(str)) {
            return null
        }
        if (str === "::") {
            return [0, 0, 0, 0, 0, 0, 0, 0]
        }
        if (str.indexOf("::") === 0) {
            str = str.replace("::", "Z:")
        } else {
            str = str.replace("::", ":Z:")
        }
        if (str.indexOf(".") > 0) {
            str = str.replace(new RegExp("[.]","g"), ":");
            words = str.split(":");
            words[words.length - 4] = parseInt(words[words.length - 4]) + parseInt(words[words.length - 3]) * 256;
            words[words.length - 3] = parseInt(words[words.length - 2]) + parseInt(words[words.length - 1]) * 256;
            words = words.slice(0, words.length - 2)
        } else {
            words = str.split(":")
        }
        offset = 0;
        z = 0;
        for (w = 0; w < words.length; w++) {
            if (typeof words[w] === "string") {
                if (words[w] === "Z") {
                    for (z = 0; z < 8 - words.length + 1; z++) {
                        parts[w + z] = 0
                    }
                    offset = z - 1
                } else {
                    parts[w + offset] = _htons(parseInt(words[w], 16))
                }
            } else {
                parts[w + offset] = words[w]
            }
        }
        return [parts[1] << 16 | parts[0], parts[3] << 16 | parts[2], parts[5] << 16 | parts[4], parts[7] << 16 | parts[6]]
    }
    var DNS = {
        address_map: {
            id: 1,
            addrs: {},
            names: {}
        },
        lookup_name: (function(name) {
            var res = __inet_pton4_raw(name);
            if (res !== null) {
                return name
            }
            res = __inet_pton6_raw(name);
            if (res !== null) {
                return name
            }
            var addr;
            if (DNS.address_map.addrs[name]) {
                addr = DNS.address_map.addrs[name]
            } else {
                var id = DNS.address_map.id++;
                assert(id < 65535, "exceeded max address mappings of 65535");
                addr = "172.29." + (id & 255) + "." + (id & 65280);
                DNS.address_map.names[addr] = name;
                DNS.address_map.addrs[name] = addr
            }
            return addr
        }
        ),
        lookup_addr: (function(addr) {
            if (DNS.address_map.names[addr]) {
                return DNS.address_map.names[addr]
            }
            return null
        }
        )
    };
    function __inet_ntop4_raw(addr) {
        return (addr & 255) + "." + (addr >> 8 & 255) + "." + (addr >> 16 & 255) + "." + (addr >> 24 & 255)
    }
    function __inet_ntop6_raw(ints) {
        var str = "";
        var word = 0;
        var longest = 0;
        var lastzero = 0;
        var zstart = 0;
        var len = 0;
        var i = 0;
        var parts = [ints[0] & 65535, ints[0] >> 16, ints[1] & 65535, ints[1] >> 16, ints[2] & 65535, ints[2] >> 16, ints[3] & 65535, ints[3] >> 16];
        var hasipv4 = true;
        var v4part = "";
        for (i = 0; i < 5; i++) {
            if (parts[i] !== 0) {
                hasipv4 = false;
                break
            }
        }
        if (hasipv4) {
            v4part = __inet_ntop4_raw(parts[6] | parts[7] << 16);
            if (parts[5] === -1) {
                str = "::ffff:";
                str += v4part;
                return str
            }
            if (parts[5] === 0) {
                str = "::";
                if (v4part === "0.0.0.0")
                    v4part = "";
                if (v4part === "0.0.0.1")
                    v4part = "1";
                str += v4part;
                return str
            }
        }
        for (word = 0; word < 8; word++) {
            if (parts[word] === 0) {
                if (word - lastzero > 1) {
                    len = 0
                }
                lastzero = word;
                len++
            }
            if (len > longest) {
                longest = len;
                zstart = word - longest + 1
            }
        }
        for (word = 0; word < 8; word++) {
            if (longest > 1) {
                if (parts[word] === 0 && word >= zstart && word < zstart + longest) {
                    if (word === zstart) {
                        str += ":";
                        if (zstart === 0)
                            str += ":"
                    }
                    continue
                }
            }
            str += Number(_ntohs(parts[word] & 65535)).toString(16);
            str += word < 7 ? ":" : ""
        }
        return str
    }
    function __read_sockaddr(sa, salen) {
        var family = HEAP16[sa >> 1];
        var port = _ntohs(HEAP16[sa + 2 >> 1]);
        var addr;
        switch (family) {
        case 2:
            if (salen !== 16) {
                return {
                    errno: ERRNO_CODES.EINVAL
                }
            }
            addr = HEAP32[sa + 4 >> 2];
            addr = __inet_ntop4_raw(addr);
            break;
        case 10:
            if (salen !== 28) {
                return {
                    errno: ERRNO_CODES.EINVAL
                }
            }
            addr = [HEAP32[sa + 8 >> 2], HEAP32[sa + 12 >> 2], HEAP32[sa + 16 >> 2], HEAP32[sa + 20 >> 2]];
            addr = __inet_ntop6_raw(addr);
            break;
        default:
            return {
                errno: ERRNO_CODES.EAFNOSUPPORT
            }
        }
        return {
            family: family,
            addr: addr,
            port: port
        }
    }
    function __write_sockaddr(sa, family, addr, port) {
        switch (family) {
        case 2:
            addr = __inet_pton4_raw(addr);
            HEAP16[sa >> 1] = family;
            HEAP32[sa + 4 >> 2] = addr;
            HEAP16[sa + 2 >> 1] = _htons(port);
            break;
        case 10:
            addr = __inet_pton6_raw(addr);
            HEAP32[sa >> 2] = family;
            HEAP32[sa + 8 >> 2] = addr[0];
            HEAP32[sa + 12 >> 2] = addr[1];
            HEAP32[sa + 16 >> 2] = addr[2];
            HEAP32[sa + 20 >> 2] = addr[3];
            HEAP16[sa + 2 >> 1] = _htons(port);
            HEAP32[sa + 4 >> 2] = 0;
            HEAP32[sa + 24 >> 2] = 0;
            break;
        default:
            return {
                errno: ERRNO_CODES.EAFNOSUPPORT
            }
        }
        return {}
    }
    function ___syscall102(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var call = SYSCALLS.get()
              , socketvararg = SYSCALLS.get();
            SYSCALLS.varargs = socketvararg;
            switch (call) {
            case 1:
                {
                    var domain = SYSCALLS.get()
                      , type = SYSCALLS.get()
                      , protocol = SYSCALLS.get();
                    var sock = SOCKFS.createSocket(domain, type, protocol);
                    assert(sock.stream.fd < 64);
                    return sock.stream.fd
                }
                ;
            case 2:
                {
                    var sock = SYSCALLS.getSocketFromFD()
                      , info = SYSCALLS.getSocketAddress();
                    sock.sock_ops.bind(sock, info.addr, info.port);
                    return 0
                }
                ;
            case 3:
                {
                    var sock = SYSCALLS.getSocketFromFD()
                      , info = SYSCALLS.getSocketAddress();
                    sock.sock_ops.connect(sock, info.addr, info.port);
                    return 0
                }
                ;
            case 4:
                {
                    var sock = SYSCALLS.getSocketFromFD()
                      , backlog = SYSCALLS.get();
                    sock.sock_ops.listen(sock, backlog);
                    return 0
                }
                ;
            case 5:
                {
                    var sock = SYSCALLS.getSocketFromFD()
                      , addr = SYSCALLS.get()
                      , addrlen = SYSCALLS.get();
                    var newsock = sock.sock_ops.accept(sock);
                    if (addr) {
                        var res = __write_sockaddr(addr, newsock.family, DNS.lookup_name(newsock.daddr), newsock.dport);
                        assert(!res.errno)
                    }
                    return newsock.stream.fd
                }
                ;
            case 6:
                {
                    var sock = SYSCALLS.getSocketFromFD()
                      , addr = SYSCALLS.get()
                      , addrlen = SYSCALLS.get();
                    var res = __write_sockaddr(addr, sock.family, DNS.lookup_name(sock.saddr || "0.0.0.0"), sock.sport);
                    assert(!res.errno);
                    return 0
                }
                ;
            case 7:
                {
                    var sock = SYSCALLS.getSocketFromFD()
                      , addr = SYSCALLS.get()
                      , addrlen = SYSCALLS.get();
                    if (!sock.daddr) {
                        return -ERRNO_CODES.ENOTCONN
                    }
                    var res = __write_sockaddr(addr, sock.family, DNS.lookup_name(sock.daddr), sock.dport);
                    assert(!res.errno);
                    return 0
                }
                ;
            case 11:
                {
                    var sock = SYSCALLS.getSocketFromFD()
                      , message = SYSCALLS.get()
                      , length = SYSCALLS.get()
                      , flags = SYSCALLS.get()
                      , dest = SYSCALLS.getSocketAddress(true);
                    if (!dest) {
                        return FS.write(sock.stream, HEAP8, message, length)
                    } else {
                        return sock.sock_ops.sendmsg(sock, HEAP8, message, length, dest.addr, dest.port)
                    }
                }
                ;
            case 12:
                {
                    var sock = SYSCALLS.getSocketFromFD()
                      , buf = SYSCALLS.get()
                      , len = SYSCALLS.get()
                      , flags = SYSCALLS.get()
                      , addr = SYSCALLS.get()
                      , addrlen = SYSCALLS.get();
                    var msg = sock.sock_ops.recvmsg(sock, len);
                    if (!msg)
                        return 0;
                    if (addr) {
                        var res = __write_sockaddr(addr, sock.family, DNS.lookup_name(msg.addr), msg.port);
                        assert(!res.errno)
                    }
                    HEAPU8.set(msg.buffer, buf);
                    return msg.buffer.byteLength
                }
                ;
            case 14:
                {
                    return -ERRNO_CODES.ENOPROTOOPT
                }
                ;
            case 15:
                {
                    var sock = SYSCALLS.getSocketFromFD()
                      , level = SYSCALLS.get()
                      , optname = SYSCALLS.get()
                      , optval = SYSCALLS.get()
                      , optlen = SYSCALLS.get();
                    if (level === 1) {
                        if (optname === 4) {
                            HEAP32[optval >> 2] = sock.error;
                            HEAP32[optlen >> 2] = 4;
                            sock.error = null;
                            return 0
                        }
                    }
                    return -ERRNO_CODES.ENOPROTOOPT
                }
                ;
            case 16:
                {
                    var sock = SYSCALLS.getSocketFromFD()
                      , message = SYSCALLS.get()
                      , flags = SYSCALLS.get();
                    var iov = HEAP32[message + 8 >> 2];
                    var num = HEAP32[message + 12 >> 2];
                    var addr, port;
                    var name = HEAP32[message >> 2];
                    var namelen = HEAP32[message + 4 >> 2];
                    if (name) {
                        var info = __read_sockaddr(name, namelen);
                        if (info.errno)
                            return -info.errno;
                        port = info.port;
                        addr = DNS.lookup_addr(info.addr) || info.addr
                    }
                    var total = 0;
                    for (var i = 0; i < num; i++) {
                        total += HEAP32[iov + (8 * i + 4) >> 2]
                    }
                    var view = new Uint8Array(total);
                    var offset = 0;
                    for (var i = 0; i < num; i++) {
                        var iovbase = HEAP32[iov + (8 * i + 0) >> 2];
                        var iovlen = HEAP32[iov + (8 * i + 4) >> 2];
                        for (var j = 0; j < iovlen; j++) {
                            view[offset++] = HEAP8[iovbase + j >> 0]
                        }
                    }
                    return sock.sock_ops.sendmsg(sock, view, 0, total, addr, port)
                }
                ;
            case 17:
                {
                    var sock = SYSCALLS.getSocketFromFD()
                      , message = SYSCALLS.get()
                      , flags = SYSCALLS.get();
                    var iov = HEAP32[message + 8 >> 2];
                    var num = HEAP32[message + 12 >> 2];
                    var total = 0;
                    for (var i = 0; i < num; i++) {
                        total += HEAP32[iov + (8 * i + 4) >> 2]
                    }
                    var msg = sock.sock_ops.recvmsg(sock, total);
                    if (!msg)
                        return 0;
                    var name = HEAP32[message >> 2];
                    if (name) {
                        var res = __write_sockaddr(name, sock.family, DNS.lookup_name(msg.addr), msg.port);
                        assert(!res.errno)
                    }
                    var bytesRead = 0;
                    var bytesRemaining = msg.buffer.byteLength;
                    for (var i = 0; bytesRemaining > 0 && i < num; i++) {
                        var iovbase = HEAP32[iov + (8 * i + 0) >> 2];
                        var iovlen = HEAP32[iov + (8 * i + 4) >> 2];
                        if (!iovlen) {
                            continue
                        }
                        var length = Math.min(iovlen, bytesRemaining);
                        var buf = msg.buffer.subarray(bytesRead, bytesRead + length);
                        HEAPU8.set(buf, iovbase + bytesRead);
                        bytesRead += length;
                        bytesRemaining -= length
                    }
                    return bytesRead
                }
                ;
            default:
                abort("unsupported socketcall syscall " + call)
            }
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall122(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var buf = SYSCALLS.get();
            if (!buf)
                return -ERRNO_CODES.EFAULT;
            var layout = {
                "sysname": 0,
                "nodename": 65,
                "domainname": 325,
                "machine": 260,
                "version": 195,
                "release": 130,
                "__size__": 390
            };
            function copyString(element, value) {
                var offset = layout[element];
                writeAsciiToMemory(value, buf + offset)
            }
            copyString("sysname", "Emscripten");
            copyString("nodename", "emscripten");
            copyString("release", "1.0");
            copyString("version", "#1");
            copyString("machine", "x86-JS");
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall140(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var stream = SYSCALLS.getStreamFromFD()
              , offset_high = SYSCALLS.get()
              , offset_low = SYSCALLS.get()
              , result = SYSCALLS.get()
              , whence = SYSCALLS.get();
            var offset = offset_low;
            FS.llseek(stream, offset, whence);
            HEAP32[result >> 2] = stream.position;
            if (stream.getdents && offset === 0 && whence === 0)
                stream.getdents = null;
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall142(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var nfds = SYSCALLS.get()
              , readfds = SYSCALLS.get()
              , writefds = SYSCALLS.get()
              , exceptfds = SYSCALLS.get()
              , timeout = SYSCALLS.get();
            assert(nfds <= 64, "nfds must be less than or equal to 64");
            assert(!exceptfds, "exceptfds not supported");
            var total = 0;
            var srcReadLow = readfds ? HEAP32[readfds >> 2] : 0
              , srcReadHigh = readfds ? HEAP32[readfds + 4 >> 2] : 0;
            var srcWriteLow = writefds ? HEAP32[writefds >> 2] : 0
              , srcWriteHigh = writefds ? HEAP32[writefds + 4 >> 2] : 0;
            var srcExceptLow = exceptfds ? HEAP32[exceptfds >> 2] : 0
              , srcExceptHigh = exceptfds ? HEAP32[exceptfds + 4 >> 2] : 0;
            var dstReadLow = 0
              , dstReadHigh = 0;
            var dstWriteLow = 0
              , dstWriteHigh = 0;
            var dstExceptLow = 0
              , dstExceptHigh = 0;
            var allLow = (readfds ? HEAP32[readfds >> 2] : 0) | (writefds ? HEAP32[writefds >> 2] : 0) | (exceptfds ? HEAP32[exceptfds >> 2] : 0);
            var allHigh = (readfds ? HEAP32[readfds + 4 >> 2] : 0) | (writefds ? HEAP32[writefds + 4 >> 2] : 0) | (exceptfds ? HEAP32[exceptfds + 4 >> 2] : 0);
            function check(fd, low, high, val) {
                return fd < 32 ? low & val : high & val
            }
            for (var fd = 0; fd < nfds; fd++) {
                var mask = 1 << fd % 32;
                if (!check(fd, allLow, allHigh, mask)) {
                    continue
                }
                var stream = FS.getStream(fd);
                if (!stream)
                    throw new FS.ErrnoError(ERRNO_CODES.EBADF);
                var flags = SYSCALLS.DEFAULT_POLLMASK;
                if (stream.stream_ops.poll) {
                    flags = stream.stream_ops.poll(stream)
                }
                if (flags & 1 && check(fd, srcReadLow, srcReadHigh, mask)) {
                    fd < 32 ? dstReadLow = dstReadLow | mask : dstReadHigh = dstReadHigh | mask;
                    total++
                }
                if (flags & 4 && check(fd, srcWriteLow, srcWriteHigh, mask)) {
                    fd < 32 ? dstWriteLow = dstWriteLow | mask : dstWriteHigh = dstWriteHigh | mask;
                    total++
                }
                if (flags & 2 && check(fd, srcExceptLow, srcExceptHigh, mask)) {
                    fd < 32 ? dstExceptLow = dstExceptLow | mask : dstExceptHigh = dstExceptHigh | mask;
                    total++
                }
            }
            if (readfds) {
                HEAP32[readfds >> 2] = dstReadLow;
                HEAP32[readfds + 4 >> 2] = dstReadHigh
            }
            if (writefds) {
                HEAP32[writefds >> 2] = dstWriteLow;
                HEAP32[writefds + 4 >> 2] = dstWriteHigh
            }
            if (exceptfds) {
                HEAP32[exceptfds >> 2] = dstExceptLow;
                HEAP32[exceptfds + 4 >> 2] = dstExceptHigh
            }
            return total
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall145(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var stream = SYSCALLS.getStreamFromFD()
              , iov = SYSCALLS.get()
              , iovcnt = SYSCALLS.get();
            return SYSCALLS.doReadv(stream, iov, iovcnt)
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall146(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var stream = SYSCALLS.getStreamFromFD()
              , iov = SYSCALLS.get()
              , iovcnt = SYSCALLS.get();
            return SYSCALLS.doWritev(stream, iov, iovcnt)
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall15(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var path = SYSCALLS.getStr()
              , mode = SYSCALLS.get();
            FS.chmod(path, mode);
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall183(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var buf = SYSCALLS.get()
              , size = SYSCALLS.get();
            if (size === 0)
                return -ERRNO_CODES.EINVAL;
            var cwd = FS.cwd();
            var cwdLengthInBytes = lengthBytesUTF8(cwd);
            if (size < cwdLengthInBytes + 1)
                return -ERRNO_CODES.ERANGE;
            stringToUTF8(cwd, buf, size);
            return buf
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall192(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var addr = SYSCALLS.get()
              , len = SYSCALLS.get()
              , prot = SYSCALLS.get()
              , flags = SYSCALLS.get()
              , fd = SYSCALLS.get()
              , off = SYSCALLS.get();
            off <<= 12;
            var ptr;
            var allocated = false;
            if (fd === -1) {
                ptr = _memalign(PAGE_SIZE, len);
                if (!ptr)
                    return -ERRNO_CODES.ENOMEM;
                _memset(ptr, 0, len);
                allocated = true
            } else {
                var info = FS.getStream(fd);
                if (!info)
                    return -ERRNO_CODES.EBADF;
                var res = FS.mmap(info, HEAPU8, addr, len, off, prot, flags);
                ptr = res.ptr;
                allocated = res.allocated
            }
            SYSCALLS.mappings[ptr] = {
                malloc: ptr,
                len: len,
                allocated: allocated,
                fd: fd,
                flags: flags
            };
            return ptr
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall193(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var path = SYSCALLS.getStr()
              , zero = SYSCALLS.getZero()
              , length = SYSCALLS.get64();
            FS.truncate(path, length);
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall195(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var path = SYSCALLS.getStr()
              , buf = SYSCALLS.get();
            return SYSCALLS.doStat(FS.stat, path, buf)
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall196(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var path = SYSCALLS.getStr()
              , buf = SYSCALLS.get();
            return SYSCALLS.doStat(FS.lstat, path, buf)
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall197(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var stream = SYSCALLS.getStreamFromFD()
              , buf = SYSCALLS.get();
            return SYSCALLS.doStat(FS.stat, stream.path, buf)
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall202(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall199() {
        return ___syscall202.apply(null, arguments)
    }
    function ___syscall220(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var stream = SYSCALLS.getStreamFromFD()
              , dirp = SYSCALLS.get()
              , count = SYSCALLS.get();
            if (!stream.getdents) {
                stream.getdents = FS.readdir(stream.path)
            }
            var pos = 0;
            while (stream.getdents.length > 0 && pos + 268 <= count) {
                var id;
                var type;
                var name = stream.getdents.pop();
                if (name[0] === ".") {
                    id = 1;
                    type = 4
                } else {
                    var child = FS.lookupNode(stream.node, name);
                    id = child.id;
                    type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8
                }
                HEAP32[dirp + pos >> 2] = id;
                HEAP32[dirp + pos + 4 >> 2] = stream.position;
                HEAP16[dirp + pos + 8 >> 1] = 268;
                HEAP8[dirp + pos + 10 >> 0] = type;
                stringToUTF8(name, dirp + pos + 11, 256);
                pos += 268
            }
            return pos
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall221(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var stream = SYSCALLS.getStreamFromFD()
              , cmd = SYSCALLS.get();
            switch (cmd) {
            case 0:
                {
                    var arg = SYSCALLS.get();
                    if (arg < 0) {
                        return -ERRNO_CODES.EINVAL
                    }
                    var newStream;
                    newStream = FS.open(stream.path, stream.flags, 0, arg);
                    return newStream.fd
                }
                ;
            case 1:
            case 2:
                return 0;
            case 3:
                return stream.flags;
            case 4:
                {
                    var arg = SYSCALLS.get();
                    stream.flags |= arg;
                    return 0
                }
                ;
            case 12:
            case 12:
                {
                    var arg = SYSCALLS.get();
                    var offset = 0;
                    HEAP16[arg + offset >> 1] = 2;
                    return 0
                }
                ;
            case 13:
            case 14:
            case 13:
            case 14:
                return 0;
            case 16:
            case 8:
                return -ERRNO_CODES.EINVAL;
            case 9:
                ___setErrNo(ERRNO_CODES.EINVAL);
                return -1;
            default:
                {
                    return -ERRNO_CODES.EINVAL
                }
            }
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall268(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var path = SYSCALLS.getStr()
              , size = SYSCALLS.get()
              , buf = SYSCALLS.get();
            assert(size === 64);
            HEAP32[buf + 4 >> 2] = 4096;
            HEAP32[buf + 40 >> 2] = 4096;
            HEAP32[buf + 8 >> 2] = 1e6;
            HEAP32[buf + 12 >> 2] = 5e5;
            HEAP32[buf + 16 >> 2] = 5e5;
            HEAP32[buf + 20 >> 2] = FS.nextInode;
            HEAP32[buf + 24 >> 2] = 1e6;
            HEAP32[buf + 28 >> 2] = 42;
            HEAP32[buf + 44 >> 2] = 2;
            HEAP32[buf + 36 >> 2] = 255;
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall3(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var stream = SYSCALLS.getStreamFromFD()
              , buf = SYSCALLS.get()
              , count = SYSCALLS.get();
            return FS.read(stream, HEAP8, buf, count)
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall33(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var path = SYSCALLS.getStr()
              , amode = SYSCALLS.get();
            return SYSCALLS.doAccess(path, amode)
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall38(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var old_path = SYSCALLS.getStr()
              , new_path = SYSCALLS.getStr();
            FS.rename(old_path, new_path);
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall39(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var path = SYSCALLS.getStr()
              , mode = SYSCALLS.get();
            return SYSCALLS.doMkdir(path, mode)
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall4(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var stream = SYSCALLS.getStreamFromFD()
              , buf = SYSCALLS.get()
              , count = SYSCALLS.get();
            return FS.write(stream, HEAP8, buf, count)
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall40(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var path = SYSCALLS.getStr();
            FS.rmdir(path);
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall5(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var pathname = SYSCALLS.getStr()
              , flags = SYSCALLS.get()
              , mode = SYSCALLS.get();
            var stream = FS.open(pathname, flags, mode);
            return stream.fd
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall54(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var stream = SYSCALLS.getStreamFromFD()
              , op = SYSCALLS.get();
            switch (op) {
            case 21509:
            case 21505:
                {
                    if (!stream.tty)
                        return -ERRNO_CODES.ENOTTY;
                    return 0
                }
                ;
            case 21510:
            case 21511:
            case 21512:
            case 21506:
            case 21507:
            case 21508:
                {
                    if (!stream.tty)
                        return -ERRNO_CODES.ENOTTY;
                    return 0
                }
                ;
            case 21519:
                {
                    if (!stream.tty)
                        return -ERRNO_CODES.ENOTTY;
                    var argp = SYSCALLS.get();
                    HEAP32[argp >> 2] = 0;
                    return 0
                }
                ;
            case 21520:
                {
                    if (!stream.tty)
                        return -ERRNO_CODES.ENOTTY;
                    return -ERRNO_CODES.EINVAL
                }
                ;
            case 21531:
                {
                    var argp = SYSCALLS.get();
                    return FS.ioctl(stream, op, argp)
                }
                ;
            case 21523:
                {
                    if (!stream.tty)
                        return -ERRNO_CODES.ENOTTY;
                    return 0
                }
                ;
            case 21524:
                {
                    if (!stream.tty)
                        return -ERRNO_CODES.ENOTTY;
                    return 0
                }
                ;
            default:
                abort("bad ioctl syscall " + op)
            }
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall6(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var stream = SYSCALLS.getStreamFromFD();
            FS.close(stream);
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall77(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var who = SYSCALLS.get()
              , usage = SYSCALLS.get();
            _memset(usage, 0, 136);
            HEAP32[usage >> 2] = 1;
            HEAP32[usage + 4 >> 2] = 2;
            HEAP32[usage + 8 >> 2] = 3;
            HEAP32[usage + 12 >> 2] = 4;
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall85(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var path = SYSCALLS.getStr()
              , buf = SYSCALLS.get()
              , bufsize = SYSCALLS.get();
            return SYSCALLS.doReadlink(path, buf, bufsize)
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___syscall91(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
            var addr = SYSCALLS.get()
              , len = SYSCALLS.get();
            var info = SYSCALLS.mappings[addr];
            if (!info)
                return 0;
            if (len === info.len) {
                var stream = FS.getStream(info.fd);
                SYSCALLS.doMsync(addr, stream, len, info.flags);
                FS.munmap(stream);
                SYSCALLS.mappings[addr] = null;
                if (info.allocated) {
                    _free(info.malloc)
                }
            }
            return 0
        } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
            return -e.errno
        }
    }
    function ___unlock() {}
    function _abort() {
        Module["abort"]()
    }
    function _atexit(func, arg) {
        __ATEXIT__.unshift({
            func: func,
            arg: arg
        })
    }
    function _clock() {
        if (_clock.start === undefined)
            _clock.start = Date.now();
        return (Date.now() - _clock.start) * (1e6 / 1e3) | 0
    }
    function _emscripten_get_now_res() {
        if (ENVIRONMENT_IS_NODE) {
            return 1
        } else if (typeof dateNow !== "undefined" || (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && self["performance"] && self["performance"]["now"]) {
            return 1e3
        } else {
            return 1e3 * 1e3
        }
    }
    function _emscripten_get_now() {
        abort()
    }
    function _emscripten_get_now_is_monotonic() {
        return ENVIRONMENT_IS_NODE || typeof dateNow !== "undefined" || (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && self["performance"] && self["performance"]["now"]
    }
    function _clock_getres(clk_id, res) {
        var nsec;
        if (clk_id === 0) {
            nsec = 1e3 * 1e3
        } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
            nsec = _emscripten_get_now_res()
        } else {
            ___setErrNo(ERRNO_CODES.EINVAL);
            return -1
        }
        HEAP32[res >> 2] = nsec / 1e9 | 0;
        HEAP32[res + 4 >> 2] = nsec;
        return 0
    }
    function _clock_gettime(clk_id, tp) {
        var now;
        if (clk_id === 0) {
            now = Date.now()
        } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
            now = _emscripten_get_now()
        } else {
            ___setErrNo(ERRNO_CODES.EINVAL);
            return -1
        }
        HEAP32[tp >> 2] = now / 1e3 | 0;
        HEAP32[tp + 4 >> 2] = now % 1e3 * 1e3 * 1e3 | 0;
        return 0
    }
    function _difftime(time1, time0) {
        return time1 - time0
    }
    var DLFCN = {
        error: null,
        errorMsg: null,
        loadedLibs: {},
        loadedLibNames: {}
    };
    function _dlclose(handle) {
        if (!DLFCN.loadedLibs[handle]) {
            DLFCN.errorMsg = "Tried to dlclose() unopened handle: " + handle;
            return 1
        } else {
            var lib_record = DLFCN.loadedLibs[handle];
            if (--lib_record.refcount == 0) {
                if (lib_record.module.cleanups) {
                    lib_record.module.cleanups.forEach((function(cleanup) {
                        cleanup()
                    }
                    ))
                }
                delete DLFCN.loadedLibNames[lib_record.name];
                delete DLFCN.loadedLibs[handle]
            }
            return 0
        }
    }
    function _dlopen(filename, flag) {
        abort("To use dlopen, you need to use Emscripten's linking support, see https://github.com/kripken/emscripten/wiki/Linking");
        var searchpaths = [];
        if (filename === 0) {
            filename = "__self__"
        } else {
            var strfilename = Pointer_stringify(filename);
            var isValidFile = (function(filename) {
                var target = FS.findObject(filename);
                return target && !target.isFolder && !target.isDevice
            }
            );
            if (isValidFile(strfilename)) {
                filename = strfilename
            } else {
                if (ENV["LD_LIBRARY_PATH"]) {
                    searchpaths = ENV["LD_LIBRARY_PATH"].split(":")
                }
                for (var ident in searchpaths) {
                    var searchfile = PATH.join2(searchpaths[ident], strfilename);
                    if (isValidFile(searchfile)) {
                        filename = searchfile;
                        break
                    }
                }
            }
        }
        if (DLFCN.loadedLibNames[filename]) {
            var handle = DLFCN.loadedLibNames[filename];
            DLFCN.loadedLibs[handle].refcount++;
            return handle
        }
        var lib_module;
        if (filename === "__self__") {
            var handle = -1;
            lib_module = Module
        } else {
            if (Module["preloadedWasm"] !== undefined && Module["preloadedWasm"][filename] !== undefined) {
                lib_module = Module["preloadedWasm"][filename]
            } else {
                var target = FS.findObject(filename);
                if (!target || target.isFolder || target.isDevice) {
                    DLFCN.errorMsg = "Could not find dynamic lib: " + filename;
                    return 0
                }
                FS.forceLoadFile(target);
                try {
                    var lib_data = FS.readFile(filename, {
                        encoding: "binary"
                    });
                    if (!(lib_data instanceof Uint8Array))
                        lib_data = new Uint8Array(lib_data);
                    lib_module = loadWebAssemblyModule(lib_data)
                } catch (e) {
                    DLFCN.errorMsg = "Could not evaluate dynamic lib: " + filename + "\n" + e;
                    return 0
                }
            }
            var handle = 1;
            for (var key in DLFCN.loadedLibs) {
                if (DLFCN.loadedLibs.hasOwnProperty(key))
                    handle++
            }
            if (flag & 256) {
                for (var ident in lib_module) {
                    if (lib_module.hasOwnProperty(ident)) {
                        if (ident[0] == "_") {
                            Module[ident] = lib_module[ident]
                        }
                    }
                }
            }
        }
        DLFCN.loadedLibs[handle] = {
            refcount: 1,
            name: filename,
            module: lib_module
        };
        DLFCN.loadedLibNames[filename] = handle;
        return handle
    }
    function _dlsym(handle, symbol) {
        symbol = Pointer_stringify(symbol);
        if (!DLFCN.loadedLibs[handle]) {
            DLFCN.errorMsg = "Tried to dlsym() from an unopened handle: " + handle;
            return 0
        } else {
            var lib = DLFCN.loadedLibs[handle];
            symbol = "_" + symbol;
            if (!lib.module.hasOwnProperty(symbol)) {
                DLFCN.errorMsg = 'Tried to lookup unknown symbol "' + symbol + '" in dynamic lib: ' + lib.name;
                return 0
            } else {
                var result = lib.module[symbol];
                if (typeof result === "function") {
                    return addFunction(result)
                }
                return result
            }
        }
    }
    function _emscripten_set_main_loop_timing(mode, value) {
        Browser.mainLoop.timingMode = mode;
        Browser.mainLoop.timingValue = value;
        if (!Browser.mainLoop.func) {
            return 1
        }
        if (mode == 0) {
            Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
                var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
                setTimeout(Browser.mainLoop.runner, timeUntilNextTick)
            }
            ;
            Browser.mainLoop.method = "timeout"
        } else if (mode == 1) {
            Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
                Browser.requestAnimationFrame(Browser.mainLoop.runner)
            }
            ;
            Browser.mainLoop.method = "rAF"
        } else if (mode == 2) {
            if (typeof setImmediate === "undefined") {
                var setImmediates = [];
                var emscriptenMainLoopMessageId = "setimmediate";
                function Browser_setImmediate_messageHandler(event) {
                    if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                        event.stopPropagation();
                        setImmediates.shift()()
                    }
                }
                addEventListener("message", Browser_setImmediate_messageHandler, true);
                setImmediate = function Browser_emulated_setImmediate(func) {
                    setImmediates.push(func);
                    if (ENVIRONMENT_IS_WORKER) {
                        if (Module["setImmediates"] === undefined)
                            Module["setImmediates"] = [];
                        Module["setImmediates"].push(func);
                        postMessage({
                            target: emscriptenMainLoopMessageId
                        })
                    } else
                        postMessage(emscriptenMainLoopMessageId, "*")
                }
            }
            Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
                setImmediate(Browser.mainLoop.runner)
            }
            ;
            Browser.mainLoop.method = "immediate"
        }
        return 0
    }
    function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
        Module["noExitRuntime"] = true;
        assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
        Browser.mainLoop.func = func;
        Browser.mainLoop.arg = arg;
        var browserIterationFunc;
        if (typeof arg !== "undefined") {
            browserIterationFunc = (function() {
                Module["dynCall_vi"](func, arg)
            }
            )
        } else {
            browserIterationFunc = (function() {
                Module["dynCall_v"](func)
            }
            )
        }
        var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
        Browser.mainLoop.runner = function Browser_mainLoop_runner() {
            if (ABORT)
                return;
            if (Browser.mainLoop.queue.length > 0) {
                var start = Date.now();
                var blocker = Browser.mainLoop.queue.shift();
                blocker.func(blocker.arg);
                if (Browser.mainLoop.remainingBlockers) {
                    var remaining = Browser.mainLoop.remainingBlockers;
                    var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
                    if (blocker.counted) {
                        Browser.mainLoop.remainingBlockers = next
                    } else {
                        next = next + .5;
                        Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9
                    }
                }
                console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
                Browser.mainLoop.updateStatus();
                if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop)
                    return;
                setTimeout(Browser.mainLoop.runner, 0);
                return
            }
            if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop)
                return;
            Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
            if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
                Browser.mainLoop.scheduler();
                return
            } else if (Browser.mainLoop.timingMode == 0) {
                Browser.mainLoop.tickStartTime = _emscripten_get_now()
            }
            if (Browser.mainLoop.method === "timeout" && Module.ctx) {
                err("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");
                Browser.mainLoop.method = ""
            }
            Browser.mainLoop.runIter(browserIterationFunc);
            if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop)
                return;
            if (typeof SDL === "object" && SDL.audio && SDL.audio.queueNewAudioData)
                SDL.audio.queueNewAudioData();
            Browser.mainLoop.scheduler()
        }
        ;
        if (!noSetTiming) {
            if (fps && fps > 0)
                _emscripten_set_main_loop_timing(0, 1e3 / fps);
            else
                _emscripten_set_main_loop_timing(1, 1);
            Browser.mainLoop.scheduler()
        }
        if (simulateInfiniteLoop) {
            throw "SimulateInfiniteLoop"
        }
    }
    var Browser = {
        mainLoop: {
            scheduler: null,
            method: "",
            currentlyRunningMainloop: 0,
            func: null,
            arg: 0,
            timingMode: 0,
            timingValue: 0,
            currentFrameNumber: 0,
            queue: [],
            pause: (function() {
                Browser.mainLoop.scheduler = null;
                Browser.mainLoop.currentlyRunningMainloop++
            }
            ),
            resume: (function() {
                Browser.mainLoop.currentlyRunningMainloop++;
                var timingMode = Browser.mainLoop.timingMode;
                var timingValue = Browser.mainLoop.timingValue;
                var func = Browser.mainLoop.func;
                Browser.mainLoop.func = null;
                _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true);
                _emscripten_set_main_loop_timing(timingMode, timingValue);
                Browser.mainLoop.scheduler()
            }
            ),
            updateStatus: (function() {
                if (Module["setStatus"]) {
                    var message = Module["statusMessage"] || "Please wait...";
                    var remaining = Browser.mainLoop.remainingBlockers;
                    var expected = Browser.mainLoop.expectedBlockers;
                    if (remaining) {
                        if (remaining < expected) {
                            Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")")
                        } else {
                            Module["setStatus"](message)
                        }
                    } else {
                        Module["setStatus"]("")
                    }
                }
            }
            ),
            runIter: (function(func) {
                if (ABORT)
                    return;
                if (Module["preMainLoop"]) {
                    var preRet = Module["preMainLoop"]();
                    if (preRet === false) {
                        return
                    }
                }
                try {
                    func()
                } catch (e) {
                    if (e instanceof ExitStatus) {
                        return
                    } else {
                        if (e && typeof e === "object" && e.stack)
                            err("exception thrown: " + [e, e.stack]);
                        throw e
                    }
                }
                if (Module["postMainLoop"])
                    Module["postMainLoop"]()
            }
            )
        },
        isFullscreen: false,
        pointerLock: false,
        moduleContextCreatedCallbacks: [],
        workers: [],
        init: (function() {
            if (!Module["preloadPlugins"])
                Module["preloadPlugins"] = [];
            if (Browser.initted)
                return;
            Browser.initted = true;
            try {
                new Blob;
                Browser.hasBlobConstructor = true
            } catch (e) {
                Browser.hasBlobConstructor = false;
                console.log("warning: no blob constructor, cannot create blobs with mimetypes")
            }
            Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null;
            Browser.URLObject = typeof window != "undefined" ? window.URL ? window.URL : window.webkitURL : undefined;
            if (!Module.noImageDecoding && typeof Browser.URLObject === "undefined") {
                console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
                Module.noImageDecoding = true
            }
            var imagePlugin = {};
            imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
                return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name)
            }
            ;
            imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
                var b = null;
                if (Browser.hasBlobConstructor) {
                    try {
                        b = new Blob([byteArray],{
                            type: Browser.getMimetype(name)
                        });
                        if (b.size !== byteArray.length) {
                            b = new Blob([(new Uint8Array(byteArray)).buffer],{
                                type: Browser.getMimetype(name)
                            })
                        }
                    } catch (e) {
                        warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder")
                    }
                }
                if (!b) {
                    var bb = new Browser.BlobBuilder;
                    bb.append((new Uint8Array(byteArray)).buffer);
                    b = bb.getBlob()
                }
                var url = Browser.URLObject.createObjectURL(b);
                var img = new Image;
                img.onload = function img_onload() {
                    assert(img.complete, "Image " + name + " could not be decoded");
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    Module["preloadedImages"][name] = canvas;
                    Browser.URLObject.revokeObjectURL(url);
                    if (onload)
                        onload(byteArray)
                }
                ;
                img.onerror = function img_onerror(event) {
                    console.log("Image " + url + " could not be decoded");
                    if (onerror)
                        onerror()
                }
                ;
                img.src = url
            }
            ;
            Module["preloadPlugins"].push(imagePlugin);
            var audioPlugin = {};
            audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
                return !Module.noAudioDecoding && name.substr(-4)in {
                    ".ogg": 1,
                    ".wav": 1,
                    ".mp3": 1
                }
            }
            ;
            audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
                var done = false;
                function finish(audio) {
                    if (done)
                        return;
                    done = true;
                    Module["preloadedAudios"][name] = audio;
                    if (onload)
                        onload(byteArray)
                }
                function fail() {
                    if (done)
                        return;
                    done = true;
                    Module["preloadedAudios"][name] = new Audio;
                    if (onerror)
                        onerror()
                }
                if (Browser.hasBlobConstructor) {
                    try {
                        var b = new Blob([byteArray],{
                            type: Browser.getMimetype(name)
                        })
                    } catch (e) {
                        return fail()
                    }
                    var url = Browser.URLObject.createObjectURL(b);
                    var audio = new Audio;
                    audio.addEventListener("canplaythrough", (function() {
                        finish(audio)
                    }
                    ), false);
                    audio.onerror = function audio_onerror(event) {
                        if (done)
                            return;
                        console.log("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");
                        function encode64(data) {
                            var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                            var PAD = "=";
                            var ret = "";
                            var leftchar = 0;
                            var leftbits = 0;
                            for (var i = 0; i < data.length; i++) {
                                leftchar = leftchar << 8 | data[i];
                                leftbits += 8;
                                while (leftbits >= 6) {
                                    var curr = leftchar >> leftbits - 6 & 63;
                                    leftbits -= 6;
                                    ret += BASE[curr]
                                }
                            }
                            if (leftbits == 2) {
                                ret += BASE[(leftchar & 3) << 4];
                                ret += PAD + PAD
                            } else if (leftbits == 4) {
                                ret += BASE[(leftchar & 15) << 2];
                                ret += PAD
                            }
                            return ret
                        }
                        audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
                        finish(audio)
                    }
                    ;
                    audio.src = url;
                    Browser.safeSetTimeout((function() {
                        finish(audio)
                    }
                    ), 1e4)
                } else {
                    return fail()
                }
            }
            ;
            Module["preloadPlugins"].push(audioPlugin);
            function pointerLockChange() {
                Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"]
            }
            var canvas = Module["canvas"];
            if (canvas) {
                canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || (function() {}
                );
                canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || (function() {}
                );
                canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
                document.addEventListener("pointerlockchange", pointerLockChange, false);
                document.addEventListener("mozpointerlockchange", pointerLockChange, false);
                document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
                document.addEventListener("mspointerlockchange", pointerLockChange, false);
                if (Module["elementPointerLock"]) {
                    canvas.addEventListener("click", (function(ev) {
                        if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
                            Module["canvas"].requestPointerLock();
                            ev.preventDefault()
                        }
                    }
                    ), false)
                }
            }
        }
        ),
        createContext: (function(canvas, useWebGL, setInModule, webGLContextAttributes) {
            if (useWebGL && Module.ctx && canvas == Module.canvas)
                return Module.ctx;
            var ctx;
            var contextHandle;
            if (useWebGL) {
                var contextAttributes = {
                    antialias: false,
                    alpha: false
                };
                if (webGLContextAttributes) {
                    for (var attribute in webGLContextAttributes) {
                        contextAttributes[attribute] = webGLContextAttributes[attribute]
                    }
                }
                contextHandle = GL.createContext(canvas, contextAttributes);
                if (contextHandle) {
                    ctx = GL.getContext(contextHandle).GLctx
                }
            } else {
                ctx = canvas.getContext("2d")
            }
            if (!ctx)
                return null;
            if (setInModule) {
                if (!useWebGL)
                    assert(typeof GLctx === "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
                Module.ctx = ctx;
                if (useWebGL)
                    GL.makeContextCurrent(contextHandle);
                Module.useWebGL = useWebGL;
                Browser.moduleContextCreatedCallbacks.forEach((function(callback) {
                    callback()
                }
                ));
                Browser.init()
            }
            return ctx
        }
        ),
        destroyContext: (function(canvas, useWebGL, setInModule) {}
        ),
        fullscreenHandlersInstalled: false,
        lockPointer: undefined,
        resizeCanvas: undefined,
        requestFullscreen: (function(lockPointer, resizeCanvas, vrDevice) {
            Browser.lockPointer = lockPointer;
            Browser.resizeCanvas = resizeCanvas;
            Browser.vrDevice = vrDevice;
            if (typeof Browser.lockPointer === "undefined")
                Browser.lockPointer = true;
            if (typeof Browser.resizeCanvas === "undefined")
                Browser.resizeCanvas = false;
            if (typeof Browser.vrDevice === "undefined")
                Browser.vrDevice = null;
            var canvas = Module["canvas"];
            function fullscreenChange() {
                Browser.isFullscreen = false;
                var canvasContainer = canvas.parentNode;
                if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
                    canvas.exitFullscreen = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || (function() {}
                    );
                    canvas.exitFullscreen = canvas.exitFullscreen.bind(document);
                    if (Browser.lockPointer)
                        canvas.requestPointerLock();
                    Browser.isFullscreen = true;
                    if (Browser.resizeCanvas) {
                        Browser.setFullscreenCanvasSize()
                    } else {
                        Browser.updateCanvasDimensions(canvas)
                    }
                } else {
                    canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
                    canvasContainer.parentNode.removeChild(canvasContainer);
                    if (Browser.resizeCanvas) {
                        Browser.setWindowedCanvasSize()
                    } else {
                        Browser.updateCanvasDimensions(canvas)
                    }
                }
                if (Module["onFullScreen"])
                    Module["onFullScreen"](Browser.isFullscreen);
                if (Module["onFullscreen"])
                    Module["onFullscreen"](Browser.isFullscreen)
            }
            if (!Browser.fullscreenHandlersInstalled) {
                Browser.fullscreenHandlersInstalled = true;
                document.addEventListener("fullscreenchange", fullscreenChange, false);
                document.addEventListener("mozfullscreenchange", fullscreenChange, false);
                document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
                document.addEventListener("MSFullscreenChange", fullscreenChange, false)
            }
            var canvasContainer = document.createElement("div");
            canvas.parentNode.insertBefore(canvasContainer, canvas);
            canvasContainer.appendChild(canvas);
            canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? (function() {
                canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"])
            }
            ) : null) || (canvasContainer["webkitRequestFullScreen"] ? (function() {
                canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"])
            }
            ) : null);
            if (vrDevice) {
                canvasContainer.requestFullscreen({
                    vrDisplay: vrDevice
                })
            } else {
                canvasContainer.requestFullscreen()
            }
        }
        ),
        requestFullScreen: (function(lockPointer, resizeCanvas, vrDevice) {
            err("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");
            Browser.requestFullScreen = (function(lockPointer, resizeCanvas, vrDevice) {
                return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice)
            }
            );
            return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice)
        }
        ),
        nextRAF: 0,
        fakeRequestAnimationFrame: (function(func) {
            var now = Date.now();
            if (Browser.nextRAF === 0) {
                Browser.nextRAF = now + 1e3 / 60
            } else {
                while (now + 2 >= Browser.nextRAF) {
                    Browser.nextRAF += 1e3 / 60
                }
            }
            var delay = Math.max(Browser.nextRAF - now, 0);
            setTimeout(func, delay)
        }
        ),
        requestAnimationFrame: function requestAnimationFrame(func) {
            if (typeof window === "undefined") {
                Browser.fakeRequestAnimationFrame(func)
            } else {
                if (!window.requestAnimationFrame) {
                    window.requestAnimationFrame = window["requestAnimationFrame"] || window["mozRequestAnimationFrame"] || window["webkitRequestAnimationFrame"] || window["msRequestAnimationFrame"] || window["oRequestAnimationFrame"] || Browser.fakeRequestAnimationFrame
                }
                window.requestAnimationFrame(func)
            }
        },
        safeCallback: (function(func) {
            return (function() {
                if (!ABORT)
                    return func.apply(null, arguments)
            }
            )
        }
        ),
        allowAsyncCallbacks: true,
        queuedAsyncCallbacks: [],
        pauseAsyncCallbacks: (function() {
            Browser.allowAsyncCallbacks = false
        }
        ),
        resumeAsyncCallbacks: (function() {
            Browser.allowAsyncCallbacks = true;
            if (Browser.queuedAsyncCallbacks.length > 0) {
                var callbacks = Browser.queuedAsyncCallbacks;
                Browser.queuedAsyncCallbacks = [];
                callbacks.forEach((function(func) {
                    func()
                }
                ))
            }
        }
        ),
        safeRequestAnimationFrame: (function(func) {
            return Browser.requestAnimationFrame((function() {
                if (ABORT)
                    return;
                if (Browser.allowAsyncCallbacks) {
                    func()
                } else {
                    Browser.queuedAsyncCallbacks.push(func)
                }
            }
            ))
        }
        ),
        safeSetTimeout: (function(func, timeout) {
            Module["noExitRuntime"] = true;
            return setTimeout((function() {
                if (ABORT)
                    return;
                if (Browser.allowAsyncCallbacks) {
                    func()
                } else {
                    Browser.queuedAsyncCallbacks.push(func)
                }
            }
            ), timeout)
        }
        ),
        safeSetInterval: (function(func, timeout) {
            Module["noExitRuntime"] = true;
            return setInterval((function() {
                if (ABORT)
                    return;
                if (Browser.allowAsyncCallbacks) {
                    func()
                }
            }
            ), timeout)
        }
        ),
        getMimetype: (function(name) {
            return {
                "jpg": "image/jpeg",
                "jpeg": "image/jpeg",
                "png": "image/png",
                "bmp": "image/bmp",
                "ogg": "audio/ogg",
                "wav": "audio/wav",
                "mp3": "audio/mpeg"
            }[name.substr(name.lastIndexOf(".") + 1)]
        }
        ),
        getUserMedia: (function(func) {
            if (!window.getUserMedia) {
                window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"]
            }
            window.getUserMedia(func)
        }
        ),
        getMovementX: (function(event) {
            return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0
        }
        ),
        getMovementY: (function(event) {
            return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0
        }
        ),
        getMouseWheelDelta: (function(event) {
            var delta = 0;
            switch (event.type) {
            case "DOMMouseScroll":
                delta = event.detail;
                break;
            case "mousewheel":
                delta = event.wheelDelta;
                break;
            case "wheel":
                delta = event["deltaY"];
                break;
            default:
                throw "unrecognized mouse wheel event: " + event.type
            }
            return delta
        }
        ),
        mouseX: 0,
        mouseY: 0,
        mouseMovementX: 0,
        mouseMovementY: 0,
        touches: {},
        lastTouches: {},
        calculateMouseEvent: (function(event) {
            if (Browser.pointerLock) {
                if (event.type != "mousemove" && "mozMovementX"in event) {
                    Browser.mouseMovementX = Browser.mouseMovementY = 0
                } else {
                    Browser.mouseMovementX = Browser.getMovementX(event);
                    Browser.mouseMovementY = Browser.getMovementY(event)
                }
                if (typeof SDL != "undefined") {
                    Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
                    Browser.mouseY = SDL.mouseY + Browser.mouseMovementY
                } else {
                    Browser.mouseX += Browser.mouseMovementX;
                    Browser.mouseY += Browser.mouseMovementY
                }
            } else {
                var rect = Module["canvas"].getBoundingClientRect();
                var cw = Module["canvas"].width;
                var ch = Module["canvas"].height;
                var scrollX = typeof window.scrollX !== "undefined" ? window.scrollX : window.pageXOffset;
                var scrollY = typeof window.scrollY !== "undefined" ? window.scrollY : window.pageYOffset;
                if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
                    var touch = event.touch;
                    if (touch === undefined) {
                        return
                    }
                    var adjustedX = touch.pageX - (scrollX + rect.left);
                    var adjustedY = touch.pageY - (scrollY + rect.top);
                    adjustedX = adjustedX * (cw / rect.width);
                    adjustedY = adjustedY * (ch / rect.height);
                    var coords = {
                        x: adjustedX,
                        y: adjustedY
                    };
                    if (event.type === "touchstart") {
                        Browser.lastTouches[touch.identifier] = coords;
                        Browser.touches[touch.identifier] = coords
                    } else if (event.type === "touchend" || event.type === "touchmove") {
                        var last = Browser.touches[touch.identifier];
                        if (!last)
                            last = coords;
                        Browser.lastTouches[touch.identifier] = last;
                        Browser.touches[touch.identifier] = coords
                    }
                    return
                }
                var x = event.pageX - (scrollX + rect.left);
                var y = event.pageY - (scrollY + rect.top);
                x = x * (cw / rect.width);
                y = y * (ch / rect.height);
                Browser.mouseMovementX = x - Browser.mouseX;
                Browser.mouseMovementY = y - Browser.mouseY;
                Browser.mouseX = x;
                Browser.mouseY = y
            }
        }
        ),
        asyncLoad: (function(url, onload, onerror, noRunDep) {
            var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
            Module["readAsync"](url, (function(arrayBuffer) {
                assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
                onload(new Uint8Array(arrayBuffer));
                if (dep)
                    removeRunDependency(dep)
            }
            ), (function(event) {
                if (onerror) {
                    onerror()
                } else {
                    throw 'Loading data file "' + url + '" failed.'
                }
            }
            ));
            if (dep)
                addRunDependency(dep)
        }
        ),
        resizeListeners: [],
        updateResizeListeners: (function() {
            var canvas = Module["canvas"];
            Browser.resizeListeners.forEach((function(listener) {
                listener(canvas.width, canvas.height)
            }
            ))
        }
        ),
        setCanvasSize: (function(width, height, noUpdates) {
            var canvas = Module["canvas"];
            Browser.updateCanvasDimensions(canvas, width, height);
            if (!noUpdates)
                Browser.updateResizeListeners()
        }
        ),
        windowedWidth: 0,
        windowedHeight: 0,
        setFullscreenCanvasSize: (function() {
            if (typeof SDL != "undefined") {
                var flags = HEAPU32[SDL.screen >> 2];
                flags = flags | 8388608;
                HEAP32[SDL.screen >> 2] = flags
            }
            Browser.updateCanvasDimensions(Module["canvas"]);
            Browser.updateResizeListeners()
        }
        ),
        setWindowedCanvasSize: (function() {
            if (typeof SDL != "undefined") {
                var flags = HEAPU32[SDL.screen >> 2];
                flags = flags & ~8388608;
                HEAP32[SDL.screen >> 2] = flags
            }
            Browser.updateCanvasDimensions(Module["canvas"]);
            Browser.updateResizeListeners()
        }
        ),
        updateCanvasDimensions: (function(canvas, wNative, hNative) {
            if (wNative && hNative) {
                canvas.widthNative = wNative;
                canvas.heightNative = hNative
            } else {
                wNative = canvas.widthNative;
                hNative = canvas.heightNative
            }
            var w = wNative;
            var h = hNative;
            if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
                if (w / h < Module["forcedAspectRatio"]) {
                    w = Math.round(h * Module["forcedAspectRatio"])
                } else {
                    h = Math.round(w / Module["forcedAspectRatio"])
                }
            }
            if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
                var factor = Math.min(screen.width / w, screen.height / h);
                w = Math.round(w * factor);
                h = Math.round(h * factor)
            }
            if (Browser.resizeCanvas) {
                if (canvas.width != w)
                    canvas.width = w;
                if (canvas.height != h)
                    canvas.height = h;
                if (typeof canvas.style != "undefined") {
                    canvas.style.removeProperty("width");
                    canvas.style.removeProperty("height")
                }
            } else {
                if (canvas.width != wNative)
                    canvas.width = wNative;
                if (canvas.height != hNative)
                    canvas.height = hNative;
                if (typeof canvas.style != "undefined") {
                    if (w != wNative || h != hNative) {
                        canvas.style.setProperty("width", w + "px", "important");
                        canvas.style.setProperty("height", h + "px", "important")
                    } else {
                        canvas.style.removeProperty("width");
                        canvas.style.removeProperty("height")
                    }
                }
            }
        }
        ),
        wgetRequests: {},
        nextWgetRequestHandle: 0,
        getNextWgetRequestHandle: (function() {
            var handle = Browser.nextWgetRequestHandle;
            Browser.nextWgetRequestHandle++;
            return handle
        }
        )
    };
    function _emscripten_cancel_main_loop() {
        Browser.mainLoop.pause();
        Browser.mainLoop.func = null
    }
    function _emscripten_set_canvas_element_size_calling_thread(target, width, height) {
        var canvas = JSEvents.findCanvasEventTarget(target);
        if (!canvas)
            return -4;
        if (canvas.canvasSharedPtr) {
            HEAP32[canvas.canvasSharedPtr >> 2] = width;
            HEAP32[canvas.canvasSharedPtr + 4 >> 2] = height
        }
        if (canvas.offscreenCanvas || !canvas.controlTransferredOffscreen) {
            if (canvas.offscreenCanvas)
                canvas = canvas.offscreenCanvas;
            var autoResizeViewport = false;
            if (canvas.GLctxObject && canvas.GLctxObject.GLctx) {
                var prevViewport = canvas.GLctxObject.GLctx.getParameter(canvas.GLctxObject.GLctx.VIEWPORT);
                autoResizeViewport = prevViewport[0] === 0 && prevViewport[1] === 0 && prevViewport[2] === canvas.width && prevViewport[3] === canvas.height
            }
            canvas.width = width;
            canvas.height = height;
            if (autoResizeViewport) {
                canvas.GLctxObject.GLctx.viewport(0, 0, width, height)
            }
        } else {
            return -4
        }
        return 0
    }
    function _emscripten_set_canvas_element_size_main_thread(target, width, height) {
        return _emscripten_set_canvas_element_size_calling_thread(target, width, height)
    }
    function _emscripten_set_canvas_element_size(target, width, height) {
        var canvas = JSEvents.findCanvasEventTarget(target);
        if (canvas)
            return _emscripten_set_canvas_element_size_calling_thread(target, width, height);
        else
            return _emscripten_set_canvas_element_size_main_thread(target, width, height)
    }
    function emscripten_set_canvas_element_size_js(target, width, height) {
        if (typeof target === "string") {
            var stackTop = stackSave();
            var targetInt = stackAlloc(target.length + 1);
            stringToUTF8(target, targetInt, target.length + 1);
            var ret = _emscripten_set_canvas_element_size(targetInt, width, height);
            stackRestore(stackTop);
            return ret
        } else {
            return _emscripten_set_canvas_element_size(target, width, height)
        }
    }
    function _emscripten_get_canvas_element_size_calling_thread(target, width, height) {
        var canvas = JSEvents.findCanvasEventTarget(target);
        if (!canvas)
            return -4;
        if (canvas.canvasSharedPtr) {
            var w = HEAP32[canvas.canvasSharedPtr >> 2];
            var h = HEAP32[canvas.canvasSharedPtr + 4 >> 2];
            HEAP32[width >> 2] = w;
            HEAP32[height >> 2] = h
        } else if (canvas.offscreenCanvas) {
            HEAP32[width >> 2] = canvas.offscreenCanvas.width;
            HEAP32[height >> 2] = canvas.offscreenCanvas.height
        } else if (!canvas.controlTransferredOffscreen) {
            HEAP32[width >> 2] = canvas.width;
            HEAP32[height >> 2] = canvas.height
        } else {
            return -4
        }
        return 0
    }
    function _emscripten_get_canvas_element_size_main_thread(target, width, height) {
        return _emscripten_get_canvas_element_size_calling_thread(target, width, height)
    }
    function _emscripten_get_canvas_element_size(target, width, height) {
        var canvas = JSEvents.findCanvasEventTarget(target);
        if (canvas)
            return _emscripten_get_canvas_element_size_calling_thread(target, width, height);
        else
            return _emscripten_get_canvas_element_size_main_thread(target, width, height)
    }
    function emscripten_get_canvas_element_size_js(target) {
        var stackTop = stackSave();
        var w = stackAlloc(8);
        var h = w + 4;
        if (typeof target === "string") {
            var targetInt = stackAlloc(target.length + 1);
            stringToUTF8(target, targetInt, target.length + 1);
            target = targetInt
        }
        var ret = _emscripten_get_canvas_element_size(target, w, h);
        var size = [HEAP32[w >> 2], HEAP32[h >> 2]];
        stackRestore(stackTop);
        return size
    }
    var JSEvents = {
        keyEvent: 0,
        mouseEvent: 0,
        wheelEvent: 0,
        uiEvent: 0,
        focusEvent: 0,
        deviceOrientationEvent: 0,
        deviceMotionEvent: 0,
        fullscreenChangeEvent: 0,
        pointerlockChangeEvent: 0,
        visibilityChangeEvent: 0,
        touchEvent: 0,
        lastGamepadState: null,
        lastGamepadStateFrame: null,
        numGamepadsConnected: 0,
        previousFullscreenElement: null,
        previousScreenX: null,
        previousScreenY: null,
        removeEventListenersRegistered: false,
        _onGamepadConnected: (function() {
            ++JSEvents.numGamepadsConnected
        }
        ),
        _onGamepadDisconnected: (function() {
            --JSEvents.numGamepadsConnected
        }
        ),
        staticInit: (function() {
            if (typeof window !== "undefined") {
                window.addEventListener("gamepadconnected", JSEvents._onGamepadConnected);
                window.addEventListener("gamepaddisconnected", JSEvents._onGamepadDisconnected);
                var firstState = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null;
                if (firstState) {
                    JSEvents.numGamepadsConnected = firstState.length
                }
            }
        }
        ),
        removeAllEventListeners: (function() {
            for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
                JSEvents._removeHandler(i)
            }
            JSEvents.eventHandlers = [];
            JSEvents.deferredCalls = [];
            window.removeEventListener("gamepadconnected", JSEvents._onGamepadConnected);
            window.removeEventListener("gamepaddisconnected", JSEvents._onGamepadDisconnected)
        }
        ),
        registerRemoveEventListeners: (function() {
            if (!JSEvents.removeEventListenersRegistered) {
                __ATEXIT__.push(JSEvents.removeAllEventListeners);
                JSEvents.removeEventListenersRegistered = true
            }
        }
        ),
        findEventTarget: (function(target) {
            try {
                if (!target)
                    return window;
                if (typeof target === "number")
                    target = Pointer_stringify(target);
                if (target === "#window")
                    return window;
                else if (target === "#document")
                    return document;
                else if (target === "#screen")
                    return window.screen;
                else if (target === "#canvas")
                    return Module["canvas"];
                return typeof target === "string" ? document.getElementById(target) : target
            } catch (e) {
                return null
            }
        }
        ),
        findCanvasEventTarget: (function(target) {
            if (typeof target === "number")
                target = Pointer_stringify(target);
            if (!target || target === "#canvas") {
                if (typeof GL !== "undefined" && GL.offscreenCanvases["canvas"])
                    return GL.offscreenCanvases["canvas"];
                return Module["canvas"]
            }
            if (typeof GL !== "undefined" && GL.offscreenCanvases[target])
                return GL.offscreenCanvases[target];
            return JSEvents.findEventTarget(target)
        }
        ),
        deferredCalls: [],
        deferCall: (function(targetFunction, precedence, argsList) {
            function arraysHaveEqualContent(arrA, arrB) {
                if (arrA.length != arrB.length)
                    return false;
                for (var i in arrA) {
                    if (arrA[i] != arrB[i])
                        return false
                }
                return true
            }
            for (var i in JSEvents.deferredCalls) {
                var call = JSEvents.deferredCalls[i];
                if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
                    return
                }
            }
            JSEvents.deferredCalls.push({
                targetFunction: targetFunction,
                precedence: precedence,
                argsList: argsList
            });
            JSEvents.deferredCalls.sort((function(x, y) {
                return x.precedence < y.precedence
            }
            ))
        }
        ),
        removeDeferredCalls: (function(targetFunction) {
            for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
                if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
                    JSEvents.deferredCalls.splice(i, 1);
                    --i
                }
            }
        }
        ),
        canPerformEventHandlerRequests: (function() {
            return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls
        }
        ),
        runDeferredCalls: (function() {
            if (!JSEvents.canPerformEventHandlerRequests()) {
                return
            }
            for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
                var call = JSEvents.deferredCalls[i];
                JSEvents.deferredCalls.splice(i, 1);
                --i;
                call.targetFunction.apply(this, call.argsList)
            }
        }
        ),
        inEventHandler: 0,
        currentEventHandler: null,
        eventHandlers: [],
        isInternetExplorer: (function() {
            return navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0
        }
        ),
        removeAllHandlersOnTarget: (function(target, eventTypeString) {
            for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
                if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
                    JSEvents._removeHandler(i--)
                }
            }
        }
        ),
        _removeHandler: (function(i) {
            var h = JSEvents.eventHandlers[i];
            h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
            JSEvents.eventHandlers.splice(i, 1)
        }
        ),
        registerOrRemoveHandler: (function(eventHandler) {
            var jsEventHandler = function jsEventHandler(event) {
                ++JSEvents.inEventHandler;
                JSEvents.currentEventHandler = eventHandler;
                JSEvents.runDeferredCalls();
                eventHandler.handlerFunc(event);
                JSEvents.runDeferredCalls();
                --JSEvents.inEventHandler
            };
            if (eventHandler.callbackfunc) {
                eventHandler.eventListenerFunc = jsEventHandler;
                eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture);
                JSEvents.eventHandlers.push(eventHandler);
                JSEvents.registerRemoveEventListeners()
            } else {
                for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
                    if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
                        JSEvents._removeHandler(i--)
                    }
                }
            }
        }
        ),
        registerKeyEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.keyEvent)
                JSEvents.keyEvent = _malloc(164);
            var keyEventHandlerFunc = (function(event) {
                var e = event || window.event;
                var keyEventData = JSEvents.keyEvent;
                stringToUTF8(e.key ? e.key : "", keyEventData + 0, 32);
                stringToUTF8(e.code ? e.code : "", keyEventData + 32, 32);
                HEAP32[keyEventData + 64 >> 2] = e.location;
                HEAP32[keyEventData + 68 >> 2] = e.ctrlKey;
                HEAP32[keyEventData + 72 >> 2] = e.shiftKey;
                HEAP32[keyEventData + 76 >> 2] = e.altKey;
                HEAP32[keyEventData + 80 >> 2] = e.metaKey;
                HEAP32[keyEventData + 84 >> 2] = e.repeat;
                stringToUTF8(e.locale ? e.locale : "", keyEventData + 88, 32);
                stringToUTF8(e.char ? e.char : "", keyEventData + 120, 32);
                HEAP32[keyEventData + 152 >> 2] = e.charCode;
                HEAP32[keyEventData + 156 >> 2] = e.keyCode;
                HEAP32[keyEventData + 160 >> 2] = e.which;
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, keyEventData, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: JSEvents.findEventTarget(target),
                allowsDeferredCalls: JSEvents.isInternetExplorer() ? false : true,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: keyEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        getBoundingClientRectOrZeros: (function(target) {
            return target.getBoundingClientRect ? target.getBoundingClientRect() : {
                left: 0,
                top: 0
            }
        }
        ),
        fillMouseEventData: (function(eventStruct, e, target) {
            HEAPF64[eventStruct >> 3] = JSEvents.tick();
            HEAP32[eventStruct + 8 >> 2] = e.screenX;
            HEAP32[eventStruct + 12 >> 2] = e.screenY;
            HEAP32[eventStruct + 16 >> 2] = e.clientX;
            HEAP32[eventStruct + 20 >> 2] = e.clientY;
            HEAP32[eventStruct + 24 >> 2] = e.ctrlKey;
            HEAP32[eventStruct + 28 >> 2] = e.shiftKey;
            HEAP32[eventStruct + 32 >> 2] = e.altKey;
            HEAP32[eventStruct + 36 >> 2] = e.metaKey;
            HEAP16[eventStruct + 40 >> 1] = e.button;
            HEAP16[eventStruct + 42 >> 1] = e.buttons;
            HEAP32[eventStruct + 44 >> 2] = e["movementX"] || e["mozMovementX"] || e["webkitMovementX"] || e.screenX - JSEvents.previousScreenX;
            HEAP32[eventStruct + 48 >> 2] = e["movementY"] || e["mozMovementY"] || e["webkitMovementY"] || e.screenY - JSEvents.previousScreenY;
            if (Module["canvas"]) {
                var rect = Module["canvas"].getBoundingClientRect();
                HEAP32[eventStruct + 60 >> 2] = e.clientX - rect.left;
                HEAP32[eventStruct + 64 >> 2] = e.clientY - rect.top
            } else {
                HEAP32[eventStruct + 60 >> 2] = 0;
                HEAP32[eventStruct + 64 >> 2] = 0
            }
            if (target) {
                var rect = JSEvents.getBoundingClientRectOrZeros(target);
                HEAP32[eventStruct + 52 >> 2] = e.clientX - rect.left;
                HEAP32[eventStruct + 56 >> 2] = e.clientY - rect.top
            } else {
                HEAP32[eventStruct + 52 >> 2] = 0;
                HEAP32[eventStruct + 56 >> 2] = 0
            }
            if (e.type !== "wheel" && e.type !== "mousewheel") {
                JSEvents.previousScreenX = e.screenX;
                JSEvents.previousScreenY = e.screenY
            }
        }
        ),
        registerMouseEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.mouseEvent)
                JSEvents.mouseEvent = _malloc(72);
            target = JSEvents.findEventTarget(target);
            var mouseEventHandlerFunc = (function(event) {
                var e = event || window.event;
                JSEvents.fillMouseEventData(JSEvents.mouseEvent, e, target);
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, JSEvents.mouseEvent, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: target,
                allowsDeferredCalls: eventTypeString != "mousemove" && eventTypeString != "mouseenter" && eventTypeString != "mouseleave",
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: mouseEventHandlerFunc,
                useCapture: useCapture
            };
            if (JSEvents.isInternetExplorer() && eventTypeString == "mousedown")
                eventHandler.allowsDeferredCalls = false;
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        registerWheelEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.wheelEvent)
                JSEvents.wheelEvent = _malloc(104);
            target = JSEvents.findEventTarget(target);
            var wheelHandlerFunc = (function(event) {
                var e = event || window.event;
                var wheelEvent = JSEvents.wheelEvent;
                JSEvents.fillMouseEventData(wheelEvent, e, target);
                HEAPF64[wheelEvent + 72 >> 3] = e["deltaX"];
                HEAPF64[wheelEvent + 80 >> 3] = e["deltaY"];
                HEAPF64[wheelEvent + 88 >> 3] = e["deltaZ"];
                HEAP32[wheelEvent + 96 >> 2] = e["deltaMode"];
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, wheelEvent, userData))
                    e.preventDefault()
            }
            );
            var mouseWheelHandlerFunc = (function(event) {
                var e = event || window.event;
                JSEvents.fillMouseEventData(JSEvents.wheelEvent, e, target);
                HEAPF64[JSEvents.wheelEvent + 72 >> 3] = e["wheelDeltaX"] || 0;
                HEAPF64[JSEvents.wheelEvent + 80 >> 3] = -(e["wheelDeltaY"] ? e["wheelDeltaY"] : e["wheelDelta"]);
                HEAPF64[JSEvents.wheelEvent + 88 >> 3] = 0;
                HEAP32[JSEvents.wheelEvent + 96 >> 2] = 0;
                var shouldCancel = Module["dynCall_iiii"](callbackfunc, eventTypeId, JSEvents.wheelEvent, userData);
                if (shouldCancel) {
                    e.preventDefault()
                }
            }
            );
            var eventHandler = {
                target: target,
                allowsDeferredCalls: true,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: eventTypeString == "wheel" ? wheelHandlerFunc : mouseWheelHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        pageScrollPos: (function() {
            if (window.pageXOffset > 0 || window.pageYOffset > 0) {
                return [window.pageXOffset, window.pageYOffset]
            }
            if (typeof document.documentElement.scrollLeft !== "undefined" || typeof document.documentElement.scrollTop !== "undefined") {
                return [document.documentElement.scrollLeft, document.documentElement.scrollTop]
            }
            return [document.body.scrollLeft | 0, document.body.scrollTop | 0]
        }
        ),
        registerUiEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.uiEvent)
                JSEvents.uiEvent = _malloc(36);
            if (eventTypeString == "scroll" && !target) {
                target = document
            } else {
                target = JSEvents.findEventTarget(target)
            }
            var uiEventHandlerFunc = (function(event) {
                var e = event || window.event;
                if (e.target != target) {
                    return
                }
                var scrollPos = JSEvents.pageScrollPos();
                var uiEvent = JSEvents.uiEvent;
                HEAP32[uiEvent >> 2] = e.detail;
                HEAP32[uiEvent + 4 >> 2] = document.body.clientWidth;
                HEAP32[uiEvent + 8 >> 2] = document.body.clientHeight;
                HEAP32[uiEvent + 12 >> 2] = window.innerWidth;
                HEAP32[uiEvent + 16 >> 2] = window.innerHeight;
                HEAP32[uiEvent + 20 >> 2] = window.outerWidth;
                HEAP32[uiEvent + 24 >> 2] = window.outerHeight;
                HEAP32[uiEvent + 28 >> 2] = scrollPos[0];
                HEAP32[uiEvent + 32 >> 2] = scrollPos[1];
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, uiEvent, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: target,
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: uiEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        getNodeNameForTarget: (function(target) {
            if (!target)
                return "";
            if (target == window)
                return "#window";
            if (target == window.screen)
                return "#screen";
            return target && target.nodeName ? target.nodeName : ""
        }
        ),
        registerFocusEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.focusEvent)
                JSEvents.focusEvent = _malloc(256);
            var focusEventHandlerFunc = (function(event) {
                var e = event || window.event;
                var nodeName = JSEvents.getNodeNameForTarget(e.target);
                var id = e.target.id ? e.target.id : "";
                var focusEvent = JSEvents.focusEvent;
                stringToUTF8(nodeName, focusEvent + 0, 128);
                stringToUTF8(id, focusEvent + 128, 128);
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, focusEvent, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: JSEvents.findEventTarget(target),
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: focusEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        tick: (function() {
            if (window["performance"] && window["performance"]["now"])
                return window["performance"]["now"]();
            else
                return Date.now()
        }
        ),
        fillDeviceOrientationEventData: (function(eventStruct, e, target) {
            HEAPF64[eventStruct >> 3] = JSEvents.tick();
            HEAPF64[eventStruct + 8 >> 3] = e.alpha;
            HEAPF64[eventStruct + 16 >> 3] = e.beta;
            HEAPF64[eventStruct + 24 >> 3] = e.gamma;
            HEAP32[eventStruct + 32 >> 2] = e.absolute
        }
        ),
        registerDeviceOrientationEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.deviceOrientationEvent)
                JSEvents.deviceOrientationEvent = _malloc(40);
            var deviceOrientationEventHandlerFunc = (function(event) {
                var e = event || window.event;
                JSEvents.fillDeviceOrientationEventData(JSEvents.deviceOrientationEvent, e, target);
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, JSEvents.deviceOrientationEvent, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: JSEvents.findEventTarget(target),
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: deviceOrientationEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        fillDeviceMotionEventData: (function(eventStruct, e, target) {
            HEAPF64[eventStruct >> 3] = JSEvents.tick();
            HEAPF64[eventStruct + 8 >> 3] = e.acceleration.x;
            HEAPF64[eventStruct + 16 >> 3] = e.acceleration.y;
            HEAPF64[eventStruct + 24 >> 3] = e.acceleration.z;
            HEAPF64[eventStruct + 32 >> 3] = e.accelerationIncludingGravity.x;
            HEAPF64[eventStruct + 40 >> 3] = e.accelerationIncludingGravity.y;
            HEAPF64[eventStruct + 48 >> 3] = e.accelerationIncludingGravity.z;
            HEAPF64[eventStruct + 56 >> 3] = e.rotationRate.alpha;
            HEAPF64[eventStruct + 64 >> 3] = e.rotationRate.beta;
            HEAPF64[eventStruct + 72 >> 3] = e.rotationRate.gamma
        }
        ),
        registerDeviceMotionEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.deviceMotionEvent)
                JSEvents.deviceMotionEvent = _malloc(80);
            var deviceMotionEventHandlerFunc = (function(event) {
                var e = event || window.event;
                JSEvents.fillDeviceMotionEventData(JSEvents.deviceMotionEvent, e, target);
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, JSEvents.deviceMotionEvent, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: JSEvents.findEventTarget(target),
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: deviceMotionEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        screenOrientation: (function() {
            if (!window.screen)
                return undefined;
            return window.screen.orientation || window.screen.mozOrientation || window.screen.webkitOrientation || window.screen.msOrientation
        }
        ),
        fillOrientationChangeEventData: (function(eventStruct, e) {
            var orientations = ["portrait-primary", "portrait-secondary", "landscape-primary", "landscape-secondary"];
            var orientations2 = ["portrait", "portrait", "landscape", "landscape"];
            var orientationString = JSEvents.screenOrientation();
            var orientation = orientations.indexOf(orientationString);
            if (orientation == -1) {
                orientation = orientations2.indexOf(orientationString)
            }
            HEAP32[eventStruct >> 2] = 1 << orientation;
            HEAP32[eventStruct + 4 >> 2] = window.orientation
        }
        ),
        registerOrientationChangeEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.orientationChangeEvent)
                JSEvents.orientationChangeEvent = _malloc(8);
            if (!target) {
                target = window.screen
            } else {
                target = JSEvents.findEventTarget(target)
            }
            var orientationChangeEventHandlerFunc = (function(event) {
                var e = event || window.event;
                var orientationChangeEvent = JSEvents.orientationChangeEvent;
                JSEvents.fillOrientationChangeEventData(orientationChangeEvent, e);
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, orientationChangeEvent, userData))
                    e.preventDefault()
            }
            );
            if (eventTypeString == "orientationchange" && window.screen.mozOrientation !== undefined) {
                eventTypeString = "mozorientationchange"
            }
            var eventHandler = {
                target: target,
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: orientationChangeEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        fullscreenEnabled: (function() {
            return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled
        }
        ),
        fillFullscreenChangeEventData: (function(eventStruct, e) {
            var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
            var isFullscreen = !!fullscreenElement;
            HEAP32[eventStruct >> 2] = isFullscreen;
            HEAP32[eventStruct + 4 >> 2] = JSEvents.fullscreenEnabled();
            var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
            var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
            var id = reportedElement && reportedElement.id ? reportedElement.id : "";
            stringToUTF8(nodeName, eventStruct + 8, 128);
            stringToUTF8(id, eventStruct + 136, 128);
            HEAP32[eventStruct + 264 >> 2] = reportedElement ? reportedElement.clientWidth : 0;
            HEAP32[eventStruct + 268 >> 2] = reportedElement ? reportedElement.clientHeight : 0;
            HEAP32[eventStruct + 272 >> 2] = screen.width;
            HEAP32[eventStruct + 276 >> 2] = screen.height;
            if (isFullscreen) {
                JSEvents.previousFullscreenElement = fullscreenElement
            }
        }
        ),
        registerFullscreenChangeEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.fullscreenChangeEvent)
                JSEvents.fullscreenChangeEvent = _malloc(280);
            if (!target)
                target = document;
            else
                target = JSEvents.findEventTarget(target);
            var fullscreenChangeEventhandlerFunc = (function(event) {
                var e = event || window.event;
                var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
                JSEvents.fillFullscreenChangeEventData(fullscreenChangeEvent, e);
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, fullscreenChangeEvent, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: target,
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: fullscreenChangeEventhandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        resizeCanvasForFullscreen: (function(target, strategy) {
            var restoreOldStyle = __registerRestoreOldStyle(target);
            var cssWidth = strategy.softFullscreen ? window.innerWidth : screen.width;
            var cssHeight = strategy.softFullscreen ? window.innerHeight : screen.height;
            var rect = target.getBoundingClientRect();
            var windowedCssWidth = rect.right - rect.left;
            var windowedCssHeight = rect.bottom - rect.top;
            var canvasSize = emscripten_get_canvas_element_size_js(target.id);
            var windowedRttWidth = canvasSize[0];
            var windowedRttHeight = canvasSize[1];
            if (strategy.scaleMode == 3) {
                __setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2);
                cssWidth = windowedCssWidth;
                cssHeight = windowedCssHeight
            } else if (strategy.scaleMode == 2) {
                if (cssWidth * windowedRttHeight < windowedRttWidth * cssHeight) {
                    var desiredCssHeight = windowedRttHeight * cssWidth / windowedRttWidth;
                    __setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
                    cssHeight = desiredCssHeight
                } else {
                    var desiredCssWidth = windowedRttWidth * cssHeight / windowedRttHeight;
                    __setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
                    cssWidth = desiredCssWidth
                }
            }
            if (!target.style.backgroundColor)
                target.style.backgroundColor = "black";
            if (!document.body.style.backgroundColor)
                document.body.style.backgroundColor = "black";
            target.style.width = cssWidth + "px";
            target.style.height = cssHeight + "px";
            if (strategy.filteringMode == 1) {
                target.style.imageRendering = "optimizeSpeed";
                target.style.imageRendering = "-moz-crisp-edges";
                target.style.imageRendering = "-o-crisp-edges";
                target.style.imageRendering = "-webkit-optimize-contrast";
                target.style.imageRendering = "optimize-contrast";
                target.style.imageRendering = "crisp-edges";
                target.style.imageRendering = "pixelated"
            }
            var dpiScale = strategy.canvasResolutionScaleMode == 2 ? window.devicePixelRatio : 1;
            if (strategy.canvasResolutionScaleMode != 0) {
                var newWidth = cssWidth * dpiScale | 0;
                var newHeight = cssHeight * dpiScale | 0;
                if (!target.controlTransferredOffscreen) {
                    target.width = newWidth;
                    target.height = newHeight
                } else {
                    emscripten_set_canvas_element_size_js(target.id, newWidth, newHeight)
                }
                if (target.GLctxObject)
                    target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight)
            }
            return restoreOldStyle
        }
        ),
        requestFullscreen: (function(target, strategy) {
            if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
                JSEvents.resizeCanvasForFullscreen(target, strategy)
            }
            if (target.requestFullscreen) {
                target.requestFullscreen()
            } else if (target.msRequestFullscreen) {
                target.msRequestFullscreen()
            } else if (target.mozRequestFullScreen) {
                target.mozRequestFullScreen()
            } else if (target.mozRequestFullscreen) {
                target.mozRequestFullscreen()
            } else if (target.webkitRequestFullscreen) {
                target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            } else {
                if (typeof JSEvents.fullscreenEnabled() === "undefined") {
                    return -1
                } else {
                    return -3
                }
            }
            if (strategy.canvasResizedCallback) {
                Module["dynCall_iiii"](strategy.canvasResizedCallback, 37, 0, strategy.canvasResizedCallbackUserData)
            }
            return 0
        }
        ),
        fillPointerlockChangeEventData: (function(eventStruct, e) {
            var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
            var isPointerlocked = !!pointerLockElement;
            HEAP32[eventStruct >> 2] = isPointerlocked;
            var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
            var id = pointerLockElement && pointerLockElement.id ? pointerLockElement.id : "";
            stringToUTF8(nodeName, eventStruct + 4, 128);
            stringToUTF8(id, eventStruct + 132, 128)
        }
        ),
        registerPointerlockChangeEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.pointerlockChangeEvent)
                JSEvents.pointerlockChangeEvent = _malloc(260);
            if (!target)
                target = document;
            else
                target = JSEvents.findEventTarget(target);
            var pointerlockChangeEventHandlerFunc = (function(event) {
                var e = event || window.event;
                var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
                JSEvents.fillPointerlockChangeEventData(pointerlockChangeEvent, e);
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, pointerlockChangeEvent, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: target,
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: pointerlockChangeEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        registerPointerlockErrorEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString) {
            if (!target)
                target = document;
            else
                target = JSEvents.findEventTarget(target);
            var pointerlockErrorEventHandlerFunc = (function(event) {
                var e = event || window.event;
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, 0, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: target,
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: pointerlockErrorEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        requestPointerLock: (function(target) {
            if (target.requestPointerLock) {
                target.requestPointerLock()
            } else if (target.mozRequestPointerLock) {
                target.mozRequestPointerLock()
            } else if (target.webkitRequestPointerLock) {
                target.webkitRequestPointerLock()
            } else if (target.msRequestPointerLock) {
                target.msRequestPointerLock()
            } else {
                if (document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock || document.body.msRequestPointerLock) {
                    return -3
                } else {
                    return -1
                }
            }
            return 0
        }
        ),
        fillVisibilityChangeEventData: (function(eventStruct, e) {
            var visibilityStates = ["hidden", "visible", "prerender", "unloaded"];
            var visibilityState = visibilityStates.indexOf(document.visibilityState);
            HEAP32[eventStruct >> 2] = document.hidden;
            HEAP32[eventStruct + 4 >> 2] = visibilityState
        }
        ),
        registerVisibilityChangeEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.visibilityChangeEvent)
                JSEvents.visibilityChangeEvent = _malloc(8);
            if (!target)
                target = document;
            else
                target = JSEvents.findEventTarget(target);
            var visibilityChangeEventHandlerFunc = (function(event) {
                var e = event || window.event;
                var visibilityChangeEvent = JSEvents.visibilityChangeEvent;
                JSEvents.fillVisibilityChangeEventData(visibilityChangeEvent, e);
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, visibilityChangeEvent, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: target,
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: visibilityChangeEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        registerTouchEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.touchEvent)
                JSEvents.touchEvent = _malloc(1684);
            target = JSEvents.findEventTarget(target);
            var touchEventHandlerFunc = (function(event) {
                var e = event || window.event;
                var touches = {};
                for (var i = 0; i < e.touches.length; ++i) {
                    var touch = e.touches[i];
                    touches[touch.identifier] = touch
                }
                for (var i = 0; i < e.changedTouches.length; ++i) {
                    var touch = e.changedTouches[i];
                    touches[touch.identifier] = touch;
                    touch.changed = true
                }
                for (var i = 0; i < e.targetTouches.length; ++i) {
                    var touch = e.targetTouches[i];
                    touches[touch.identifier].onTarget = true
                }
                var touchEvent = JSEvents.touchEvent;
                var ptr = touchEvent;
                HEAP32[ptr + 4 >> 2] = e.ctrlKey;
                HEAP32[ptr + 8 >> 2] = e.shiftKey;
                HEAP32[ptr + 12 >> 2] = e.altKey;
                HEAP32[ptr + 16 >> 2] = e.metaKey;
                ptr += 20;
                var canvasRect = Module["canvas"] ? Module["canvas"].getBoundingClientRect() : undefined;
                var targetRect = JSEvents.getBoundingClientRectOrZeros(target);
                var numTouches = 0;
                for (var i in touches) {
                    var t = touches[i];
                    HEAP32[ptr >> 2] = t.identifier;
                    HEAP32[ptr + 4 >> 2] = t.screenX;
                    HEAP32[ptr + 8 >> 2] = t.screenY;
                    HEAP32[ptr + 12 >> 2] = t.clientX;
                    HEAP32[ptr + 16 >> 2] = t.clientY;
                    HEAP32[ptr + 20 >> 2] = t.pageX;
                    HEAP32[ptr + 24 >> 2] = t.pageY;
                    HEAP32[ptr + 28 >> 2] = t.changed;
                    HEAP32[ptr + 32 >> 2] = t.onTarget;
                    if (canvasRect) {
                        HEAP32[ptr + 44 >> 2] = t.clientX - canvasRect.left;
                        HEAP32[ptr + 48 >> 2] = t.clientY - canvasRect.top
                    } else {
                        HEAP32[ptr + 44 >> 2] = 0;
                        HEAP32[ptr + 48 >> 2] = 0
                    }
                    HEAP32[ptr + 36 >> 2] = t.clientX - targetRect.left;
                    HEAP32[ptr + 40 >> 2] = t.clientY - targetRect.top;
                    ptr += 52;
                    if (++numTouches >= 32) {
                        break
                    }
                }
                HEAP32[touchEvent >> 2] = numTouches;
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, touchEvent, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: target,
                allowsDeferredCalls: eventTypeString == "touchstart" || eventTypeString == "touchend",
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: touchEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        fillGamepadEventData: (function(eventStruct, e) {
            HEAPF64[eventStruct >> 3] = e.timestamp;
            for (var i = 0; i < e.axes.length; ++i) {
                HEAPF64[eventStruct + i * 8 + 16 >> 3] = e.axes[i]
            }
            for (var i = 0; i < e.buttons.length; ++i) {
                if (typeof e.buttons[i] === "object") {
                    HEAPF64[eventStruct + i * 8 + 528 >> 3] = e.buttons[i].value
                } else {
                    HEAPF64[eventStruct + i * 8 + 528 >> 3] = e.buttons[i]
                }
            }
            for (var i = 0; i < e.buttons.length; ++i) {
                if (typeof e.buttons[i] === "object") {
                    HEAP32[eventStruct + i * 4 + 1040 >> 2] = e.buttons[i].pressed
                } else {
                    HEAP32[eventStruct + i * 4 + 1040 >> 2] = e.buttons[i] == 1
                }
            }
            HEAP32[eventStruct + 1296 >> 2] = e.connected;
            HEAP32[eventStruct + 1300 >> 2] = e.index;
            HEAP32[eventStruct + 8 >> 2] = e.axes.length;
            HEAP32[eventStruct + 12 >> 2] = e.buttons.length;
            stringToUTF8(e.id, eventStruct + 1304, 64);
            stringToUTF8(e.mapping, eventStruct + 1368, 64)
        }
        ),
        registerGamepadEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.gamepadEvent)
                JSEvents.gamepadEvent = _malloc(1432);
            var gamepadEventHandlerFunc = (function(event) {
                var e = event || window.event;
                var gamepadEvent = JSEvents.gamepadEvent;
                JSEvents.fillGamepadEventData(gamepadEvent, e.gamepad);
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, gamepadEvent, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: JSEvents.findEventTarget(target),
                allowsDeferredCalls: true,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: gamepadEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        registerBeforeUnloadEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString) {
            var beforeUnloadEventHandlerFunc = (function(event) {
                var e = event || window.event;
                var confirmationMessage = Module["dynCall_iiii"](callbackfunc, eventTypeId, 0, userData);
                if (confirmationMessage) {
                    confirmationMessage = Pointer_stringify(confirmationMessage)
                }
                if (confirmationMessage) {
                    e.preventDefault();
                    e.returnValue = confirmationMessage;
                    return confirmationMessage
                }
            }
            );
            var eventHandler = {
                target: JSEvents.findEventTarget(target),
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: beforeUnloadEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        battery: (function() {
            return navigator.battery || navigator.mozBattery || navigator.webkitBattery
        }
        ),
        fillBatteryEventData: (function(eventStruct, e) {
            HEAPF64[eventStruct >> 3] = e.chargingTime;
            HEAPF64[eventStruct + 8 >> 3] = e.dischargingTime;
            HEAPF64[eventStruct + 16 >> 3] = e.level;
            HEAP32[eventStruct + 24 >> 2] = e.charging
        }
        ),
        registerBatteryEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!JSEvents.batteryEvent)
                JSEvents.batteryEvent = _malloc(32);
            var batteryEventHandlerFunc = (function(event) {
                var e = event || window.event;
                var batteryEvent = JSEvents.batteryEvent;
                JSEvents.fillBatteryEventData(batteryEvent, JSEvents.battery());
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, batteryEvent, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: JSEvents.findEventTarget(target),
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: batteryEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        ),
        registerWebGlEventCallback: (function(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
            if (!target)
                target = Module["canvas"];
            var webGlEventHandlerFunc = (function(event) {
                var e = event || window.event;
                if (Module["dynCall_iiii"](callbackfunc, eventTypeId, 0, userData))
                    e.preventDefault()
            }
            );
            var eventHandler = {
                target: JSEvents.findEventTarget(target),
                allowsDeferredCalls: false,
                eventTypeString: eventTypeString,
                callbackfunc: callbackfunc,
                handlerFunc: webGlEventHandlerFunc,
                useCapture: useCapture
            };
            JSEvents.registerOrRemoveHandler(eventHandler)
        }
        )
    };
    var __currentFullscreenStrategy = {};
    function _emscripten_exit_fullscreen() {
        if (typeof JSEvents.fullscreenEnabled() === "undefined")
            return -1;
        JSEvents.removeDeferredCalls(JSEvents.requestFullscreen);
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else {
            return -1
        }
        if (__currentFullscreenStrategy.canvasResizedCallback) {
            Module["dynCall_iiii"](__currentFullscreenStrategy.canvasResizedCallback, 37, 0, __currentFullscreenStrategy.canvasResizedCallbackUserData)
        }
        return 0
    }
    function _emscripten_exit_pointerlock() {
        JSEvents.removeDeferredCalls(JSEvents.requestPointerLock);
        if (document.exitPointerLock) {
            document.exitPointerLock()
        } else if (document.msExitPointerLock) {
            document.msExitPointerLock()
        } else if (document.mozExitPointerLock) {
            document.mozExitPointerLock()
        } else if (document.webkitExitPointerLock) {
            document.webkitExitPointerLock()
        } else {
            return -1
        }
        return 0
    }
    function _emscripten_get_fullscreen_status(fullscreenStatus) {
        if (typeof JSEvents.fullscreenEnabled() === "undefined")
            return -1;
        JSEvents.fillFullscreenChangeEventData(fullscreenStatus);
        return 0
    }
    function __emscripten_sample_gamepad_data() {
        if (!JSEvents.numGamepadsConnected)
            return;
        if (Browser.mainLoop.currentFrameNumber !== JSEvents.lastGamepadStateFrame || !Browser.mainLoop.currentFrameNumber) {
            JSEvents.lastGamepadState = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads : null;
            JSEvents.lastGamepadStateFrame = Browser.mainLoop.currentFrameNumber
        }
    }
    function _emscripten_get_gamepad_status(index, gamepadState) {
        __emscripten_sample_gamepad_data();
        if (!JSEvents.lastGamepadState)
            return -1;
        if (index < 0 || index >= JSEvents.lastGamepadState.length)
            return -5;
        if (!JSEvents.lastGamepadState[index])
            return -7;
        JSEvents.fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
        return 0
    }
    function _emscripten_get_main_loop_timing(mode, value) {
        if (mode)
            HEAP32[mode >> 2] = Browser.mainLoop.timingMode;
        if (value)
            HEAP32[value >> 2] = Browser.mainLoop.timingValue
    }
    function _emscripten_get_num_gamepads() {
        if (!JSEvents.numGamepadsConnected)
            return 0;
        __emscripten_sample_gamepad_data();
        if (!JSEvents.lastGamepadState)
            return -1;
        return JSEvents.lastGamepadState.length
    }
    function _emscripten_has_threading_support() {
        return 0
    }
    function _emscripten_html5_remove_all_event_listeners() {
        JSEvents.removeAllEventListeners()
    }
    function _emscripten_is_webgl_context_lost(target) {
        if (!Module.ctx)
            return true;
        return Module.ctx.isContextLost()
    }
    function __reallyNegative(x) {
        return x < 0 || x === 0 && 1 / x === -Infinity
    }
    function __formatString(format, varargs) {
        assert((varargs & 3) === 0);
        var textIndex = format;
        var argIndex = varargs;
        function prepVararg(ptr, type) {
            if (type === "double" || type === "i64") {
                if (ptr & 7) {
                    assert((ptr & 7) === 4);
                    ptr += 4
                }
            } else {
                assert((ptr & 3) === 0)
            }
            return ptr
        }
        function getNextArg(type) {
            var ret;
            argIndex = prepVararg(argIndex, type);
            if (type === "double") {
                ret = HEAPF64[argIndex >> 3];
                argIndex += 8
            } else if (type == "i64") {
                ret = [HEAP32[argIndex >> 2], HEAP32[argIndex + 4 >> 2]];
                argIndex += 8
            } else {
                assert((argIndex & 3) === 0);
                type = "i32";
                ret = HEAP32[argIndex >> 2];
                argIndex += 4
            }
            return ret
        }
        var ret = [];
        var curr, next, currArg;
        while (1) {
            var startTextIndex = textIndex;
            curr = HEAP8[textIndex >> 0];
            if (curr === 0)
                break;
            next = HEAP8[textIndex + 1 >> 0];
            if (curr == 37) {
                var flagAlwaysSigned = false;
                var flagLeftAlign = false;
                var flagAlternative = false;
                var flagZeroPad = false;
                var flagPadSign = false;
                flagsLoop: while (1) {
                    switch (next) {
                    case 43:
                        flagAlwaysSigned = true;
                        break;
                    case 45:
                        flagLeftAlign = true;
                        break;
                    case 35:
                        flagAlternative = true;
                        break;
                    case 48:
                        if (flagZeroPad) {
                            break flagsLoop
                        } else {
                            flagZeroPad = true;
                            break
                        }
                        ;
                    case 32:
                        flagPadSign = true;
                        break;
                    default:
                        break flagsLoop
                    }
                    textIndex++;
                    next = HEAP8[textIndex + 1 >> 0]
                }
                var width = 0;
                if (next == 42) {
                    width = getNextArg("i32");
                    textIndex++;
                    next = HEAP8[textIndex + 1 >> 0]
                } else {
                    while (next >= 48 && next <= 57) {
                        width = width * 10 + (next - 48);
                        textIndex++;
                        next = HEAP8[textIndex + 1 >> 0]
                    }
                }
                var precisionSet = false
                  , precision = -1;
                if (next == 46) {
                    precision = 0;
                    precisionSet = true;
                    textIndex++;
                    next = HEAP8[textIndex + 1 >> 0];
                    if (next == 42) {
                        precision = getNextArg("i32");
                        textIndex++
                    } else {
                        while (1) {
                            var precisionChr = HEAP8[textIndex + 1 >> 0];
                            if (precisionChr < 48 || precisionChr > 57)
                                break;
                            precision = precision * 10 + (precisionChr - 48);
                            textIndex++
                        }
                    }
                    next = HEAP8[textIndex + 1 >> 0]
                }
                if (precision < 0) {
                    precision = 6;
                    precisionSet = false
                }
                var argSize;
                switch (String.fromCharCode(next)) {
                case "h":
                    var nextNext = HEAP8[textIndex + 2 >> 0];
                    if (nextNext == 104) {
                        textIndex++;
                        argSize = 1
                    } else {
                        argSize = 2
                    }
                    break;
                case "l":
                    var nextNext = HEAP8[textIndex + 2 >> 0];
                    if (nextNext == 108) {
                        textIndex++;
                        argSize = 8
                    } else {
                        argSize = 4
                    }
                    break;
                case "L":
                case "q":
                case "j":
                    argSize = 8;
                    break;
                case "z":
                case "t":
                case "I":
                    argSize = 4;
                    break;
                default:
                    argSize = null
                }
                if (argSize)
                    textIndex++;
                next = HEAP8[textIndex + 1 >> 0];
                switch (String.fromCharCode(next)) {
                case "d":
                case "i":
                case "u":
                case "o":
                case "x":
                case "X":
                case "p":
                    {
                        var signed = next == 100 || next == 105;
                        argSize = argSize || 4;
                        currArg = getNextArg("i" + argSize * 8);
                        var origArg = currArg;
                        var argText;
                        if (argSize == 8) {
                            currArg = makeBigInt(currArg[0], currArg[1], next == 117)
                        }
                        if (argSize <= 4) {
                            var limit = Math.pow(256, argSize) - 1;
                            currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8)
                        }
                        var currAbsArg = Math.abs(currArg);
                        var prefix = "";
                        if (next == 100 || next == 105) {
                            if (argSize == 8 && typeof i64Math === "object")
                                argText = i64Math.stringify(origArg[0], origArg[1], null);
                            else
                                argText = reSign(currArg, 8 * argSize, 1).toString(10)
                        } else if (next == 117) {
                            if (argSize == 8 && typeof i64Math === "object")
                                argText = i64Math.stringify(origArg[0], origArg[1], true);
                            else
                                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                            currArg = Math.abs(currArg)
                        } else if (next == 111) {
                            argText = (flagAlternative ? "0" : "") + currAbsArg.toString(8)
                        } else if (next == 120 || next == 88) {
                            prefix = flagAlternative && currArg != 0 ? "0x" : "";
                            if (argSize == 8 && typeof i64Math === "object") {
                                if (origArg[1]) {
                                    argText = (origArg[1] >>> 0).toString(16);
                                    var lower = (origArg[0] >>> 0).toString(16);
                                    while (lower.length < 8)
                                        lower = "0" + lower;
                                    argText += lower
                                } else {
                                    argText = (origArg[0] >>> 0).toString(16)
                                }
                            } else if (currArg < 0) {
                                currArg = -currArg;
                                argText = (currAbsArg - 1).toString(16);
                                var buffer = [];
                                for (var i = 0; i < argText.length; i++) {
                                    buffer.push((15 - parseInt(argText[i], 16)).toString(16))
                                }
                                argText = buffer.join("");
                                while (argText.length < argSize * 2)
                                    argText = "f" + argText
                            } else {
                                argText = currAbsArg.toString(16)
                            }
                            if (next == 88) {
                                prefix = prefix.toUpperCase();
                                argText = argText.toUpperCase()
                            }
                        } else if (next == 112) {
                            if (currAbsArg === 0) {
                                argText = "(nil)"
                            } else {
                                prefix = "0x";
                                argText = currAbsArg.toString(16)
                            }
                        }
                        if (precisionSet) {
                            while (argText.length < precision) {
                                argText = "0" + argText
                            }
                        }
                        if (currArg >= 0) {
                            if (flagAlwaysSigned) {
                                prefix = "+" + prefix
                            } else if (flagPadSign) {
                                prefix = " " + prefix
                            }
                        }
                        if (argText.charAt(0) == "-") {
                            prefix = "-" + prefix;
                            argText = argText.substr(1)
                        }
                        while (prefix.length + argText.length < width) {
                            if (flagLeftAlign) {
                                argText += " "
                            } else {
                                if (flagZeroPad) {
                                    argText = "0" + argText
                                } else {
                                    prefix = " " + prefix
                                }
                            }
                        }
                        argText = prefix + argText;
                        argText.split("").forEach((function(chr) {
                            ret.push(chr.charCodeAt(0))
                        }
                        ));
                        break
                    }
                    ;
                case "f":
                case "F":
                case "e":
                case "E":
                case "g":
                case "G":
                    {
                        currArg = getNextArg("double");
                        var argText;
                        if (isNaN(currArg)) {
                            argText = "nan";
                            flagZeroPad = false
                        } else if (!isFinite(currArg)) {
                            argText = (currArg < 0 ? "-" : "") + "inf";
                            flagZeroPad = false
                        } else {
                            var isGeneral = false;
                            var effectivePrecision = Math.min(precision, 20);
                            if (next == 103 || next == 71) {
                                isGeneral = true;
                                precision = precision || 1;
                                var exponent = parseInt(currArg.toExponential(effectivePrecision).split("e")[1], 10);
                                if (precision > exponent && exponent >= -4) {
                                    next = (next == 103 ? "f" : "F").charCodeAt(0);
                                    precision -= exponent + 1
                                } else {
                                    next = (next == 103 ? "e" : "E").charCodeAt(0);
                                    precision--
                                }
                                effectivePrecision = Math.min(precision, 20)
                            }
                            if (next == 101 || next == 69) {
                                argText = currArg.toExponential(effectivePrecision);
                                if (/[eE][-+]\d$/.test(argText)) {
                                    argText = argText.slice(0, -1) + "0" + argText.slice(-1)
                                }
                            } else if (next == 102 || next == 70) {
                                argText = currArg.toFixed(effectivePrecision);
                                if (currArg === 0 && __reallyNegative(currArg)) {
                                    argText = "-" + argText
                                }
                            }
                            var parts = argText.split("e");
                            if (isGeneral && !flagAlternative) {
                                while (parts[0].length > 1 && parts[0].indexOf(".") != -1 && (parts[0].slice(-1) == "0" || parts[0].slice(-1) == ".")) {
                                    parts[0] = parts[0].slice(0, -1)
                                }
                            } else {
                                if (flagAlternative && argText.indexOf(".") == -1)
                                    parts[0] += ".";
                                while (precision > effectivePrecision++)
                                    parts[0] += "0"
                            }
                            argText = parts[0] + (parts.length > 1 ? "e" + parts[1] : "");
                            if (next == 69)
                                argText = argText.toUpperCase();
                            if (currArg >= 0) {
                                if (flagAlwaysSigned) {
                                    argText = "+" + argText
                                } else if (flagPadSign) {
                                    argText = " " + argText
                                }
                            }
                        }
                        while (argText.length < width) {
                            if (flagLeftAlign) {
                                argText += " "
                            } else {
                                if (flagZeroPad && (argText[0] == "-" || argText[0] == "+")) {
                                    argText = argText[0] + "0" + argText.slice(1)
                                } else {
                                    argText = (flagZeroPad ? "0" : " ") + argText
                                }
                            }
                        }
                        if (next < 97)
                            argText = argText.toUpperCase();
                        argText.split("").forEach((function(chr) {
                            ret.push(chr.charCodeAt(0))
                        }
                        ));
                        break
                    }
                    ;
                case "s":
                    {
                        var arg = getNextArg("i8*");
                        var argLength = arg ? _strlen(arg) : "(null)".length;
                        if (precisionSet)
                            argLength = Math.min(argLength, precision);
                        if (!flagLeftAlign) {
                            while (argLength < width--) {
                                ret.push(32)
                            }
                        }
                        if (arg) {
                            for (var i = 0; i < argLength; i++) {
                                ret.push(HEAPU8[arg++ >> 0])
                            }
                        } else {
                            ret = ret.concat(intArrayFromString("(null)".substr(0, argLength), true))
                        }
                        if (flagLeftAlign) {
                            while (argLength < width--) {
                                ret.push(32)
                            }
                        }
                        break
                    }
                    ;
                case "c":
                    {
                        if (flagLeftAlign)
                            ret.push(getNextArg("i8"));
                        while (--width > 0) {
                            ret.push(32)
                        }
                        if (!flagLeftAlign)
                            ret.push(getNextArg("i8"));
                        break
                    }
                    ;
                case "n":
                    {
                        var ptr = getNextArg("i32*");
                        HEAP32[ptr >> 2] = ret.length;
                        break
                    }
                    ;
                case "%":
                    {
                        ret.push(curr);
                        break
                    }
                    ;
                default:
                    {
                        for (var i = startTextIndex; i < textIndex + 2; i++) {
                            ret.push(HEAP8[i >> 0])
                        }
                    }
                }
                textIndex += 2
            } else {
                ret.push(curr);
                textIndex += 1
            }
        }
        return ret
    }
    function __emscripten_traverse_stack(args) {
        if (!args || !args.callee || !args.callee.name) {
            return [null, "", ""]
        }
        var funstr = args.callee.toString();
        var funcname = args.callee.name;
        var str = "(";
        var first = true;
        for (var i in args) {
            var a = args[i];
            if (!first) {
                str += ", "
            }
            first = false;
            if (typeof a === "number" || typeof a === "string") {
                str += a
            } else {
                str += "(" + typeof a + ")"
            }
        }
        str += ")";
        var caller = args.callee.caller;
        args = caller ? caller.arguments : [];
        if (first)
            str = "";
        return [args, funcname, str]
    }
    function _emscripten_get_callstack_js(flags) {
        var callstack = jsStackTrace();
        var iThisFunc = callstack.lastIndexOf("_emscripten_log");
        var iThisFunc2 = callstack.lastIndexOf("_emscripten_get_callstack");
        var iNextLine = callstack.indexOf("\n", Math.max(iThisFunc, iThisFunc2)) + 1;
        callstack = callstack.slice(iNextLine);
        if (flags & 8 && typeof emscripten_source_map === "undefined") {
            warnOnce('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.');
            flags ^= 8;
            flags |= 16
        }
        var stack_args = null;
        if (flags & 128) {
            stack_args = __emscripten_traverse_stack(arguments);
            while (stack_args[1].indexOf("_emscripten_") >= 0)
                stack_args = __emscripten_traverse_stack(stack_args[0])
        }
        var lines = callstack.split("\n");
        callstack = "";
        var newFirefoxRe = new RegExp("\\s*(.*?)@(.*?):([0-9]+):([0-9]+)");
        var firefoxRe = new RegExp("\\s*(.*?)@(.*):(.*)(:(.*))?");
        var chromeRe = new RegExp("\\s*at (.*?) \\((.*):(.*):(.*)\\)");
        for (var l in lines) {
            var line = lines[l];
            var jsSymbolName = "";
            var file = "";
            var lineno = 0;
            var column = 0;
            var parts = chromeRe.exec(line);
            if (parts && parts.length == 5) {
                jsSymbolName = parts[1];
                file = parts[2];
                lineno = parts[3];
                column = parts[4]
            } else {
                parts = newFirefoxRe.exec(line);
                if (!parts)
                    parts = firefoxRe.exec(line);
                if (parts && parts.length >= 4) {
                    jsSymbolName = parts[1];
                    file = parts[2];
                    lineno = parts[3];
                    column = parts[4] | 0
                } else {
                    callstack += line + "\n";
                    continue
                }
            }
            var cSymbolName = flags & 32 ? demangle(jsSymbolName) : jsSymbolName;
            if (!cSymbolName) {
                cSymbolName = jsSymbolName
            }
            var haveSourceMap = false;
            if (flags & 8) {
                var orig = emscripten_source_map.originalPositionFor({
                    line: lineno,
                    column: column
                });
                haveSourceMap = orig && orig.source;
                if (haveSourceMap) {
                    if (flags & 64) {
                        orig.source = orig.source.substring(orig.source.replace(/\\/g, "/").lastIndexOf("/") + 1)
                    }
                    callstack += "    at " + cSymbolName + " (" + orig.source + ":" + orig.line + ":" + orig.column + ")\n"
                }
            }
            if (flags & 16 || !haveSourceMap) {
                if (flags & 64) {
                    file = file.substring(file.replace(/\\/g, "/").lastIndexOf("/") + 1)
                }
                callstack += (haveSourceMap ? "     = " + jsSymbolName : "    at " + cSymbolName) + " (" + file + ":" + lineno + ":" + column + ")\n"
            }
            if (flags & 128 && stack_args[0]) {
                if (stack_args[1] == jsSymbolName && stack_args[2].length > 0) {
                    callstack = callstack.replace(/\s+$/, "");
                    callstack += " with values: " + stack_args[1] + stack_args[2] + "\n"
                }
                stack_args = __emscripten_traverse_stack(stack_args[0])
            }
        }
        callstack = callstack.replace(/\s+$/, "");
        return callstack
    }
    function _emscripten_log_js(flags, str) {
        if (flags & 24) {
            str = str.replace(/\s+$/, "");
            str += (str.length > 0 ? "\n" : "") + _emscripten_get_callstack_js(flags)
        }
        if (flags & 1) {
            if (flags & 4) {
                console.error(str)
            } else if (flags & 2) {
                console.warn(str)
            } else {
                console.log(str)
            }
        } else if (flags & 6) {
            err(str)
        } else {
            out(str)
        }
    }
    function _emscripten_log(flags, varargs) {
        var format = HEAP32[varargs >> 2];
        varargs += 4;
        var str = "";
        if (format) {
            var result = __formatString(format, varargs);
            for (var i = 0; i < result.length; ++i) {
                str += String.fromCharCode(result[i])
            }
        }
        _emscripten_log_js(flags, str)
    }
    function _emscripten_num_logical_cores() {
        return 1
    }
    function __setLetterbox(element, topBottom, leftRight) {
        if (JSEvents.isInternetExplorer()) {
            element.style.marginLeft = element.style.marginRight = leftRight + "px";
            element.style.marginTop = element.style.marginBottom = topBottom + "px"
        } else {
            element.style.paddingLeft = element.style.paddingRight = leftRight + "px";
            element.style.paddingTop = element.style.paddingBottom = topBottom + "px"
        }
    }
    function __emscripten_do_request_fullscreen(target, strategy) {
        if (typeof JSEvents.fullscreenEnabled() === "undefined")
            return -1;
        if (!JSEvents.fullscreenEnabled())
            return -3;
        if (!target)
            target = "#canvas";
        target = JSEvents.findEventTarget(target);
        if (!target)
            return -4;
        if (!target.requestFullscreen && !target.msRequestFullscreen && !target.mozRequestFullScreen && !target.mozRequestFullscreen && !target.webkitRequestFullscreen) {
            return -3
        }
        var canPerformRequests = JSEvents.canPerformEventHandlerRequests();
        if (!canPerformRequests) {
            if (strategy.deferUntilInEventHandler) {
                JSEvents.deferCall(JSEvents.requestFullscreen, 1, [target, strategy]);
                return 1
            } else {
                return -2
            }
        }
        return JSEvents.requestFullscreen(target, strategy)
    }
    function _emscripten_request_fullscreen(target, deferUntilInEventHandler) {
        var strategy = {};
        strategy.scaleMode = 0;
        strategy.canvasResolutionScaleMode = 0;
        strategy.filteringMode = 0;
        strategy.deferUntilInEventHandler = deferUntilInEventHandler;
        strategy.canvasResizedCallbackTargetThread = 2;
        return __emscripten_do_request_fullscreen(target, strategy)
    }
    function _emscripten_request_pointerlock(target, deferUntilInEventHandler) {
        if (!target)
            target = "#canvas";
        target = JSEvents.findEventTarget(target);
        if (!target)
            return -4;
        if (!target.requestPointerLock && !target.mozRequestPointerLock && !target.webkitRequestPointerLock && !target.msRequestPointerLock) {
            return -1
        }
        var canPerformRequests = JSEvents.canPerformEventHandlerRequests();
        if (!canPerformRequests) {
            if (deferUntilInEventHandler) {
                JSEvents.deferCall(JSEvents.requestPointerLock, 2, [target]);
                return 1
            } else {
                return -2
            }
        }
        return JSEvents.requestPointerLock(target)
    }
    function _emscripten_set_blur_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);
        return 0
    }
    function _emscripten_set_dblclick_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerMouseEventCallback(target, userData, useCapture, callbackfunc, 7, "dblclick", targetThread);
        return 0
    }
    function _emscripten_set_devicemotion_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerDeviceMotionEventCallback(window, userData, useCapture, callbackfunc, 17, "devicemotion", targetThread);
        return 0
    }
    function _emscripten_set_deviceorientation_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerDeviceOrientationEventCallback(window, userData, useCapture, callbackfunc, 16, "deviceorientation", targetThread);
        return 0
    }
    function _emscripten_set_focus_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);
        return 0
    }
    function _emscripten_set_fullscreenchange_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        if (typeof JSEvents.fullscreenEnabled() === "undefined")
            return -1;
        if (!target)
            target = document;
        else {
            target = JSEvents.findEventTarget(target);
            if (!target)
                return -4
        }
        JSEvents.registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread);
        JSEvents.registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "mozfullscreenchange", targetThread);
        JSEvents.registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
        JSEvents.registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "msfullscreenchange", targetThread);
        return 0
    }
    function _emscripten_set_gamepadconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
        if (!navigator.getGamepads && !navigator.webkitGetGamepads)
            return -1;
        JSEvents.registerGamepadEventCallback(window, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread);
        return 0
    }
    function _emscripten_set_gamepaddisconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
        if (!navigator.getGamepads && !navigator.webkitGetGamepads)
            return -1;
        JSEvents.registerGamepadEventCallback(window, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread);
        return 0
    }
    function _emscripten_set_keydown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);
        return 0
    }
    function _emscripten_set_keypress_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);
        return 0
    }
    function _emscripten_set_keyup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);
        return 0
    }
    function _emscripten_set_mousedown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);
        return 0
    }
    function _emscripten_set_mousemove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);
        return 0
    }
    function _emscripten_set_mouseup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);
        return 0
    }
    function _emscripten_set_touchcancel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);
        return 0
    }
    function _emscripten_set_touchend_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);
        return 0
    }
    function _emscripten_set_touchmove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);
        return 0
    }
    function _emscripten_set_touchstart_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        JSEvents.registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);
        return 0
    }
    function _emscripten_set_wheel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
        target = JSEvents.findEventTarget(target);
        if (typeof target.onwheel !== "undefined") {
            JSEvents.registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
            return 0
        } else if (typeof target.onmousewheel !== "undefined") {
            JSEvents.registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "mousewheel", targetThread);
            return 0
        } else {
            return -1
        }
    }
    var GL = {
        counter: 1,
        lastError: 0,
        buffers: [],
        mappedBuffers: {},
        programs: [],
        framebuffers: [],
        renderbuffers: [],
        textures: [],
        uniforms: [],
        shaders: [],
        vaos: [],
        contexts: [],
        currentContext: null,
        offscreenCanvases: {},
        timerQueriesEXT: [],
        queries: [],
        samplers: [],
        transformFeedbacks: [],
        syncs: [],
        byteSizeByTypeRoot: 5120,
        byteSizeByType: [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
        programInfos: {},
        stringCache: {},
        stringiCache: {},
        tempFixedLengthArray: [],
        packAlignment: 4,
        unpackAlignment: 4,
        init: (function() {
            GL.miniTempBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);
            for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
                GL.miniTempBufferViews[i] = GL.miniTempBuffer.subarray(0, i + 1)
            }
            for (var i = 0; i < 32; i++) {
                GL.tempFixedLengthArray.push(new Array(i))
            }
        }
        ),
        recordError: function recordError(errorCode) {
            if (!GL.lastError) {
                GL.lastError = errorCode
            }
        },
        getNewId: (function(table) {
            var ret = GL.counter++;
            for (var i = table.length; i < ret; i++) {
                table[i] = null
            }
            return ret
        }
        ),
        MINI_TEMP_BUFFER_SIZE: 256,
        miniTempBuffer: null,
        miniTempBufferViews: [0],
        getSource: (function(shader, count, string, length) {
            var source = "";
            for (var i = 0; i < count; ++i) {
                var frag;
                if (length) {
                    var len = HEAP32[length + i * 4 >> 2];
                    if (len < 0) {
                        frag = Pointer_stringify(HEAP32[string + i * 4 >> 2])
                    } else {
                        frag = Pointer_stringify(HEAP32[string + i * 4 >> 2], len)
                    }
                } else {
                    frag = Pointer_stringify(HEAP32[string + i * 4 >> 2])
                }
                source += frag
            }
            return source
        }
        ),
        createContext: (function(canvas, webGLContextAttributes) {
            if (typeof webGLContextAttributes["majorVersion"] === "undefined" && typeof webGLContextAttributes["minorVersion"] === "undefined") {
                if (typeof WebGL2RenderingContext !== "undefined")
                    webGLContextAttributes["majorVersion"] = 2;
                else
                    webGLContextAttributes["majorVersion"] = 1;
                webGLContextAttributes["minorVersion"] = 0
            }
            var ctx;
            var errorInfo = "?";
            function onContextCreationError(event) {
                errorInfo = event.statusMessage || errorInfo
            }
            webGLContextAttributes["powerPreference"] = "high-performance";
            try {
                canvas.addEventListener("webglcontextcreationerror", onContextCreationError, false);
                try {
                    if (webGLContextAttributes["majorVersion"] == 1 && webGLContextAttributes["minorVersion"] == 0) {
                        ctx = canvas.getContext("webgl", webGLContextAttributes) || canvas.getContext("experimental-webgl", webGLContextAttributes)
                    } else if (webGLContextAttributes["majorVersion"] == 2 && webGLContextAttributes["minorVersion"] == 0) {
                        ctx = canvas.getContext("webgl2", webGLContextAttributes)
                    } else {
                        throw "Unsupported WebGL context version " + majorVersion + "." + minorVersion + "!"
                    }
                } finally {
                    canvas.removeEventListener("webglcontextcreationerror", onContextCreationError, false)
                }
                if (!ctx)
                    throw ":("
            } catch (e) {
                out("Could not create canvas: " + [errorInfo, e, JSON.stringify(webGLContextAttributes)]);
                return 0
            }
            if (!ctx)
                return 0;
            var context = GL.registerContext(ctx, webGLContextAttributes);
            return context
        }
        ),
        registerContext: (function(ctx, webGLContextAttributes) {
            var handle = _malloc(8);
            HEAP32[handle >> 2] = webGLContextAttributes["explicitSwapControl"];
            var context = {
                handle: handle,
                attributes: webGLContextAttributes,
                version: webGLContextAttributes["majorVersion"],
                GLctx: ctx
            };
            function getChromeVersion() {
                var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                return raw ? parseInt(raw[2], 10) : false
            }
            context.supportsWebGL2EntryPoints = context.version >= 2 && (getChromeVersion() === false || getChromeVersion() >= 58);
            if (ctx.canvas)
                ctx.canvas.GLctxObject = context;
            GL.contexts[handle] = context;
            if (typeof webGLContextAttributes["enableExtensionsByDefault"] === "undefined" || webGLContextAttributes["enableExtensionsByDefault"]) {
                GL.initExtensions(context)
            }
            if (webGLContextAttributes["renderViaOffscreenBackBuffer"]) {
                return 0
            }
            return handle
        }
        ),
        makeContextCurrent: (function(contextHandle) {
            if (!contextHandle) {
                GLctx = Module.ctx = GL.currentContext = null;
                return true
            }
            var context = GL.contexts[contextHandle];
            if (!context) {
                return false
            }
            GLctx = Module.ctx = context.GLctx;
            GL.currentContext = context;
            return true
        }
        ),
        getContext: (function(contextHandle) {
            return GL.contexts[contextHandle]
        }
        ),
        deleteContext: (function(contextHandle) {
            if (!contextHandle)
                return;
            if (GL.currentContext === GL.contexts[contextHandle])
                GL.currentContext = null;
            if (typeof JSEvents === "object")
                JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
            if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas)
                GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
            _free(GL.contexts[contextHandle]);
            GL.contexts[contextHandle] = null
        }
        ),
        initExtensions: (function(context) {
            if (!context)
                context = GL.currentContext;
            if (context.initExtensionsDone)
                return;
            context.initExtensionsDone = true;
            var GLctx = context.GLctx;
            context.maxVertexAttribs = GLctx.getParameter(GLctx.MAX_VERTEX_ATTRIBS);
            if (context.version < 2) {
                var instancedArraysExt = GLctx.getExtension("ANGLE_instanced_arrays");
                if (instancedArraysExt) {
                    GLctx["vertexAttribDivisor"] = (function(index, divisor) {
                        instancedArraysExt["vertexAttribDivisorANGLE"](index, divisor)
                    }
                    );
                    GLctx["drawArraysInstanced"] = (function(mode, first, count, primcount) {
                        instancedArraysExt["drawArraysInstancedANGLE"](mode, first, count, primcount)
                    }
                    );
                    GLctx["drawElementsInstanced"] = (function(mode, count, type, indices, primcount) {
                        instancedArraysExt["drawElementsInstancedANGLE"](mode, count, type, indices, primcount)
                    }
                    )
                }
                var vaoExt = GLctx.getExtension("OES_vertex_array_object");
                if (vaoExt) {
                    GLctx["createVertexArray"] = (function() {
                        return vaoExt["createVertexArrayOES"]()
                    }
                    );
                    GLctx["deleteVertexArray"] = (function(vao) {
                        vaoExt["deleteVertexArrayOES"](vao)
                    }
                    );
                    GLctx["bindVertexArray"] = (function(vao) {
                        vaoExt["bindVertexArrayOES"](vao)
                    }
                    );
                    GLctx["isVertexArray"] = (function(vao) {
                        return vaoExt["isVertexArrayOES"](vao)
                    }
                    )
                }
                var drawBuffersExt = GLctx.getExtension("WEBGL_draw_buffers");
                if (drawBuffersExt) {
                    GLctx["drawBuffers"] = (function(n, bufs) {
                        drawBuffersExt["drawBuffersWEBGL"](n, bufs)
                    }
                    )
                }
            }
            GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
            var automaticallyEnabledExtensions = ["OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives", "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture", "OES_element_index_uint", "EXT_texture_filter_anisotropic", "EXT_frag_depth", "WEBGL_draw_buffers", "ANGLE_instanced_arrays", "OES_texture_float_linear", "OES_texture_half_float_linear", "EXT_blend_minmax", "EXT_shader_texture_lod", "EXT_texture_norm16", "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float", "EXT_sRGB", "WEBGL_compressed_texture_etc1", "EXT_disjoint_timer_query", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_astc", "EXT_color_buffer_float", "WEBGL_compressed_texture_s3tc_srgb", "EXT_disjoint_timer_query_webgl2", "WEBKIT_WEBGL_compressed_texture_pvrtc"];
            var exts = GLctx.getSupportedExtensions();
            if (exts && exts.length > 0) {
                GLctx.getSupportedExtensions().forEach((function(ext) {
                    if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
                        GLctx.getExtension(ext)
                    }
                }
                ))
            }
        }
        ),
        populateUniformTable: (function(program) {
            var p = GL.programs[program];
            GL.programInfos[program] = {
                uniforms: {},
                maxUniformLength: 0,
                maxAttributeLength: -1,
                maxUniformBlockNameLength: -1
            };
            var ptable = GL.programInfos[program];
            var utable = ptable.uniforms;
            var numUniforms = GLctx.getProgramParameter(p, GLctx.ACTIVE_UNIFORMS);
            for (var i = 0; i < numUniforms; ++i) {
                var u = GLctx.getActiveUniform(p, i);
                var name = u.name;
                ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length + 1);
                if (name.indexOf("]", name.length - 1) !== -1) {
                    var ls = name.lastIndexOf("[");
                    name = name.slice(0, ls)
                }
                var loc = GLctx.getUniformLocation(p, name);
                if (loc != null) {
                    var id = GL.getNewId(GL.uniforms);
                    utable[name] = [u.size, id];
                    GL.uniforms[id] = loc;
                    for (var j = 1; j < u.size; ++j) {
                        var n = name + "[" + j + "]";
                        loc = GLctx.getUniformLocation(p, n);
                        id = GL.getNewId(GL.uniforms);
                        GL.uniforms[id] = loc
                    }
                }
            }
        }
        )
    };
    function _emscripten_webgl_do_create_context(target, attributes) {
        var contextAttributes = {};
        contextAttributes["alpha"] = !!HEAP32[attributes >> 2];
        contextAttributes["depth"] = !!HEAP32[attributes + 4 >> 2];
        contextAttributes["stencil"] = !!HEAP32[attributes + 8 >> 2];
        contextAttributes["antialias"] = !!HEAP32[attributes + 12 >> 2];
        contextAttributes["premultipliedAlpha"] = !!HEAP32[attributes + 16 >> 2];
        contextAttributes["preserveDrawingBuffer"] = !!HEAP32[attributes + 20 >> 2];
        contextAttributes["preferLowPowerToHighPerformance"] = !!HEAP32[attributes + 24 >> 2];
        contextAttributes["failIfMajorPerformanceCaveat"] = !!HEAP32[attributes + 28 >> 2];
        contextAttributes["majorVersion"] = HEAP32[attributes + 32 >> 2];
        contextAttributes["minorVersion"] = HEAP32[attributes + 36 >> 2];
        contextAttributes["explicitSwapControl"] = HEAP32[attributes + 44 >> 2];
        contextAttributes["proxyContextToMainThread"] = HEAP32[attributes + 48 >> 2];
        contextAttributes["renderViaOffscreenBackBuffer"] = HEAP32[attributes + 52 >> 2];
        target = Pointer_stringify(target);
        var canvas;
        if ((!target || target === "#canvas") && Module["canvas"]) {
            canvas = Module["canvas"].id && GL.offscreenCanvases[Module["canvas"].id] ? GL.offscreenCanvases[Module["canvas"].id].offscreenCanvas || JSEvents.findEventTarget(Module["canvas"].id) : Module["canvas"]
        } else {
            canvas = GL.offscreenCanvases[target] ? GL.offscreenCanvases[target].offscreenCanvas : JSEvents.findEventTarget(target)
        }
        if (!canvas) {
            return 0
        }
        if (contextAttributes["explicitSwapControl"]) {
            return 0
        }
        var contextHandle = GL.createContext(canvas, contextAttributes);
        return contextHandle
    }
    function _emscripten_webgl_create_context() {
        return _emscripten_webgl_do_create_context.apply(null, arguments)
    }
    function _emscripten_webgl_destroy_context_calling_thread(contextHandle) {
        GL.deleteContext(contextHandle)
    }
    function _emscripten_webgl_destroy_context() {
        return _emscripten_webgl_destroy_context_calling_thread.apply(null, arguments)
    }
    function _emscripten_webgl_enable_extension_calling_thread(contextHandle, extension) {
        var context = GL.getContext(contextHandle);
        var extString = Pointer_stringify(extension);
        if (extString.indexOf("GL_") == 0)
            extString = extString.substr(3);
        var ext = context.GLctx.getExtension(extString);
        return ext ? 1 : 0
    }
    function _emscripten_webgl_enable_extension() {
        return _emscripten_webgl_enable_extension_calling_thread.apply(null, arguments)
    }
    function _emscripten_webgl_do_get_current_context() {
        return GL.currentContext ? GL.currentContext.handle : 0
    }
    function _emscripten_webgl_get_current_context() {
        return _emscripten_webgl_do_get_current_context.apply(null, arguments)
    }
    function _emscripten_webgl_init_context_attributes(attributes) {
        HEAP32[attributes >> 2] = 1;
        HEAP32[attributes + 4 >> 2] = 1;
        HEAP32[attributes + 8 >> 2] = 0;
        HEAP32[attributes + 12 >> 2] = 1;
        HEAP32[attributes + 16 >> 2] = 1;
        HEAP32[attributes + 20 >> 2] = 0;
        HEAP32[attributes + 24 >> 2] = 0;
        HEAP32[attributes + 28 >> 2] = 0;
        HEAP32[attributes + 32 >> 2] = 1;
        HEAP32[attributes + 36 >> 2] = 0;
        HEAP32[attributes + 40 >> 2] = 1;
        HEAP32[attributes + 44 >> 2] = 0;
        HEAP32[attributes + 48 >> 2] = 0;
        HEAP32[attributes + 52 >> 2] = 0
    }
    function _emscripten_webgl_make_context_current(contextHandle) {
        var success = GL.makeContextCurrent(contextHandle);
        return success ? 0 : -5
    }
    function __exit(status) {
        exit(status)
    }
    function _exit(status) {
        __exit(status)
    }
    function _flock(fd, operation) {
        return 0
    }
    function _getenv(name) {
        if (name === 0)
            return 0;
        name = Pointer_stringify(name);
        if (!ENV.hasOwnProperty(name))
            return 0;
        if (_getenv.ret)
            _free(_getenv.ret);
        _getenv.ret = allocateUTF8(ENV[name]);
        return _getenv.ret
    }
    function _gethostbyname(name) {
        name = Pointer_stringify(name);
        var ret = _malloc(20);
        var nameBuf = _malloc(name.length + 1);
        stringToUTF8(name, nameBuf, name.length + 1);
        HEAP32[ret >> 2] = nameBuf;
        var aliasesBuf = _malloc(4);
        HEAP32[aliasesBuf >> 2] = 0;
        HEAP32[ret + 4 >> 2] = aliasesBuf;
        var afinet = 2;
        HEAP32[ret + 8 >> 2] = afinet;
        HEAP32[ret + 12 >> 2] = 4;
        var addrListBuf = _malloc(12);
        HEAP32[addrListBuf >> 2] = addrListBuf + 8;
        HEAP32[addrListBuf + 4 >> 2] = 0;
        HEAP32[addrListBuf + 8 >> 2] = __inet_pton4_raw(DNS.lookup_name(name));
        HEAP32[ret + 16 >> 2] = addrListBuf;
        return ret
    }
    function _gethostbyaddr(addr, addrlen, type) {
        if (type !== 2) {
            ___setErrNo(ERRNO_CODES.EAFNOSUPPORT);
            return null
        }
        addr = HEAP32[addr >> 2];
        var host = __inet_ntop4_raw(addr);
        var lookup = DNS.lookup_addr(host);
        if (lookup) {
            host = lookup
        }
        var hostp = allocate(intArrayFromString(host), "i8", ALLOC_STACK);
        return _gethostbyname(hostp)
    }
    function _getpagesize() {
        return PAGE_SIZE
    }
    function _getpwuid(uid) {
        return 0
    }
    function _gettimeofday(ptr) {
        var now = Date.now();
        HEAP32[ptr >> 2] = now / 1e3 | 0;
        HEAP32[ptr + 4 >> 2] = now % 1e3 * 1e3 | 0;
        return 0
    }
    function _glActiveTexture(x0) {
        GLctx["activeTexture"](x0)
    }
    function _glAttachShader(program, shader) {
        GLctx.attachShader(GL.programs[program], GL.shaders[shader])
    }
    function _glBeginQuery(target, id) {
        GLctx["beginQuery"](target, id ? GL.queries[id] : null)
    }
    function _glBeginTransformFeedback(x0) {
        GLctx["beginTransformFeedback"](x0)
    }
    function _glBindAttribLocation(program, index, name) {
        name = Pointer_stringify(name);
        GLctx.bindAttribLocation(GL.programs[program], index, name)
    }
    function _glBindBuffer(target, buffer) {
        var bufferObj = buffer ? GL.buffers[buffer] : null;
        if (target == 35051) {
            GLctx.currentPixelPackBufferBinding = buffer
        } else if (target == 35052) {
            GLctx.currentPixelUnpackBufferBinding = buffer
        }
        GLctx.bindBuffer(target, bufferObj)
    }
    function _glBindBufferBase(target, index, buffer) {
        var bufferObj = buffer ? GL.buffers[buffer] : null;
        GLctx["bindBufferBase"](target, index, bufferObj)
    }
    function _glBindBufferRange(target, index, buffer, offset, ptrsize) {
        var bufferObj = buffer ? GL.buffers[buffer] : null;
        GLctx["bindBufferRange"](target, index, bufferObj, offset, ptrsize)
    }
    function _glBindFramebuffer(target, framebuffer) {
        GLctx.bindFramebuffer(target, framebuffer ? GL.framebuffers[framebuffer] : null)
    }
    function _glBindRenderbuffer(target, renderbuffer) {
        GLctx.bindRenderbuffer(target, renderbuffer ? GL.renderbuffers[renderbuffer] : null)
    }
    function _glBindSampler(unit, sampler) {
        GLctx["bindSampler"](unit, sampler ? GL.samplers[sampler] : null)
    }
    function _glBindTexture(target, texture) {
        GLctx.bindTexture(target, texture ? GL.textures[texture] : null)
    }
    function _glBindTransformFeedback(target, id) {
        var transformFeedback = id ? GL.transformFeedbacks[id] : null;
        if (id && !transformFeedback) {
            GL.recordError(1282);
            return
        }
        GLctx["bindTransformFeedback"](target, transformFeedback)
    }
    function _glBindVertexArray(vao) {
        GLctx["bindVertexArray"](GL.vaos[vao])
    }
    function _glBlendEquation(x0) {
        GLctx["blendEquation"](x0)
    }
    function _glBlendEquationSeparate(x0, x1) {
        GLctx["blendEquationSeparate"](x0, x1)
    }
    function _glBlendFuncSeparate(x0, x1, x2, x3) {
        GLctx["blendFuncSeparate"](x0, x1, x2, x3)
    }
    function _glBlitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) {
        GLctx["blitFramebuffer"](x0, x1, x2, x3, x4, x5, x6, x7, x8, x9)
    }
    function _glBufferData(target, size, data, usage) {
        if (!data) {
            GLctx.bufferData(target, size, usage)
        } else {
            if (GL.currentContext.supportsWebGL2EntryPoints) {
                GLctx.bufferData(target, HEAPU8, usage, data, size);
                return
            }
            GLctx.bufferData(target, HEAPU8.subarray(data, data + size), usage)
        }
    }
    function _glBufferSubData(target, offset, size, data) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.bufferSubData(target, offset, HEAPU8, data, size);
            return
        }
        GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size))
    }
    function _glCheckFramebufferStatus(x0) {
        return GLctx["checkFramebufferStatus"](x0)
    }
    function _glClear(x0) {
        GLctx["clear"](x0)
    }
    function _glClearBufferfi(x0, x1, x2, x3) {
        GLctx["clearBufferfi"](x0, x1, x2, x3)
    }
    function _glClearBufferfv(buffer, drawbuffer, value) {
        GLctx["clearBufferfv"](buffer, drawbuffer, HEAPF32, value >> 2)
    }
    function _glClearBufferuiv(buffer, drawbuffer, value) {
        GLctx["clearBufferuiv"](buffer, drawbuffer, HEAPU32, value >> 2)
    }
    function _glClearColor(x0, x1, x2, x3) {
        GLctx["clearColor"](x0, x1, x2, x3)
    }
    function _glClearDepthf(x0) {
        GLctx["clearDepth"](x0)
    }
    function _glClearStencil(x0) {
        GLctx["clearStencil"](x0)
    }
    function _glClientWaitSync(sync, flags, timeoutLo, timeoutHi) {
        timeoutLo = timeoutLo >>> 0;
        timeoutHi = timeoutHi >>> 0;
        var timeout = timeoutLo == 4294967295 && timeoutHi == 4294967295 ? -1 : makeBigInt(timeoutLo, timeoutHi, true);
        return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout)
    }
    function _glColorMask(red, green, blue, alpha) {
        GLctx.colorMask(!!red, !!green, !!blue, !!alpha)
    }
    function _glCompileShader(shader) {
        GLctx.compileShader(GL.shaders[shader])
    }
    function _glCompressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx["compressedTexImage2D"](target, level, internalFormat, width, height, border, HEAPU8, data, imageSize);
            return
        }
        GLctx["compressedTexImage2D"](target, level, internalFormat, width, height, border, data ? HEAPU8.subarray(data, data + imageSize) : null)
    }
    function _glCompressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx["compressedTexImage3D"](target, level, internalFormat, width, height, depth, border, HEAPU8, data, imageSize)
        } else {
            GLctx["compressedTexImage3D"](target, level, internalFormat, width, height, depth, border, data ? HEAPU8.subarray(data, data + imageSize) : null)
        }
    }
    function _glCompressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx["compressedTexSubImage2D"](target, level, xoffset, yoffset, width, height, format, HEAPU8, data, imageSize);
            return
        }
        GLctx["compressedTexSubImage2D"](target, level, xoffset, yoffset, width, height, format, data ? HEAPU8.subarray(data, data + imageSize) : null)
    }
    function _glCompressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx["compressedTexSubImage3D"](target, level, xoffset, yoffset, zoffset, width, height, depth, format, HEAPU8, data, imageSize)
        } else {
            GLctx["compressedTexSubImage3D"](target, level, xoffset, yoffset, zoffset, width, height, depth, format, data ? HEAPU8.subarray(data, data + imageSize) : null)
        }
    }
    function _glCopyBufferSubData(x0, x1, x2, x3, x4) {
        GLctx["copyBufferSubData"](x0, x1, x2, x3, x4)
    }
    function _glCopyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
        GLctx["copyTexImage2D"](x0, x1, x2, x3, x4, x5, x6, x7)
    }
    function _glCopyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
        GLctx["copyTexSubImage2D"](x0, x1, x2, x3, x4, x5, x6, x7)
    }
    function _glCreateProgram() {
        var id = GL.getNewId(GL.programs);
        var program = GLctx.createProgram();
        program.name = id;
        GL.programs[id] = program;
        return id
    }
    function _glCreateShader(shaderType) {
        var id = GL.getNewId(GL.shaders);
        GL.shaders[id] = GLctx.createShader(shaderType);
        return id
    }
    function _glCullFace(x0) {
        GLctx["cullFace"](x0)
    }
    function _glDeleteBuffers(n, buffers) {
        for (var i = 0; i < n; i++) {
            var id = HEAP32[buffers + i * 4 >> 2];
            var buffer = GL.buffers[id];
            if (!buffer)
                continue;
            GLctx.deleteBuffer(buffer);
            buffer.name = 0;
            GL.buffers[id] = null;
            if (id == GL.currArrayBuffer)
                GL.currArrayBuffer = 0;
            if (id == GL.currElementArrayBuffer)
                GL.currElementArrayBuffer = 0
        }
    }
    function _glDeleteFramebuffers(n, framebuffers) {
        for (var i = 0; i < n; ++i) {
            var id = HEAP32[framebuffers + i * 4 >> 2];
            var framebuffer = GL.framebuffers[id];
            if (!framebuffer)
                continue;
            GLctx.deleteFramebuffer(framebuffer);
            framebuffer.name = 0;
            GL.framebuffers[id] = null
        }
    }
    function _glDeleteProgram(id) {
        if (!id)
            return;
        var program = GL.programs[id];
        if (!program) {
            GL.recordError(1281);
            return
        }
        GLctx.deleteProgram(program);
        program.name = 0;
        GL.programs[id] = null;
        GL.programInfos[id] = null
    }
    function _glDeleteQueries(n, ids) {
        for (var i = 0; i < n; i++) {
            var id = HEAP32[ids + i * 4 >> 2];
            var query = GL.queries[id];
            if (!query)
                continue;
            GLctx["deleteQuery"](query);
            GL.queries[id] = null
        }
    }
    function _glDeleteRenderbuffers(n, renderbuffers) {
        for (var i = 0; i < n; i++) {
            var id = HEAP32[renderbuffers + i * 4 >> 2];
            var renderbuffer = GL.renderbuffers[id];
            if (!renderbuffer)
                continue;
            GLctx.deleteRenderbuffer(renderbuffer);
            renderbuffer.name = 0;
            GL.renderbuffers[id] = null
        }
    }
    function _glDeleteSamplers(n, samplers) {
        for (var i = 0; i < n; i++) {
            var id = HEAP32[samplers + i * 4 >> 2];
            var sampler = GL.samplers[id];
            if (!sampler)
                continue;
            GLctx["deleteSampler"](sampler);
            sampler.name = 0;
            GL.samplers[id] = null
        }
    }
    function _glDeleteShader(id) {
        if (!id)
            return;
        var shader = GL.shaders[id];
        if (!shader) {
            GL.recordError(1281);
            return
        }
        GLctx.deleteShader(shader);
        GL.shaders[id] = null
    }
    function _glDeleteSync(id) {
        if (!id)
            return;
        var sync = GL.syncs[id];
        if (!sync) {
            GL.recordError(1281);
            return
        }
        GLctx.deleteSync(sync);
        sync.name = 0;
        GL.syncs[id] = null
    }
    function _glDeleteTextures(n, textures) {
        for (var i = 0; i < n; i++) {
            var id = HEAP32[textures + i * 4 >> 2];
            var texture = GL.textures[id];
            if (!texture)
                continue;
            GLctx.deleteTexture(texture);
            texture.name = 0;
            GL.textures[id] = null
        }
    }
    function _glDeleteTransformFeedbacks(n, ids) {
        for (var i = 0; i < n; i++) {
            var id = HEAP32[ids + i * 4 >> 2];
            var transformFeedback = GL.transformFeedbacks[id];
            if (!transformFeedback)
                continue;
            GLctx["deleteTransformFeedback"](transformFeedback);
            transformFeedback.name = 0;
            GL.transformFeedbacks[id] = null
        }
    }
    function _glDeleteVertexArrays(n, vaos) {
        for (var i = 0; i < n; i++) {
            var id = HEAP32[vaos + i * 4 >> 2];
            GLctx["deleteVertexArray"](GL.vaos[id]);
            GL.vaos[id] = null
        }
    }
    function _glDepthFunc(x0) {
        GLctx["depthFunc"](x0)
    }
    function _glDepthMask(flag) {
        GLctx.depthMask(!!flag)
    }
    function _glDetachShader(program, shader) {
        GLctx.detachShader(GL.programs[program], GL.shaders[shader])
    }
    function _glDisable(x0) {
        GLctx["disable"](x0)
    }
    function _glDisableVertexAttribArray(index) {
        GLctx.disableVertexAttribArray(index)
    }
    function _glDrawArrays(mode, first, count) {
        GLctx.drawArrays(mode, first, count)
    }
    function _glDrawArraysInstanced(mode, first, count, primcount) {
        GLctx["drawArraysInstanced"](mode, first, count, primcount)
    }
    function _glDrawBuffers(n, bufs) {
        var bufArray = GL.tempFixedLengthArray[n];
        for (var i = 0; i < n; i++) {
            bufArray[i] = HEAP32[bufs + i * 4 >> 2]
        }
        GLctx["drawBuffers"](bufArray)
    }
    function _glDrawElements(mode, count, type, indices) {
        GLctx.drawElements(mode, count, type, indices)
    }
    function _glDrawElementsInstanced(mode, count, type, indices, primcount) {
        GLctx["drawElementsInstanced"](mode, count, type, indices, primcount)
    }
    function _glEnable(x0) {
        GLctx["enable"](x0)
    }
    function _glEnableVertexAttribArray(index) {
        GLctx.enableVertexAttribArray(index)
    }
    function _glEndQuery(x0) {
        GLctx["endQuery"](x0)
    }
    function _glEndTransformFeedback() {
        GLctx["endTransformFeedback"]()
    }
    function _glFenceSync(condition, flags) {
        var sync = GLctx.fenceSync(condition, flags);
        if (sync) {
            var id = GL.getNewId(GL.syncs);
            sync.name = id;
            GL.syncs[id] = sync;
            return id
        } else {
            return 0
        }
    }
    function _glFinish() {
        GLctx["finish"]()
    }
    function _glFlush() {
        GLctx["flush"]()
    }
    function emscriptenWebGLGetBufferBinding(target) {
        switch (target) {
        case 34962:
            target = 34964;
            break;
        case 34963:
            target = 34965;
            break;
        case 35051:
            target = 35053;
            break;
        case 35052:
            target = 35055;
            break;
        case 35982:
            target = 35983;
            break;
        case 36662:
            target = 36662;
            break;
        case 36663:
            target = 36663;
            break;
        case 35345:
            target = 35368;
            break
        }
        var buffer = GLctx.getParameter(target);
        if (buffer)
            return buffer.name | 0;
        else
            return 0
    }
    function emscriptenWebGLValidateMapBufferTarget(target) {
        switch (target) {
        case 34962:
        case 34963:
        case 36662:
        case 36663:
        case 35051:
        case 35052:
        case 35882:
        case 35982:
        case 35345:
            return true;
        default:
            return false
        }
    }
    function _glFlushMappedBufferRange(target, offset, length) {
        if (!emscriptenWebGLValidateMapBufferTarget(target)) {
            GL.recordError(1280);
            err("GL_INVALID_ENUM in glFlushMappedBufferRange");
            return
        }
        var mapping = GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)];
        if (!mapping) {
            GL.recordError(1282);
            Module.printError("buffer was never mapped in glFlushMappedBufferRange");
            return
        }
        if (!(mapping.access & 16)) {
            GL.recordError(1282);
            Module.printError("buffer was not mapped with GL_MAP_FLUSH_EXPLICIT_BIT in glFlushMappedBufferRange");
            return
        }
        if (offset < 0 || length < 0 || offset + length > mapping.length) {
            GL.recordError(1281);
            Module.printError("invalid range in glFlushMappedBufferRange");
            return
        }
        GLctx.bufferSubData(target, mapping.offset, HEAPU8.subarray(mapping.mem + offset, mapping.mem + offset + length))
    }
    function _glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer) {
        GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer])
    }
    function _glFramebufferTexture2D(target, attachment, textarget, texture, level) {
        GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level)
    }
    function _glFramebufferTextureLayer(target, attachment, texture, level, layer) {
        GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer)
    }
    function _glFrontFace(x0) {
        GLctx["frontFace"](x0)
    }
    function _glGenBuffers(n, buffers) {
        for (var i = 0; i < n; i++) {
            var buffer = GLctx.createBuffer();
            if (!buffer) {
                GL.recordError(1282);
                while (i < n)
                    HEAP32[buffers + i++ * 4 >> 2] = 0;
                return
            }
            var id = GL.getNewId(GL.buffers);
            buffer.name = id;
            GL.buffers[id] = buffer;
            HEAP32[buffers + i * 4 >> 2] = id
        }
    }
    function _glGenFramebuffers(n, ids) {
        for (var i = 0; i < n; ++i) {
            var framebuffer = GLctx.createFramebuffer();
            if (!framebuffer) {
                GL.recordError(1282);
                while (i < n)
                    HEAP32[ids + i++ * 4 >> 2] = 0;
                return
            }
            var id = GL.getNewId(GL.framebuffers);
            framebuffer.name = id;
            GL.framebuffers[id] = framebuffer;
            HEAP32[ids + i * 4 >> 2] = id
        }
    }
    function _glGenQueries(n, ids) {
        for (var i = 0; i < n; i++) {
            var query = GLctx["createQuery"]();
            if (!query) {
                GL.recordError(1282);
                while (i < n)
                    HEAP32[ids + i++ * 4 >> 2] = 0;
                return
            }
            var id = GL.getNewId(GL.queries);
            query.name = id;
            GL.queries[id] = query;
            HEAP32[ids + i * 4 >> 2] = id
        }
    }
    function _glGenRenderbuffers(n, renderbuffers) {
        for (var i = 0; i < n; i++) {
            var renderbuffer = GLctx.createRenderbuffer();
            if (!renderbuffer) {
                GL.recordError(1282);
                while (i < n)
                    HEAP32[renderbuffers + i++ * 4 >> 2] = 0;
                return
            }
            var id = GL.getNewId(GL.renderbuffers);
            renderbuffer.name = id;
            GL.renderbuffers[id] = renderbuffer;
            HEAP32[renderbuffers + i * 4 >> 2] = id
        }
    }
    function _glGenSamplers(n, samplers) {
        for (var i = 0; i < n; i++) {
            var sampler = GLctx["createSampler"]();
            if (!sampler) {
                GL.recordError(1282);
                while (i < n)
                    HEAP32[samplers + i++ * 4 >> 2] = 0;
                return
            }
            var id = GL.getNewId(GL.samplers);
            sampler.name = id;
            GL.samplers[id] = sampler;
            HEAP32[samplers + i * 4 >> 2] = id
        }
    }
    function _glGenTextures(n, textures) {
        for (var i = 0; i < n; i++) {
            var texture = GLctx.createTexture();
            if (!texture) {
                GL.recordError(1282);
                while (i < n)
                    HEAP32[textures + i++ * 4 >> 2] = 0;
                return
            }
            var id = GL.getNewId(GL.textures);
            texture.name = id;
            GL.textures[id] = texture;
            HEAP32[textures + i * 4 >> 2] = id
        }
    }
    function _glGenTransformFeedbacks(n, ids) {
        for (var i = 0; i < n; i++) {
            var transformFeedback = GLctx["createTransformFeedback"]();
            if (!transformFeedback) {
                GL.recordError(1282);
                while (i < n)
                    HEAP32[ids + i++ * 4 >> 2] = 0;
                return
            }
            var id = GL.getNewId(GL.transformFeedbacks);
            transformFeedback.name = id;
            GL.transformFeedbacks[id] = transformFeedback;
            HEAP32[ids + i * 4 >> 2] = id
        }
    }
    function _glGenVertexArrays(n, arrays) {
        for (var i = 0; i < n; i++) {
            var vao = GLctx["createVertexArray"]();
            if (!vao) {
                GL.recordError(1282);
                while (i < n)
                    HEAP32[arrays + i++ * 4 >> 2] = 0;
                return
            }
            var id = GL.getNewId(GL.vaos);
            vao.name = id;
            GL.vaos[id] = vao;
            HEAP32[arrays + i * 4 >> 2] = id
        }
    }
    function _glGenerateMipmap(x0) {
        GLctx["generateMipmap"](x0)
    }
    function _glGetActiveAttrib(program, index, bufSize, length, size, type, name) {
        program = GL.programs[program];
        var info = GLctx.getActiveAttrib(program, index);
        if (!info)
            return;
        if (bufSize > 0 && name) {
            var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
            if (length)
                HEAP32[length >> 2] = numBytesWrittenExclNull
        } else {
            if (length)
                HEAP32[length >> 2] = 0
        }
        if (size)
            HEAP32[size >> 2] = info.size;
        if (type)
            HEAP32[type >> 2] = info.type
    }
    function _glGetActiveUniform(program, index, bufSize, length, size, type, name) {
        program = GL.programs[program];
        var info = GLctx.getActiveUniform(program, index);
        if (!info)
            return;
        if (bufSize > 0 && name) {
            var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
            if (length)
                HEAP32[length >> 2] = numBytesWrittenExclNull
        } else {
            if (length)
                HEAP32[length >> 2] = 0
        }
        if (size)
            HEAP32[size >> 2] = info.size;
        if (type)
            HEAP32[type >> 2] = info.type
    }
    function _glGetActiveUniformBlockName(program, uniformBlockIndex, bufSize, length, uniformBlockName) {
        program = GL.programs[program];
        var result = GLctx["getActiveUniformBlockName"](program, uniformBlockIndex);
        if (!result)
            return;
        if (uniformBlockName && bufSize > 0) {
            var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize);
            if (length)
                HEAP32[length >> 2] = numBytesWrittenExclNull
        } else {
            if (length)
                HEAP32[length >> 2] = 0
        }
    }
    function _glGetActiveUniformBlockiv(program, uniformBlockIndex, pname, params) {
        if (!params) {
            GL.recordError(1281);
            return
        }
        program = GL.programs[program];
        switch (pname) {
        case 35393:
            var name = GLctx["getActiveUniformBlockName"](program, uniformBlockIndex);
            HEAP32[params >> 2] = name.length + 1;
            return;
        default:
            var result = GLctx["getActiveUniformBlockParameter"](program, uniformBlockIndex, pname);
            if (!result)
                return;
            if (typeof result == "number") {
                HEAP32[params >> 2] = result
            } else {
                for (var i = 0; i < result.length; i++) {
                    HEAP32[params + i * 4 >> 2] = result[i]
                }
            }
        }
    }
    function _glGetActiveUniformsiv(program, uniformCount, uniformIndices, pname, params) {
        if (!params) {
            GL.recordError(1281);
            return
        }
        if (uniformCount > 0 && uniformIndices == 0) {
            GL.recordError(1281);
            return
        }
        program = GL.programs[program];
        var ids = [];
        for (var i = 0; i < uniformCount; i++) {
            ids.push(HEAP32[uniformIndices + i * 4 >> 2])
        }
        var result = GLctx["getActiveUniforms"](program, ids, pname);
        if (!result)
            return;
        var len = result.length;
        for (var i = 0; i < len; i++) {
            HEAP32[params + i * 4 >> 2] = result[i]
        }
    }
    function _glGetAttribLocation(program, name) {
        return GLctx.getAttribLocation(GL.programs[program], Pointer_stringify(name))
    }
    function _glGetError() {
        if (GL.lastError) {
            var error = GL.lastError;
            GL.lastError = 0;
            return error
        } else {
            return GLctx.getError()
        }
    }
    function _glGetFramebufferAttachmentParameteriv(target, attachment, pname, params) {
        var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
        if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
            result = result.name | 0
        }
        HEAP32[params >> 2] = result
    }
    function emscriptenWebGLGetIndexed(target, index, data, type) {
        if (!data) {
            GL.recordError(1281);
            return
        }
        var result = GLctx["getIndexedParameter"](target, index);
        var ret;
        switch (typeof result) {
        case "boolean":
            ret = result ? 1 : 0;
            break;
        case "number":
            ret = result;
            break;
        case "object":
            if (result === null) {
                switch (target) {
                case 35983:
                case 35368:
                    ret = 0;
                    break;
                default:
                    {
                        GL.recordError(1280);
                        return
                    }
                }
            } else if (result instanceof WebGLBuffer) {
                ret = result.name | 0
            } else {
                GL.recordError(1280);
                return
            }
            break;
        default:
            GL.recordError(1280);
            return
        }
        switch (type) {
        case "Integer64":
            tempI64 = [ret >>> 0, (tempDouble = ret,
            +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
            HEAP32[data >> 2] = tempI64[0],
            HEAP32[data + 4 >> 2] = tempI64[1];
            break;
        case "Integer":
            HEAP32[data >> 2] = ret;
            break;
        case "Float":
            HEAPF32[data >> 2] = ret;
            break;
        case "Boolean":
            HEAP8[data >> 0] = ret ? 1 : 0;
            break;
        default:
            throw "internal emscriptenWebGLGetIndexed() error, bad type: " + type
        }
    }
    function _glGetIntegeri_v(target, index, data) {
        emscriptenWebGLGetIndexed(target, index, data, "Integer")
    }
    function emscriptenWebGLGet(name_, p, type) {
        if (!p) {
            GL.recordError(1281);
            return
        }
        var ret = undefined;
        switch (name_) {
        case 36346:
            ret = 1;
            break;
        case 36344:
            if (type !== "Integer" && type !== "Integer64") {
                GL.recordError(1280)
            }
            return;
        case 34814:
        case 36345:
            ret = 0;
            break;
        case 34466:
            var formats = GLctx.getParameter(34467);
            ret = formats.length;
            break;
        case 33309:
            if (GLctx.canvas.GLctxObject.version < 2) {
                GL.recordError(1282);
                return
            }
            var exts = GLctx.getSupportedExtensions();
            ret = 2 * exts.length;
            break;
        case 33307:
        case 33308:
            if (GLctx.canvas.GLctxObject.version < 2) {
                GL.recordError(1280);
                return
            }
            ret = name_ == 33307 ? 3 : 0;
            break
        }
        if (ret === undefined) {
            var result = GLctx.getParameter(name_);
            switch (typeof result) {
            case "number":
                ret = result;
                break;
            case "boolean":
                ret = result ? 1 : 0;
                break;
            case "string":
                GL.recordError(1280);
                return;
            case "object":
                if (result === null) {
                    switch (name_) {
                    case 34964:
                    case 35725:
                    case 34965:
                    case 36006:
                    case 36007:
                    case 32873:
                    case 34229:
                    case 35097:
                    case 36389:
                    case 34068:
                        {
                            ret = 0;
                            break
                        }
                        ;
                    default:
                        {
                            GL.recordError(1280);
                            return
                        }
                    }
                } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
                    for (var i = 0; i < result.length; ++i) {
                        switch (type) {
                        case "Integer":
                            HEAP32[p + i * 4 >> 2] = result[i];
                            break;
                        case "Float":
                            HEAPF32[p + i * 4 >> 2] = result[i];
                            break;
                        case "Boolean":
                            HEAP8[p + i >> 0] = result[i] ? 1 : 0;
                            break;
                        default:
                            throw "internal glGet error, bad type: " + type
                        }
                    }
                    return
                } else if (result instanceof WebGLBuffer || result instanceof WebGLProgram || result instanceof WebGLFramebuffer || result instanceof WebGLRenderbuffer || result instanceof WebGLQuery || result instanceof WebGLSampler || result instanceof WebGLSync || result instanceof WebGLTransformFeedback || result instanceof WebGLVertexArrayObject || result instanceof WebGLTexture) {
                    ret = result.name | 0
                } else {
                    GL.recordError(1280);
                    return
                }
                break;
            default:
                GL.recordError(1280);
                return
            }
        }
        switch (type) {
        case "Integer64":
            tempI64 = [ret >>> 0, (tempDouble = ret,
            +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
            HEAP32[p >> 2] = tempI64[0],
            HEAP32[p + 4 >> 2] = tempI64[1];
            break;
        case "Integer":
            HEAP32[p >> 2] = ret;
            break;
        case "Float":
            HEAPF32[p >> 2] = ret;
            break;
        case "Boolean":
            HEAP8[p >> 0] = ret ? 1 : 0;
            break;
        default:
            throw "internal glGet error, bad type: " + type
        }
    }
    function _glGetIntegerv(name_, p) {
        emscriptenWebGLGet(name_, p, "Integer")
    }
    function _glGetInternalformativ(target, internalformat, pname, bufSize, params) {
        if (bufSize < 0) {
            GL.recordError(1281);
            return
        }
        var samples = GLctx["getInternalformatParameter"](target, internalformat, 32937);
        if (!samples) {
            GL.recordError(1280);
            return
        }
        switch (pname) {
        case 32937:
            var n = Math.min(bufSize, samples.length);
            for (var i = 0; i < n; i++) {
                var v = samples[i];
                HEAP32[params + i * 4 >> 2] = v
            }
            break;
        case 37760:
            if (bufSize > 1) {
                var v = samples.length;
                HEAP32[params >> 2] = v
            }
            break;
        default:
            GL.recordError(1280)
        }
    }
    function _glGetProgramBinary(program, bufSize, length, binaryFormat, binary) {
        GL.recordError(1282)
    }
    function _glGetProgramInfoLog(program, maxLength, length, infoLog) {
        var log = GLctx.getProgramInfoLog(GL.programs[program]);
        if (log === null)
            log = "(unknown error)";
        if (maxLength > 0 && infoLog) {
            var numBytesWrittenExclNull = stringToUTF8(log, infoLog, maxLength);
            if (length)
                HEAP32[length >> 2] = numBytesWrittenExclNull
        } else {
            if (length)
                HEAP32[length >> 2] = 0
        }
    }
    function _glGetProgramiv(program, pname, p) {
        if (!p) {
            GL.recordError(1281);
            return
        }
        if (program >= GL.counter) {
            GL.recordError(1281);
            return
        }
        var ptable = GL.programInfos[program];
        if (!ptable) {
            GL.recordError(1282);
            return
        }
        if (pname == 35716) {
            var log = GLctx.getProgramInfoLog(GL.programs[program]);
            if (log === null)
                log = "(unknown error)";
            HEAP32[p >> 2] = log.length + 1
        } else if (pname == 35719) {
            HEAP32[p >> 2] = ptable.maxUniformLength
        } else if (pname == 35722) {
            if (ptable.maxAttributeLength == -1) {
                program = GL.programs[program];
                var numAttribs = GLctx.getProgramParameter(program, GLctx.ACTIVE_ATTRIBUTES);
                ptable.maxAttributeLength = 0;
                for (var i = 0; i < numAttribs; ++i) {
                    var activeAttrib = GLctx.getActiveAttrib(program, i);
                    ptable.maxAttributeLength = Math.max(ptable.maxAttributeLength, activeAttrib.name.length + 1)
                }
            }
            HEAP32[p >> 2] = ptable.maxAttributeLength
        } else if (pname == 35381) {
            if (ptable.maxUniformBlockNameLength == -1) {
                program = GL.programs[program];
                var numBlocks = GLctx.getProgramParameter(program, GLctx.ACTIVE_UNIFORM_BLOCKS);
                ptable.maxUniformBlockNameLength = 0;
                for (var i = 0; i < numBlocks; ++i) {
                    var activeBlockName = GLctx.getActiveUniformBlockName(program, i);
                    ptable.maxUniformBlockNameLength = Math.max(ptable.maxUniformBlockNameLength, activeBlockName.length + 1)
                }
            }
            HEAP32[p >> 2] = ptable.maxUniformBlockNameLength
        } else {
            HEAP32[p >> 2] = GLctx.getProgramParameter(GL.programs[program], pname)
        }
    }
    function _glGetRenderbufferParameteriv(target, pname, params) {
        if (!params) {
            GL.recordError(1281);
            return
        }
        HEAP32[params >> 2] = GLctx.getRenderbufferParameter(target, pname)
    }
    function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null)
            log = "(unknown error)";
        if (maxLength > 0 && infoLog) {
            var numBytesWrittenExclNull = stringToUTF8(log, infoLog, maxLength);
            if (length)
                HEAP32[length >> 2] = numBytesWrittenExclNull
        } else {
            if (length)
                HEAP32[length >> 2] = 0
        }
    }
    function _glGetShaderPrecisionFormat(shaderType, precisionType, range, precision) {
        var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
        HEAP32[range >> 2] = result.rangeMin;
        HEAP32[range + 4 >> 2] = result.rangeMax;
        HEAP32[precision >> 2] = result.precision
    }
    function _glGetShaderSource(shader, bufSize, length, source) {
        var result = GLctx.getShaderSource(GL.shaders[shader]);
        if (!result)
            return;
        if (bufSize > 0 && source) {
            var numBytesWrittenExclNull = stringToUTF8(result, source, bufSize);
            if (length)
                HEAP32[length >> 2] = numBytesWrittenExclNull
        } else {
            if (length)
                HEAP32[length >> 2] = 0
        }
    }
    function _glGetShaderiv(shader, pname, p) {
        if (!p) {
            GL.recordError(1281);
            return
        }
        if (pname == 35716) {
            var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
            if (log === null)
                log = "(unknown error)";
            HEAP32[p >> 2] = log.length + 1
        } else if (pname == 35720) {
            var source = GLctx.getShaderSource(GL.shaders[shader]);
            var sourceLength = source === null || source.length == 0 ? 0 : source.length + 1;
            HEAP32[p >> 2] = sourceLength
        } else {
            HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname)
        }
    }
    function _glGetString(name_) {
        if (GL.stringCache[name_])
            return GL.stringCache[name_];
        var ret;
        switch (name_) {
        case 7936:
        case 7937:
        case 37445:
        case 37446:
            ret = allocate(intArrayFromString(GLctx.getParameter(name_)), "i8", ALLOC_NORMAL);
            break;
        case 7938:
            var glVersion = GLctx.getParameter(GLctx.VERSION);
            if (GLctx.canvas.GLctxObject.version >= 2)
                glVersion = "OpenGL ES 3.0 (" + glVersion + ")";
            else {
                glVersion = "OpenGL ES 2.0 (" + glVersion + ")"
            }
            ret = allocate(intArrayFromString(glVersion), "i8", ALLOC_NORMAL);
            break;
        case 7939:
            var exts = GLctx.getSupportedExtensions();
            var gl_exts = [];
            for (var i = 0; i < exts.length; ++i) {
                gl_exts.push(exts[i]);
                gl_exts.push("GL_" + exts[i])
            }
            ret = allocate(intArrayFromString(gl_exts.join(" ")), "i8", ALLOC_NORMAL);
            break;
        case 35724:
            var glslVersion = GLctx.getParameter(GLctx.SHADING_LANGUAGE_VERSION);
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
            var ver_num = glslVersion.match(ver_re);
            if (ver_num !== null) {
                if (ver_num[1].length == 3)
                    ver_num[1] = ver_num[1] + "0";
                glslVersion = "OpenGL ES GLSL ES " + ver_num[1] + " (" + glslVersion + ")"
            }
            ret = allocate(intArrayFromString(glslVersion), "i8", ALLOC_NORMAL);
            break;
        default:
            GL.recordError(1280);
            return 0
        }
        GL.stringCache[name_] = ret;
        return ret
    }
    function _glGetStringi(name, index) {
        if (GLctx.canvas.GLctxObject.version < 2) {
            GL.recordError(1282);
            return 0
        }
        var stringiCache = GL.stringiCache[name];
        if (stringiCache) {
            if (index < 0 || index >= stringiCache.length) {
                GL.recordError(1281);
                return 0
            }
            return stringiCache[index]
        }
        switch (name) {
        case 7939:
            var exts = GLctx.getSupportedExtensions();
            var gl_exts = [];
            for (var i = 0; i < exts.length; ++i) {
                gl_exts.push(allocate(intArrayFromString(exts[i]), "i8", ALLOC_NORMAL));
                gl_exts.push(allocate(intArrayFromString("GL_" + exts[i]), "i8", ALLOC_NORMAL))
            }
            stringiCache = GL.stringiCache[name] = gl_exts;
            if (index < 0 || index >= stringiCache.length) {
                GL.recordError(1281);
                return 0
            }
            return stringiCache[index];
        default:
            GL.recordError(1280);
            return 0
        }
    }
    function _glGetTexParameteriv(target, pname, params) {
        if (!params) {
            GL.recordError(1281);
            return
        }
        HEAP32[params >> 2] = GLctx.getTexParameter(target, pname)
    }
    function _glGetUniformBlockIndex(program, uniformBlockName) {
        program = GL.programs[program];
        uniformBlockName = Pointer_stringify(uniformBlockName);
        return GLctx["getUniformBlockIndex"](program, uniformBlockName)
    }
    function _glGetUniformIndices(program, uniformCount, uniformNames, uniformIndices) {
        if (!uniformIndices) {
            GL.recordError(1281);
            return
        }
        if (uniformCount > 0 && (uniformNames == 0 || uniformIndices == 0)) {
            GL.recordError(1281);
            return
        }
        program = GL.programs[program];
        var names = [];
        for (var i = 0; i < uniformCount; i++)
            names.push(Pointer_stringify(HEAP32[uniformNames + i * 4 >> 2]));
        var result = GLctx["getUniformIndices"](program, names);
        if (!result)
            return;
        var len = result.length;
        for (var i = 0; i < len; i++) {
            HEAP32[uniformIndices + i * 4 >> 2] = result[i]
        }
    }
    function _glGetUniformLocation(program, name) {
        name = Pointer_stringify(name);
        var arrayOffset = 0;
        if (name.indexOf("]", name.length - 1) !== -1) {
            var ls = name.lastIndexOf("[");
            var arrayIndex = name.slice(ls + 1, -1);
            if (arrayIndex.length > 0) {
                arrayOffset = parseInt(arrayIndex);
                if (arrayOffset < 0) {
                    return -1
                }
            }
            name = name.slice(0, ls)
        }
        var ptable = GL.programInfos[program];
        if (!ptable) {
            return -1
        }
        var utable = ptable.uniforms;
        var uniformInfo = utable[name];
        if (uniformInfo && arrayOffset < uniformInfo[0]) {
            return uniformInfo[1] + arrayOffset
        } else {
            return -1
        }
    }
    function emscriptenWebGLGetUniform(program, location, params, type) {
        if (!params) {
            GL.recordError(1281);
            return
        }
        var data = GLctx.getUniform(GL.programs[program], GL.uniforms[location]);
        if (typeof data == "number" || typeof data == "boolean") {
            switch (type) {
            case "Integer":
                HEAP32[params >> 2] = data;
                break;
            case "Float":
                HEAPF32[params >> 2] = data;
                break;
            default:
                throw "internal emscriptenWebGLGetUniform() error, bad type: " + type
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                switch (type) {
                case "Integer":
                    HEAP32[params + i * 4 >> 2] = data[i];
                    break;
                case "Float":
                    HEAPF32[params + i * 4 >> 2] = data[i];
                    break;
                default:
                    throw "internal emscriptenWebGLGetUniform() error, bad type: " + type
                }
            }
        }
    }
    function _glGetUniformiv(program, location, params) {
        emscriptenWebGLGetUniform(program, location, params, "Integer")
    }
    function emscriptenWebGLGetVertexAttrib(index, pname, params, type) {
        if (!params) {
            GL.recordError(1281);
            return
        }
        var data = GLctx.getVertexAttrib(index, pname);
        if (pname == 34975) {
            HEAP32[params >> 2] = data["name"]
        } else if (typeof data == "number" || typeof data == "boolean") {
            switch (type) {
            case "Integer":
                HEAP32[params >> 2] = data;
                break;
            case "Float":
                HEAPF32[params >> 2] = data;
                break;
            case "FloatToInteger":
                HEAP32[params >> 2] = Math.fround(data);
                break;
            default:
                throw "internal emscriptenWebGLGetVertexAttrib() error, bad type: " + type
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                switch (type) {
                case "Integer":
                    HEAP32[params + i * 4 >> 2] = data[i];
                    break;
                case "Float":
                    HEAPF32[params + i * 4 >> 2] = data[i];
                    break;
                case "FloatToInteger":
                    HEAP32[params + i * 4 >> 2] = Math.fround(data[i]);
                    break;
                default:
                    throw "internal emscriptenWebGLGetVertexAttrib() error, bad type: " + type
                }
            }
        }
    }
    function _glGetVertexAttribiv(index, pname, params) {
        emscriptenWebGLGetVertexAttrib(index, pname, params, "FloatToInteger")
    }
    function _glInvalidateFramebuffer(target, numAttachments, attachments) {
        var list = GL.tempFixedLengthArray[numAttachments];
        for (var i = 0; i < numAttachments; i++) {
            list[i] = HEAP32[attachments + i * 4 >> 2]
        }
        GLctx["invalidateFramebuffer"](target, list)
    }
    function _glIsEnabled(x0) {
        return GLctx["isEnabled"](x0)
    }
    function _glIsVertexArray(array) {
        var vao = GL.vaos[array];
        if (!vao)
            return 0;
        return GLctx["isVertexArray"](vao)
    }
    function _glLinkProgram(program) {
        GLctx.linkProgram(GL.programs[program]);
        GL.programInfos[program] = null;
        GL.populateUniformTable(program)
    }
    function _glMapBufferRange(target, offset, length, access) {
        if (access != 26 && access != 10) {
            err("glMapBufferRange is only supported when access is MAP_WRITE|INVALIDATE_BUFFER");
            return 0
        }
        if (!emscriptenWebGLValidateMapBufferTarget(target)) {
            GL.recordError(1280);
            err("GL_INVALID_ENUM in glMapBufferRange");
            return 0
        }
        var mem = _malloc(length);
        if (!mem)
            return 0;
        GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)] = {
            offset: offset,
            length: length,
            mem: mem,
            access: access
        };
        return mem
    }
    function _glPixelStorei(pname, param) {
        if (pname == 3333) {
            GL.packAlignment = param
        } else if (pname == 3317) {
            GL.unpackAlignment = param
        }
        GLctx.pixelStorei(pname, param)
    }
    function _glPolygonOffset(x0, x1) {
        GLctx["polygonOffset"](x0, x1)
    }
    function _glProgramBinary(program, binaryFormat, binary, length) {
        GL.recordError(1280)
    }
    function _glProgramParameteri(program, pname, value) {
        GL.recordError(1280)
    }
    function _glReadBuffer(x0) {
        GLctx["readBuffer"](x0)
    }
    function emscriptenWebGLComputeImageSize(width, height, sizePerPixel, alignment) {
        function roundedToNextMultipleOf(x, y) {
            return Math.floor((x + y - 1) / y) * y
        }
        var plainRowSize = width * sizePerPixel;
        var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
        return height <= 0 ? 0 : (height - 1) * alignedRowSize + plainRowSize
    }
    function emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) {
        var sizePerPixel;
        var numChannels;
        switch (format) {
        case 6406:
        case 6409:
        case 6402:
        case 6403:
        case 36244:
            numChannels = 1;
            break;
        case 6410:
        case 33319:
        case 33320:
            numChannels = 2;
            break;
        case 6407:
        case 35904:
        case 36248:
            numChannels = 3;
            break;
        case 6408:
        case 35906:
        case 36249:
            numChannels = 4;
            break;
        default:
            GL.recordError(1280);
            return null
        }
        switch (type) {
        case 5121:
        case 5120:
            sizePerPixel = numChannels * 1;
            break;
        case 5123:
        case 36193:
        case 5131:
        case 5122:
            sizePerPixel = numChannels * 2;
            break;
        case 5125:
        case 5126:
        case 5124:
            sizePerPixel = numChannels * 4;
            break;
        case 34042:
        case 35902:
        case 33640:
        case 35899:
        case 34042:
            sizePerPixel = 4;
            break;
        case 33635:
        case 32819:
        case 32820:
            sizePerPixel = 2;
            break;
        default:
            GL.recordError(1280);
            return null
        }
        var bytes = emscriptenWebGLComputeImageSize(width, height, sizePerPixel, GL.unpackAlignment);
        switch (type) {
        case 5120:
            return HEAP8.subarray(pixels, pixels + bytes);
        case 5121:
            return HEAPU8.subarray(pixels, pixels + bytes);
        case 5122:
            return HEAP16.subarray(pixels >> 1, pixels + bytes >> 1);
        case 5124:
            return HEAP32.subarray(pixels >> 2, pixels + bytes >> 2);
        case 5126:
            return HEAPF32.subarray(pixels >> 2, pixels + bytes >> 2);
        case 5125:
        case 34042:
        case 35902:
        case 33640:
        case 35899:
        case 34042:
            return HEAPU32.subarray(pixels >> 2, pixels + bytes >> 2);
        case 5123:
        case 33635:
        case 32819:
        case 32820:
        case 36193:
        case 5131:
            return HEAPU16.subarray(pixels >> 1, pixels + bytes >> 1);
        default:
            GL.recordError(1280);
            return null
        }
    }
    function emscriptenWebGLGetHeapForType(type) {
        switch (type) {
        case 5120:
            return HEAP8;
        case 5121:
            return HEAPU8;
        case 5122:
            return HEAP16;
        case 5123:
        case 33635:
        case 32819:
        case 32820:
        case 36193:
        case 5131:
            return HEAPU16;
        case 5124:
            return HEAP32;
        case 5125:
        case 34042:
        case 35902:
        case 33640:
        case 35899:
        case 34042:
            return HEAPU32;
        case 5126:
            return HEAPF32;
        default:
            return null
        }
    }
    function emscriptenWebGLGetShiftForType(type) {
        switch (type) {
        case 5120:
        case 5121:
            return 0;
        case 5122:
        case 5123:
        case 33635:
        case 32819:
        case 32820:
        case 36193:
        case 5131:
            return 1;
        case 5124:
        case 5126:
        case 5125:
        case 34042:
        case 35902:
        case 33640:
        case 35899:
        case 34042:
            return 2;
        default:
            return 0
        }
    }
    function _glReadPixels(x, y, width, height, format, type, pixels) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            if (GLctx.currentPixelPackBufferBinding) {
                GLctx.readPixels(x, y, width, height, format, type, pixels)
            } else {
                GLctx.readPixels(x, y, width, height, format, type, emscriptenWebGLGetHeapForType(type), pixels >> emscriptenWebGLGetShiftForType(type))
            }
            return
        }
        var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
        if (!pixelData) {
            GL.recordError(1280);
            return
        }
        GLctx.readPixels(x, y, width, height, format, type, pixelData)
    }
    function _glRenderbufferStorage(x0, x1, x2, x3) {
        GLctx["renderbufferStorage"](x0, x1, x2, x3)
    }
    function _glRenderbufferStorageMultisample(x0, x1, x2, x3, x4) {
        GLctx["renderbufferStorageMultisample"](x0, x1, x2, x3, x4)
    }
    function _glSamplerParameteri(sampler, pname, param) {
        GLctx["samplerParameteri"](sampler ? GL.samplers[sampler] : null, pname, param)
    }
    function _glScissor(x0, x1, x2, x3) {
        GLctx["scissor"](x0, x1, x2, x3)
    }
    function _glShaderSource(shader, count, string, length) {
        var source = GL.getSource(shader, count, string, length);
        GLctx.shaderSource(GL.shaders[shader], source)
    }
    function _glStencilFuncSeparate(x0, x1, x2, x3) {
        GLctx["stencilFuncSeparate"](x0, x1, x2, x3)
    }
    function _glStencilMask(x0) {
        GLctx["stencilMask"](x0)
    }
    function _glStencilOpSeparate(x0, x1, x2, x3) {
        GLctx["stencilOpSeparate"](x0, x1, x2, x3)
    }
    function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            if (GLctx.currentPixelUnpackBufferBinding) {
                GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels)
            } else if (pixels != 0) {
                GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, emscriptenWebGLGetHeapForType(type), pixels >> emscriptenWebGLGetShiftForType(type))
            } else {
                GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, null)
            }
            return
        }
        var pixelData = null;
        if (pixels)
            pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat);
        GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData)
    }
    function _glTexImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels) {
        if (GLctx.currentPixelUnpackBufferBinding) {
            GLctx["texImage3D"](target, level, internalFormat, width, height, depth, border, format, type, pixels)
        } else if (pixels != 0) {
            GLctx["texImage3D"](target, level, internalFormat, width, height, depth, border, format, type, emscriptenWebGLGetHeapForType(type), pixels >> emscriptenWebGLGetShiftForType(type))
        } else {
            GLctx["texImage3D"](target, level, internalFormat, width, height, depth, border, format, type, null)
        }
    }
    function _glTexParameterf(x0, x1, x2) {
        GLctx["texParameterf"](x0, x1, x2)
    }
    function _glTexParameteri(x0, x1, x2) {
        GLctx["texParameteri"](x0, x1, x2)
    }
    function _glTexParameteriv(target, pname, params) {
        var param = HEAP32[params >> 2];
        GLctx.texParameteri(target, pname, param)
    }
    function _glTexStorage2D(x0, x1, x2, x3, x4) {
        GLctx["texStorage2D"](x0, x1, x2, x3, x4)
    }
    function _glTexStorage3D(x0, x1, x2, x3, x4, x5) {
        GLctx["texStorage3D"](x0, x1, x2, x3, x4, x5)
    }
    function _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            if (GLctx.currentPixelUnpackBufferBinding) {
                GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels)
            } else if (pixels != 0) {
                GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, emscriptenWebGLGetHeapForType(type), pixels >> emscriptenWebGLGetShiftForType(type))
            } else {
                GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, null)
            }
            return
        }
        var pixelData = null;
        if (pixels)
            pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0);
        GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData)
    }
    function _glTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) {
        if (GLctx.currentPixelUnpackBufferBinding) {
            GLctx["texSubImage3D"](target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels)
        } else if (pixels != 0) {
            GLctx["texSubImage3D"](target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, emscriptenWebGLGetHeapForType(type), pixels >> emscriptenWebGLGetShiftForType(type))
        } else {
            GLctx["texSubImage3D"](target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null)
        }
    }
    function _glTransformFeedbackVaryings(program, count, varyings, bufferMode) {
        program = GL.programs[program];
        var vars = [];
        for (var i = 0; i < count; i++)
            vars.push(Pointer_stringify(HEAP32[varyings + i * 4 >> 2]));
        GLctx["transformFeedbackVaryings"](program, vars, bufferMode)
    }
    function _glUniform1fv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform1fv(GL.uniforms[location], HEAPF32, value >> 2, count);
            return
        }
        var view;
        if (count <= GL.MINI_TEMP_BUFFER_SIZE) {
            view = GL.miniTempBufferViews[count - 1];
            for (var i = 0; i < count; ++i) {
                view[i] = HEAPF32[value + 4 * i >> 2]
            }
        } else {
            view = HEAPF32.subarray(value >> 2, value + count * 4 >> 2)
        }
        GLctx.uniform1fv(GL.uniforms[location], view)
    }
    function _glUniform1i(location, v0) {
        GLctx.uniform1i(GL.uniforms[location], v0)
    }
    function _glUniform1iv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform1iv(GL.uniforms[location], HEAP32, value >> 2, count);
            return
        }
        GLctx.uniform1iv(GL.uniforms[location], HEAP32.subarray(value >> 2, value + count * 4 >> 2))
    }
    function _glUniform1uiv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform1uiv(GL.uniforms[location], HEAPU32, value >> 2, count)
        } else {
            GLctx.uniform1uiv(GL.uniforms[location], HEAPU32.subarray(value >> 2, value + count * 4 >> 2))
        }
    }
    function _glUniform2fv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform2fv(GL.uniforms[location], HEAPF32, value >> 2, count * 2);
            return
        }
        var view;
        if (2 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
            view = GL.miniTempBufferViews[2 * count - 1];
            for (var i = 0; i < 2 * count; i += 2) {
                view[i] = HEAPF32[value + 4 * i >> 2];
                view[i + 1] = HEAPF32[value + (4 * i + 4) >> 2]
            }
        } else {
            view = HEAPF32.subarray(value >> 2, value + count * 8 >> 2)
        }
        GLctx.uniform2fv(GL.uniforms[location], view)
    }
    function _glUniform2iv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform2iv(GL.uniforms[location], HEAP32, value >> 2, count * 2);
            return
        }
        GLctx.uniform2iv(GL.uniforms[location], HEAP32.subarray(value >> 2, value + count * 8 >> 2))
    }
    function _glUniform2uiv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform2uiv(GL.uniforms[location], HEAPU32, value >> 2, count * 2)
        } else {
            GLctx.uniform2uiv(GL.uniforms[location], HEAPU32.subarray(value >> 2, value + count * 8 >> 2))
        }
    }
    function _glUniform3fv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform3fv(GL.uniforms[location], HEAPF32, value >> 2, count * 3);
            return
        }
        var view;
        if (3 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
            view = GL.miniTempBufferViews[3 * count - 1];
            for (var i = 0; i < 3 * count; i += 3) {
                view[i] = HEAPF32[value + 4 * i >> 2];
                view[i + 1] = HEAPF32[value + (4 * i + 4) >> 2];
                view[i + 2] = HEAPF32[value + (4 * i + 8) >> 2]
            }
        } else {
            view = HEAPF32.subarray(value >> 2, value + count * 12 >> 2)
        }
        GLctx.uniform3fv(GL.uniforms[location], view)
    }
    function _glUniform3iv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform3iv(GL.uniforms[location], HEAP32, value >> 2, count * 3);
            return
        }
        GLctx.uniform3iv(GL.uniforms[location], HEAP32.subarray(value >> 2, value + count * 12 >> 2))
    }
    function _glUniform3uiv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform3uiv(GL.uniforms[location], HEAPU32, value >> 2, count * 3)
        } else {
            GLctx.uniform3uiv(GL.uniforms[location], HEAPU32.subarray(value >> 2, value + count * 12 >> 2))
        }
    }
    function _glUniform4fv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform4fv(GL.uniforms[location], HEAPF32, value >> 2, count * 4);
            return
        }
        var view;
        if (4 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
            view = GL.miniTempBufferViews[4 * count - 1];
            for (var i = 0; i < 4 * count; i += 4) {
                view[i] = HEAPF32[value + 4 * i >> 2];
                view[i + 1] = HEAPF32[value + (4 * i + 4) >> 2];
                view[i + 2] = HEAPF32[value + (4 * i + 8) >> 2];
                view[i + 3] = HEAPF32[value + (4 * i + 12) >> 2]
            }
        } else {
            view = HEAPF32.subarray(value >> 2, value + count * 16 >> 2)
        }
        GLctx.uniform4fv(GL.uniforms[location], view)
    }
    function _glUniform4iv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform4iv(GL.uniforms[location], HEAP32, value >> 2, count * 4);
            return
        }
        GLctx.uniform4iv(GL.uniforms[location], HEAP32.subarray(value >> 2, value + count * 16 >> 2))
    }
    function _glUniform4uiv(location, count, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniform4uiv(GL.uniforms[location], HEAPU32, value >> 2, count * 4)
        } else {
            GLctx.uniform4uiv(GL.uniforms[location], HEAPU32.subarray(value >> 2, value + count * 16 >> 2))
        }
    }
    function _glUniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding) {
        program = GL.programs[program];
        GLctx["uniformBlockBinding"](program, uniformBlockIndex, uniformBlockBinding)
    }
    function _glUniformMatrix3fv(location, count, transpose, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniformMatrix3fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 9);
            return
        }
        var view;
        if (9 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
            view = GL.miniTempBufferViews[9 * count - 1];
            for (var i = 0; i < 9 * count; i += 9) {
                view[i] = HEAPF32[value + 4 * i >> 2];
                view[i + 1] = HEAPF32[value + (4 * i + 4) >> 2];
                view[i + 2] = HEAPF32[value + (4 * i + 8) >> 2];
                view[i + 3] = HEAPF32[value + (4 * i + 12) >> 2];
                view[i + 4] = HEAPF32[value + (4 * i + 16) >> 2];
                view[i + 5] = HEAPF32[value + (4 * i + 20) >> 2];
                view[i + 6] = HEAPF32[value + (4 * i + 24) >> 2];
                view[i + 7] = HEAPF32[value + (4 * i + 28) >> 2];
                view[i + 8] = HEAPF32[value + (4 * i + 32) >> 2]
            }
        } else {
            view = HEAPF32.subarray(value >> 2, value + count * 36 >> 2)
        }
        GLctx.uniformMatrix3fv(GL.uniforms[location], !!transpose, view)
    }
    function _glUniformMatrix4fv(location, count, transpose, value) {
        if (GL.currentContext.supportsWebGL2EntryPoints) {
            GLctx.uniformMatrix4fv(GL.uniforms[location], !!transpose, HEAPF32, value >> 2, count * 16);
            return
        }
        var view;
        if (16 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
            view = GL.miniTempBufferViews[16 * count - 1];
            for (var i = 0; i < 16 * count; i += 16) {
                view[i] = HEAPF32[value + 4 * i >> 2];
                view[i + 1] = HEAPF32[value + (4 * i + 4) >> 2];
                view[i + 2] = HEAPF32[value + (4 * i + 8) >> 2];
                view[i + 3] = HEAPF32[value + (4 * i + 12) >> 2];
                view[i + 4] = HEAPF32[value + (4 * i + 16) >> 2];
                view[i + 5] = HEAPF32[value + (4 * i + 20) >> 2];
                view[i + 6] = HEAPF32[value + (4 * i + 24) >> 2];
                view[i + 7] = HEAPF32[value + (4 * i + 28) >> 2];
                view[i + 8] = HEAPF32[value + (4 * i + 32) >> 2];
                view[i + 9] = HEAPF32[value + (4 * i + 36) >> 2];
                view[i + 10] = HEAPF32[value + (4 * i + 40) >> 2];
                view[i + 11] = HEAPF32[value + (4 * i + 44) >> 2];
                view[i + 12] = HEAPF32[value + (4 * i + 48) >> 2];
                view[i + 13] = HEAPF32[value + (4 * i + 52) >> 2];
                view[i + 14] = HEAPF32[value + (4 * i + 56) >> 2];
                view[i + 15] = HEAPF32[value + (4 * i + 60) >> 2]
            }
        } else {
            view = HEAPF32.subarray(value >> 2, value + count * 64 >> 2)
        }
        GLctx.uniformMatrix4fv(GL.uniforms[location], !!transpose, view)
    }
    function _glUnmapBuffer(target) {
        if (!emscriptenWebGLValidateMapBufferTarget(target)) {
            GL.recordError(1280);
            err("GL_INVALID_ENUM in glUnmapBuffer");
            return 0
        }
        var buffer = emscriptenWebGLGetBufferBinding(target);
        var mapping = GL.mappedBuffers[buffer];
        if (!mapping) {
            GL.recordError(1282);
            Module.printError("buffer was never mapped in glUnmapBuffer");
            return 0
        }
        GL.mappedBuffers[buffer] = null;
        if (!(mapping.access & 16))
            if (GL.currentContext.supportsWebGL2EntryPoints) {
                GLctx.bufferSubData(target, mapping.offset, HEAPU8, mapping.mem, mapping.length)
            } else {
                GLctx.bufferSubData(target, mapping.offset, HEAPU8.subarray(mapping.mem, mapping.mem + mapping.length))
            }
        _free(mapping.mem);
        return 1
    }
    function _glUseProgram(program) {
        GLctx.useProgram(program ? GL.programs[program] : null)
    }
    function _glValidateProgram(program) {
        GLctx.validateProgram(GL.programs[program])
    }
    function _glVertexAttrib4f(x0, x1, x2, x3, x4) {
        GLctx["vertexAttrib4f"](x0, x1, x2, x3, x4)
    }
    function _glVertexAttrib4fv(index, v) {
        GLctx.vertexAttrib4f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2], HEAPF32[v + 8 >> 2], HEAPF32[v + 12 >> 2])
    }
    function _glVertexAttribIPointer(index, size, type, stride, ptr) {
        var cb = GL.currentContext.clientBuffers[index];
        if (!GL.currArrayBuffer) {
            cb.size = size;
            cb.type = type;
            cb.normalized = false;
            cb.stride = stride;
            cb.ptr = ptr;
            cb.clientside = true;
            return
        }
        cb.clientside = false;
        GLctx.vertexAttribIPointer(index, size, type, stride, ptr)
    }
    function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
        GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr)
    }
    function _glViewport(x0, x1, x2, x3) {
        GLctx["viewport"](x0, x1, x2, x3)
    }
    var ___tm_current = STATICTOP;
    STATICTOP += 48;
    var ___tm_timezone = allocate(intArrayFromString("GMT"), "i8", ALLOC_STATIC);
    function _gmtime_r(time, tmPtr) {
        var date = new Date(HEAP32[time >> 2] * 1e3);
        HEAP32[tmPtr >> 2] = date.getUTCSeconds();
        HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
        HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
        HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
        HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
        HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
        HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
        HEAP32[tmPtr + 36 >> 2] = 0;
        HEAP32[tmPtr + 32 >> 2] = 0;
        var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
        var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
        HEAP32[tmPtr + 28 >> 2] = yday;
        HEAP32[tmPtr + 40 >> 2] = ___tm_timezone;
        return tmPtr
    }
    function _gmtime(time) {
        return _gmtime_r(time, ___tm_current)
    }
    function _inet_addr(ptr) {
        var addr = __inet_pton4_raw(Pointer_stringify(ptr));
        if (addr === null) {
            return -1
        }
        return addr
    }
    var _llvm_ceil_f32 = Math_ceil;
    var _llvm_ceil_f64 = Math_ceil;
    function _llvm_copysign_f64(x, y) {
        return y < 0 || y === 0 && 1 / y < 0 ? -Math_abs(x) : Math_abs(x)
    }
    function _llvm_cttz_i32(x) {
        x = x | 0;
        return (x ? 31 - (Math_clz32(x ^ x - 1) | 0) | 0 : 32) | 0
    }
    function _llvm_eh_typeid_for(type) {
        return type
    }
    function _llvm_exp2_f32(x) {
        return Math.pow(2, x)
    }
    var _llvm_fabs_f32 = Math_abs;
    var _llvm_fabs_f64 = Math_abs;
    var _llvm_floor_f32 = Math_floor;
    var _llvm_floor_f64 = Math_floor;
    function _llvm_log10_f32(x) {
        return Math.log(x) / Math.LN10
    }
    function _llvm_log2_f32(x) {
        return Math.log(x) / Math.LN2
    }
    var _llvm_pow_f64 = Math_pow;
    var _llvm_sqrt_f32 = Math_sqrt;
    function _llvm_trap() {
        abort("trap!")
    }
    var _llvm_trunc_f32 = Math_trunc;
    function _tzset() {
        if (_tzset.called)
            return;
        _tzset.called = true;
        HEAP32[__get_timezone() >> 2] = (new Date).getTimezoneOffset() * 60;
        var currentYear = (new Date).getFullYear();
        var winter = new Date(currentYear,0,1);
        var summer = new Date(currentYear,6,1);
        HEAP32[__get_daylight() >> 2] = Number(winter.getTimezoneOffset() != summer.getTimezoneOffset());
        function extractZone(date) {
            var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
            return match ? match[1] : "GMT"
        }
        var winterName = extractZone(winter);
        var summerName = extractZone(summer);
        var winterNamePtr = allocate(intArrayFromString(winterName), "i8", ALLOC_NORMAL);
        var summerNamePtr = allocate(intArrayFromString(summerName), "i8", ALLOC_NORMAL);
        if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
            HEAP32[__get_tzname() >> 2] = winterNamePtr;
            HEAP32[__get_tzname() + 4 >> 2] = summerNamePtr
        } else {
            HEAP32[__get_tzname() >> 2] = summerNamePtr;
            HEAP32[__get_tzname() + 4 >> 2] = winterNamePtr
        }
    }
    function _localtime_r(time, tmPtr) {
        _tzset();
        var date = new Date(HEAP32[time >> 2] * 1e3);
        HEAP32[tmPtr >> 2] = date.getSeconds();
        HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
        HEAP32[tmPtr + 8 >> 2] = date.getHours();
        HEAP32[tmPtr + 12 >> 2] = date.getDate();
        HEAP32[tmPtr + 16 >> 2] = date.getMonth();
        HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
        HEAP32[tmPtr + 24 >> 2] = date.getDay();
        var start = new Date(date.getFullYear(),0,1);
        var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
        HEAP32[tmPtr + 28 >> 2] = yday;
        HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
        var summerOffset = (new Date(date.getFullYear(),6,1)).getTimezoneOffset();
        var winterOffset = start.getTimezoneOffset();
        var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
        HEAP32[tmPtr + 32 >> 2] = dst;
        var zonePtr = HEAP32[__get_tzname() + (dst ? 4 : 0) >> 2];
        HEAP32[tmPtr + 40 >> 2] = zonePtr;
        return tmPtr
    }
    function _localtime(time) {
        return _localtime_r(time, ___tm_current)
    }
    function _emscripten_memcpy_big(dest, src, num) {
        HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
        return dest
    }
    function _mktime(tmPtr) {
        _tzset();
        var date = new Date(HEAP32[tmPtr + 20 >> 2] + 1900,HEAP32[tmPtr + 16 >> 2],HEAP32[tmPtr + 12 >> 2],HEAP32[tmPtr + 8 >> 2],HEAP32[tmPtr + 4 >> 2],HEAP32[tmPtr >> 2],0);
        var dst = HEAP32[tmPtr + 32 >> 2];
        var guessedOffset = date.getTimezoneOffset();
        var start = new Date(date.getFullYear(),0,1);
        var summerOffset = (new Date(date.getFullYear(),6,1)).getTimezoneOffset();
        var winterOffset = start.getTimezoneOffset();
        var dstOffset = Math.min(winterOffset, summerOffset);
        if (dst < 0) {
            HEAP32[tmPtr + 32 >> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset)
        } else if (dst > 0 != (dstOffset == guessedOffset)) {
            var nonDstOffset = Math.max(winterOffset, summerOffset);
            var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
            date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4)
        }
        HEAP32[tmPtr + 24 >> 2] = date.getDay();
        var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
        HEAP32[tmPtr + 28 >> 2] = yday;
        return date.getTime() / 1e3 | 0
    }
    function _usleep(useconds) {
        var msec = useconds / 1e3;
        if ((ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && self["performance"] && self["performance"]["now"]) {
            var start = self["performance"]["now"]();
            while (self["performance"]["now"]() - start < msec) {}
        } else {
            var start = Date.now();
            while (Date.now() - start < msec) {}
        }
        return 0
    }
    function _nanosleep(rqtp, rmtp) {
        var seconds = HEAP32[rqtp >> 2];
        var nanoseconds = HEAP32[rqtp + 4 >> 2];
        if (rmtp !== 0) {
            HEAP32[rmtp >> 2] = 0;
            HEAP32[rmtp + 4 >> 2] = 0
        }
        return _usleep(seconds * 1e6 + nanoseconds / 1e3)
    }
    function _pthread_cond_destroy() {
        return 0
    }
    function _pthread_cond_init() {
        return 0
    }
    function _pthread_cond_timedwait() {
        return 0
    }
    function _pthread_cond_wait() {
        return 0
    }
    var PTHREAD_SPECIFIC = {};
    function _pthread_getspecific(key) {
        return PTHREAD_SPECIFIC[key] || 0
    }
    var PTHREAD_SPECIFIC_NEXT_KEY = 1;
    function _pthread_key_create(key, destructor) {
        if (key == 0) {
            return ERRNO_CODES.EINVAL
        }
        HEAP32[key >> 2] = PTHREAD_SPECIFIC_NEXT_KEY;
        PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY] = 0;
        PTHREAD_SPECIFIC_NEXT_KEY++;
        return 0
    }
    function _pthread_key_delete(key) {
        if (key in PTHREAD_SPECIFIC) {
            delete PTHREAD_SPECIFIC[key];
            return 0
        }
        return ERRNO_CODES.EINVAL
    }
    function _pthread_mutex_destroy() {}
    function _pthread_mutex_init() {}
    function _pthread_mutexattr_destroy() {}
    function _pthread_mutexattr_init() {}
    function _pthread_mutexattr_setprotocol() {}
    function _pthread_mutexattr_settype() {}
    function _pthread_once(ptr, func) {
        if (!_pthread_once.seen)
            _pthread_once.seen = {};
        if (ptr in _pthread_once.seen)
            return;
        Module["dynCall_v"](func);
        _pthread_once.seen[ptr] = 1
    }
    function _pthread_setspecific(key, value) {
        if (!(key in PTHREAD_SPECIFIC)) {
            return ERRNO_CODES.EINVAL
        }
        PTHREAD_SPECIFIC[key] = value;
        return 0
    }
    function _sched_yield() {
        return 0
    }
    function _setenv(envname, envval, overwrite) {
        if (envname === 0) {
            ___setErrNo(ERRNO_CODES.EINVAL);
            return -1
        }
        var name = Pointer_stringify(envname);
        var val = Pointer_stringify(envval);
        if (name === "" || name.indexOf("=") !== -1) {
            ___setErrNo(ERRNO_CODES.EINVAL);
            return -1
        }
        if (ENV.hasOwnProperty(name) && !overwrite)
            return 0;
        ENV[name] = val;
        ___buildEnvironment(__get_environ());
        return 0
    }
    function _sigaction(signum, act, oldact) {
        return 0
    }
    function _sigemptyset(set) {
        HEAP32[set >> 2] = 0;
        return 0
    }
    function __isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    }
    function __arraySum(array, index) {
        var sum = 0;
        for (var i = 0; i <= index; sum += array[i++])
            ;
        return sum
    }
    var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function __addDays(date, days) {
        var newDate = new Date(date.getTime());
        while (days > 0) {
            var leap = __isLeapYear(newDate.getFullYear());
            var currentMonth = newDate.getMonth();
            var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
            if (days > daysInCurrentMonth - newDate.getDate()) {
                days -= daysInCurrentMonth - newDate.getDate() + 1;
                newDate.setDate(1);
                if (currentMonth < 11) {
                    newDate.setMonth(currentMonth + 1)
                } else {
                    newDate.setMonth(0);
                    newDate.setFullYear(newDate.getFullYear() + 1)
                }
            } else {
                newDate.setDate(newDate.getDate() + days);
                return newDate
            }
        }
        return newDate
    }
    function _strftime(s, maxsize, format, tm) {
        var tm_zone = HEAP32[tm + 40 >> 2];
        var date = {
            tm_sec: HEAP32[tm >> 2],
            tm_min: HEAP32[tm + 4 >> 2],
            tm_hour: HEAP32[tm + 8 >> 2],
            tm_mday: HEAP32[tm + 12 >> 2],
            tm_mon: HEAP32[tm + 16 >> 2],
            tm_year: HEAP32[tm + 20 >> 2],
            tm_wday: HEAP32[tm + 24 >> 2],
            tm_yday: HEAP32[tm + 28 >> 2],
            tm_isdst: HEAP32[tm + 32 >> 2],
            tm_gmtoff: HEAP32[tm + 36 >> 2],
            tm_zone: tm_zone ? Pointer_stringify(tm_zone) : ""
        };
        var pattern = Pointer_stringify(format);
        var EXPANSION_RULES_1 = {
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m/%d/%y",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%r": "%I:%M:%S %p",
            "%R": "%H:%M",
            "%T": "%H:%M:%S",
            "%x": "%m/%d/%y",
            "%X": "%H:%M:%S"
        };
        for (var rule in EXPANSION_RULES_1) {
            pattern = pattern.replace(new RegExp(rule,"g"), EXPANSION_RULES_1[rule])
        }
        var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        function leadingSomething(value, digits, character) {
            var str = typeof value === "number" ? value.toString() : value || "";
            while (str.length < digits) {
                str = character[0] + str
            }
            return str
        }
        function leadingNulls(value, digits) {
            return leadingSomething(value, digits, "0")
        }
        function compareByDay(date1, date2) {
            function sgn(value) {
                return value < 0 ? -1 : value > 0 ? 1 : 0
            }
            var compare;
            if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
                if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
                    compare = sgn(date1.getDate() - date2.getDate())
                }
            }
            return compare
        }
        function getFirstWeekStartDate(janFourth) {
            switch (janFourth.getDay()) {
            case 0:
                return new Date(janFourth.getFullYear() - 1,11,29);
            case 1:
                return janFourth;
            case 2:
                return new Date(janFourth.getFullYear(),0,3);
            case 3:
                return new Date(janFourth.getFullYear(),0,2);
            case 4:
                return new Date(janFourth.getFullYear(),0,1);
            case 5:
                return new Date(janFourth.getFullYear() - 1,11,31);
            case 6:
                return new Date(janFourth.getFullYear() - 1,11,30)
            }
        }
        function getWeekBasedYear(date) {
            var thisDate = __addDays(new Date(date.tm_year + 1900,0,1), date.tm_yday);
            var janFourthThisYear = new Date(thisDate.getFullYear(),0,4);
            var janFourthNextYear = new Date(thisDate.getFullYear() + 1,0,4);
            var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
            var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
            if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
                if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
                    return thisDate.getFullYear() + 1
                } else {
                    return thisDate.getFullYear()
                }
            } else {
                return thisDate.getFullYear() - 1
            }
        }
        var EXPANSION_RULES_2 = {
            "%a": (function(date) {
                return WEEKDAYS[date.tm_wday].substring(0, 3)
            }
            ),
            "%A": (function(date) {
                return WEEKDAYS[date.tm_wday]
            }
            ),
            "%b": (function(date) {
                return MONTHS[date.tm_mon].substring(0, 3)
            }
            ),
            "%B": (function(date) {
                return MONTHS[date.tm_mon]
            }
            ),
            "%C": (function(date) {
                var year = date.tm_year + 1900;
                return leadingNulls(year / 100 | 0, 2)
            }
            ),
            "%d": (function(date) {
                return leadingNulls(date.tm_mday, 2)
            }
            ),
            "%e": (function(date) {
                return leadingSomething(date.tm_mday, 2, " ")
            }
            ),
            "%g": (function(date) {
                return getWeekBasedYear(date).toString().substring(2)
            }
            ),
            "%G": (function(date) {
                return getWeekBasedYear(date)
            }
            ),
            "%H": (function(date) {
                return leadingNulls(date.tm_hour, 2)
            }
            ),
            "%I": (function(date) {
                var twelveHour = date.tm_hour;
                if (twelveHour == 0)
                    twelveHour = 12;
                else if (twelveHour > 12)
                    twelveHour -= 12;
                return leadingNulls(twelveHour, 2)
            }
            ),
            "%j": (function(date) {
                return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3)
            }
            ),
            "%m": (function(date) {
                return leadingNulls(date.tm_mon + 1, 2)
            }
            ),
            "%M": (function(date) {
                return leadingNulls(date.tm_min, 2)
            }
            ),
            "%n": (function() {
                return "\n"
            }
            ),
            "%p": (function(date) {
                if (date.tm_hour >= 0 && date.tm_hour < 12) {
                    return "AM"
                } else {
                    return "PM"
                }
            }
            ),
            "%S": (function(date) {
                return leadingNulls(date.tm_sec, 2)
            }
            ),
            "%t": (function() {
                return "\t"
            }
            ),
            "%u": (function(date) {
                var day = new Date(date.tm_year + 1900,date.tm_mon + 1,date.tm_mday,0,0,0,0);
                return day.getDay() || 7
            }
            ),
            "%U": (function(date) {
                var janFirst = new Date(date.tm_year + 1900,0,1);
                var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
                var endDate = new Date(date.tm_year + 1900,date.tm_mon,date.tm_mday);
                if (compareByDay(firstSunday, endDate) < 0) {
                    var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
                    var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
                    var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
                    return leadingNulls(Math.ceil(days / 7), 2)
                }
                return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00"
            }
            ),
            "%V": (function(date) {
                var janFourthThisYear = new Date(date.tm_year + 1900,0,4);
                var janFourthNextYear = new Date(date.tm_year + 1901,0,4);
                var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
                var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
                var endDate = __addDays(new Date(date.tm_year + 1900,0,1), date.tm_yday);
                if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
                    return "53"
                }
                if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
                    return "01"
                }
                var daysDifference;
                if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
                    daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate()
                } else {
                    daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate()
                }
                return leadingNulls(Math.ceil(daysDifference / 7), 2)
            }
            ),
            "%w": (function(date) {
                var day = new Date(date.tm_year + 1900,date.tm_mon + 1,date.tm_mday,0,0,0,0);
                return day.getDay()
            }
            ),
            "%W": (function(date) {
                var janFirst = new Date(date.tm_year,0,1);
                var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
                var endDate = new Date(date.tm_year + 1900,date.tm_mon,date.tm_mday);
                if (compareByDay(firstMonday, endDate) < 0) {
                    var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
                    var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
                    var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
                    return leadingNulls(Math.ceil(days / 7), 2)
                }
                return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00"
            }
            ),
            "%y": (function(date) {
                return (date.tm_year + 1900).toString().substring(2)
            }
            ),
            "%Y": (function(date) {
                return date.tm_year + 1900
            }
            ),
            "%z": (function(date) {
                var off = date.tm_gmtoff;
                var ahead = off >= 0;
                off = Math.abs(off) / 60;
                off = off / 60 * 100 + off % 60;
                return (ahead ? "+" : "-") + String("0000" + off).slice(-4)
            }
            ),
            "%Z": (function(date) {
                return date.tm_zone
            }
            ),
            "%%": (function() {
                return "%"
            }
            )
        };
        for (var rule in EXPANSION_RULES_2) {
            if (pattern.indexOf(rule) >= 0) {
                pattern = pattern.replace(new RegExp(rule,"g"), EXPANSION_RULES_2[rule](date))
            }
        }
        var bytes = intArrayFromString(pattern, false);
        if (bytes.length > maxsize) {
            return 0
        }
        writeArrayToMemory(bytes, s);
        return bytes.length - 1
    }
    function _sysconf(name) {
        switch (name) {
        case 30:
            return PAGE_SIZE;
        case 85:
            var maxHeapSize = 2 * 1024 * 1024 * 1024 - 65536;
            return maxHeapSize / PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
            return 200809;
        case 79:
            return 0;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
            return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
            return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
            return 1024;
        case 31:
        case 42:
        case 72:
            return 32;
        case 87:
        case 26:
        case 33:
            return 2147483647;
        case 34:
        case 1:
            return 47839;
        case 38:
        case 36:
            return 99;
        case 43:
        case 37:
            return 2048;
        case 0:
            return 2097152;
        case 3:
            return 65536;
        case 28:
            return 32768;
        case 44:
            return 32767;
        case 75:
            return 16384;
        case 39:
            return 1e3;
        case 89:
            return 700;
        case 71:
            return 256;
        case 40:
            return 255;
        case 2:
            return 100;
        case 180:
            return 64;
        case 25:
            return 20;
        case 5:
            return 16;
        case 6:
            return 6;
        case 73:
            return 4;
        case 84:
            {
                if (typeof navigator === "object")
                    return navigator["hardwareConcurrency"] || 1;
                return 1
            }
        }
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1
    }
    function _time(ptr) {
        var ret = Date.now() / 1e3 | 0;
        if (ptr) {
            HEAP32[ptr >> 2] = ret
        }
        return ret
    }
    function _unsetenv(name) {
        if (name === 0) {
            ___setErrNo(ERRNO_CODES.EINVAL);
            return -1
        }
        name = Pointer_stringify(name);
        if (name === "" || name.indexOf("=") !== -1) {
            ___setErrNo(ERRNO_CODES.EINVAL);
            return -1
        }
        if (ENV.hasOwnProperty(name)) {
            delete ENV[name];
            ___buildEnvironment(__get_environ())
        }
        return 0
    }
    function _utime(path, times) {
        var time;
        if (times) {
            var offset = 4;
            time = HEAP32[times + offset >> 2];
            time *= 1e3
        } else {
            time = Date.now()
        }
        path = Pointer_stringify(path);
        try {
            FS.utime(path, time, time);
            return 0
        } catch (e) {
            FS.handleFSError(e);
            return -1
        }
    }
    FS.staticInit();
    __ATINIT__.unshift((function() {
        if (!Module["noFSInit"] && !FS.init.initialized)
            FS.init()
    }
    ));
    __ATMAIN__.push((function() {
        FS.ignorePermissions = false
    }
    ));
    __ATEXIT__.push((function() {
        FS.quit()
    }
    ));
    Module["FS_createPath"] = FS.createPath;
    Module["FS_createDataFile"] = FS.createDataFile;
    __ATINIT__.unshift((function() {
        TTY.init()
    }
    ));
    __ATEXIT__.push((function() {
        TTY.shutdown()
    }
    ));
    if (ENVIRONMENT_IS_NODE) {
        var fs = require("fs");
        var NODEJS_PATH = require("path");
        NODEFS.staticInit()
    }
    __ATINIT__.push((function() {
        SOCKFS.root = FS.mount(SOCKFS, {}, null)
    }
    ));
    if (ENVIRONMENT_IS_NODE) {
        _emscripten_get_now = function _emscripten_get_now_actual() {
            var t = process["hrtime"]();
            return t[0] * 1e3 + t[1] / 1e6
        }
    } else if (typeof dateNow !== "undefined") {
        _emscripten_get_now = dateNow
    } else if (typeof self === "object" && self["performance"] && typeof self["performance"]["now"] === "function") {
        _emscripten_get_now = (function() {
            return self["performance"]["now"]()
        }
        )
    } else if (typeof performance === "object" && typeof performance["now"] === "function") {
        _emscripten_get_now = (function() {
            return performance["now"]()
        }
        )
    } else {
        _emscripten_get_now = Date.now
    }
    Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas, vrDevice) {
        err("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead.");
        Module["requestFullScreen"] = Module["requestFullscreen"];
        Browser.requestFullScreen(lockPointer, resizeCanvas, vrDevice)
    }
    ;
    Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas, vrDevice) {
        Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice)
    }
    ;
    Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
        Browser.requestAnimationFrame(func)
    }
    ;
    Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
        Browser.setCanvasSize(width, height, noUpdates)
    }
    ;
    Module["pauseMainLoop"] = function Module_pauseMainLoop() {
        Browser.mainLoop.pause()
    }
    ;
    Module["resumeMainLoop"] = function Module_resumeMainLoop() {
        Browser.mainLoop.resume()
    }
    ;
    Module["getUserMedia"] = function Module_getUserMedia() {
        Browser.getUserMedia()
    }
    ;
    Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
        return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes)
    }
    ;
    JSEvents.staticInit();
    var GLctx;
    GL.init();
    DYNAMICTOP_PTR = staticAlloc(4);
    STACK_BASE = STACKTOP = alignMemory(STATICTOP);
    STACK_MAX = STACK_BASE + TOTAL_STACK;
    DYNAMIC_BASE = alignMemory(STACK_MAX);
    HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
    staticSealed = true;
    function intArrayFromString(stringy, dontAddNull, length) {
        var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
        var u8array = new Array(len);
        var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
        if (dontAddNull)
            u8array.length = numBytesWritten;
        return u8array
    }
    Module["wasmTableSize"] = 48460;
    Module["wasmMaxTableSize"] = 48460;
    function invoke_dddi(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_dddi"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ddi(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_ddi"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_dfi(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_dfi"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_di(index, a1) {
        var sp = stackSave();
        try {
            return Module["dynCall_di"](index, a1)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_diddi(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_diddi"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_didi(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_didi"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_dii(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_dii"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_diii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_diii"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_diiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_diiii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_dji(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_dji"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_f(index) {
        var sp = stackSave();
        try {
            return Module["dynCall_f"](index)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fdi(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_fdi"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ff(index, a1) {
        var sp = stackSave();
        try {
            return Module["dynCall_ff"](index, a1)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fff(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_fff"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ffffi(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_ffffi"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fffi(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_fffi"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fffifffi(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            return Module["dynCall_fffifffi"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ffi(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_ffi"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fi(index, a1) {
        var sp = stackSave();
        try {
            return Module["dynCall_fi"](index, a1)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fif(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_fif"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fiff(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_fiff"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fiffi(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_fiffi"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fifi(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_fifi"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fifii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_fifii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fii(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_fii"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fiifi(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_fiifi"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fiifii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_fiifii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fiii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_fiii"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fiiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_fiiii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fiiiiiifiifif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
        var sp = stackSave();
        try {
            return Module["dynCall_fiiiiiifiifif"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fiiiiiifiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
        var sp = stackSave();
        try {
            return Module["dynCall_fiiiiiifiiiif"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_fji(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_fji"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_i(index) {
        var sp = stackSave();
        try {
            return Module["dynCall_i"](index)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_idi(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_idi"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_idiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_idiii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ifffi(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_ifffi"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iffi(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_iffi"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ifi(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_ifi"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ifiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_ifiii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ii(index, a1) {
        var sp = stackSave();
        try {
            return Module["dynCall_ii"](index, a1)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iidi(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_iidi"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iidii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_iidii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iif(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_iif"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iifff(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_iifff"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iifffi(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_iifffi"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiffi(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiffi"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iifi(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_iifi"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iifii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_iifii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iifiii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_iifiii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iifiiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
            return Module["dynCall_iifiiiijii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iii(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_iii"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiif(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiif"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiff(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiff"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiifi(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiifi"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiifii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiifii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiifiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiifiii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiifiiii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiifiiii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiii"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiifffffi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiifffffi"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiifffffii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiifffffii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiifffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiifffiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiifi(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiifi"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiifii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiifii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiifiii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiifiii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiifiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiifiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiifiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiifiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiifiii"](index, a1, a2, a3, a4, a5, a6, a7, a8)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiifiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiifiiiiif"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiifff(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiifff"](index, a1, a2, a3, a4, a5, a6, a7, a8)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiifffiiifiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiifffiiifiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiiffiiiiiiiiiffffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiiffiiiiiiiiiffffiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiiffiiiiiiiiiffffiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiiffiiiiiiiiiffffiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiiffiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiiffiiiiiiiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiifiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiifiif"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiifiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiifiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiiifiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiiifiif"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiiji(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiiji"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiij(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiij"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiiji(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiiji"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiijii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiijii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiijiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiijiii"](index, a1, a2, a3, a4, a5, a6, a7, a8)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiij(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiij"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiiji(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiiji"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiijii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiijii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiijiii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiijiii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iij(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_iij"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iiji(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_iiji"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iijii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_iijii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iijiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            return Module["dynCall_iijiii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iijji(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            return Module["dynCall_iijji"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iijjii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            return Module["dynCall_iijjii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iijjiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
            return Module["dynCall_iijjiii"](index, a1, a2, a3, a4, a5, a6, a7, a8)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iijjji(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
            return Module["dynCall_iijjji"](index, a1, a2, a3, a4, a5, a6, a7, a8)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ij(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_ij"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_iji(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_iji"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ijiii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_ijiii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ijj(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_ijj"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ijji(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_ijji"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_j(index) {
        var sp = stackSave();
        try {
            return Module["dynCall_j"](index)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jdi(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_jdi"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jdii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_jdii"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jfi(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_jfi"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_ji(index, a1) {
        var sp = stackSave();
        try {
            return Module["dynCall_ji"](index, a1)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jidi(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_jidi"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jidii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_jidii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jii(index, a1, a2) {
        var sp = stackSave();
        try {
            return Module["dynCall_jii"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jiii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_jiii"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jiiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_jiiii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jiiiii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_jiiiii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jiiiiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            return Module["dynCall_jiiiiii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
            return Module["dynCall_jiiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jiiji(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_jiiji"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jiji(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            return Module["dynCall_jiji"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jijii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_jijii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jijiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            return Module["dynCall_jijiii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jijj(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            return Module["dynCall_jijj"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jijji(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            return Module["dynCall_jijji"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_jji(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            return Module["dynCall_jji"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_v(index) {
        var sp = stackSave();
        try {
            Module["dynCall_v"](index)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vd(index, a1) {
        var sp = stackSave();
        try {
            Module["dynCall_vd"](index, a1)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vf(index, a1) {
        var sp = stackSave();
        try {
            Module["dynCall_vf"](index, a1)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vff(index, a1, a2) {
        var sp = stackSave();
        try {
            Module["dynCall_vff"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vffff(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            Module["dynCall_vffff"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vfi(index, a1, a2) {
        var sp = stackSave();
        try {
            Module["dynCall_vfi"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vi(index, a1) {
        var sp = stackSave();
        try {
            Module["dynCall_vi"](index, a1)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vid(index, a1, a2) {
        var sp = stackSave();
        try {
            Module["dynCall_vid"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vidi(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            Module["dynCall_vidi"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vif(index, a1, a2) {
        var sp = stackSave();
        try {
            Module["dynCall_vif"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viff(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            Module["dynCall_viff"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vifff(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            Module["dynCall_vifff"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viffff(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_viffff"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viffffi(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viffffi"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viffffii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_viffffii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viffffiifffiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
        var sp = stackSave();
        try {
            Module["dynCall_viffffiifffiiiiif"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vifffi(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_vifffi"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vifffii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_vifffii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viffi(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            Module["dynCall_viffi"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viffii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_viffii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viffiifffffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
        var sp = stackSave();
        try {
            Module["dynCall_viffiifffffiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viffiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viffiii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viffiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
            Module["dynCall_viffiiiif"](index, a1, a2, a3, a4, a5, a6, a7, a8)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vifi(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            Module["dynCall_vifi"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vifii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            Module["dynCall_vifii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vifiiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_vifiiii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vifijii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_vifijii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vii(index, a1, a2) {
        var sp = stackSave();
        try {
            Module["dynCall_vii"](index, a1, a2)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viid(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            Module["dynCall_viid"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viidi(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            Module["dynCall_viidi"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viidii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_viidii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viif(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            Module["dynCall_viif"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiff(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            Module["dynCall_viiff"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viifff(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_viifff"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viifffi(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viifffi"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiffi(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_viiffi"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiffii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viiffii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viifi(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            Module["dynCall_viifi"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viifii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_viifii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viifiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viifiii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viifiiii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_viifiiii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            Module["dynCall_viii"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiidi(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_viiidi"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiif(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            Module["dynCall_viiif"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiifffi(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_viiifffi"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiffi(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiffi"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiffii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiffii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiifi(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_viiifi"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiifii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viiifii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiifiii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_viiifiii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            Module["dynCall_viiifiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            Module["dynCall_viiii"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiif(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiif"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiifii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiifii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiifiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiifiiiiif"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiif(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiif"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiffi(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiffi"](index, a1, a2, a3, a4, a5, a6, a7, a8)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiffii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiffii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiifi(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiifi"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiif(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiif"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiiifi"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiiiiiiifii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiiiiiiifii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiiiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiiiiiiiiiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiij(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiij"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiijiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiijiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiiji(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viiiji"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiijji(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
            Module["dynCall_viiijji"](index, a1, a2, a3, a4, a5, a6, a7, a8)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viij(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            Module["dynCall_viij"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viiji(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_viiji"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viijii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viijii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viijiijiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
        var sp = stackSave();
        try {
            Module["dynCall_viijiijiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viijijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            Module["dynCall_viijijii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viijijiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
            Module["dynCall_viijijiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viijijj(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            Module["dynCall_viijijj"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viijj(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_viijj"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viijji(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_viijji"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viijjiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            Module["dynCall_viijjiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viijjji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            Module["dynCall_viijjji"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vij(index, a1, a2, a3) {
        var sp = stackSave();
        try {
            Module["dynCall_vij"](index, a1, a2, a3)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_viji(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
            Module["dynCall_viji"](index, a1, a2, a3, a4)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vijii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_vijii"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vijiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_vijiii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vijiji(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_vijiji"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vijijji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
            Module["dynCall_vijijji"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vijji(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_vijji"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vijjii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
            Module["dynCall_vijjii"](index, a1, a2, a3, a4, a5, a6, a7)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vjiiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
            Module["dynCall_vjiiii"](index, a1, a2, a3, a4, a5, a6)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    function invoke_vjji(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
            Module["dynCall_vjji"](index, a1, a2, a3, a4, a5)
        } catch (e) {
            stackRestore(sp);
            if (typeof e !== "number" && e !== "longjmp")
                throw e;
            Module["setThrew"](1, 0)
        }
    }
    Module.asmGlobalArg = {};
    Module.asmLibraryArg = {
        "abort": abort,
        "assert": assert,
        "enlargeMemory": enlargeMemory,
        "getTotalMemory": getTotalMemory,
        "abortOnCannotGrowMemory": abortOnCannotGrowMemory,
        "invoke_dddi": invoke_dddi,
        "invoke_ddi": invoke_ddi,
        "invoke_dfi": invoke_dfi,
        "invoke_di": invoke_di,
        "invoke_diddi": invoke_diddi,
        "invoke_didi": invoke_didi,
        "invoke_dii": invoke_dii,
        "invoke_diii": invoke_diii,
        "invoke_diiii": invoke_diiii,
        "invoke_dji": invoke_dji,
        "invoke_f": invoke_f,
        "invoke_fdi": invoke_fdi,
        "invoke_ff": invoke_ff,
        "invoke_fff": invoke_fff,
        "invoke_ffffi": invoke_ffffi,
        "invoke_fffi": invoke_fffi,
        "invoke_fffifffi": invoke_fffifffi,
        "invoke_ffi": invoke_ffi,
        "invoke_fi": invoke_fi,
        "invoke_fif": invoke_fif,
        "invoke_fiff": invoke_fiff,
        "invoke_fiffi": invoke_fiffi,
        "invoke_fifi": invoke_fifi,
        "invoke_fifii": invoke_fifii,
        "invoke_fii": invoke_fii,
        "invoke_fiifi": invoke_fiifi,
        "invoke_fiifii": invoke_fiifii,
        "invoke_fiii": invoke_fiii,
        "invoke_fiiii": invoke_fiiii,
        "invoke_fiiiiiifiifif": invoke_fiiiiiifiifif,
        "invoke_fiiiiiifiiiif": invoke_fiiiiiifiiiif,
        "invoke_fji": invoke_fji,
        "invoke_i": invoke_i,
        "invoke_idi": invoke_idi,
        "invoke_idiii": invoke_idiii,
        "invoke_ifffi": invoke_ifffi,
        "invoke_iffi": invoke_iffi,
        "invoke_ifi": invoke_ifi,
        "invoke_ifiii": invoke_ifiii,
        "invoke_ii": invoke_ii,
        "invoke_iidi": invoke_iidi,
        "invoke_iidii": invoke_iidii,
        "invoke_iif": invoke_iif,
        "invoke_iifff": invoke_iifff,
        "invoke_iifffi": invoke_iifffi,
        "invoke_iiffi": invoke_iiffi,
        "invoke_iifi": invoke_iifi,
        "invoke_iifii": invoke_iifii,
        "invoke_iifiii": invoke_iifiii,
        "invoke_iifiiiijii": invoke_iifiiiijii,
        "invoke_iii": invoke_iii,
        "invoke_iiif": invoke_iiif,
        "invoke_iiiff": invoke_iiiff,
        "invoke_iiifi": invoke_iiifi,
        "invoke_iiifii": invoke_iiifii,
        "invoke_iiifiii": invoke_iiifiii,
        "invoke_iiifiiii": invoke_iiifiiii,
        "invoke_iiii": invoke_iiii,
        "invoke_iiiifffffi": invoke_iiiifffffi,
        "invoke_iiiifffffii": invoke_iiiifffffii,
        "invoke_iiiifffiii": invoke_iiiifffiii,
        "invoke_iiiifi": invoke_iiiifi,
        "invoke_iiiifii": invoke_iiiifii,
        "invoke_iiiifiii": invoke_iiiifiii,
        "invoke_iiiifiiii": invoke_iiiifiiii,
        "invoke_iiiifiiiii": invoke_iiiifiiiii,
        "invoke_iiiii": invoke_iiiii,
        "invoke_iiiiifiii": invoke_iiiiifiii,
        "invoke_iiiiifiiiiif": invoke_iiiiifiiiiif,
        "invoke_iiiiii": invoke_iiiiii,
        "invoke_iiiiiifff": invoke_iiiiiifff,
        "invoke_iiiiiifffiiifiii": invoke_iiiiiifffiiifiii,
        "invoke_iiiiiiffiiiiiiiiiffffiii": invoke_iiiiiiffiiiiiiiiiffffiii,
        "invoke_iiiiiiffiiiiiiiiiffffiiii": invoke_iiiiiiffiiiiiiiiiffffiiii,
        "invoke_iiiiiiffiiiiiiiiiiiiiii": invoke_iiiiiiffiiiiiiiiiiiiiii,
        "invoke_iiiiiifiif": invoke_iiiiiifiif,
        "invoke_iiiiiifiii": invoke_iiiiiifiii,
        "invoke_iiiiiii": invoke_iiiiiii,
        "invoke_iiiiiiifiif": invoke_iiiiiiifiif,
        "invoke_iiiiiiii": invoke_iiiiiiii,
        "invoke_iiiiiiiii": invoke_iiiiiiiii,
        "invoke_iiiiiiiiii": invoke_iiiiiiiiii,
        "invoke_iiiiiiiiiii": invoke_iiiiiiiiiii,
        "invoke_iiiiiiiiiiii": invoke_iiiiiiiiiiii,
        "invoke_iiiiiiiiiiiii": invoke_iiiiiiiiiiiii,
        "invoke_iiiiiiiiiiiiii": invoke_iiiiiiiiiiiiii,
        "invoke_iiiiiji": invoke_iiiiiji,
        "invoke_iiiij": invoke_iiiij,
        "invoke_iiiiji": invoke_iiiiji,
        "invoke_iiiijii": invoke_iiiijii,
        "invoke_iiiijiii": invoke_iiiijiii,
        "invoke_iiij": invoke_iiij,
        "invoke_iiiji": invoke_iiiji,
        "invoke_iiijii": invoke_iiijii,
        "invoke_iiijiii": invoke_iiijiii,
        "invoke_iij": invoke_iij,
        "invoke_iiji": invoke_iiji,
        "invoke_iijii": invoke_iijii,
        "invoke_iijiii": invoke_iijiii,
        "invoke_iijji": invoke_iijji,
        "invoke_iijjii": invoke_iijjii,
        "invoke_iijjiii": invoke_iijjiii,
        "invoke_iijjji": invoke_iijjji,
        "invoke_ij": invoke_ij,
        "invoke_iji": invoke_iji,
        "invoke_ijiii": invoke_ijiii,
        "invoke_ijj": invoke_ijj,
        "invoke_ijji": invoke_ijji,
        "invoke_j": invoke_j,
        "invoke_jdi": invoke_jdi,
        "invoke_jdii": invoke_jdii,
        "invoke_jfi": invoke_jfi,
        "invoke_ji": invoke_ji,
        "invoke_jidi": invoke_jidi,
        "invoke_jidii": invoke_jidii,
        "invoke_jii": invoke_jii,
        "invoke_jiii": invoke_jiii,
        "invoke_jiiii": invoke_jiiii,
        "invoke_jiiiii": invoke_jiiiii,
        "invoke_jiiiiii": invoke_jiiiiii,
        "invoke_jiiiiiiiiii": invoke_jiiiiiiiiii,
        "invoke_jiiji": invoke_jiiji,
        "invoke_jiji": invoke_jiji,
        "invoke_jijii": invoke_jijii,
        "invoke_jijiii": invoke_jijiii,
        "invoke_jijj": invoke_jijj,
        "invoke_jijji": invoke_jijji,
        "invoke_jji": invoke_jji,
        "invoke_v": invoke_v,
        "invoke_vd": invoke_vd,
        "invoke_vf": invoke_vf,
        "invoke_vff": invoke_vff,
        "invoke_vffff": invoke_vffff,
        "invoke_vfi": invoke_vfi,
        "invoke_vi": invoke_vi,
        "invoke_vid": invoke_vid,
        "invoke_vidi": invoke_vidi,
        "invoke_vif": invoke_vif,
        "invoke_viff": invoke_viff,
        "invoke_vifff": invoke_vifff,
        "invoke_viffff": invoke_viffff,
        "invoke_viffffi": invoke_viffffi,
        "invoke_viffffii": invoke_viffffii,
        "invoke_viffffiifffiiiiif": invoke_viffffiifffiiiiif,
        "invoke_vifffi": invoke_vifffi,
        "invoke_vifffii": invoke_vifffii,
        "invoke_viffi": invoke_viffi,
        "invoke_viffii": invoke_viffii,
        "invoke_viffiifffffiii": invoke_viffiifffffiii,
        "invoke_viffiii": invoke_viffiii,
        "invoke_viffiiiif": invoke_viffiiiif,
        "invoke_vifi": invoke_vifi,
        "invoke_vifii": invoke_vifii,
        "invoke_vifiiii": invoke_vifiiii,
        "invoke_vifijii": invoke_vifijii,
        "invoke_vii": invoke_vii,
        "invoke_viid": invoke_viid,
        "invoke_viidi": invoke_viidi,
        "invoke_viidii": invoke_viidii,
        "invoke_viif": invoke_viif,
        "invoke_viiff": invoke_viiff,
        "invoke_viifff": invoke_viifff,
        "invoke_viifffi": invoke_viifffi,
        "invoke_viiffi": invoke_viiffi,
        "invoke_viiffii": invoke_viiffii,
        "invoke_viifi": invoke_viifi,
        "invoke_viifii": invoke_viifii,
        "invoke_viifiii": invoke_viifiii,
        "invoke_viifiiii": invoke_viifiiii,
        "invoke_viii": invoke_viii,
        "invoke_viiidi": invoke_viiidi,
        "invoke_viiif": invoke_viiif,
        "invoke_viiifffi": invoke_viiifffi,
        "invoke_viiiffi": invoke_viiiffi,
        "invoke_viiiffii": invoke_viiiffii,
        "invoke_viiifi": invoke_viiifi,
        "invoke_viiifii": invoke_viiifii,
        "invoke_viiifiii": invoke_viiifiii,
        "invoke_viiifiiiii": invoke_viiifiiiii,
        "invoke_viiii": invoke_viiii,
        "invoke_viiiif": invoke_viiiif,
        "invoke_viiiifii": invoke_viiiifii,
        "invoke_viiiifiiiiif": invoke_viiiifiiiiif,
        "invoke_viiiii": invoke_viiiii,
        "invoke_viiiiif": invoke_viiiiif,
        "invoke_viiiiiffi": invoke_viiiiiffi,
        "invoke_viiiiiffii": invoke_viiiiiffii,
        "invoke_viiiiifi": invoke_viiiiifi,
        "invoke_viiiiii": invoke_viiiiii,
        "invoke_viiiiiif": invoke_viiiiiif,
        "invoke_viiiiiii": invoke_viiiiiii,
        "invoke_viiiiiiifi": invoke_viiiiiiifi,
        "invoke_viiiiiiii": invoke_viiiiiiii,
        "invoke_viiiiiiiii": invoke_viiiiiiiii,
        "invoke_viiiiiiiiii": invoke_viiiiiiiiii,
        "invoke_viiiiiiiiiii": invoke_viiiiiiiiiii,
        "invoke_viiiiiiiiiiifii": invoke_viiiiiiiiiiifii,
        "invoke_viiiiiiiiiiii": invoke_viiiiiiiiiiii,
        "invoke_viiiiiiiiiiiiii": invoke_viiiiiiiiiiiiii,
        "invoke_viiiiiiiiiiiiiii": invoke_viiiiiiiiiiiiiii,
        "invoke_viiiiiiiiiiiiiiiiii": invoke_viiiiiiiiiiiiiiiiii,
        "invoke_viiiij": invoke_viiiij,
        "invoke_viiiijiiii": invoke_viiiijiiii,
        "invoke_viiiji": invoke_viiiji,
        "invoke_viiijji": invoke_viiijji,
        "invoke_viij": invoke_viij,
        "invoke_viiji": invoke_viiji,
        "invoke_viijii": invoke_viijii,
        "invoke_viijiijiii": invoke_viijiijiii,
        "invoke_viijijii": invoke_viijijii,
        "invoke_viijijiii": invoke_viijijiii,
        "invoke_viijijj": invoke_viijijj,
        "invoke_viijj": invoke_viijj,
        "invoke_viijji": invoke_viijji,
        "invoke_viijjiii": invoke_viijjiii,
        "invoke_viijjji": invoke_viijjji,
        "invoke_vij": invoke_vij,
        "invoke_viji": invoke_viji,
        "invoke_vijii": invoke_vijii,
        "invoke_vijiii": invoke_vijiii,
        "invoke_vijiji": invoke_vijiji,
        "invoke_vijijji": invoke_vijijji,
        "invoke_vijji": invoke_vijji,
        "invoke_vijjii": invoke_vijjii,
        "invoke_vjiiii": invoke_vjiiii,
        "invoke_vjji": invoke_vjji,
        "_AuthenticateUser": _AuthenticateUser,
        "_GerReward": _GerReward,
        "_GetUserData": _GetUserData,
        "_InitPurchases": _InitPurchases,
        "_JS_Cursor_SetImage": _JS_Cursor_SetImage,
        "_JS_Cursor_SetShow": _JS_Cursor_SetShow,
        "_JS_Eval_ClearInterval": _JS_Eval_ClearInterval,
        "_JS_Eval_SetInterval": _JS_Eval_SetInterval,
        "_JS_FileSystem_Initialize": _JS_FileSystem_Initialize,
        "_JS_FileSystem_Sync": _JS_FileSystem_Sync,
        "_JS_Log_Dump": _JS_Log_Dump,
        "_JS_Log_StackTrace": _JS_Log_StackTrace,
        "_JS_Sound_Create_Channel": _JS_Sound_Create_Channel,
        "_JS_Sound_GetLength": _JS_Sound_GetLength,
        "_JS_Sound_GetLoadState": _JS_Sound_GetLoadState,
        "_JS_Sound_Init": _JS_Sound_Init,
        "_JS_Sound_Load": _JS_Sound_Load,
        "_JS_Sound_Load_PCM": _JS_Sound_Load_PCM,
        "_JS_Sound_Play": _JS_Sound_Play,
        "_JS_Sound_ReleaseInstance": _JS_Sound_ReleaseInstance,
        "_JS_Sound_ResumeIfNeeded": _JS_Sound_ResumeIfNeeded,
        "_JS_Sound_Set3D": _JS_Sound_Set3D,
        "_JS_Sound_SetListenerOrientation": _JS_Sound_SetListenerOrientation,
        "_JS_Sound_SetListenerPosition": _JS_Sound_SetListenerPosition,
        "_JS_Sound_SetLoop": _JS_Sound_SetLoop,
        "_JS_Sound_SetLoopPoints": _JS_Sound_SetLoopPoints,
        "_JS_Sound_SetPitch": _JS_Sound_SetPitch,
        "_JS_Sound_SetPosition": _JS_Sound_SetPosition,
        "_JS_Sound_SetVolume": _JS_Sound_SetVolume,
        "_JS_Sound_Stop": _JS_Sound_Stop,
        "_JS_SystemInfo_GetCanvasClientSize": _JS_SystemInfo_GetCanvasClientSize,
        "_JS_SystemInfo_GetDocumentURL": _JS_SystemInfo_GetDocumentURL,
        "_JS_SystemInfo_GetGPUInfo": _JS_SystemInfo_GetGPUInfo,
        "_JS_SystemInfo_GetLanguage": _JS_SystemInfo_GetLanguage,
        "_JS_SystemInfo_GetMatchWebGLToCanvasSize": _JS_SystemInfo_GetMatchWebGLToCanvasSize,
        "_JS_SystemInfo_GetMemory": _JS_SystemInfo_GetMemory,
        "_JS_SystemInfo_GetOS": _JS_SystemInfo_GetOS,
        "_JS_SystemInfo_GetPreferredDevicePixelRatio": _JS_SystemInfo_GetPreferredDevicePixelRatio,
        "_JS_SystemInfo_GetScreenSize": _JS_SystemInfo_GetScreenSize,
        "_JS_SystemInfo_HasCursorLock": _JS_SystemInfo_HasCursorLock,
        "_JS_SystemInfo_HasFullscreen": _JS_SystemInfo_HasFullscreen,
        "_JS_SystemInfo_HasWebGL": _JS_SystemInfo_HasWebGL,
        "_OpenNewTab": _OpenNewTab,
        "_Purchase": _Purchase,
        "_SDK_Init": _SDK_Init,
        "_SDK_PreloadAd": _SDK_PreloadAd,
        "_SDK_ShowAd": _SDK_ShowAd,
        "_SaveData": _SaveData,
        "_ShowFullscreenAd": _ShowFullscreenAd,
        "_ShowRewardedAd": _ShowRewardedAd,
        "_SyncFiles": _SyncFiles,
        "__ZSt18uncaught_exceptionv": __ZSt18uncaught_exceptionv,
        "___atomic_compare_exchange_8": ___atomic_compare_exchange_8,
        "___atomic_fetch_add_8": ___atomic_fetch_add_8,
        "___buildEnvironment": ___buildEnvironment,
        "___cxa_allocate_exception": ___cxa_allocate_exception,
        "___cxa_begin_catch": ___cxa_begin_catch,
        "___cxa_end_catch": ___cxa_end_catch,
        "___cxa_find_matching_catch": ___cxa_find_matching_catch,
        "___cxa_find_matching_catch_2": ___cxa_find_matching_catch_2,
        "___cxa_find_matching_catch_3": ___cxa_find_matching_catch_3,
        "___cxa_find_matching_catch_4": ___cxa_find_matching_catch_4,
        "___cxa_free_exception": ___cxa_free_exception,
        "___cxa_pure_virtual": ___cxa_pure_virtual,
        "___cxa_rethrow": ___cxa_rethrow,
        "___cxa_throw": ___cxa_throw,
        "___gxx_personality_v0": ___gxx_personality_v0,
        "___lock": ___lock,
        "___map_file": ___map_file,
        "___resumeException": ___resumeException,
        "___setErrNo": ___setErrNo,
        "___syscall10": ___syscall10,
        "___syscall102": ___syscall102,
        "___syscall122": ___syscall122,
        "___syscall140": ___syscall140,
        "___syscall142": ___syscall142,
        "___syscall145": ___syscall145,
        "___syscall146": ___syscall146,
        "___syscall15": ___syscall15,
        "___syscall183": ___syscall183,
        "___syscall192": ___syscall192,
        "___syscall193": ___syscall193,
        "___syscall195": ___syscall195,
        "___syscall196": ___syscall196,
        "___syscall197": ___syscall197,
        "___syscall199": ___syscall199,
        "___syscall202": ___syscall202,
        "___syscall220": ___syscall220,
        "___syscall221": ___syscall221,
        "___syscall268": ___syscall268,
        "___syscall3": ___syscall3,
        "___syscall33": ___syscall33,
        "___syscall38": ___syscall38,
        "___syscall39": ___syscall39,
        "___syscall4": ___syscall4,
        "___syscall40": ___syscall40,
        "___syscall5": ___syscall5,
        "___syscall54": ___syscall54,
        "___syscall6": ___syscall6,
        "___syscall77": ___syscall77,
        "___syscall85": ___syscall85,
        "___syscall91": ___syscall91,
        "___unlock": ___unlock,
        "__addDays": __addDays,
        "__arraySum": __arraySum,
        "__emscripten_do_request_fullscreen": __emscripten_do_request_fullscreen,
        "__emscripten_sample_gamepad_data": __emscripten_sample_gamepad_data,
        "__emscripten_traverse_stack": __emscripten_traverse_stack,
        "__exit": __exit,
        "__formatString": __formatString,
        "__inet_ntop4_raw": __inet_ntop4_raw,
        "__inet_ntop6_raw": __inet_ntop6_raw,
        "__inet_pton4_raw": __inet_pton4_raw,
        "__inet_pton6_raw": __inet_pton6_raw,
        "__isLeapYear": __isLeapYear,
        "__read_sockaddr": __read_sockaddr,
        "__reallyNegative": __reallyNegative,
        "__setLetterbox": __setLetterbox,
        "__write_sockaddr": __write_sockaddr,
        "_abort": _abort,
        "_atexit": _atexit,
        "_clock": _clock,
        "_clock_getres": _clock_getres,
        "_clock_gettime": _clock_gettime,
        "_difftime": _difftime,
        "_dlclose": _dlclose,
        "_dlopen": _dlopen,
        "_dlsym": _dlsym,
        "_emscripten_asm_const_i": _emscripten_asm_const_i,
        "_emscripten_asm_const_ii": _emscripten_asm_const_ii,
        "_emscripten_asm_const_sync_on_main_thread_i": _emscripten_asm_const_sync_on_main_thread_i,
        "_emscripten_cancel_main_loop": _emscripten_cancel_main_loop,
        "_emscripten_exit_fullscreen": _emscripten_exit_fullscreen,
        "_emscripten_exit_pointerlock": _emscripten_exit_pointerlock,
        "_emscripten_get_callstack_js": _emscripten_get_callstack_js,
        "_emscripten_get_canvas_element_size": _emscripten_get_canvas_element_size,
        "_emscripten_get_canvas_element_size_calling_thread": _emscripten_get_canvas_element_size_calling_thread,
        "_emscripten_get_canvas_element_size_main_thread": _emscripten_get_canvas_element_size_main_thread,
        "_emscripten_get_fullscreen_status": _emscripten_get_fullscreen_status,
        "_emscripten_get_gamepad_status": _emscripten_get_gamepad_status,
        "_emscripten_get_main_loop_timing": _emscripten_get_main_loop_timing,
        "_emscripten_get_now": _emscripten_get_now,
        "_emscripten_get_now_is_monotonic": _emscripten_get_now_is_monotonic,
        "_emscripten_get_now_res": _emscripten_get_now_res,
        "_emscripten_get_num_gamepads": _emscripten_get_num_gamepads,
        "_emscripten_has_threading_support": _emscripten_has_threading_support,
        "_emscripten_html5_remove_all_event_listeners": _emscripten_html5_remove_all_event_listeners,
        "_emscripten_is_webgl_context_lost": _emscripten_is_webgl_context_lost,
        "_emscripten_log": _emscripten_log,
        "_emscripten_log_js": _emscripten_log_js,
        "_emscripten_memcpy_big": _emscripten_memcpy_big,
        "_emscripten_num_logical_cores": _emscripten_num_logical_cores,
        "_emscripten_request_fullscreen": _emscripten_request_fullscreen,
        "_emscripten_request_pointerlock": _emscripten_request_pointerlock,
        "_emscripten_set_blur_callback_on_thread": _emscripten_set_blur_callback_on_thread,
        "_emscripten_set_canvas_element_size": _emscripten_set_canvas_element_size,
        "_emscripten_set_canvas_element_size_calling_thread": _emscripten_set_canvas_element_size_calling_thread,
        "_emscripten_set_canvas_element_size_main_thread": _emscripten_set_canvas_element_size_main_thread,
        "_emscripten_set_dblclick_callback_on_thread": _emscripten_set_dblclick_callback_on_thread,
        "_emscripten_set_devicemotion_callback_on_thread": _emscripten_set_devicemotion_callback_on_thread,
        "_emscripten_set_deviceorientation_callback_on_thread": _emscripten_set_deviceorientation_callback_on_thread,
        "_emscripten_set_focus_callback_on_thread": _emscripten_set_focus_callback_on_thread,
        "_emscripten_set_fullscreenchange_callback_on_thread": _emscripten_set_fullscreenchange_callback_on_thread,
        "_emscripten_set_gamepadconnected_callback_on_thread": _emscripten_set_gamepadconnected_callback_on_thread,
        "_emscripten_set_gamepaddisconnected_callback_on_thread": _emscripten_set_gamepaddisconnected_callback_on_thread,
        "_emscripten_set_keydown_callback_on_thread": _emscripten_set_keydown_callback_on_thread,
        "_emscripten_set_keypress_callback_on_thread": _emscripten_set_keypress_callback_on_thread,
        "_emscripten_set_keyup_callback_on_thread": _emscripten_set_keyup_callback_on_thread,
        "_emscripten_set_main_loop": _emscripten_set_main_loop,
        "_emscripten_set_main_loop_timing": _emscripten_set_main_loop_timing,
        "_emscripten_set_mousedown_callback_on_thread": _emscripten_set_mousedown_callback_on_thread,
        "_emscripten_set_mousemove_callback_on_thread": _emscripten_set_mousemove_callback_on_thread,
        "_emscripten_set_mouseup_callback_on_thread": _emscripten_set_mouseup_callback_on_thread,
        "_emscripten_set_touchcancel_callback_on_thread": _emscripten_set_touchcancel_callback_on_thread,
        "_emscripten_set_touchend_callback_on_thread": _emscripten_set_touchend_callback_on_thread,
        "_emscripten_set_touchmove_callback_on_thread": _emscripten_set_touchmove_callback_on_thread,
        "_emscripten_set_touchstart_callback_on_thread": _emscripten_set_touchstart_callback_on_thread,
        "_emscripten_set_wheel_callback_on_thread": _emscripten_set_wheel_callback_on_thread,
        "_emscripten_webgl_create_context": _emscripten_webgl_create_context,
        "_emscripten_webgl_destroy_context": _emscripten_webgl_destroy_context,
        "_emscripten_webgl_destroy_context_calling_thread": _emscripten_webgl_destroy_context_calling_thread,
        "_emscripten_webgl_do_create_context": _emscripten_webgl_do_create_context,
        "_emscripten_webgl_do_get_current_context": _emscripten_webgl_do_get_current_context,
        "_emscripten_webgl_enable_extension": _emscripten_webgl_enable_extension,
        "_emscripten_webgl_enable_extension_calling_thread": _emscripten_webgl_enable_extension_calling_thread,
        "_emscripten_webgl_get_current_context": _emscripten_webgl_get_current_context,
        "_emscripten_webgl_init_context_attributes": _emscripten_webgl_init_context_attributes,
        "_emscripten_webgl_make_context_current": _emscripten_webgl_make_context_current,
        "_exit": _exit,
        "_flock": _flock,
        "_getenv": _getenv,
        "_gethostbyaddr": _gethostbyaddr,
        "_gethostbyname": _gethostbyname,
        "_getpagesize": _getpagesize,
        "_getpwuid": _getpwuid,
        "_gettimeofday": _gettimeofday,
        "_glActiveTexture": _glActiveTexture,
        "_glAttachShader": _glAttachShader,
        "_glBeginQuery": _glBeginQuery,
        "_glBeginTransformFeedback": _glBeginTransformFeedback,
        "_glBindAttribLocation": _glBindAttribLocation,
        "_glBindBuffer": _glBindBuffer,
        "_glBindBufferBase": _glBindBufferBase,
        "_glBindBufferRange": _glBindBufferRange,
        "_glBindFramebuffer": _glBindFramebuffer,
        "_glBindRenderbuffer": _glBindRenderbuffer,
        "_glBindSampler": _glBindSampler,
        "_glBindTexture": _glBindTexture,
        "_glBindTransformFeedback": _glBindTransformFeedback,
        "_glBindVertexArray": _glBindVertexArray,
        "_glBlendEquation": _glBlendEquation,
        "_glBlendEquationSeparate": _glBlendEquationSeparate,
        "_glBlendFuncSeparate": _glBlendFuncSeparate,
        "_glBlitFramebuffer": _glBlitFramebuffer,
        "_glBufferData": _glBufferData,
        "_glBufferSubData": _glBufferSubData,
        "_glCheckFramebufferStatus": _glCheckFramebufferStatus,
        "_glClear": _glClear,
        "_glClearBufferfi": _glClearBufferfi,
        "_glClearBufferfv": _glClearBufferfv,
        "_glClearBufferuiv": _glClearBufferuiv,
        "_glClearColor": _glClearColor,
        "_glClearDepthf": _glClearDepthf,
        "_glClearStencil": _glClearStencil,
        "_glClientWaitSync": _glClientWaitSync,
        "_glColorMask": _glColorMask,
        "_glCompileShader": _glCompileShader,
        "_glCompressedTexImage2D": _glCompressedTexImage2D,
        "_glCompressedTexImage3D": _glCompressedTexImage3D,
        "_glCompressedTexSubImage2D": _glCompressedTexSubImage2D,
        "_glCompressedTexSubImage3D": _glCompressedTexSubImage3D,
        "_glCopyBufferSubData": _glCopyBufferSubData,
        "_glCopyTexImage2D": _glCopyTexImage2D,
        "_glCopyTexSubImage2D": _glCopyTexSubImage2D,
        "_glCreateProgram": _glCreateProgram,
        "_glCreateShader": _glCreateShader,
        "_glCullFace": _glCullFace,
        "_glDeleteBuffers": _glDeleteBuffers,
        "_glDeleteFramebuffers": _glDeleteFramebuffers,
        "_glDeleteProgram": _glDeleteProgram,
        "_glDeleteQueries": _glDeleteQueries,
        "_glDeleteRenderbuffers": _glDeleteRenderbuffers,
        "_glDeleteSamplers": _glDeleteSamplers,
        "_glDeleteShader": _glDeleteShader,
        "_glDeleteSync": _glDeleteSync,
        "_glDeleteTextures": _glDeleteTextures,
        "_glDeleteTransformFeedbacks": _glDeleteTransformFeedbacks,
        "_glDeleteVertexArrays": _glDeleteVertexArrays,
        "_glDepthFunc": _glDepthFunc,
        "_glDepthMask": _glDepthMask,
        "_glDetachShader": _glDetachShader,
        "_glDisable": _glDisable,
        "_glDisableVertexAttribArray": _glDisableVertexAttribArray,
        "_glDrawArrays": _glDrawArrays,
        "_glDrawArraysInstanced": _glDrawArraysInstanced,
        "_glDrawBuffers": _glDrawBuffers,
        "_glDrawElements": _glDrawElements,
        "_glDrawElementsInstanced": _glDrawElementsInstanced,
        "_glEnable": _glEnable,
        "_glEnableVertexAttribArray": _glEnableVertexAttribArray,
        "_glEndQuery": _glEndQuery,
        "_glEndTransformFeedback": _glEndTransformFeedback,
        "_glFenceSync": _glFenceSync,
        "_glFinish": _glFinish,
        "_glFlush": _glFlush,
        "_glFlushMappedBufferRange": _glFlushMappedBufferRange,
        "_glFramebufferRenderbuffer": _glFramebufferRenderbuffer,
        "_glFramebufferTexture2D": _glFramebufferTexture2D,
        "_glFramebufferTextureLayer": _glFramebufferTextureLayer,
        "_glFrontFace": _glFrontFace,
        "_glGenBuffers": _glGenBuffers,
        "_glGenFramebuffers": _glGenFramebuffers,
        "_glGenQueries": _glGenQueries,
        "_glGenRenderbuffers": _glGenRenderbuffers,
        "_glGenSamplers": _glGenSamplers,
        "_glGenTextures": _glGenTextures,
        "_glGenTransformFeedbacks": _glGenTransformFeedbacks,
        "_glGenVertexArrays": _glGenVertexArrays,
        "_glGenerateMipmap": _glGenerateMipmap,
        "_glGetActiveAttrib": _glGetActiveAttrib,
        "_glGetActiveUniform": _glGetActiveUniform,
        "_glGetActiveUniformBlockName": _glGetActiveUniformBlockName,
        "_glGetActiveUniformBlockiv": _glGetActiveUniformBlockiv,
        "_glGetActiveUniformsiv": _glGetActiveUniformsiv,
        "_glGetAttribLocation": _glGetAttribLocation,
        "_glGetError": _glGetError,
        "_glGetFramebufferAttachmentParameteriv": _glGetFramebufferAttachmentParameteriv,
        "_glGetIntegeri_v": _glGetIntegeri_v,
        "_glGetIntegerv": _glGetIntegerv,
        "_glGetInternalformativ": _glGetInternalformativ,
        "_glGetProgramBinary": _glGetProgramBinary,
        "_glGetProgramInfoLog": _glGetProgramInfoLog,
        "_glGetProgramiv": _glGetProgramiv,
        "_glGetRenderbufferParameteriv": _glGetRenderbufferParameteriv,
        "_glGetShaderInfoLog": _glGetShaderInfoLog,
        "_glGetShaderPrecisionFormat": _glGetShaderPrecisionFormat,
        "_glGetShaderSource": _glGetShaderSource,
        "_glGetShaderiv": _glGetShaderiv,
        "_glGetString": _glGetString,
        "_glGetStringi": _glGetStringi,
        "_glGetTexParameteriv": _glGetTexParameteriv,
        "_glGetUniformBlockIndex": _glGetUniformBlockIndex,
        "_glGetUniformIndices": _glGetUniformIndices,
        "_glGetUniformLocation": _glGetUniformLocation,
        "_glGetUniformiv": _glGetUniformiv,
        "_glGetVertexAttribiv": _glGetVertexAttribiv,
        "_glInvalidateFramebuffer": _glInvalidateFramebuffer,
        "_glIsEnabled": _glIsEnabled,
        "_glIsVertexArray": _glIsVertexArray,
        "_glLinkProgram": _glLinkProgram,
        "_glMapBufferRange": _glMapBufferRange,
        "_glPixelStorei": _glPixelStorei,
        "_glPolygonOffset": _glPolygonOffset,
        "_glProgramBinary": _glProgramBinary,
        "_glProgramParameteri": _glProgramParameteri,
        "_glReadBuffer": _glReadBuffer,
        "_glReadPixels": _glReadPixels,
        "_glRenderbufferStorage": _glRenderbufferStorage,
        "_glRenderbufferStorageMultisample": _glRenderbufferStorageMultisample,
        "_glSamplerParameteri": _glSamplerParameteri,
        "_glScissor": _glScissor,
        "_glShaderSource": _glShaderSource,
        "_glStencilFuncSeparate": _glStencilFuncSeparate,
        "_glStencilMask": _glStencilMask,
        "_glStencilOpSeparate": _glStencilOpSeparate,
        "_glTexImage2D": _glTexImage2D,
        "_glTexImage3D": _glTexImage3D,
        "_glTexParameterf": _glTexParameterf,
        "_glTexParameteri": _glTexParameteri,
        "_glTexParameteriv": _glTexParameteriv,
        "_glTexStorage2D": _glTexStorage2D,
        "_glTexStorage3D": _glTexStorage3D,
        "_glTexSubImage2D": _glTexSubImage2D,
        "_glTexSubImage3D": _glTexSubImage3D,
        "_glTransformFeedbackVaryings": _glTransformFeedbackVaryings,
        "_glUniform1fv": _glUniform1fv,
        "_glUniform1i": _glUniform1i,
        "_glUniform1iv": _glUniform1iv,
        "_glUniform1uiv": _glUniform1uiv,
        "_glUniform2fv": _glUniform2fv,
        "_glUniform2iv": _glUniform2iv,
        "_glUniform2uiv": _glUniform2uiv,
        "_glUniform3fv": _glUniform3fv,
        "_glUniform3iv": _glUniform3iv,
        "_glUniform3uiv": _glUniform3uiv,
        "_glUniform4fv": _glUniform4fv,
        "_glUniform4iv": _glUniform4iv,
        "_glUniform4uiv": _glUniform4uiv,
        "_glUniformBlockBinding": _glUniformBlockBinding,
        "_glUniformMatrix3fv": _glUniformMatrix3fv,
        "_glUniformMatrix4fv": _glUniformMatrix4fv,
        "_glUnmapBuffer": _glUnmapBuffer,
        "_glUseProgram": _glUseProgram,
        "_glValidateProgram": _glValidateProgram,
        "_glVertexAttrib4f": _glVertexAttrib4f,
        "_glVertexAttrib4fv": _glVertexAttrib4fv,
        "_glVertexAttribIPointer": _glVertexAttribIPointer,
        "_glVertexAttribPointer": _glVertexAttribPointer,
        "_glViewport": _glViewport,
        "_gmtime": _gmtime,
        "_gmtime_r": _gmtime_r,
        "_inet_addr": _inet_addr,
        "_llvm_ceil_f32": _llvm_ceil_f32,
        "_llvm_ceil_f64": _llvm_ceil_f64,
        "_llvm_copysign_f64": _llvm_copysign_f64,
        "_llvm_cttz_i32": _llvm_cttz_i32,
        "_llvm_eh_typeid_for": _llvm_eh_typeid_for,
        "_llvm_exp2_f32": _llvm_exp2_f32,
        "_llvm_fabs_f32": _llvm_fabs_f32,
        "_llvm_fabs_f64": _llvm_fabs_f64,
        "_llvm_floor_f32": _llvm_floor_f32,
        "_llvm_floor_f64": _llvm_floor_f64,
        "_llvm_log10_f32": _llvm_log10_f32,
        "_llvm_log2_f32": _llvm_log2_f32,
        "_llvm_pow_f64": _llvm_pow_f64,
        "_llvm_sqrt_f32": _llvm_sqrt_f32,
        "_llvm_trap": _llvm_trap,
        "_llvm_trunc_f32": _llvm_trunc_f32,
        "_localtime": _localtime,
        "_localtime_r": _localtime_r,
        "_mktime": _mktime,
        "_nanosleep": _nanosleep,
        "_pthread_cond_destroy": _pthread_cond_destroy,
        "_pthread_cond_init": _pthread_cond_init,
        "_pthread_cond_timedwait": _pthread_cond_timedwait,
        "_pthread_cond_wait": _pthread_cond_wait,
        "_pthread_getspecific": _pthread_getspecific,
        "_pthread_key_create": _pthread_key_create,
        "_pthread_key_delete": _pthread_key_delete,
        "_pthread_mutex_destroy": _pthread_mutex_destroy,
        "_pthread_mutex_init": _pthread_mutex_init,
        "_pthread_mutexattr_destroy": _pthread_mutexattr_destroy,
        "_pthread_mutexattr_init": _pthread_mutexattr_init,
        "_pthread_mutexattr_setprotocol": _pthread_mutexattr_setprotocol,
        "_pthread_mutexattr_settype": _pthread_mutexattr_settype,
        "_pthread_once": _pthread_once,
        "_pthread_setspecific": _pthread_setspecific,
        "_sched_yield": _sched_yield,
        "_setenv": _setenv,
        "_sigaction": _sigaction,
        "_sigemptyset": _sigemptyset,
        "_strftime": _strftime,
        "_sysconf": _sysconf,
        "_time": _time,
        "_tzset": _tzset,
        "_unsetenv": _unsetenv,
        "_usleep": _usleep,
        "_utime": _utime,
        "emscriptenWebGLComputeImageSize": emscriptenWebGLComputeImageSize,
        "emscriptenWebGLGet": emscriptenWebGLGet,
        "emscriptenWebGLGetBufferBinding": emscriptenWebGLGetBufferBinding,
        "emscriptenWebGLGetHeapForType": emscriptenWebGLGetHeapForType,
        "emscriptenWebGLGetIndexed": emscriptenWebGLGetIndexed,
        "emscriptenWebGLGetShiftForType": emscriptenWebGLGetShiftForType,
        "emscriptenWebGLGetTexPixelData": emscriptenWebGLGetTexPixelData,
        "emscriptenWebGLGetUniform": emscriptenWebGLGetUniform,
        "emscriptenWebGLGetVertexAttrib": emscriptenWebGLGetVertexAttrib,
        "emscriptenWebGLValidateMapBufferTarget": emscriptenWebGLValidateMapBufferTarget,
        "emscripten_get_canvas_element_size_js": emscripten_get_canvas_element_size_js,
        "emscripten_set_canvas_element_size_js": emscripten_set_canvas_element_size_js,
        "DYNAMICTOP_PTR": DYNAMICTOP_PTR,
        "tempDoublePtr": tempDoublePtr,
        "ABORT": ABORT,
        "STACKTOP": STACKTOP,
        "STACK_MAX": STACK_MAX
    };
    var asm = Module["asm"](Module.asmGlobalArg, Module.asmLibraryArg, buffer);
    Module["asm"] = asm;
    var _SendMessage = Module["_SendMessage"] = (function() {
        return Module["asm"]["_SendMessage"].apply(null, arguments)
    }
    );
    var _SendMessageFloat = Module["_SendMessageFloat"] = (function() {
        return Module["asm"]["_SendMessageFloat"].apply(null, arguments)
    }
    );
    var _SendMessageString = Module["_SendMessageString"] = (function() {
        return Module["asm"]["_SendMessageString"].apply(null, arguments)
    }
    );
    var _SetFullscreen = Module["_SetFullscreen"] = (function() {
        return Module["asm"]["_SetFullscreen"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_AIScriptingClasses_cpp = Module["__GLOBAL__sub_I_AIScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_AIScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_AccessibilityScriptingClasses_cpp = Module["__GLOBAL__sub_I_AccessibilityScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_AccessibilityScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_AndroidJNIScriptingClasses_cpp = Module["__GLOBAL__sub_I_AndroidJNIScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_AndroidJNIScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_AnimationClip_cpp = Module["__GLOBAL__sub_I_AnimationClip_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_AnimationClip_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_AnimationScriptingClasses_cpp = Module["__GLOBAL__sub_I_AnimationScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_AnimationScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_AssetBundleFileSystem_cpp = Module["__GLOBAL__sub_I_AssetBundleFileSystem_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_AssetBundleFileSystem_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_AssetBundleScriptingClasses_cpp = Module["__GLOBAL__sub_I_AssetBundleScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_AssetBundleScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_AudioScriptingClasses_cpp = Module["__GLOBAL__sub_I_AudioScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_AudioScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_ClothScriptingClasses_cpp = Module["__GLOBAL__sub_I_ClothScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_ClothScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_DirectorScriptingClasses_cpp = Module["__GLOBAL__sub_I_DirectorScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_DirectorScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_External_ProphecySDK_BlitOperations_1_cpp = Module["__GLOBAL__sub_I_External_ProphecySDK_BlitOperations_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_External_ProphecySDK_BlitOperations_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_External_Yoga_Yoga_0_cpp = Module["__GLOBAL__sub_I_External_Yoga_Yoga_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_External_Yoga_Yoga_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_External_il2cpp_builds_external_baselib_Platforms_WebGL_Source_0_cpp = Module["__GLOBAL__sub_I_External_il2cpp_builds_external_baselib_Platforms_WebGL_Source_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_External_il2cpp_builds_external_baselib_Platforms_WebGL_Source_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_GUITexture_cpp = Module["__GLOBAL__sub_I_GUITexture_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_GUITexture_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_GfxDeviceNull_cpp = Module["__GLOBAL__sub_I_GfxDeviceNull_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_GfxDeviceNull_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_GridScriptingClasses_cpp = Module["__GLOBAL__sub_I_GridScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_GridScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_IMGUIScriptingClasses_cpp = Module["__GLOBAL__sub_I_IMGUIScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_IMGUIScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_InputLegacyScriptingClasses_cpp = Module["__GLOBAL__sub_I_InputLegacyScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_InputLegacyScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_InputScriptingClasses_cpp = Module["__GLOBAL__sub_I_InputScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_InputScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_LogAssert_cpp = Module["__GLOBAL__sub_I_LogAssert_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_LogAssert_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Lump_libil2cpp_gc_cpp = Module["__GLOBAL__sub_I_Lump_libil2cpp_gc_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_gc_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Lump_libil2cpp_icalls_cpp = Module["__GLOBAL__sub_I_Lump_libil2cpp_icalls_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_icalls_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Lump_libil2cpp_metadata_cpp = Module["__GLOBAL__sub_I_Lump_libil2cpp_metadata_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_metadata_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Lump_libil2cpp_mono_cpp = Module["__GLOBAL__sub_I_Lump_libil2cpp_mono_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_mono_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Lump_libil2cpp_os_cpp = Module["__GLOBAL__sub_I_Lump_libil2cpp_os_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_os_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Lump_libil2cpp_utils_cpp = Module["__GLOBAL__sub_I_Lump_libil2cpp_utils_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_utils_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Lump_libil2cpp_vm_cpp = Module["__GLOBAL__sub_I_Lump_libil2cpp_vm_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_vm_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Lump_libil2cpp_vm_utils_cpp = Module["__GLOBAL__sub_I_Lump_libil2cpp_vm_utils_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Lump_libil2cpp_vm_utils_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Mesh_cpp = Module["__GLOBAL__sub_I_Mesh_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Mesh_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Animation_0_cpp = Module["__GLOBAL__sub_I_Modules_Animation_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Animation_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Animation_2_cpp = Module["__GLOBAL__sub_I_Modules_Animation_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Animation_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Animation_7_cpp = Module["__GLOBAL__sub_I_Modules_Animation_7_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Animation_7_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Animation_Constraints_0_cpp = Module["__GLOBAL__sub_I_Modules_Animation_Constraints_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Animation_Constraints_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_AssetBundle_Public_0_cpp = Module["__GLOBAL__sub_I_Modules_AssetBundle_Public_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_AssetBundle_Public_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Audio_Public_0_cpp = Module["__GLOBAL__sub_I_Modules_Audio_Public_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Audio_Public_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Audio_Public_1_cpp = Module["__GLOBAL__sub_I_Modules_Audio_Public_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Audio_Public_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Audio_Public_3_cpp = Module["__GLOBAL__sub_I_Modules_Audio_Public_3_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Audio_Public_3_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Audio_Public_ScriptBindings_1_cpp = Module["__GLOBAL__sub_I_Modules_Audio_Public_ScriptBindings_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Audio_Public_ScriptBindings_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Audio_Public_sound_0_cpp = Module["__GLOBAL__sub_I_Modules_Audio_Public_sound_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Audio_Public_sound_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Cloth_0_cpp = Module["__GLOBAL__sub_I_Modules_Cloth_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Cloth_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_DSPGraph_Public_1_cpp = Module["__GLOBAL__sub_I_Modules_DSPGraph_Public_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_DSPGraph_Public_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Grid_Public_0_cpp = Module["__GLOBAL__sub_I_Modules_Grid_Public_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Grid_Public_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_IMGUI_0_cpp = Module["__GLOBAL__sub_I_Modules_IMGUI_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_IMGUI_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_IMGUI_1_cpp = Module["__GLOBAL__sub_I_Modules_IMGUI_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_IMGUI_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Input_Private_0_cpp = Module["__GLOBAL__sub_I_Modules_Input_Private_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Input_Private_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_ParticleSystem_0_cpp = Module["__GLOBAL__sub_I_Modules_ParticleSystem_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_ParticleSystem_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Physics2D_Public_0_cpp = Module["__GLOBAL__sub_I_Modules_Physics2D_Public_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Physics2D_Public_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Physics2D_Public_1_cpp = Module["__GLOBAL__sub_I_Modules_Physics2D_Public_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Physics2D_Public_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Physics_0_cpp = Module["__GLOBAL__sub_I_Modules_Physics_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Physics_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Physics_2_cpp = Module["__GLOBAL__sub_I_Modules_Physics_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Physics_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Profiler_Public_1_cpp = Module["__GLOBAL__sub_I_Modules_Profiler_Public_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Profiler_Public_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Profiler_Runtime_1_cpp = Module["__GLOBAL__sub_I_Modules_Profiler_Runtime_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Profiler_Runtime_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Subsystems_0_cpp = Module["__GLOBAL__sub_I_Modules_Subsystems_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Subsystems_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Terrain_Public_0_cpp = Module["__GLOBAL__sub_I_Modules_Terrain_Public_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Terrain_Public_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Terrain_Public_1_cpp = Module["__GLOBAL__sub_I_Modules_Terrain_Public_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Terrain_Public_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Terrain_Public_2_cpp = Module["__GLOBAL__sub_I_Modules_Terrain_Public_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Terrain_Public_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Terrain_Public_3_cpp = Module["__GLOBAL__sub_I_Modules_Terrain_Public_3_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Terrain_Public_3_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Terrain_VR_0_cpp = Module["__GLOBAL__sub_I_Modules_Terrain_VR_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Terrain_VR_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_TextCore_Native_FontEngine_0_cpp = Module["__GLOBAL__sub_I_Modules_TextCore_Native_FontEngine_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_TextCore_Native_FontEngine_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_TextRendering_Public_0_cpp = Module["__GLOBAL__sub_I_Modules_TextRendering_Public_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_TextRendering_Public_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Tilemap_0_cpp = Module["__GLOBAL__sub_I_Modules_Tilemap_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Tilemap_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Tilemap_Public_0_cpp = Module["__GLOBAL__sub_I_Modules_Tilemap_Public_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Tilemap_Public_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_UI_0_cpp = Module["__GLOBAL__sub_I_Modules_UI_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_UI_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_UI_1_cpp = Module["__GLOBAL__sub_I_Modules_UI_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_UI_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_UI_2_cpp = Module["__GLOBAL__sub_I_Modules_UI_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_UI_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_UnityWebRequest_Public_0_cpp = Module["__GLOBAL__sub_I_Modules_UnityWebRequest_Public_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_UnityWebRequest_Public_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_VFX_Public_0_cpp = Module["__GLOBAL__sub_I_Modules_VFX_Public_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_VFX_Public_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_VFX_Public_1_cpp = Module["__GLOBAL__sub_I_Modules_VFX_Public_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_VFX_Public_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_VFX_Public_Systems_0_cpp = Module["__GLOBAL__sub_I_Modules_VFX_Public_Systems_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_VFX_Public_Systems_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_VR_0_cpp = Module["__GLOBAL__sub_I_Modules_VR_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_VR_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_VR_1_cpp = Module["__GLOBAL__sub_I_Modules_VR_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_VR_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_Video_Public_Base_0_cpp = Module["__GLOBAL__sub_I_Modules_Video_Public_Base_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_Video_Public_Base_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_XR_0_cpp = Module["__GLOBAL__sub_I_Modules_XR_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_XR_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_XR_Public_0_cpp = Module["__GLOBAL__sub_I_Modules_XR_Public_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_XR_Public_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_XR_Stats_0_cpp = Module["__GLOBAL__sub_I_Modules_XR_Stats_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_XR_Stats_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_XR_Subsystems_Display_0_cpp = Module["__GLOBAL__sub_I_Modules_XR_Subsystems_Display_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_XR_Subsystems_Display_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_0_cpp = Module["__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_1_cpp = Module["__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_XR_Subsystems_Input_Public_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_XR_Subsystems_Meshing_0_cpp = Module["__GLOBAL__sub_I_Modules_XR_Subsystems_Meshing_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_XR_Subsystems_Meshing_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Modules_XR_Tracing_0_cpp = Module["__GLOBAL__sub_I_Modules_XR_Tracing_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Modules_XR_Tracing_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_ParticleSystemScriptingClasses_cpp = Module["__GLOBAL__sub_I_ParticleSystemScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_ParticleSystemScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Physics2DScriptingClasses_cpp = Module["__GLOBAL__sub_I_Physics2DScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Physics2DScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_PhysicsQuery_cpp = Module["__GLOBAL__sub_I_PhysicsQuery_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_PhysicsQuery_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_PhysicsScriptingClasses_cpp = Module["__GLOBAL__sub_I_PhysicsScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_PhysicsScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_PlatformDependent_WebGL_External_baselib_builds_Source_0_cpp = Module["__GLOBAL__sub_I_PlatformDependent_WebGL_External_baselib_builds_Source_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_PlatformDependent_WebGL_External_baselib_builds_Source_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_PlatformDependent_WebGL_Source_0_cpp = Module["__GLOBAL__sub_I_PlatformDependent_WebGL_Source_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_PlatformDependent_WebGL_Source_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_PlatformDependent_WebGL_Source_2_cpp = Module["__GLOBAL__sub_I_PlatformDependent_WebGL_Source_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_PlatformDependent_WebGL_Source_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_PluginInterfaceVR_cpp = Module["__GLOBAL__sub_I_PluginInterfaceVR_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_PluginInterfaceVR_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_2D_Renderer_0_cpp = Module["__GLOBAL__sub_I_Runtime_2D_Renderer_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_2D_Renderer_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_2D_Sorting_0_cpp = Module["__GLOBAL__sub_I_Runtime_2D_Sorting_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_2D_Sorting_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_2D_SpriteAtlas_0_cpp = Module["__GLOBAL__sub_I_Runtime_2D_SpriteAtlas_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_2D_SpriteAtlas_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Allocator_2_cpp = Module["__GLOBAL__sub_I_Runtime_Allocator_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Allocator_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Application_0_cpp = Module["__GLOBAL__sub_I_Runtime_Application_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Application_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_BaseClasses_0_cpp = Module["__GLOBAL__sub_I_Runtime_BaseClasses_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_BaseClasses_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_BaseClasses_1_cpp = Module["__GLOBAL__sub_I_Runtime_BaseClasses_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_BaseClasses_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_BaseClasses_2_cpp = Module["__GLOBAL__sub_I_Runtime_BaseClasses_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_BaseClasses_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_BaseClasses_3_cpp = Module["__GLOBAL__sub_I_Runtime_BaseClasses_3_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_BaseClasses_3_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Burst_0_cpp = Module["__GLOBAL__sub_I_Runtime_Burst_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Burst_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Camera_0_cpp = Module["__GLOBAL__sub_I_Runtime_Camera_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Camera_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Camera_1_cpp = Module["__GLOBAL__sub_I_Runtime_Camera_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Camera_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Camera_2_cpp = Module["__GLOBAL__sub_I_Runtime_Camera_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Camera_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Camera_6_cpp = Module["__GLOBAL__sub_I_Runtime_Camera_6_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Camera_6_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Camera_7_cpp = Module["__GLOBAL__sub_I_Runtime_Camera_7_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Camera_7_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Camera_8_cpp = Module["__GLOBAL__sub_I_Runtime_Camera_8_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Camera_8_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Camera_Culling_0_cpp = Module["__GLOBAL__sub_I_Runtime_Camera_Culling_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Camera_Culling_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Camera_RenderLoops_0_cpp = Module["__GLOBAL__sub_I_Runtime_Camera_RenderLoops_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Camera_RenderLoops_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Camera_RenderLoops_2_cpp = Module["__GLOBAL__sub_I_Runtime_Camera_RenderLoops_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Camera_RenderLoops_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Containers_0_cpp = Module["__GLOBAL__sub_I_Runtime_Containers_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Containers_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Core_Callbacks_0_cpp = Module["__GLOBAL__sub_I_Runtime_Core_Callbacks_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Core_Callbacks_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Director_Core_1_cpp = Module["__GLOBAL__sub_I_Runtime_Director_Core_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Director_Core_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Export_Unsafe_0_cpp = Module["__GLOBAL__sub_I_Runtime_Export_Unsafe_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Export_Unsafe_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_File_0_cpp = Module["__GLOBAL__sub_I_Runtime_File_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_File_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Geometry_2_cpp = Module["__GLOBAL__sub_I_Runtime_Geometry_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Geometry_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_GfxDevice_1_cpp = Module["__GLOBAL__sub_I_Runtime_GfxDevice_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_GfxDevice_2_cpp = Module["__GLOBAL__sub_I_Runtime_GfxDevice_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_GfxDevice_3_cpp = Module["__GLOBAL__sub_I_Runtime_GfxDevice_3_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_3_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_GfxDevice_4_cpp = Module["__GLOBAL__sub_I_Runtime_GfxDevice_4_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_4_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_GfxDevice_5_cpp = Module["__GLOBAL__sub_I_Runtime_GfxDevice_5_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_5_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_GfxDevice_opengles_0_cpp = Module["__GLOBAL__sub_I_Runtime_GfxDevice_opengles_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_GfxDevice_opengles_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_0_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_10_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_10_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_10_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_11_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_11_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_11_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_1_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_2_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_4_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_4_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_4_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_5_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_5_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_5_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_6_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_6_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_6_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_8_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_8_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_8_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_Billboard_0_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_Billboard_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Billboard_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_CommandBuffer_0_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_CommandBuffer_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_CommandBuffer_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_LOD_0_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_LOD_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_LOD_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_Mesh_0_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_Mesh_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Mesh_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_Mesh_1_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_Mesh_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Mesh_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_Mesh_2_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_Mesh_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Mesh_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_Mesh_4_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_Mesh_4_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Mesh_4_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_Mesh_5_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_Mesh_5_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_Mesh_5_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Graphics_ScriptableRenderLoop_0_cpp = Module["__GLOBAL__sub_I_Runtime_Graphics_ScriptableRenderLoop_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Graphics_ScriptableRenderLoop_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Input_0_cpp = Module["__GLOBAL__sub_I_Runtime_Input_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Input_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Interfaces_0_cpp = Module["__GLOBAL__sub_I_Runtime_Interfaces_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Interfaces_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Interfaces_1_cpp = Module["__GLOBAL__sub_I_Runtime_Interfaces_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Interfaces_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Interfaces_2_cpp = Module["__GLOBAL__sub_I_Runtime_Interfaces_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Interfaces_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Jobs_0_cpp = Module["__GLOBAL__sub_I_Runtime_Jobs_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Jobs_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Jobs_1_cpp = Module["__GLOBAL__sub_I_Runtime_Jobs_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Jobs_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Jobs_Internal_1_cpp = Module["__GLOBAL__sub_I_Runtime_Jobs_Internal_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Jobs_Internal_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Jobs_ScriptBindings_0_cpp = Module["__GLOBAL__sub_I_Runtime_Jobs_ScriptBindings_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Jobs_ScriptBindings_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Math_2_cpp = Module["__GLOBAL__sub_I_Runtime_Math_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Math_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Math_Random_0_cpp = Module["__GLOBAL__sub_I_Runtime_Math_Random_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Math_Random_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Misc_0_cpp = Module["__GLOBAL__sub_I_Runtime_Misc_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Misc_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Misc_2_cpp = Module["__GLOBAL__sub_I_Runtime_Misc_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Misc_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Misc_4_cpp = Module["__GLOBAL__sub_I_Runtime_Misc_4_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Misc_4_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Misc_5_cpp = Module["__GLOBAL__sub_I_Runtime_Misc_5_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Misc_5_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Modules_0_cpp = Module["__GLOBAL__sub_I_Runtime_Modules_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Modules_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Mono_2_cpp = Module["__GLOBAL__sub_I_Runtime_Mono_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Mono_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_0_cpp = Module["__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_1_cpp = Module["__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Mono_SerializationBackend_DirectMemoryAccess_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_PluginInterface_0_cpp = Module["__GLOBAL__sub_I_Runtime_PluginInterface_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_PluginInterface_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_PreloadManager_0_cpp = Module["__GLOBAL__sub_I_Runtime_PreloadManager_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_PreloadManager_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Profiler_0_cpp = Module["__GLOBAL__sub_I_Runtime_Profiler_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Profiler_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Profiler_2_cpp = Module["__GLOBAL__sub_I_Runtime_Profiler_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Profiler_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Profiler_ExternalGPUProfiler_0_cpp = Module["__GLOBAL__sub_I_Runtime_Profiler_ExternalGPUProfiler_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Profiler_ExternalGPUProfiler_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Profiler_ScriptBindings_0_cpp = Module["__GLOBAL__sub_I_Runtime_Profiler_ScriptBindings_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Profiler_ScriptBindings_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_SceneManager_0_cpp = Module["__GLOBAL__sub_I_Runtime_SceneManager_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_SceneManager_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_ScriptingBackend_Il2Cpp_0_cpp = Module["__GLOBAL__sub_I_Runtime_ScriptingBackend_Il2Cpp_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_ScriptingBackend_Il2Cpp_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Scripting_0_cpp = Module["__GLOBAL__sub_I_Runtime_Scripting_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Scripting_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Scripting_2_cpp = Module["__GLOBAL__sub_I_Runtime_Scripting_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Scripting_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Scripting_3_cpp = Module["__GLOBAL__sub_I_Runtime_Scripting_3_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Scripting_3_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Scripting_APIUpdating_0_cpp = Module["__GLOBAL__sub_I_Runtime_Scripting_APIUpdating_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Scripting_APIUpdating_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Serialize_1_cpp = Module["__GLOBAL__sub_I_Runtime_Serialize_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Serialize_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Serialize_2_cpp = Module["__GLOBAL__sub_I_Runtime_Serialize_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Serialize_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_0_cpp = Module["__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_1_cpp = Module["__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Serialize_TransferFunctions_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Shaders_1_cpp = Module["__GLOBAL__sub_I_Runtime_Shaders_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Shaders_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Shaders_3_cpp = Module["__GLOBAL__sub_I_Runtime_Shaders_3_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Shaders_3_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Shaders_GpuPrograms_0_cpp = Module["__GLOBAL__sub_I_Runtime_Shaders_GpuPrograms_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Shaders_GpuPrograms_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Shaders_ShaderImpl_2_cpp = Module["__GLOBAL__sub_I_Runtime_Shaders_ShaderImpl_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Shaders_ShaderImpl_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Transform_0_cpp = Module["__GLOBAL__sub_I_Runtime_Transform_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Transform_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Transform_1_cpp = Module["__GLOBAL__sub_I_Runtime_Transform_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Transform_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Utilities_2_cpp = Module["__GLOBAL__sub_I_Runtime_Utilities_2_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Utilities_2_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Utilities_5_cpp = Module["__GLOBAL__sub_I_Runtime_Utilities_5_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Utilities_5_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Utilities_6_cpp = Module["__GLOBAL__sub_I_Runtime_Utilities_6_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Utilities_6_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Utilities_7_cpp = Module["__GLOBAL__sub_I_Runtime_Utilities_7_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Utilities_7_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Utilities_9_cpp = Module["__GLOBAL__sub_I_Runtime_Utilities_9_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Utilities_9_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_Video_0_cpp = Module["__GLOBAL__sub_I_Runtime_Video_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_Video_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Runtime_VirtualFileSystem_0_cpp = Module["__GLOBAL__sub_I_Runtime_VirtualFileSystem_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Runtime_VirtualFileSystem_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Shader_cpp = Module["__GLOBAL__sub_I_Shader_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Shader_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Shadows_cpp = Module["__GLOBAL__sub_I_Shadows_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Shadows_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_ShapeModule_cpp = Module["__GLOBAL__sub_I_ShapeModule_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_ShapeModule_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_SubsystemsScriptingClasses_cpp = Module["__GLOBAL__sub_I_SubsystemsScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_SubsystemsScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_SwInterCollision_cpp = Module["__GLOBAL__sub_I_SwInterCollision_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_SwInterCollision_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_SwSolverKernel_cpp = Module["__GLOBAL__sub_I_SwSolverKernel_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_SwSolverKernel_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_TemplateInstantiations_cpp = Module["__GLOBAL__sub_I_TemplateInstantiations_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_TemplateInstantiations_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_TerrainScriptingClasses_cpp = Module["__GLOBAL__sub_I_TerrainScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_TerrainScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_TextCoreScriptingClasses_cpp = Module["__GLOBAL__sub_I_TextCoreScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_TextCoreScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_TextRenderingScriptingClasses_cpp = Module["__GLOBAL__sub_I_TextRenderingScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_TextRenderingScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_TilemapScriptingClasses_cpp = Module["__GLOBAL__sub_I_TilemapScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_TilemapScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_UIElementsNativeScriptingClasses_cpp = Module["__GLOBAL__sub_I_UIElementsNativeScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_UIElementsNativeScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_UIScriptingClasses_cpp = Module["__GLOBAL__sub_I_UIScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_UIScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_UVModule_cpp = Module["__GLOBAL__sub_I_UVModule_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_UVModule_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_UnityAdsSettings_cpp = Module["__GLOBAL__sub_I_UnityAdsSettings_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_UnityAdsSettings_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_UnityAnalyticsScriptingClasses_cpp = Module["__GLOBAL__sub_I_UnityAnalyticsScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_UnityAnalyticsScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_UnityWebRequestScriptingClasses_cpp = Module["__GLOBAL__sub_I_UnityWebRequestScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_UnityWebRequestScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_VFXScriptingClasses_cpp = Module["__GLOBAL__sub_I_VFXScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_VFXScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_VRScriptingClasses_cpp = Module["__GLOBAL__sub_I_VRScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_VRScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_VideoScriptingClasses_cpp = Module["__GLOBAL__sub_I_VideoScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_VideoScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_VisualEffectAsset_cpp = Module["__GLOBAL__sub_I_VisualEffectAsset_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_VisualEffectAsset_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_Wind_cpp = Module["__GLOBAL__sub_I_Wind_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_Wind_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_XRAudio_cpp = Module["__GLOBAL__sub_I_XRAudio_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_XRAudio_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_XRPreInit_cpp = Module["__GLOBAL__sub_I_XRPreInit_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_XRPreInit_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_XRScriptingClasses_cpp = Module["__GLOBAL__sub_I_XRScriptingClasses_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_XRScriptingClasses_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_XRWindowsLocatableCamera_cpp = Module["__GLOBAL__sub_I_XRWindowsLocatableCamera_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_XRWindowsLocatableCamera_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_artifacts_WebGL_codegenerator_0_cpp = Module["__GLOBAL__sub_I_artifacts_WebGL_codegenerator_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_artifacts_WebGL_codegenerator_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_nvcloth_src_0_cpp = Module["__GLOBAL__sub_I_nvcloth_src_0_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_nvcloth_src_0_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_nvcloth_src_1_cpp = Module["__GLOBAL__sub_I_nvcloth_src_1_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_nvcloth_src_1_cpp"].apply(null, arguments)
    }
    );
    var __GLOBAL__sub_I_umbra_cpp = Module["__GLOBAL__sub_I_umbra_cpp"] = (function() {
        return Module["asm"]["__GLOBAL__sub_I_umbra_cpp"].apply(null, arguments)
    }
    );
    var ___cxa_can_catch = Module["___cxa_can_catch"] = (function() {
        return Module["asm"]["___cxa_can_catch"].apply(null, arguments)
    }
    );
    var ___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = (function() {
        return Module["asm"]["___cxa_is_pointer_type"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init = Module["___cxx_global_var_init"] = (function() {
        return Module["asm"]["___cxx_global_var_init"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_104 = Module["___cxx_global_var_init_104"] = (function() {
        return Module["asm"]["___cxx_global_var_init_104"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_131 = Module["___cxx_global_var_init_131"] = (function() {
        return Module["asm"]["___cxx_global_var_init_131"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_18 = Module["___cxx_global_var_init_18"] = (function() {
        return Module["asm"]["___cxx_global_var_init_18"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_18_1173 = Module["___cxx_global_var_init_18_1173"] = (function() {
        return Module["asm"]["___cxx_global_var_init_18_1173"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_19 = Module["___cxx_global_var_init_19"] = (function() {
        return Module["asm"]["___cxx_global_var_init_19"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_20 = Module["___cxx_global_var_init_20"] = (function() {
        return Module["asm"]["___cxx_global_var_init_20"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_23 = Module["___cxx_global_var_init_23"] = (function() {
        return Module["asm"]["___cxx_global_var_init_23"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_3780 = Module["___cxx_global_var_init_3780"] = (function() {
        return Module["asm"]["___cxx_global_var_init_3780"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_7754 = Module["___cxx_global_var_init_7754"] = (function() {
        return Module["asm"]["___cxx_global_var_init_7754"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_89 = Module["___cxx_global_var_init_89"] = (function() {
        return Module["asm"]["___cxx_global_var_init_89"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_8911 = Module["___cxx_global_var_init_8911"] = (function() {
        return Module["asm"]["___cxx_global_var_init_8911"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_9 = Module["___cxx_global_var_init_9"] = (function() {
        return Module["asm"]["___cxx_global_var_init_9"].apply(null, arguments)
    }
    );
    var ___cxx_global_var_init_9307 = Module["___cxx_global_var_init_9307"] = (function() {
        return Module["asm"]["___cxx_global_var_init_9307"].apply(null, arguments)
    }
    );
    var ___emscripten_environ_constructor = Module["___emscripten_environ_constructor"] = (function() {
        return Module["asm"]["___emscripten_environ_constructor"].apply(null, arguments)
    }
    );
    var ___errno_location = Module["___errno_location"] = (function() {
        return Module["asm"]["___errno_location"].apply(null, arguments)
    }
    );
    var __get_daylight = Module["__get_daylight"] = (function() {
        return Module["asm"]["__get_daylight"].apply(null, arguments)
    }
    );
    var __get_environ = Module["__get_environ"] = (function() {
        return Module["asm"]["__get_environ"].apply(null, arguments)
    }
    );
    var __get_timezone = Module["__get_timezone"] = (function() {
        return Module["asm"]["__get_timezone"].apply(null, arguments)
    }
    );
    var __get_tzname = Module["__get_tzname"] = (function() {
        return Module["asm"]["__get_tzname"].apply(null, arguments)
    }
    );
    var _emscripten_replace_memory = Module["_emscripten_replace_memory"] = (function() {
        return Module["asm"]["_emscripten_replace_memory"].apply(null, arguments)
    }
    );
    var _free = Module["_free"] = (function() {
        return Module["asm"]["_free"].apply(null, arguments)
    }
    );
    var _htonl = Module["_htonl"] = (function() {
        return Module["asm"]["_htonl"].apply(null, arguments)
    }
    );
    var _htons = Module["_htons"] = (function() {
        return Module["asm"]["_htons"].apply(null, arguments)
    }
    );
    var _i64Add = Module["_i64Add"] = (function() {
        return Module["asm"]["_i64Add"].apply(null, arguments)
    }
    );
    var _llvm_bswap_i16 = Module["_llvm_bswap_i16"] = (function() {
        return Module["asm"]["_llvm_bswap_i16"].apply(null, arguments)
    }
    );
    var _llvm_bswap_i32 = Module["_llvm_bswap_i32"] = (function() {
        return Module["asm"]["_llvm_bswap_i32"].apply(null, arguments)
    }
    );
    var _llvm_ctlz_i64 = Module["_llvm_ctlz_i64"] = (function() {
        return Module["asm"]["_llvm_ctlz_i64"].apply(null, arguments)
    }
    );
    var _llvm_ctpop_i32 = Module["_llvm_ctpop_i32"] = (function() {
        return Module["asm"]["_llvm_ctpop_i32"].apply(null, arguments)
    }
    );
    var _llvm_maxnum_f32 = Module["_llvm_maxnum_f32"] = (function() {
        return Module["asm"]["_llvm_maxnum_f32"].apply(null, arguments)
    }
    );
    var _llvm_maxnum_f64 = Module["_llvm_maxnum_f64"] = (function() {
        return Module["asm"]["_llvm_maxnum_f64"].apply(null, arguments)
    }
    );
    var _llvm_minnum_f32 = Module["_llvm_minnum_f32"] = (function() {
        return Module["asm"]["_llvm_minnum_f32"].apply(null, arguments)
    }
    );
    var _llvm_round_f32 = Module["_llvm_round_f32"] = (function() {
        return Module["asm"]["_llvm_round_f32"].apply(null, arguments)
    }
    );
    var _main = Module["_main"] = (function() {
        return Module["asm"]["_main"].apply(null, arguments)
    }
    );
    var _malloc = Module["_malloc"] = (function() {
        return Module["asm"]["_malloc"].apply(null, arguments)
    }
    );
    var _memalign = Module["_memalign"] = (function() {
        return Module["asm"]["_memalign"].apply(null, arguments)
    }
    );
    var _memcpy = Module["_memcpy"] = (function() {
        return Module["asm"]["_memcpy"].apply(null, arguments)
    }
    );
    var _memmove = Module["_memmove"] = (function() {
        return Module["asm"]["_memmove"].apply(null, arguments)
    }
    );
    var _memset = Module["_memset"] = (function() {
        return Module["asm"]["_memset"].apply(null, arguments)
    }
    );
    var _ntohs = Module["_ntohs"] = (function() {
        return Module["asm"]["_ntohs"].apply(null, arguments)
    }
    );
    var _pthread_cond_broadcast = Module["_pthread_cond_broadcast"] = (function() {
        return Module["asm"]["_pthread_cond_broadcast"].apply(null, arguments)
    }
    );
    var _pthread_mutex_lock = Module["_pthread_mutex_lock"] = (function() {
        return Module["asm"]["_pthread_mutex_lock"].apply(null, arguments)
    }
    );
    var _pthread_mutex_unlock = Module["_pthread_mutex_unlock"] = (function() {
        return Module["asm"]["_pthread_mutex_unlock"].apply(null, arguments)
    }
    );
    var _realloc = Module["_realloc"] = (function() {
        return Module["asm"]["_realloc"].apply(null, arguments)
    }
    );
    var _sbrk = Module["_sbrk"] = (function() {
        return Module["asm"]["_sbrk"].apply(null, arguments)
    }
    );
    var _strlen = Module["_strlen"] = (function() {
        return Module["asm"]["_strlen"].apply(null, arguments)
    }
    );
    var establishStackSpace = Module["establishStackSpace"] = (function() {
        return Module["asm"]["establishStackSpace"].apply(null, arguments)
    }
    );
    var getTempRet0 = Module["getTempRet0"] = (function() {
        return Module["asm"]["getTempRet0"].apply(null, arguments)
    }
    );
    var runPostSets = Module["runPostSets"] = (function() {
        return Module["asm"]["runPostSets"].apply(null, arguments)
    }
    );
    var setTempRet0 = Module["setTempRet0"] = (function() {
        return Module["asm"]["setTempRet0"].apply(null, arguments)
    }
    );
    var setThrew = Module["setThrew"] = (function() {
        return Module["asm"]["setThrew"].apply(null, arguments)
    }
    );
    var stackAlloc = Module["stackAlloc"] = (function() {
        return Module["asm"]["stackAlloc"].apply(null, arguments)
    }
    );
    var stackRestore = Module["stackRestore"] = (function() {
        return Module["asm"]["stackRestore"].apply(null, arguments)
    }
    );
    var stackSave = Module["stackSave"] = (function() {
        return Module["asm"]["stackSave"].apply(null, arguments)
    }
    );
    var dynCall_dddi = Module["dynCall_dddi"] = (function() {
        return Module["asm"]["dynCall_dddi"].apply(null, arguments)
    }
    );
    var dynCall_ddi = Module["dynCall_ddi"] = (function() {
        return Module["asm"]["dynCall_ddi"].apply(null, arguments)
    }
    );
    var dynCall_dfi = Module["dynCall_dfi"] = (function() {
        return Module["asm"]["dynCall_dfi"].apply(null, arguments)
    }
    );
    var dynCall_di = Module["dynCall_di"] = (function() {
        return Module["asm"]["dynCall_di"].apply(null, arguments)
    }
    );
    var dynCall_diddi = Module["dynCall_diddi"] = (function() {
        return Module["asm"]["dynCall_diddi"].apply(null, arguments)
    }
    );
    var dynCall_didi = Module["dynCall_didi"] = (function() {
        return Module["asm"]["dynCall_didi"].apply(null, arguments)
    }
    );
    var dynCall_dii = Module["dynCall_dii"] = (function() {
        return Module["asm"]["dynCall_dii"].apply(null, arguments)
    }
    );
    var dynCall_diii = Module["dynCall_diii"] = (function() {
        return Module["asm"]["dynCall_diii"].apply(null, arguments)
    }
    );
    var dynCall_diiii = Module["dynCall_diiii"] = (function() {
        return Module["asm"]["dynCall_diiii"].apply(null, arguments)
    }
    );
    var dynCall_dji = Module["dynCall_dji"] = (function() {
        return Module["asm"]["dynCall_dji"].apply(null, arguments)
    }
    );
    var dynCall_f = Module["dynCall_f"] = (function() {
        return Module["asm"]["dynCall_f"].apply(null, arguments)
    }
    );
    var dynCall_fdi = Module["dynCall_fdi"] = (function() {
        return Module["asm"]["dynCall_fdi"].apply(null, arguments)
    }
    );
    var dynCall_ff = Module["dynCall_ff"] = (function() {
        return Module["asm"]["dynCall_ff"].apply(null, arguments)
    }
    );
    var dynCall_fff = Module["dynCall_fff"] = (function() {
        return Module["asm"]["dynCall_fff"].apply(null, arguments)
    }
    );
    var dynCall_ffffi = Module["dynCall_ffffi"] = (function() {
        return Module["asm"]["dynCall_ffffi"].apply(null, arguments)
    }
    );
    var dynCall_fffi = Module["dynCall_fffi"] = (function() {
        return Module["asm"]["dynCall_fffi"].apply(null, arguments)
    }
    );
    var dynCall_fffifffi = Module["dynCall_fffifffi"] = (function() {
        return Module["asm"]["dynCall_fffifffi"].apply(null, arguments)
    }
    );
    var dynCall_ffi = Module["dynCall_ffi"] = (function() {
        return Module["asm"]["dynCall_ffi"].apply(null, arguments)
    }
    );
    var dynCall_fi = Module["dynCall_fi"] = (function() {
        return Module["asm"]["dynCall_fi"].apply(null, arguments)
    }
    );
    var dynCall_fif = Module["dynCall_fif"] = (function() {
        return Module["asm"]["dynCall_fif"].apply(null, arguments)
    }
    );
    var dynCall_fiff = Module["dynCall_fiff"] = (function() {
        return Module["asm"]["dynCall_fiff"].apply(null, arguments)
    }
    );
    var dynCall_fiffi = Module["dynCall_fiffi"] = (function() {
        return Module["asm"]["dynCall_fiffi"].apply(null, arguments)
    }
    );
    var dynCall_fifi = Module["dynCall_fifi"] = (function() {
        return Module["asm"]["dynCall_fifi"].apply(null, arguments)
    }
    );
    var dynCall_fifii = Module["dynCall_fifii"] = (function() {
        return Module["asm"]["dynCall_fifii"].apply(null, arguments)
    }
    );
    var dynCall_fii = Module["dynCall_fii"] = (function() {
        return Module["asm"]["dynCall_fii"].apply(null, arguments)
    }
    );
    var dynCall_fiifi = Module["dynCall_fiifi"] = (function() {
        return Module["asm"]["dynCall_fiifi"].apply(null, arguments)
    }
    );
    var dynCall_fiifii = Module["dynCall_fiifii"] = (function() {
        return Module["asm"]["dynCall_fiifii"].apply(null, arguments)
    }
    );
    var dynCall_fiii = Module["dynCall_fiii"] = (function() {
        return Module["asm"]["dynCall_fiii"].apply(null, arguments)
    }
    );
    var dynCall_fiiii = Module["dynCall_fiiii"] = (function() {
        return Module["asm"]["dynCall_fiiii"].apply(null, arguments)
    }
    );
    var dynCall_fiiiiiifiifif = Module["dynCall_fiiiiiifiifif"] = (function() {
        return Module["asm"]["dynCall_fiiiiiifiifif"].apply(null, arguments)
    }
    );
    var dynCall_fiiiiiifiiiif = Module["dynCall_fiiiiiifiiiif"] = (function() {
        return Module["asm"]["dynCall_fiiiiiifiiiif"].apply(null, arguments)
    }
    );
    var dynCall_fji = Module["dynCall_fji"] = (function() {
        return Module["asm"]["dynCall_fji"].apply(null, arguments)
    }
    );
    var dynCall_i = Module["dynCall_i"] = (function() {
        return Module["asm"]["dynCall_i"].apply(null, arguments)
    }
    );
    var dynCall_idi = Module["dynCall_idi"] = (function() {
        return Module["asm"]["dynCall_idi"].apply(null, arguments)
    }
    );
    var dynCall_idiii = Module["dynCall_idiii"] = (function() {
        return Module["asm"]["dynCall_idiii"].apply(null, arguments)
    }
    );
    var dynCall_ifffi = Module["dynCall_ifffi"] = (function() {
        return Module["asm"]["dynCall_ifffi"].apply(null, arguments)
    }
    );
    var dynCall_iffi = Module["dynCall_iffi"] = (function() {
        return Module["asm"]["dynCall_iffi"].apply(null, arguments)
    }
    );
    var dynCall_ifi = Module["dynCall_ifi"] = (function() {
        return Module["asm"]["dynCall_ifi"].apply(null, arguments)
    }
    );
    var dynCall_ifiii = Module["dynCall_ifiii"] = (function() {
        return Module["asm"]["dynCall_ifiii"].apply(null, arguments)
    }
    );
    var dynCall_ii = Module["dynCall_ii"] = (function() {
        return Module["asm"]["dynCall_ii"].apply(null, arguments)
    }
    );
    var dynCall_iidi = Module["dynCall_iidi"] = (function() {
        return Module["asm"]["dynCall_iidi"].apply(null, arguments)
    }
    );
    var dynCall_iidii = Module["dynCall_iidii"] = (function() {
        return Module["asm"]["dynCall_iidii"].apply(null, arguments)
    }
    );
    var dynCall_iif = Module["dynCall_iif"] = (function() {
        return Module["asm"]["dynCall_iif"].apply(null, arguments)
    }
    );
    var dynCall_iifff = Module["dynCall_iifff"] = (function() {
        return Module["asm"]["dynCall_iifff"].apply(null, arguments)
    }
    );
    var dynCall_iifffi = Module["dynCall_iifffi"] = (function() {
        return Module["asm"]["dynCall_iifffi"].apply(null, arguments)
    }
    );
    var dynCall_iiffi = Module["dynCall_iiffi"] = (function() {
        return Module["asm"]["dynCall_iiffi"].apply(null, arguments)
    }
    );
    var dynCall_iifi = Module["dynCall_iifi"] = (function() {
        return Module["asm"]["dynCall_iifi"].apply(null, arguments)
    }
    );
    var dynCall_iifii = Module["dynCall_iifii"] = (function() {
        return Module["asm"]["dynCall_iifii"].apply(null, arguments)
    }
    );
    var dynCall_iifiii = Module["dynCall_iifiii"] = (function() {
        return Module["asm"]["dynCall_iifiii"].apply(null, arguments)
    }
    );
    var dynCall_iifiiiijii = Module["dynCall_iifiiiijii"] = (function() {
        return Module["asm"]["dynCall_iifiiiijii"].apply(null, arguments)
    }
    );
    var dynCall_iii = Module["dynCall_iii"] = (function() {
        return Module["asm"]["dynCall_iii"].apply(null, arguments)
    }
    );
    var dynCall_iiif = Module["dynCall_iiif"] = (function() {
        return Module["asm"]["dynCall_iiif"].apply(null, arguments)
    }
    );
    var dynCall_iiiff = Module["dynCall_iiiff"] = (function() {
        return Module["asm"]["dynCall_iiiff"].apply(null, arguments)
    }
    );
    var dynCall_iiifi = Module["dynCall_iiifi"] = (function() {
        return Module["asm"]["dynCall_iiifi"].apply(null, arguments)
    }
    );
    var dynCall_iiifii = Module["dynCall_iiifii"] = (function() {
        return Module["asm"]["dynCall_iiifii"].apply(null, arguments)
    }
    );
    var dynCall_iiifiii = Module["dynCall_iiifiii"] = (function() {
        return Module["asm"]["dynCall_iiifiii"].apply(null, arguments)
    }
    );
    var dynCall_iiifiiii = Module["dynCall_iiifiiii"] = (function() {
        return Module["asm"]["dynCall_iiifiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiii = Module["dynCall_iiii"] = (function() {
        return Module["asm"]["dynCall_iiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiifffffi = Module["dynCall_iiiifffffi"] = (function() {
        return Module["asm"]["dynCall_iiiifffffi"].apply(null, arguments)
    }
    );
    var dynCall_iiiifffffii = Module["dynCall_iiiifffffii"] = (function() {
        return Module["asm"]["dynCall_iiiifffffii"].apply(null, arguments)
    }
    );
    var dynCall_iiiifffiii = Module["dynCall_iiiifffiii"] = (function() {
        return Module["asm"]["dynCall_iiiifffiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiifi = Module["dynCall_iiiifi"] = (function() {
        return Module["asm"]["dynCall_iiiifi"].apply(null, arguments)
    }
    );
    var dynCall_iiiifii = Module["dynCall_iiiifii"] = (function() {
        return Module["asm"]["dynCall_iiiifii"].apply(null, arguments)
    }
    );
    var dynCall_iiiifiii = Module["dynCall_iiiifiii"] = (function() {
        return Module["asm"]["dynCall_iiiifiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiifiiii = Module["dynCall_iiiifiiii"] = (function() {
        return Module["asm"]["dynCall_iiiifiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiifiiiii = Module["dynCall_iiiifiiiii"] = (function() {
        return Module["asm"]["dynCall_iiiifiiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiii = Module["dynCall_iiiii"] = (function() {
        return Module["asm"]["dynCall_iiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiifiii = Module["dynCall_iiiiifiii"] = (function() {
        return Module["asm"]["dynCall_iiiiifiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiifiiiiif = Module["dynCall_iiiiifiiiiif"] = (function() {
        return Module["asm"]["dynCall_iiiiifiiiiif"].apply(null, arguments)
    }
    );
    var dynCall_iiiiii = Module["dynCall_iiiiii"] = (function() {
        return Module["asm"]["dynCall_iiiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiifff = Module["dynCall_iiiiiifff"] = (function() {
        return Module["asm"]["dynCall_iiiiiifff"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiifffiiifiii = Module["dynCall_iiiiiifffiiifiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiifffiiifiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiiffiiiiiiiiiffffiii = Module["dynCall_iiiiiiffiiiiiiiiiffffiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiiffiiiiiiiiiffffiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiiffiiiiiiiiiffffiiii = Module["dynCall_iiiiiiffiiiiiiiiiffffiiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiiffiiiiiiiiiffffiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiiffiiiiiiiiiiiiiii = Module["dynCall_iiiiiiffiiiiiiiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiiffiiiiiiiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiifiif = Module["dynCall_iiiiiifiif"] = (function() {
        return Module["asm"]["dynCall_iiiiiifiif"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiifiii = Module["dynCall_iiiiiifiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiifiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiiifiif = Module["dynCall_iiiiiiifiif"] = (function() {
        return Module["asm"]["dynCall_iiiiiiifiif"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiiiiiii = Module["dynCall_iiiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiiiiiiii = Module["dynCall_iiiiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiiiiiiiii = Module["dynCall_iiiiiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiiiiiiiiii = Module["dynCall_iiiiiiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_iiiiiiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_iiiiiji = Module["dynCall_iiiiiji"] = (function() {
        return Module["asm"]["dynCall_iiiiiji"].apply(null, arguments)
    }
    );
    var dynCall_iiiij = Module["dynCall_iiiij"] = (function() {
        return Module["asm"]["dynCall_iiiij"].apply(null, arguments)
    }
    );
    var dynCall_iiiiji = Module["dynCall_iiiiji"] = (function() {
        return Module["asm"]["dynCall_iiiiji"].apply(null, arguments)
    }
    );
    var dynCall_iiiijii = Module["dynCall_iiiijii"] = (function() {
        return Module["asm"]["dynCall_iiiijii"].apply(null, arguments)
    }
    );
    var dynCall_iiiijiii = Module["dynCall_iiiijiii"] = (function() {
        return Module["asm"]["dynCall_iiiijiii"].apply(null, arguments)
    }
    );
    var dynCall_iiij = Module["dynCall_iiij"] = (function() {
        return Module["asm"]["dynCall_iiij"].apply(null, arguments)
    }
    );
    var dynCall_iiiji = Module["dynCall_iiiji"] = (function() {
        return Module["asm"]["dynCall_iiiji"].apply(null, arguments)
    }
    );
    var dynCall_iiijii = Module["dynCall_iiijii"] = (function() {
        return Module["asm"]["dynCall_iiijii"].apply(null, arguments)
    }
    );
    var dynCall_iiijiii = Module["dynCall_iiijiii"] = (function() {
        return Module["asm"]["dynCall_iiijiii"].apply(null, arguments)
    }
    );
    var dynCall_iij = Module["dynCall_iij"] = (function() {
        return Module["asm"]["dynCall_iij"].apply(null, arguments)
    }
    );
    var dynCall_iiji = Module["dynCall_iiji"] = (function() {
        return Module["asm"]["dynCall_iiji"].apply(null, arguments)
    }
    );
    var dynCall_iijii = Module["dynCall_iijii"] = (function() {
        return Module["asm"]["dynCall_iijii"].apply(null, arguments)
    }
    );
    var dynCall_iijiii = Module["dynCall_iijiii"] = (function() {
        return Module["asm"]["dynCall_iijiii"].apply(null, arguments)
    }
    );
    var dynCall_iijji = Module["dynCall_iijji"] = (function() {
        return Module["asm"]["dynCall_iijji"].apply(null, arguments)
    }
    );
    var dynCall_iijjii = Module["dynCall_iijjii"] = (function() {
        return Module["asm"]["dynCall_iijjii"].apply(null, arguments)
    }
    );
    var dynCall_iijjiii = Module["dynCall_iijjiii"] = (function() {
        return Module["asm"]["dynCall_iijjiii"].apply(null, arguments)
    }
    );
    var dynCall_iijjji = Module["dynCall_iijjji"] = (function() {
        return Module["asm"]["dynCall_iijjji"].apply(null, arguments)
    }
    );
    var dynCall_ij = Module["dynCall_ij"] = (function() {
        return Module["asm"]["dynCall_ij"].apply(null, arguments)
    }
    );
    var dynCall_iji = Module["dynCall_iji"] = (function() {
        return Module["asm"]["dynCall_iji"].apply(null, arguments)
    }
    );
    var dynCall_ijiii = Module["dynCall_ijiii"] = (function() {
        return Module["asm"]["dynCall_ijiii"].apply(null, arguments)
    }
    );
    var dynCall_ijj = Module["dynCall_ijj"] = (function() {
        return Module["asm"]["dynCall_ijj"].apply(null, arguments)
    }
    );
    var dynCall_ijji = Module["dynCall_ijji"] = (function() {
        return Module["asm"]["dynCall_ijji"].apply(null, arguments)
    }
    );
    var dynCall_j = Module["dynCall_j"] = (function() {
        return Module["asm"]["dynCall_j"].apply(null, arguments)
    }
    );
    var dynCall_jdi = Module["dynCall_jdi"] = (function() {
        return Module["asm"]["dynCall_jdi"].apply(null, arguments)
    }
    );
    var dynCall_jdii = Module["dynCall_jdii"] = (function() {
        return Module["asm"]["dynCall_jdii"].apply(null, arguments)
    }
    );
    var dynCall_jfi = Module["dynCall_jfi"] = (function() {
        return Module["asm"]["dynCall_jfi"].apply(null, arguments)
    }
    );
    var dynCall_ji = Module["dynCall_ji"] = (function() {
        return Module["asm"]["dynCall_ji"].apply(null, arguments)
    }
    );
    var dynCall_jidi = Module["dynCall_jidi"] = (function() {
        return Module["asm"]["dynCall_jidi"].apply(null, arguments)
    }
    );
    var dynCall_jidii = Module["dynCall_jidii"] = (function() {
        return Module["asm"]["dynCall_jidii"].apply(null, arguments)
    }
    );
    var dynCall_jii = Module["dynCall_jii"] = (function() {
        return Module["asm"]["dynCall_jii"].apply(null, arguments)
    }
    );
    var dynCall_jiii = Module["dynCall_jiii"] = (function() {
        return Module["asm"]["dynCall_jiii"].apply(null, arguments)
    }
    );
    var dynCall_jiiii = Module["dynCall_jiiii"] = (function() {
        return Module["asm"]["dynCall_jiiii"].apply(null, arguments)
    }
    );
    var dynCall_jiiiii = Module["dynCall_jiiiii"] = (function() {
        return Module["asm"]["dynCall_jiiiii"].apply(null, arguments)
    }
    );
    var dynCall_jiiiiii = Module["dynCall_jiiiiii"] = (function() {
        return Module["asm"]["dynCall_jiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_jiiiiiiiiii = Module["dynCall_jiiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_jiiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_jiiji = Module["dynCall_jiiji"] = (function() {
        return Module["asm"]["dynCall_jiiji"].apply(null, arguments)
    }
    );
    var dynCall_jiji = Module["dynCall_jiji"] = (function() {
        return Module["asm"]["dynCall_jiji"].apply(null, arguments)
    }
    );
    var dynCall_jijii = Module["dynCall_jijii"] = (function() {
        return Module["asm"]["dynCall_jijii"].apply(null, arguments)
    }
    );
    var dynCall_jijiii = Module["dynCall_jijiii"] = (function() {
        return Module["asm"]["dynCall_jijiii"].apply(null, arguments)
    }
    );
    var dynCall_jijj = Module["dynCall_jijj"] = (function() {
        return Module["asm"]["dynCall_jijj"].apply(null, arguments)
    }
    );
    var dynCall_jijji = Module["dynCall_jijji"] = (function() {
        return Module["asm"]["dynCall_jijji"].apply(null, arguments)
    }
    );
    var dynCall_jji = Module["dynCall_jji"] = (function() {
        return Module["asm"]["dynCall_jji"].apply(null, arguments)
    }
    );
    var dynCall_v = Module["dynCall_v"] = (function() {
        return Module["asm"]["dynCall_v"].apply(null, arguments)
    }
    );
    var dynCall_vd = Module["dynCall_vd"] = (function() {
        return Module["asm"]["dynCall_vd"].apply(null, arguments)
    }
    );
    var dynCall_vf = Module["dynCall_vf"] = (function() {
        return Module["asm"]["dynCall_vf"].apply(null, arguments)
    }
    );
    var dynCall_vff = Module["dynCall_vff"] = (function() {
        return Module["asm"]["dynCall_vff"].apply(null, arguments)
    }
    );
    var dynCall_vffff = Module["dynCall_vffff"] = (function() {
        return Module["asm"]["dynCall_vffff"].apply(null, arguments)
    }
    );
    var dynCall_vfi = Module["dynCall_vfi"] = (function() {
        return Module["asm"]["dynCall_vfi"].apply(null, arguments)
    }
    );
    var dynCall_vi = Module["dynCall_vi"] = (function() {
        return Module["asm"]["dynCall_vi"].apply(null, arguments)
    }
    );
    var dynCall_vid = Module["dynCall_vid"] = (function() {
        return Module["asm"]["dynCall_vid"].apply(null, arguments)
    }
    );
    var dynCall_vidi = Module["dynCall_vidi"] = (function() {
        return Module["asm"]["dynCall_vidi"].apply(null, arguments)
    }
    );
    var dynCall_vif = Module["dynCall_vif"] = (function() {
        return Module["asm"]["dynCall_vif"].apply(null, arguments)
    }
    );
    var dynCall_viff = Module["dynCall_viff"] = (function() {
        return Module["asm"]["dynCall_viff"].apply(null, arguments)
    }
    );
    var dynCall_vifff = Module["dynCall_vifff"] = (function() {
        return Module["asm"]["dynCall_vifff"].apply(null, arguments)
    }
    );
    var dynCall_viffff = Module["dynCall_viffff"] = (function() {
        return Module["asm"]["dynCall_viffff"].apply(null, arguments)
    }
    );
    var dynCall_viffffi = Module["dynCall_viffffi"] = (function() {
        return Module["asm"]["dynCall_viffffi"].apply(null, arguments)
    }
    );
    var dynCall_viffffii = Module["dynCall_viffffii"] = (function() {
        return Module["asm"]["dynCall_viffffii"].apply(null, arguments)
    }
    );
    var dynCall_viffffiifffiiiiif = Module["dynCall_viffffiifffiiiiif"] = (function() {
        return Module["asm"]["dynCall_viffffiifffiiiiif"].apply(null, arguments)
    }
    );
    var dynCall_vifffi = Module["dynCall_vifffi"] = (function() {
        return Module["asm"]["dynCall_vifffi"].apply(null, arguments)
    }
    );
    var dynCall_vifffii = Module["dynCall_vifffii"] = (function() {
        return Module["asm"]["dynCall_vifffii"].apply(null, arguments)
    }
    );
    var dynCall_viffi = Module["dynCall_viffi"] = (function() {
        return Module["asm"]["dynCall_viffi"].apply(null, arguments)
    }
    );
    var dynCall_viffii = Module["dynCall_viffii"] = (function() {
        return Module["asm"]["dynCall_viffii"].apply(null, arguments)
    }
    );
    var dynCall_viffiifffffiii = Module["dynCall_viffiifffffiii"] = (function() {
        return Module["asm"]["dynCall_viffiifffffiii"].apply(null, arguments)
    }
    );
    var dynCall_viffiii = Module["dynCall_viffiii"] = (function() {
        return Module["asm"]["dynCall_viffiii"].apply(null, arguments)
    }
    );
    var dynCall_viffiiiif = Module["dynCall_viffiiiif"] = (function() {
        return Module["asm"]["dynCall_viffiiiif"].apply(null, arguments)
    }
    );
    var dynCall_vifi = Module["dynCall_vifi"] = (function() {
        return Module["asm"]["dynCall_vifi"].apply(null, arguments)
    }
    );
    var dynCall_vifii = Module["dynCall_vifii"] = (function() {
        return Module["asm"]["dynCall_vifii"].apply(null, arguments)
    }
    );
    var dynCall_vifiiii = Module["dynCall_vifiiii"] = (function() {
        return Module["asm"]["dynCall_vifiiii"].apply(null, arguments)
    }
    );
    var dynCall_vifijii = Module["dynCall_vifijii"] = (function() {
        return Module["asm"]["dynCall_vifijii"].apply(null, arguments)
    }
    );
    var dynCall_vii = Module["dynCall_vii"] = (function() {
        return Module["asm"]["dynCall_vii"].apply(null, arguments)
    }
    );
    var dynCall_viid = Module["dynCall_viid"] = (function() {
        return Module["asm"]["dynCall_viid"].apply(null, arguments)
    }
    );
    var dynCall_viidi = Module["dynCall_viidi"] = (function() {
        return Module["asm"]["dynCall_viidi"].apply(null, arguments)
    }
    );
    var dynCall_viidii = Module["dynCall_viidii"] = (function() {
        return Module["asm"]["dynCall_viidii"].apply(null, arguments)
    }
    );
    var dynCall_viif = Module["dynCall_viif"] = (function() {
        return Module["asm"]["dynCall_viif"].apply(null, arguments)
    }
    );
    var dynCall_viiff = Module["dynCall_viiff"] = (function() {
        return Module["asm"]["dynCall_viiff"].apply(null, arguments)
    }
    );
    var dynCall_viifff = Module["dynCall_viifff"] = (function() {
        return Module["asm"]["dynCall_viifff"].apply(null, arguments)
    }
    );
    var dynCall_viifffi = Module["dynCall_viifffi"] = (function() {
        return Module["asm"]["dynCall_viifffi"].apply(null, arguments)
    }
    );
    var dynCall_viiffi = Module["dynCall_viiffi"] = (function() {
        return Module["asm"]["dynCall_viiffi"].apply(null, arguments)
    }
    );
    var dynCall_viiffii = Module["dynCall_viiffii"] = (function() {
        return Module["asm"]["dynCall_viiffii"].apply(null, arguments)
    }
    );
    var dynCall_viifi = Module["dynCall_viifi"] = (function() {
        return Module["asm"]["dynCall_viifi"].apply(null, arguments)
    }
    );
    var dynCall_viifii = Module["dynCall_viifii"] = (function() {
        return Module["asm"]["dynCall_viifii"].apply(null, arguments)
    }
    );
    var dynCall_viifiii = Module["dynCall_viifiii"] = (function() {
        return Module["asm"]["dynCall_viifiii"].apply(null, arguments)
    }
    );
    var dynCall_viifiiii = Module["dynCall_viifiiii"] = (function() {
        return Module["asm"]["dynCall_viifiiii"].apply(null, arguments)
    }
    );
    var dynCall_viii = Module["dynCall_viii"] = (function() {
        return Module["asm"]["dynCall_viii"].apply(null, arguments)
    }
    );
    var dynCall_viiidi = Module["dynCall_viiidi"] = (function() {
        return Module["asm"]["dynCall_viiidi"].apply(null, arguments)
    }
    );
    var dynCall_viiif = Module["dynCall_viiif"] = (function() {
        return Module["asm"]["dynCall_viiif"].apply(null, arguments)
    }
    );
    var dynCall_viiifffi = Module["dynCall_viiifffi"] = (function() {
        return Module["asm"]["dynCall_viiifffi"].apply(null, arguments)
    }
    );
    var dynCall_viiiffi = Module["dynCall_viiiffi"] = (function() {
        return Module["asm"]["dynCall_viiiffi"].apply(null, arguments)
    }
    );
    var dynCall_viiiffii = Module["dynCall_viiiffii"] = (function() {
        return Module["asm"]["dynCall_viiiffii"].apply(null, arguments)
    }
    );
    var dynCall_viiifi = Module["dynCall_viiifi"] = (function() {
        return Module["asm"]["dynCall_viiifi"].apply(null, arguments)
    }
    );
    var dynCall_viiifii = Module["dynCall_viiifii"] = (function() {
        return Module["asm"]["dynCall_viiifii"].apply(null, arguments)
    }
    );
    var dynCall_viiifiii = Module["dynCall_viiifiii"] = (function() {
        return Module["asm"]["dynCall_viiifiii"].apply(null, arguments)
    }
    );
    var dynCall_viiifiiiii = Module["dynCall_viiifiiiii"] = (function() {
        return Module["asm"]["dynCall_viiifiiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiii = Module["dynCall_viiii"] = (function() {
        return Module["asm"]["dynCall_viiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiif = Module["dynCall_viiiif"] = (function() {
        return Module["asm"]["dynCall_viiiif"].apply(null, arguments)
    }
    );
    var dynCall_viiiifii = Module["dynCall_viiiifii"] = (function() {
        return Module["asm"]["dynCall_viiiifii"].apply(null, arguments)
    }
    );
    var dynCall_viiiifiiiiif = Module["dynCall_viiiifiiiiif"] = (function() {
        return Module["asm"]["dynCall_viiiifiiiiif"].apply(null, arguments)
    }
    );
    var dynCall_viiiii = Module["dynCall_viiiii"] = (function() {
        return Module["asm"]["dynCall_viiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiif = Module["dynCall_viiiiif"] = (function() {
        return Module["asm"]["dynCall_viiiiif"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiffi = Module["dynCall_viiiiiffi"] = (function() {
        return Module["asm"]["dynCall_viiiiiffi"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiffii = Module["dynCall_viiiiiffii"] = (function() {
        return Module["asm"]["dynCall_viiiiiffii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiifi = Module["dynCall_viiiiifi"] = (function() {
        return Module["asm"]["dynCall_viiiiifi"].apply(null, arguments)
    }
    );
    var dynCall_viiiiii = Module["dynCall_viiiiii"] = (function() {
        return Module["asm"]["dynCall_viiiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiif = Module["dynCall_viiiiiif"] = (function() {
        return Module["asm"]["dynCall_viiiiiif"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiii = Module["dynCall_viiiiiii"] = (function() {
        return Module["asm"]["dynCall_viiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiiifi = Module["dynCall_viiiiiiifi"] = (function() {
        return Module["asm"]["dynCall_viiiiiiifi"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = (function() {
        return Module["asm"]["dynCall_viiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_viiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiiiiii = Module["dynCall_viiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_viiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiiiiiii = Module["dynCall_viiiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_viiiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiiiiiiifii = Module["dynCall_viiiiiiiiiiifii"] = (function() {
        return Module["asm"]["dynCall_viiiiiiiiiiifii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiiiiiiii = Module["dynCall_viiiiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_viiiiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_viiiiiiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_viiiiiiiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiiiiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiiiiiii"] = (function() {
        return Module["asm"]["dynCall_viiiiiiiiiiiiiiiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiij = Module["dynCall_viiiij"] = (function() {
        return Module["asm"]["dynCall_viiiij"].apply(null, arguments)
    }
    );
    var dynCall_viiiijiiii = Module["dynCall_viiiijiiii"] = (function() {
        return Module["asm"]["dynCall_viiiijiiii"].apply(null, arguments)
    }
    );
    var dynCall_viiiji = Module["dynCall_viiiji"] = (function() {
        return Module["asm"]["dynCall_viiiji"].apply(null, arguments)
    }
    );
    var dynCall_viiijji = Module["dynCall_viiijji"] = (function() {
        return Module["asm"]["dynCall_viiijji"].apply(null, arguments)
    }
    );
    var dynCall_viij = Module["dynCall_viij"] = (function() {
        return Module["asm"]["dynCall_viij"].apply(null, arguments)
    }
    );
    var dynCall_viiji = Module["dynCall_viiji"] = (function() {
        return Module["asm"]["dynCall_viiji"].apply(null, arguments)
    }
    );
    var dynCall_viijii = Module["dynCall_viijii"] = (function() {
        return Module["asm"]["dynCall_viijii"].apply(null, arguments)
    }
    );
    var dynCall_viijiijiii = Module["dynCall_viijiijiii"] = (function() {
        return Module["asm"]["dynCall_viijiijiii"].apply(null, arguments)
    }
    );
    var dynCall_viijijii = Module["dynCall_viijijii"] = (function() {
        return Module["asm"]["dynCall_viijijii"].apply(null, arguments)
    }
    );
    var dynCall_viijijiii = Module["dynCall_viijijiii"] = (function() {
        return Module["asm"]["dynCall_viijijiii"].apply(null, arguments)
    }
    );
    var dynCall_viijijj = Module["dynCall_viijijj"] = (function() {
        return Module["asm"]["dynCall_viijijj"].apply(null, arguments)
    }
    );
    var dynCall_viijj = Module["dynCall_viijj"] = (function() {
        return Module["asm"]["dynCall_viijj"].apply(null, arguments)
    }
    );
    var dynCall_viijji = Module["dynCall_viijji"] = (function() {
        return Module["asm"]["dynCall_viijji"].apply(null, arguments)
    }
    );
    var dynCall_viijjiii = Module["dynCall_viijjiii"] = (function() {
        return Module["asm"]["dynCall_viijjiii"].apply(null, arguments)
    }
    );
    var dynCall_viijjji = Module["dynCall_viijjji"] = (function() {
        return Module["asm"]["dynCall_viijjji"].apply(null, arguments)
    }
    );
    var dynCall_vij = Module["dynCall_vij"] = (function() {
        return Module["asm"]["dynCall_vij"].apply(null, arguments)
    }
    );
    var dynCall_viji = Module["dynCall_viji"] = (function() {
        return Module["asm"]["dynCall_viji"].apply(null, arguments)
    }
    );
    var dynCall_vijii = Module["dynCall_vijii"] = (function() {
        return Module["asm"]["dynCall_vijii"].apply(null, arguments)
    }
    );
    var dynCall_vijiii = Module["dynCall_vijiii"] = (function() {
        return Module["asm"]["dynCall_vijiii"].apply(null, arguments)
    }
    );
    var dynCall_vijiji = Module["dynCall_vijiji"] = (function() {
        return Module["asm"]["dynCall_vijiji"].apply(null, arguments)
    }
    );
    var dynCall_vijijji = Module["dynCall_vijijji"] = (function() {
        return Module["asm"]["dynCall_vijijji"].apply(null, arguments)
    }
    );
    var dynCall_vijji = Module["dynCall_vijji"] = (function() {
        return Module["asm"]["dynCall_vijji"].apply(null, arguments)
    }
    );
    var dynCall_vijjii = Module["dynCall_vijjii"] = (function() {
        return Module["asm"]["dynCall_vijjii"].apply(null, arguments)
    }
    );
    var dynCall_vjiiii = Module["dynCall_vjiiii"] = (function() {
        return Module["asm"]["dynCall_vjiiii"].apply(null, arguments)
    }
    );
    var dynCall_vjji = Module["dynCall_vjji"] = (function() {
        return Module["asm"]["dynCall_vjji"].apply(null, arguments)
    }
    );
    Module["asm"] = asm;
    Module["ccall"] = ccall;
    Module["cwrap"] = cwrap;
    Module["stackTrace"] = stackTrace;
    Module["addRunDependency"] = addRunDependency;
    Module["removeRunDependency"] = removeRunDependency;
    Module["FS_createPath"] = FS.createPath;
    Module["FS_createDataFile"] = FS.createDataFile;
    function ExitStatus(status) {
        this.name = "ExitStatus";
        this.message = "Program terminated with exit(" + status + ")";
        this.status = status
    }
    ExitStatus.prototype = new Error;
    ExitStatus.prototype.constructor = ExitStatus;
    var initialStackTop;
    var calledMain = false;
    dependenciesFulfilled = function runCaller() {
        if (!Module["calledRun"])
            run();
        if (!Module["calledRun"])
            dependenciesFulfilled = runCaller
    }
    ;
    Module["callMain"] = function callMain(args) {
        args = args || [];
        ensureInitRuntime();
        var argc = args.length + 1;
        var argv = stackAlloc((argc + 1) * 4);
        HEAP32[argv >> 2] = allocateUTF8OnStack(Module["thisProgram"]);
        for (var i = 1; i < argc; i++) {
            HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1])
        }
        HEAP32[(argv >> 2) + argc] = 0;
        try {
            var ret = Module["_main"](argc, argv, 0);
            exit(ret, true)
        } catch (e) {
            if (e instanceof ExitStatus) {
                return
            } else if (e == "SimulateInfiniteLoop") {
                Module["noExitRuntime"] = true;
                return
            } else {
                var toLog = e;
                if (e && typeof e === "object" && e.stack) {
                    toLog = [e, e.stack]
                }
                err("exception thrown: " + toLog);
                Module["quit"](1, e)
            }
        } finally {
            calledMain = true
        }
    }
    ;
    function run(args) {
        args = args || Module["arguments"];
        if (runDependencies > 0) {
            return
        }
        preRun();
        if (runDependencies > 0)
            return;
        if (Module["calledRun"])
            return;
        function doRun() {
            if (Module["calledRun"])
                return;
            Module["calledRun"] = true;
            if (ABORT)
                return;
            ensureInitRuntime();
            preMain();
            if (Module["onRuntimeInitialized"])
                Module["onRuntimeInitialized"]();
            if (Module["_main"] && shouldRunNow)
                Module["callMain"](args);
            postRun()
        }
        if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout((function() {
                setTimeout((function() {
                    Module["setStatus"]("")
                }
                ), 1);
                doRun()
            }
            ), 1)
        } else {
            doRun()
        }
    }
    Module["run"] = run;
    function exit(status, implicit) {
        if (implicit && Module["noExitRuntime"] && status === 0) {
            return
        }
        if (Module["noExitRuntime"]) {} else {
            ABORT = true;
            EXITSTATUS = status;
            STACKTOP = initialStackTop;
            exitRuntime();
            if (Module["onExit"])
                Module["onExit"](status)
        }
        Module["quit"](status, new ExitStatus(status))
    }
    function abort(what) {
        if (Module["onAbort"]) {
            Module["onAbort"](what)
        }
        if (what !== undefined) {
            out(what);
            err(what);
            what = JSON.stringify(what)
        } else {
            what = ""
        }
        ABORT = true;
        EXITSTATUS = 1;
        throw "abort(" + what + "). Build with -s ASSERTIONS=1 for more info."
    }
    Module["abort"] = abort;
    if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function")
            Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
            Module["preInit"].pop()()
        }
    }
    var shouldRunNow = true;
    if (Module["noInitialRun"]) {
        shouldRunNow = false
    }
    Module["noExitRuntime"] = true;
    run()

}
            
            
            
            `
            var t = URL.createObjectURL(new Blob([e],{
                type: "application/javascript"
            }));
            return new Promise(function(e, n) {
                var r = document.createElement("script");
                r.src = t,
                r.onload = function() {
                    var n = unityFramework;
                    unityFramework = null,
                    r.onload = null,
                    URL.revokeObjectURL(t),
                    e(n)
                }
                ,
                document.body.appendChild(r),
                c.deinitializers.push(function() {
                    document.body.removeChild(r)
                })
            }
            )
        })
    }
    function u() {
        Promise.all([f(), d("codeUrl")]).then(function(e) {
            c.wasmBinary = e[1],
            e[0](c)
        });
        var e = d("dataUrl");
        c.preRun.push(function() {
            c.addRunDependency("dataUrl"),
            e.then(function(e) {
                var t = new DataView(e.buffer,e.byteOffset,e.byteLength)
                  , n = 0
                  , r = "UnityWebData1.0\0";
                if (!String.fromCharCode.apply(null, e.subarray(n, n + r.length)) == r)
                    throw "unknown data format";
                n += r.length;
                var o = t.getUint32(n, !0);
                for (n += 4; n < o; ) {
                    var i = t.getUint32(n, !0);
                    n += 4;
                    var s = t.getUint32(n, !0);
                    n += 4;
                    var a = t.getUint32(n, !0);
                    n += 4;
                    var d = String.fromCharCode.apply(null, e.subarray(n, n + a));
                    n += a;
                    for (var f = 0, u = d.indexOf("/", f) + 1; u > 0; f = u,
                    u = d.indexOf("/", f) + 1)
                        c.FS_createPath(d.substring(0, f), d.substring(f, u - 1), !0, !0);
                    c.FS_createDataFile(d, null, e.subarray(i, i + s), !0, !0, !0)
                }
                c.removeRunDependency("dataUrl")
            })
        })
    }
    n = n || function() {}
    ;
    var c = {
        canvas: e,
        webglContextAttributes: {
            preserveDrawingBuffer: !1
        },
        cacheControl: function(e) {
            return e == c.dataUrl ? "must-revalidate" : "no-store"
        },
        streamingAssetsUrl: "StreamingAssets",
        downloadProgress: {},
        deinitializers: [],
        intervals: {},
        setInterval: function(e, t) {
            var n = window.setInterval(e, t);
            return this.intervals[n] = !0,
            n
        },
        clearInterval: function(e) {
            delete this.intervals[e],
            window.clearInterval(e)
        },
        preRun: [],
        postRun: [],
        print: function(e) {
            console.log(e)
        },
        printErr: function(e) {
            console.error(e)
        },
        locateFile: function(e) {
            return e
        },
        disabledCanvasEvents: ["contextmenu", "dragstart"]
    };
    for (var l in t)
        c[l] = t[l];
    c.streamingAssetsUrl = "https://cdn.jsdelivr.net/gh/CoolDude2349/everything@main/funnybattle/StreamingAssets/";
    var p = c.disabledCanvasEvents.slice();
    p.forEach(function(t) {
        e.addEventListener(t, o)
    }),
    window.addEventListener("error", r),
    window.addEventListener("unhandledrejection", r);
    var h = {
        Module: c,
        SetFullscreen: function() {
            return c.SetFullscreen ? c.SetFullscreen.apply(c, arguments) : void c.print("Failed to set Fullscreen mode: Player not loaded yet.")
        },
        SendMessage: function() {
            return c.SendMessage ? c.SendMessage.apply(c, arguments) : void c.print("Failed to execute SendMessage: Player not loaded yet.")
        },
        Quit: function() {
            return new Promise(function(t, n) {
                c.shouldQuit = !0,
                c.onQuit = t,
                p.forEach(function(t) {
                    e.removeEventListener(t, o)
                }),
                window.removeEventListener("error", r),
                window.removeEventListener("unhandledrejection", r)
            }
            )
        }
    };
    c.SystemInfo = function() {
        function e(e, t, n) {
            return e = RegExp(e, "i").exec(t),
            e && e[n]
        }
        for (var t, n, r, o, i, s, a = navigator.userAgent + " ", d = [["Firefox", "Firefox"], ["OPR", "Opera"], ["Edg", "Edge"], ["SamsungBrowser", "Samsung Browser"], ["Trident", "Internet Explorer"], ["MSIE", "Internet Explorer"], ["Chrome", "Chrome"], ["CriOS", "Chrome on iOS Safari"], ["FxiOS", "Firefox on iOS Safari"], ["Safari", "Safari"]], f = 0; f < d.length; ++f)
            if (n = e(d[f][0] + "[/ ](.*?)[ \\)]", a, 1)) {
                t = d[f][1];
                break
            }
        "Safari" == t && (n = e("Version/(.*?) ", a, 1)),
        "Internet Explorer" == t && (n = e("rv:(.*?)\\)? ", a, 1) || n);
        for (var u = [["Windows (.*?)[;)]", "Windows"], ["Android ([0-9_.]+)", "Android"], ["iPhone OS ([0-9_.]+)", "iPhoneOS"], ["iPad.*? OS ([0-9_.]+)", "iPadOS"], ["FreeBSD( )", "FreeBSD"], ["OpenBSD( )", "OpenBSD"], ["Linux|X11()", "Linux"], ["Mac OS X ([0-9_.]+)", "macOS"], ["bot|google|baidu|bing|msn|teoma|slurp|yandex", "Search Bot"]], c = 0; c < u.length; ++c)
            if (o = e(u[c][0], a, 1)) {
                r = u[c][1],
                o = o.replace(/_/g, ".");
                break
            }
        var l = {
            "NT 5.0": "2000",
            "NT 5.1": "XP",
            "NT 5.2": "Server 2003",
            "NT 6.0": "Vista",
            "NT 6.1": "7",
            "NT 6.2": "8",
            "NT 6.3": "8.1",
            "NT 10.0": "10"
        };
        o = l[o] || o,
        i = document.createElement("canvas"),
        i && (gl = i.getContext("webgl2"),
        glVersion = gl ? 2 : 0,
        gl || (gl = i && i.getContext("webgl")) && (glVersion = 1),
        gl && (s = gl.getExtension("WEBGL_debug_renderer_info") && gl.getParameter(37446) || gl.getParameter(7937)));
        var p = "undefined" != typeof SharedArrayBuffer
          , h = "object" == typeof WebAssembly && "function" == typeof WebAssembly.compile;
        return {
            width: screen.width,
            height: screen.height,
            userAgent: a.trim(),
            browser: t || "Unknown browser",
            browserVersion: n || "Unknown version",
            mobile: /Mobile|Android|iP(ad|hone)/.test(navigator.appVersion),
            os: r || "Unknown OS",
            osVersion: o || "Unknown OS Version",
            gpu: s || "Unknown GPU",
            language: navigator.userLanguage || navigator.language,
            hasWebGL: glVersion,
            hasCursorLock: !!document.body.requestPointerLock,
            hasFullscreen: !!document.body.requestFullscreen,
            hasThreads: p,
            hasWasm: h,
            hasWasmThreads: !1
        }
    }(),
    c.abortHandler = function(e) {
        return i(e, "", 0),
        !0
    }
    ,
    Error.stackTraceLimit = Math.max(Error.stackTraceLimit || 0, 50),
    c.XMLHttpRequest = function() {
        function e(e) {
            console.log("[UnityCache] " + e)
        }
        function t(e) {
            return t.link = t.link || document.createElement("a"),
            t.link.href = e,
            t.link.href
        }
        function n(e) {
            var t = window.location.href.match(/^[a-z]+:\/\/[^\/]+/);
            return !t || e.lastIndexOf(t[0], 0)
        }
        function r() {
            function t(t) {
                if ("undefined" == typeof r.database)
                    for (r.database = t,
                    r.database || e("indexedDB database could not be opened"); r.queue.length; ) {
                        var n = r.queue.shift();
                        r.database ? r.execute.apply(r, n.arguments) : "function" == typeof n.onerror && n.onerror(new Error("operation cancelled"))
                    }
            }
            function n() {
                var e = o.open(s.name, s.version);
                e.onupgradeneeded = function(e) {
                    var t = e.target.result;
                    t.objectStoreNames.contains(d.name) || t.createObjectStore(d.name)
                }
                ,
                e.onsuccess = function(e) {
                    t(e.target.result)
                }
                ,
                e.onerror = function() {
                    t(null)
                }
            }
            var r = this;
            r.queue = [];
            try {
                var o = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
                  , i = o.open(s.name);
                i.onupgradeneeded = function(e) {
                    var t = e.target.result.createObjectStore(a.name, {
                        keyPath: "url"
                    });
                    ["version", "company", "product", "updated", "revalidated", "accessed"].forEach(function(e) {
                        t.createIndex(e, e)
                    })
                }
                ,
                i.onsuccess = function(e) {
                    var r = e.target.result;
                    r.version < s.version ? (r.close(),
                    n()) : t(r)
                }
                ,
                i.onerror = function() {
                    t(null)
                }
            } catch (e) {
                t(null)
            }
        }
        function o(e, t, n, r, o) {
            var i = {
                url: e,
                version: a.version,
                company: t,
                product: n,
                updated: r,
                revalidated: r,
                accessed: r,
                responseHeaders: {},
                xhr: {}
            };
            return o && (["Last-Modified", "ETag"].forEach(function(e) {
                i.responseHeaders[e] = o.getResponseHeader(e)
            }),
            ["responseURL", "status", "statusText", "response"].forEach(function(e) {
                i.xhr[e] = o[e]
            })),
            i
        }
        function i(t) {
            this.cache = {
                enabled: !1
            },
            t && (this.cache.control = t.cacheControl,
            this.cache.company = t.companyName,
            this.cache.product = t.productName),
            this.xhr = new XMLHttpRequest(t),
            this.xhr.addEventListener("load", function() {
                var t = this.xhr
                  , n = this.cache;
                n.enabled && !n.revalidated && (304 == t.status ? (n.result.revalidated = n.result.accessed,
                n.revalidated = !0,
                f.execute(a.name, "put", [n.result]),
                e("'" + n.result.url + "' successfully revalidated and served from the indexedDB cache")) : 200 == t.status ? (n.result = o(n.result.url, n.company, n.product, n.result.accessed, t),
                n.revalidated = !0,
                f.execute(a.name, "put", [n.result], function(t) {
                    e("'" + n.result.url + "' successfully downloaded and stored in the indexedDB cache")
                }, function(t) {
                    e("'" + n.result.url + "' successfully downloaded but not stored in the indexedDB cache due to the error: " + t)
                })) : e("'" + n.result.url + "' request failed with status: " + t.status + " " + t.statusText))
            }
            .bind(this))
        }
        var s = {
            name: "UnityCache",
            version: 2
        }
          , a = {
            name: "XMLHttpRequest",
            version: 1
        }
          , d = {
            name: "WebAssembly",
            version: 1
        };
        r.prototype.execute = function(e, t, n, r, o) {
            if (this.database)
                try {
                    var i = this.database.transaction([e], ["put", "delete", "clear"].indexOf(t) != -1 ? "readwrite" : "readonly").objectStore(e);
                    "openKeyCursor" == t && (i = i.index(n[0]),
                    n = n.slice(1));
                    var s = i[t].apply(i, n);
                    "function" == typeof r && (s.onsuccess = function(e) {
                        r(e.target.result)
                    }
                    ),
                    s.onerror = o
                } catch (e) {
                    "function" == typeof o && o(e)
                }
            else
                "undefined" == typeof this.database ? this.queue.push({
                    arguments: arguments,
                    onerror: o
                }) : "function" == typeof o && o(new Error("indexedDB access denied"))
        }
        ;
        var f = new r;
        i.prototype.send = function(t) {
            var r = this.xhr
              , o = this.cache
              , i = arguments;
            return o.enabled = o.enabled && "arraybuffer" == r.responseType && !t,
            o.enabled ? void f.execute(a.name, "get", [o.result.url], function(t) {
                if (!t || t.version != a.version)
                    return void r.send.apply(r, i);
                if (o.result = t,
                o.result.accessed = Date.now(),
                "immutable" == o.control)
                    o.revalidated = !0,
                    f.execute(a.name, "put", [o.result]),
                    r.dispatchEvent(new Event("load")),
                    e("'" + o.result.url + "' served from the indexedDB cache without revalidation");
                else if (n(o.result.url) && (o.result.responseHeaders["Last-Modified"] || o.result.responseHeaders.ETag)) {
                    var s = new XMLHttpRequest;
                    s.open("HEAD", o.result.url),
                    s.onload = function() {
                        o.revalidated = ["Last-Modified", "ETag"].every(function(e) {
                            return !o.result.responseHeaders[e] || o.result.responseHeaders[e] == s.getResponseHeader(e)
                        }),
                        o.revalidated ? (o.result.revalidated = o.result.accessed,
                        f.execute(a.name, "put", [o.result]),
                        r.dispatchEvent(new Event("load")),
                        e("'" + o.result.url + "' successfully revalidated and served from the indexedDB cache")) : r.send.apply(r, i)
                    }
                    ,
                    s.send()
                } else
                    o.result.responseHeaders["Last-Modified"] ? (r.setRequestHeader("If-Modified-Since", o.result.responseHeaders["Last-Modified"]),
                    r.setRequestHeader("Cache-Control", "no-cache")) : o.result.responseHeaders.ETag && (r.setRequestHeader("If-None-Match", o.result.responseHeaders.ETag),
                    r.setRequestHeader("Cache-Control", "no-cache")),
                    r.send.apply(r, i)
            }, function(e) {
                r.send.apply(r, i)
            }) : r.send.apply(r, i)
        }
        ,
        i.prototype.open = function(e, n, r, i, s) {
            return this.cache.result = o(t(n), this.cache.company, this.cache.product, Date.now()),
            this.cache.enabled = ["must-revalidate", "immutable"].indexOf(this.cache.control) != -1 && "GET" == e && this.cache.result.url.match("^https?://") && ("undefined" == typeof r || r) && "undefined" == typeof i && "undefined" == typeof s,
            this.cache.revalidated = !1,
            this.xhr.open.apply(this.xhr, arguments)
        }
        ,
        i.prototype.setRequestHeader = function(e, t) {
            return this.cache.enabled = !1,
            this.xhr.setRequestHeader.apply(this.xhr, arguments)
        }
        ;
        var u = new XMLHttpRequest;
        for (var c in u)
            i.prototype.hasOwnProperty(c) || !function(e) {
                Object.defineProperty(i.prototype, e, "function" == typeof u[e] ? {
                    value: function() {
                        return this.xhr[e].apply(this.xhr, arguments)
                    }
                } : {
                    get: function() {
                        return this.cache.revalidated && this.cache.result.xhr.hasOwnProperty(e) ? this.cache.result.xhr[e] : this.xhr[e]
                    },
                    set: function(t) {
                        this.xhr[e] = t
                    }
                })
            }(c);
        return i
    }();
    var w = {
        br: {
            require: function(e) {
                var t = {
                    "decompress.js": function(e, t, n) {
                        t.exports = e("./dec/decode").BrotliDecompressBuffer
                    },
                    "dec/bit_reader.js": function(e, t, n) {
                        function r(e) {
                            this.buf_ = new Uint8Array(i),
                            this.input_ = e,
                            this.reset()
                        }
                        const o = 4096
                          , i = 8224
                          , s = 8191
                          , a = new Uint32Array([0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215]);
                        r.READ_SIZE = o,
                        r.IBUF_MASK = s,
                        r.prototype.reset = function() {
                            this.buf_ptr_ = 0,
                            this.val_ = 0,
                            this.pos_ = 0,
                            this.bit_pos_ = 0,
                            this.bit_end_pos_ = 0,
                            this.eos_ = 0,
                            this.readMoreInput();
                            for (var e = 0; e < 4; e++)
                                this.val_ |= this.buf_[this.pos_] << 8 * e,
                                ++this.pos_;
                            return this.bit_end_pos_ > 0
                        }
                        ,
                        r.prototype.readMoreInput = function() {
                            if (!(this.bit_end_pos_ > 256))
                                if (this.eos_) {
                                    if (this.bit_pos_ > this.bit_end_pos_)
                                        throw new Error("Unexpected end of input " + this.bit_pos_ + " " + this.bit_end_pos_)
                                } else {
                                    var e = this.buf_ptr_
                                      , t = this.input_.read(this.buf_, e, o);
                                    if (t < 0)
                                        throw new Error("Unexpected end of input");
                                    if (t < o) {
                                        this.eos_ = 1;
                                        for (var n = 0; n < 32; n++)
                                            this.buf_[e + t + n] = 0
                                    }
                                    if (0 === e) {
                                        for (var n = 0; n < 32; n++)
                                            this.buf_[8192 + n] = this.buf_[n];
                                        this.buf_ptr_ = o
                                    } else
                                        this.buf_ptr_ = 0;
                                    this.bit_end_pos_ += t << 3
                                }
                        }
                        ,
                        r.prototype.fillBitWindow = function() {
                            for (; this.bit_pos_ >= 8; )
                                this.val_ >>>= 8,
                                this.val_ |= this.buf_[this.pos_ & s] << 24,
                                ++this.pos_,
                                this.bit_pos_ = this.bit_pos_ - 8 >>> 0,
                                this.bit_end_pos_ = this.bit_end_pos_ - 8 >>> 0
                        }
                        ,
                        r.prototype.readBits = function(e) {
                            32 - this.bit_pos_ < e && this.fillBitWindow();
                            var t = this.val_ >>> this.bit_pos_ & a[e];
                            return this.bit_pos_ += e,
                            t
                        }
                        ,
                        t.exports = r
                    },
                    "dec/context.js": function(e, t, n) {
                        n.lookup = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 12, 16, 12, 12, 20, 12, 16, 24, 28, 12, 12, 32, 12, 36, 12, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 32, 32, 24, 40, 28, 12, 12, 48, 52, 52, 52, 48, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 24, 12, 28, 12, 12, 12, 56, 60, 60, 60, 56, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 24, 12, 28, 12, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 56, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 26, 27, 27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 29, 30, 30, 30, 30, 31, 31, 31, 31, 32, 32, 32, 32, 33, 33, 33, 33, 34, 34, 34, 34, 35, 35, 35, 35, 36, 36, 36, 36, 37, 37, 37, 37, 38, 38, 38, 38, 39, 39, 39, 39, 40, 40, 40, 40, 41, 41, 41, 41, 42, 42, 42, 42, 43, 43, 43, 43, 44, 44, 44, 44, 45, 45, 45, 45, 46, 46, 46, 46, 47, 47, 47, 47, 48, 48, 48, 48, 49, 49, 49, 49, 50, 50, 50, 50, 51, 51, 51, 51, 52, 52, 52, 52, 53, 53, 53, 53, 54, 54, 54, 54, 55, 55, 55, 55, 56, 56, 56, 56, 57, 57, 57, 57, 58, 58, 58, 58, 59, 59, 59, 59, 60, 60, 60, 60, 61, 61, 61, 61, 62, 62, 62, 62, 63, 63, 63, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                        n.lookupOffsets = new Uint16Array([1024, 1536, 1280, 1536, 0, 256, 768, 512])
                    },
                    "dec/decode.js": function(e, t, n) {
                        function r(e) {
                            var t;
                            return 0 === e.readBits(1) ? 16 : (t = e.readBits(3),
                            t > 0 ? 17 + t : (t = e.readBits(3),
                            t > 0 ? 8 + t : 17))
                        }
                        function o(e) {
                            if (e.readBits(1)) {
                                var t = e.readBits(3);
                                return 0 === t ? 1 : e.readBits(t) + (1 << t)
                            }
                            return 0
                        }
                        function i() {
                            this.meta_block_length = 0,
                            this.input_end = 0,
                            this.is_uncompressed = 0,
                            this.is_metadata = !1
                        }
                        function s(e) {
                            var t, n, r, o = new i;
                            if (o.input_end = e.readBits(1),
                            o.input_end && e.readBits(1))
                                return o;
                            if (t = e.readBits(2) + 4,
                            7 === t) {
                                if (o.is_metadata = !0,
                                0 !== e.readBits(1))
                                    throw new Error("Invalid reserved bit");
                                if (n = e.readBits(2),
                                0 === n)
                                    return o;
                                for (r = 0; r < n; r++) {
                                    var s = e.readBits(8);
                                    if (r + 1 === n && n > 1 && 0 === s)
                                        throw new Error("Invalid size byte");
                                    o.meta_block_length |= s << 8 * r
                                }
                            } else
                                for (r = 0; r < t; ++r) {
                                    var a = e.readBits(4);
                                    if (r + 1 === t && t > 4 && 0 === a)
                                        throw new Error("Invalid size nibble");
                                    o.meta_block_length |= a << 4 * r
                                }
                            return ++o.meta_block_length,
                            o.input_end || o.is_metadata || (o.is_uncompressed = e.readBits(1)),
                            o
                        }
                        function a(e, t, n) {
                            var r;
                            return n.fillBitWindow(),
                            t += n.val_ >>> n.bit_pos_ & I,
                            r = e[t].bits - F,
                            r > 0 && (n.bit_pos_ += F,
                            t += e[t].value,
                            t += n.val_ >>> n.bit_pos_ & (1 << r) - 1),
                            n.bit_pos_ += e[t].bits,
                            e[t].value
                        }
                        function d(e, t, n, r) {
                            for (var o = 0, i = H, s = 0, a = 0, d = 32768, f = [], u = 0; u < 32; u++)
                                f.push(new N(0,0));
                            for (R(f, 0, 5, e, Z); o < t && d > 0; ) {
                                var c, l = 0;
                                if (r.readMoreInput(),
                                r.fillBitWindow(),
                                l += r.val_ >>> r.bit_pos_ & 31,
                                r.bit_pos_ += f[l].bits,
                                c = 255 & f[l].value,
                                c < M)
                                    s = 0,
                                    n[o++] = c,
                                    0 !== c && (i = c,
                                    d -= 32768 >> c);
                                else {
                                    var p, h, w = c - 14, v = 0;
                                    if (c === M && (v = i),
                                    a !== v && (s = 0,
                                    a = v),
                                    p = s,
                                    s > 0 && (s -= 2,
                                    s <<= w),
                                    s += r.readBits(w) + 3,
                                    h = s - p,
                                    o + h > t)
                                        throw new Error("[ReadHuffmanCodeLengths] symbol + repeat_delta > num_symbols");
                                    for (var m = 0; m < h; m++)
                                        n[o + m] = a;
                                    o += h,
                                    0 !== a && (d -= h << 15 - a)
                                }
                            }
                            if (0 !== d)
                                throw new Error("[ReadHuffmanCodeLengths] space = " + d);
                            for (; o < t; o++)
                                n[o] = 0
                        }
                        function f(e, t, n, r) {
                            var o, i = 0, s = new Uint8Array(e);
                            if (r.readMoreInput(),
                            o = r.readBits(2),
                            1 === o) {
                                for (var a, f = e - 1, u = 0, c = new Int32Array(4), l = r.readBits(2) + 1; f; )
                                    f >>= 1,
                                    ++u;
                                for (a = 0; a < l; ++a)
                                    c[a] = r.readBits(u) % e,
                                    s[c[a]] = 2;
                                switch (s[c[0]] = 1,
                                l) {
                                case 1:
                                    break;
                                case 3:
                                    if (c[0] === c[1] || c[0] === c[2] || c[1] === c[2])
                                        throw new Error("[ReadHuffmanCode] invalid symbols");
                                    break;
                                case 2:
                                    if (c[0] === c[1])
                                        throw new Error("[ReadHuffmanCode] invalid symbols");
                                    s[c[1]] = 1;
                                    break;
                                case 4:
                                    if (c[0] === c[1] || c[0] === c[2] || c[0] === c[3] || c[1] === c[2] || c[1] === c[3] || c[2] === c[3])
                                        throw new Error("[ReadHuffmanCode] invalid symbols");
                                    r.readBits(1) ? (s[c[2]] = 3,
                                    s[c[3]] = 3) : s[c[0]] = 2
                                }
                            } else {
                                var a, p = new Uint8Array(Z), h = 32, w = 0, v = [new N(2,0), new N(2,4), new N(2,3), new N(3,2), new N(2,0), new N(2,4), new N(2,3), new N(4,1), new N(2,0), new N(2,4), new N(2,3), new N(3,2), new N(2,0), new N(2,4), new N(2,3), new N(4,5)];
                                for (a = o; a < Z && h > 0; ++a) {
                                    var m, b = G[a], y = 0;
                                    r.fillBitWindow(),
                                    y += r.val_ >>> r.bit_pos_ & 15,
                                    r.bit_pos_ += v[y].bits,
                                    m = v[y].value,
                                    p[b] = m,
                                    0 !== m && (h -= 32 >> m,
                                    ++w)
                                }
                                if (1 !== w && 0 !== h)
                                    throw new Error("[ReadHuffmanCode] invalid num_codes or space");
                                d(p, e, s, r)
                            }
                            if (i = R(t, n, F, s, e),
                            0 === i)
                                throw new Error("[ReadHuffmanCode] BuildHuffmanTable failed: ");
                            return i
                        }
                        function u(e, t, n) {
                            var r, o;
                            return r = a(e, t, n),
                            o = q.kBlockLengthPrefixCode[r].nbits,
                            q.kBlockLengthPrefixCode[r].offset + n.readBits(o)
                        }
                        function c(e, t, n) {
                            var r;
                            return e < X ? (n += D[e],
                            n &= 3,
                            r = t[n] + K[e]) : r = e - X + 1,
                            r
                        }
                        function l(e, t) {
                            for (var n = e[t], r = t; r; --r)
                                e[r] = e[r - 1];
                            e[0] = n
                        }
                        function p(e, t) {
                            var n, r = new Uint8Array(256);
                            for (n = 0; n < 256; ++n)
                                r[n] = n;
                            for (n = 0; n < t; ++n) {
                                var o = e[n];
                                e[n] = r[o],
                                o && l(r, o)
                            }
                        }
                        function h(e, t) {
                            this.alphabet_size = e,
                            this.num_htrees = t,
                            this.codes = new Array(t + t * S[e + 31 >>> 5]),
                            this.htrees = new Uint32Array(t)
                        }
                        function w(e, t) {
                            var n, r, i, s = {
                                num_htrees: null,
                                context_map: null
                            }, d = 0;
                            t.readMoreInput();
                            var u = s.num_htrees = o(t) + 1
                              , c = s.context_map = new Uint8Array(e);
                            if (u <= 1)
                                return s;
                            for (n = t.readBits(1),
                            n && (d = t.readBits(4) + 1),
                            r = [],
                            i = 0; i < T; i++)
                                r[i] = new N(0,0);
                            for (f(u + d, r, 0, t),
                            i = 0; i < e; ) {
                                var l;
                                if (t.readMoreInput(),
                                l = a(r, 0, t),
                                0 === l)
                                    c[i] = 0,
                                    ++i;
                                else if (l <= d)
                                    for (var h = 1 + (1 << l) + t.readBits(l); --h; ) {
                                        if (i >= e)
                                            throw new Error("[DecodeContextMap] i >= context_map_size");
                                        c[i] = 0,
                                        ++i
                                    }
                                else
                                    c[i] = l - d,
                                    ++i
                            }
                            return t.readBits(1) && p(c, e),
                            s
                        }
                        function v(e, t, n, r, o, i, s) {
                            var d, f = 2 * n, u = n, c = a(t, n * T, s);
                            d = 0 === c ? o[f + (1 & i[u])] : 1 === c ? o[f + (i[u] - 1 & 1)] + 1 : c - 2,
                            d >= e && (d -= e),
                            r[n] = d,
                            o[f + (1 & i[u])] = d,
                            ++i[u]
                        }
                        function m(e, t, n, r, o, i) {
                            var s, a = o + 1, d = n & o, f = i.pos_ & W.IBUF_MASK;
                            if (t < 8 || i.bit_pos_ + (t << 3) < i.bit_end_pos_)
                                for (; t-- > 0; )
                                    i.readMoreInput(),
                                    r[d++] = i.readBits(8),
                                    d === a && (e.write(r, a),
                                    d = 0);
                            else {
                                if (i.bit_end_pos_ < 32)
                                    throw new Error("[CopyUncompressedBlockToOutput] br.bit_end_pos_ < 32");
                                for (; i.bit_pos_ < 32; )
                                    r[d] = i.val_ >>> i.bit_pos_,
                                    i.bit_pos_ += 8,
                                    ++d,
                                    --t;
                                if (s = i.bit_end_pos_ - i.bit_pos_ >> 3,
                                f + s > W.IBUF_MASK) {
                                    for (var u = W.IBUF_MASK + 1 - f, c = 0; c < u; c++)
                                        r[d + c] = i.buf_[f + c];
                                    s -= u,
                                    d += u,
                                    t -= u,
                                    f = 0
                                }
                                for (var c = 0; c < s; c++)
                                    r[d + c] = i.buf_[f + c];
                                if (d += s,
                                t -= s,
                                d >= a) {
                                    e.write(r, a),
                                    d -= a;
                                    for (var c = 0; c < d; c++)
                                        r[c] = r[a + c]
                                }
                                for (; d + t >= a; ) {
                                    if (s = a - d,
                                    i.input_.read(r, d, s) < s)
                                        throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");
                                    e.write(r, a),
                                    t -= s,
                                    d = 0
                                }
                                if (i.input_.read(r, d, t) < t)
                                    throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");
                                i.reset()
                            }
                        }
                        function b(e) {
                            var t = e.bit_pos_ + 7 & -8
                              , n = e.readBits(t - e.bit_pos_);
                            return 0 == n
                        }
                        function y(e) {
                            var t = new E(e)
                              , n = new W(t);
                            r(n);
                            var o = s(n);
                            return o.meta_block_length
                        }
                        function g(e, t) {
                            var n = new E(e);
                            null == t && (t = y(e));
                            var r = new Uint8Array(t)
                              , o = new U(r);
                            return x(n, o),
                            o.pos < o.buffer.length && (o.buffer = o.buffer.subarray(0, o.pos)),
                            o.buffer
                        }
                        function x(e, t) {
                            var n, i, d, l, p, y, g, x, E, U = 0, R = 0, H = 0, M = 0, F = [16, 15, 11, 4], I = 0, Z = 0, G = 0, D = [new h(0,0), new h(0,0), new h(0,0)];
                            const K = 128 + W.READ_SIZE;
                            E = new W(e),
                            H = r(E),
                            i = (1 << H) - 16,
                            d = 1 << H,
                            l = d - 1,
                            p = new Uint8Array(d + K + O.maxDictionaryWordLength),
                            y = d,
                            g = [],
                            x = [];
                            for (var S = 0; S < 3240; S++)
                                g[S] = new N(0,0),
                                x[S] = new N(0,0);
                            for (; !R; ) {
                                var j, z, J, C, Q, _, $, ee, te, ne = 0, re = [1 << 28, 1 << 28, 1 << 28], oe = [0], ie = [1, 1, 1], se = [0, 1, 0, 1, 0, 1], ae = [0], de = null, fe = null, ue = null, ce = 0, le = null, pe = 0, he = 0, we = null, ve = 0, me = 0, be = 0;
                                for (n = 0; n < 3; ++n)
                                    D[n].codes = null,
                                    D[n].htrees = null;
                                E.readMoreInput();
                                var ye = s(E);
                                if (ne = ye.meta_block_length,
                                U + ne > t.buffer.length) {
                                    var ge = new Uint8Array(U + ne);
                                    ge.set(t.buffer),
                                    t.buffer = ge
                                }
                                if (R = ye.input_end,
                                j = ye.is_uncompressed,
                                ye.is_metadata)
                                    for (b(E); ne > 0; --ne)
                                        E.readMoreInput(),
                                        E.readBits(8);
                                else if (0 !== ne)
                                    if (j)
                                        E.bit_pos_ = E.bit_pos_ + 7 & -8,
                                        m(t, ne, U, p, l, E),
                                        U += ne;
                                    else {
                                        for (n = 0; n < 3; ++n)
                                            ie[n] = o(E) + 1,
                                            ie[n] >= 2 && (f(ie[n] + 2, g, n * T, E),
                                            f(A, x, n * T, E),
                                            re[n] = u(x, n * T, E),
                                            ae[n] = 1);
                                        for (E.readMoreInput(),
                                        z = E.readBits(2),
                                        J = X + (E.readBits(4) << z),
                                        C = (1 << z) - 1,
                                        Q = J + (48 << z),
                                        fe = new Uint8Array(ie[0]),
                                        n = 0; n < ie[0]; ++n)
                                            E.readMoreInput(),
                                            fe[n] = E.readBits(2) << 1;
                                        var xe = w(ie[0] << Y, E);
                                        _ = xe.num_htrees,
                                        de = xe.context_map;
                                        var Ee = w(ie[2] << P, E);
                                        for ($ = Ee.num_htrees,
                                        ue = Ee.context_map,
                                        D[0] = new h(k,_),
                                        D[1] = new h(L,ie[1]),
                                        D[2] = new h(Q,$),
                                        n = 0; n < 3; ++n)
                                            D[n].decode(E);
                                        for (le = 0,
                                        we = 0,
                                        ee = fe[oe[0]],
                                        me = V.lookupOffsets[ee],
                                        be = V.lookupOffsets[ee + 1],
                                        te = D[1].htrees[0]; ne > 0; ) {
                                            var Ue, We, Oe, Ne, Re, Ve, qe, Be, He, Me, ke;
                                            for (E.readMoreInput(),
                                            0 === re[1] && (v(ie[1], g, 1, oe, se, ae, E),
                                            re[1] = u(x, T, E),
                                            te = D[1].htrees[oe[1]]),
                                            --re[1],
                                            Ue = a(D[1].codes, te, E),
                                            We = Ue >> 6,
                                            We >= 2 ? (We -= 2,
                                            qe = -1) : qe = 0,
                                            Oe = q.kInsertRangeLut[We] + (Ue >> 3 & 7),
                                            Ne = q.kCopyRangeLut[We] + (7 & Ue),
                                            Re = q.kInsertLengthPrefixCode[Oe].offset + E.readBits(q.kInsertLengthPrefixCode[Oe].nbits),
                                            Ve = q.kCopyLengthPrefixCode[Ne].offset + E.readBits(q.kCopyLengthPrefixCode[Ne].nbits),
                                            Z = p[U - 1 & l],
                                            G = p[U - 2 & l],
                                            Me = 0; Me < Re; ++Me)
                                                E.readMoreInput(),
                                                0 === re[0] && (v(ie[0], g, 0, oe, se, ae, E),
                                                re[0] = u(x, 0, E),
                                                ce = oe[0] << Y,
                                                le = ce,
                                                ee = fe[oe[0]],
                                                me = V.lookupOffsets[ee],
                                                be = V.lookupOffsets[ee + 1]),
                                                He = V.lookup[me + Z] | V.lookup[be + G],
                                                pe = de[le + He],
                                                --re[0],
                                                G = Z,
                                                Z = a(D[0].codes, D[0].htrees[pe], E),
                                                p[U & l] = Z,
                                                (U & l) === l && t.write(p, d),
                                                ++U;
                                            if (ne -= Re,
                                            ne <= 0)
                                                break;
                                            if (qe < 0) {
                                                var He;
                                                if (E.readMoreInput(),
                                                0 === re[2] && (v(ie[2], g, 2, oe, se, ae, E),
                                                re[2] = u(x, 2160, E),
                                                he = oe[2] << P,
                                                we = he),
                                                --re[2],
                                                He = 255 & (Ve > 4 ? 3 : Ve - 2),
                                                ve = ue[we + He],
                                                qe = a(D[2].codes, D[2].htrees[ve], E),
                                                qe >= J) {
                                                    var Le, Ae, Ye;
                                                    qe -= J,
                                                    Ae = qe & C,
                                                    qe >>= z,
                                                    Le = (qe >> 1) + 1,
                                                    Ye = (2 + (1 & qe) << Le) - 4,
                                                    qe = J + (Ye + E.readBits(Le) << z) + Ae
                                                }
                                            }
                                            if (Be = c(qe, F, I),
                                            Be < 0)
                                                throw new Error("[BrotliDecompress] invalid distance");
                                            if (M = U < i && M !== i ? U : i,
                                            ke = U & l,
                                            Be > M) {
                                                if (!(Ve >= O.minDictionaryWordLength && Ve <= O.maxDictionaryWordLength))
                                                    throw new Error("Invalid backward reference. pos: " + U + " distance: " + Be + " len: " + Ve + " bytes left: " + ne);
                                                var Ye = O.offsetsByLength[Ve]
                                                  , Pe = Be - M - 1
                                                  , Fe = O.sizeBitsByLength[Ve]
                                                  , Ie = (1 << Fe) - 1
                                                  , Te = Pe & Ie
                                                  , Ze = Pe >> Fe;
                                                if (Ye += Te * Ve,
                                                !(Ze < B.kNumTransforms))
                                                    throw new Error("Invalid backward reference. pos: " + U + " distance: " + Be + " len: " + Ve + " bytes left: " + ne);
                                                var Ge = B.transformDictionaryWord(p, ke, Ye, Ve, Ze);
                                                if (ke += Ge,
                                                U += Ge,
                                                ne -= Ge,
                                                ke >= y) {
                                                    t.write(p, d);
                                                    for (var Xe = 0; Xe < ke - y; Xe++)
                                                        p[Xe] = p[y + Xe]
                                                }
                                            } else {
                                                if (qe > 0 && (F[3 & I] = Be,
                                                ++I),
                                                Ve > ne)
                                                    throw new Error("Invalid backward reference. pos: " + U + " distance: " + Be + " len: " + Ve + " bytes left: " + ne);
                                                for (Me = 0; Me < Ve; ++Me)
                                                    p[U & l] = p[U - Be & l],
                                                    (U & l) === l && t.write(p, d),
                                                    ++U,
                                                    --ne
                                            }
                                            Z = p[U - 1 & l],
                                            G = p[U - 2 & l]
                                        }
                                        U &= 1073741823
                                    }
                            }
                            t.write(p, U & l)
                        }
                        var E = e("./streams").BrotliInput
                          , U = e("./streams").BrotliOutput
                          , W = e("./bit_reader")
                          , O = e("./dictionary")
                          , N = e("./huffman").HuffmanCode
                          , R = e("./huffman").BrotliBuildHuffmanTable
                          , V = e("./context")
                          , q = e("./prefix")
                          , B = e("./transform");
                        const H = 8
                          , M = 16
                          , k = 256
                          , L = 704
                          , A = 26
                          , Y = 6
                          , P = 2
                          , F = 8
                          , I = 255
                          , T = 1080
                          , Z = 18
                          , G = new Uint8Array([1, 2, 3, 4, 0, 5, 17, 6, 16, 7, 8, 9, 10, 11, 12, 13, 14, 15])
                          , X = 16
                          , D = new Uint8Array([3, 2, 1, 0, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2])
                          , K = new Int8Array([0, 0, 0, 0, -1, 1, -2, 2, -3, 3, -1, 1, -2, 2, -3, 3])
                          , S = new Uint16Array([256, 402, 436, 468, 500, 534, 566, 598, 630, 662, 694, 726, 758, 790, 822, 854, 886, 920, 952, 984, 1016, 1048, 1080]);
                        h.prototype.decode = function(e) {
                            var t, n, r = 0;
                            for (t = 0; t < this.num_htrees; ++t)
                                this.htrees[t] = r,
                                n = f(this.alphabet_size, this.codes, r, e),
                                r += n
                        }
                        ,
                        n.BrotliDecompressedSize = y,
                        n.BrotliDecompressBuffer = g,
                        n.BrotliDecompress = x,
                        O.init()
                    },
                    "dec/dictionary.js": function(e, t, n) {
                        var r = e("./dictionary-browser");
                        n.init = function() {
                            n.dictionary = r.init()
                        }
                        ,
                        n.offsetsByLength = new Uint32Array([0, 0, 0, 0, 0, 4096, 9216, 21504, 35840, 44032, 53248, 63488, 74752, 87040, 93696, 100864, 104704, 106752, 108928, 113536, 115968, 118528, 119872, 121280, 122016]),
                        n.sizeBitsByLength = new Uint8Array([0, 0, 0, 0, 10, 10, 11, 11, 10, 10, 10, 10, 10, 9, 9, 8, 7, 7, 8, 7, 7, 6, 6, 5, 5]),
                        n.minDictionaryWordLength = 4,
                        n.maxDictionaryWordLength = 24
                    },
                    "dec/dictionary.bin.js": function(e, t, n) {
                        t.exports = "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";
                    },
                    "dec/dictionary-browser.js": function(e, t, n) {
                        var r = e("base64-js");
                        n.init = function() {
                            var t = e("./decode").BrotliDecompressBuffer
                              , n = r.toByteArray(e("./dictionary.bin.js"));
                            return t(n)
                        }
                    },
                    "dec/huffman.js": function(e, t, n) {
                        function r(e, t) {
                            this.bits = e,
                            this.value = t
                        }
                        function o(e, t) {
                            for (var n = 1 << t - 1; e & n; )
                                n >>= 1;
                            return (e & n - 1) + n
                        }
                        function i(e, t, n, o, i) {
                            do
                                o -= n,
                                e[t + o] = new r(i.bits,i.value);
                            while (o > 0)
                        }
                        function s(e, t, n) {
                            for (var r = 1 << t - n; t < a && (r -= e[t],
                            !(r <= 0)); )
                                ++t,
                                r <<= 1;
                            return t - n
                        }
                        n.HuffmanCode = r;
                        const a = 15;
                        n.BrotliBuildHuffmanTable = function(e, t, n, d, f) {
                            var u, c, l, p, h, w, v, m, b, y, g, x = t, E = new Int32Array(16), U = new Int32Array(16);
                            for (g = new Int32Array(f),
                            l = 0; l < f; l++)
                                E[d[l]]++;
                            for (U[1] = 0,
                            c = 1; c < a; c++)
                                U[c + 1] = U[c] + E[c];
                            for (l = 0; l < f; l++)
                                0 !== d[l] && (g[U[d[l]]++] = l);
                            if (m = n,
                            b = 1 << m,
                            y = b,
                            1 === U[a]) {
                                for (p = 0; p < y; ++p)
                                    e[t + p] = new r(0,65535 & g[0]);
                                return y
                            }
                            for (p = 0,
                            l = 0,
                            c = 1,
                            h = 2; c <= n; ++c,
                            h <<= 1)
                                for (; E[c] > 0; --E[c])
                                    u = new r(255 & c,65535 & g[l++]),
                                    i(e, t + p, h, b, u),
                                    p = o(p, c);
                            for (v = y - 1,
                            w = -1,
                            c = n + 1,
                            h = 2; c <= a; ++c,
                            h <<= 1)
                                for (; E[c] > 0; --E[c])
                                    (p & v) !== w && (t += b,
                                    m = s(E, c, n),
                                    b = 1 << m,
                                    y += b,
                                    w = p & v,
                                    e[x + w] = new r(m + n & 255,t - x - w & 65535)),
                                    u = new r(c - n & 255,65535 & g[l++]),
                                    i(e, t + (p >> n), h, b, u),
                                    p = o(p, c);
                            return y
                        }
                    },
                    "dec/prefix.js": function(e, t, n) {
                        function r(e, t) {
                            this.offset = e,
                            this.nbits = t
                        }
                        n.kBlockLengthPrefixCode = [new r(1,2), new r(5,2), new r(9,2), new r(13,2), new r(17,3), new r(25,3), new r(33,3), new r(41,3), new r(49,4), new r(65,4), new r(81,4), new r(97,4), new r(113,5), new r(145,5), new r(177,5), new r(209,5), new r(241,6), new r(305,6), new r(369,7), new r(497,8), new r(753,9), new r(1265,10), new r(2289,11), new r(4337,12), new r(8433,13), new r(16625,24)],
                        n.kInsertLengthPrefixCode = [new r(0,0), new r(1,0), new r(2,0), new r(3,0), new r(4,0), new r(5,0), new r(6,1), new r(8,1), new r(10,2), new r(14,2), new r(18,3), new r(26,3), new r(34,4), new r(50,4), new r(66,5), new r(98,5), new r(130,6), new r(194,7), new r(322,8), new r(578,9), new r(1090,10), new r(2114,12), new r(6210,14), new r(22594,24)],
                        n.kCopyLengthPrefixCode = [new r(2,0), new r(3,0), new r(4,0), new r(5,0), new r(6,0), new r(7,0), new r(8,0), new r(9,0), new r(10,1), new r(12,1), new r(14,2), new r(18,2), new r(22,3), new r(30,3), new r(38,4), new r(54,4), new r(70,5), new r(102,5), new r(134,6), new r(198,7), new r(326,8), new r(582,9), new r(1094,10), new r(2118,24)],
                        n.kInsertRangeLut = [0, 0, 8, 8, 0, 16, 8, 16, 16],
                        n.kCopyRangeLut = [0, 8, 0, 8, 16, 0, 16, 8, 16]
                    },
                    "dec/streams.js": function(e, t, n) {
                        function r(e) {
                            this.buffer = e,
                            this.pos = 0
                        }
                        function o(e) {
                            this.buffer = e,
                            this.pos = 0
                        }
                        r.prototype.read = function(e, t, n) {
                            this.pos + n > this.buffer.length && (n = this.buffer.length - this.pos);
                            for (var r = 0; r < n; r++)
                                e[t + r] = this.buffer[this.pos + r];
                            return this.pos += n,
                            n
                        }
                        ,
                        n.BrotliInput = r,
                        o.prototype.write = function(e, t) {
                            if (this.pos + t > this.buffer.length)
                                throw new Error("Output buffer is not large enough");
                            return this.buffer.set(e.subarray(0, t), this.pos),
                            this.pos += t,
                            t
                        }
                        ,
                        n.BrotliOutput = o
                    },
                    "dec/transform.js": function(e, t, n) {
                        function r(e, t, n) {
                            this.prefix = new Uint8Array(e.length),
                            this.transform = t,
                            this.suffix = new Uint8Array(n.length);
                            for (var r = 0; r < e.length; r++)
                                this.prefix[r] = e.charCodeAt(r);
                            for (var r = 0; r < n.length; r++)
                                this.suffix[r] = n.charCodeAt(r)
                        }
                        function o(e, t) {
                            return e[t] < 192 ? (e[t] >= 97 && e[t] <= 122 && (e[t] ^= 32),
                            1) : e[t] < 224 ? (e[t + 1] ^= 32,
                            2) : (e[t + 2] ^= 5,
                            3)
                        }
                        var i = e("./dictionary");
                        const s = 0
                          , a = 1
                          , d = 2
                          , f = 3
                          , u = 4
                          , c = 5
                          , l = 6
                          , p = 7
                          , h = 8
                          , w = 9
                          , v = 10
                          , m = 11
                          , b = 12
                          , y = 13
                          , g = 14
                          , x = 15
                          , E = 16
                          , U = 17
                          , W = 18
                          , O = 20;
                        var N = [new r("",s,""), new r("",s," "), new r(" ",s," "), new r("",b,""), new r("",v," "), new r("",s," the "), new r(" ",s,""), new r("s ",s," "), new r("",s," of "), new r("",v,""), new r("",s," and "), new r("",y,""), new r("",a,""), new r(", ",s," "), new r("",s,", "), new r(" ",v," "), new r("",s," in "), new r("",s," to "), new r("e ",s," "), new r("",s,'"'), new r("",s,"."), new r("",s,'">'), new r("",s,"\n"), new r("",f,""), new r("",s,"]"), new r("",s," for "), new r("",g,""), new r("",d,""), new r("",s," a "), new r("",s," that "), new r(" ",v,""), new r("",s,". "), new r(".",s,""), new r(" ",s,", "), new r("",x,""), new r("",s," with "), new r("",s,"'"), new r("",s," from "), new r("",s," by "), new r("",E,""), new r("",U,""), new r(" the ",s,""), new r("",u,""), new r("",s,". The "), new r("",m,""), new r("",s," on "), new r("",s," as "), new r("",s," is "), new r("",p,""), new r("",a,"ing "), new r("",s,"\n\t"), new r("",s,":"), new r(" ",s,". "), new r("",s,"ed "), new r("",O,""), new r("",W,""), new r("",l,""), new r("",s,"("), new r("",v,", "), new r("",h,""), new r("",s," at "), new r("",s,"ly "), new r(" the ",s," of "), new r("",c,""), new r("",w,""), new r(" ",v,", "), new r("",v,'"'), new r(".",s,"("), new r("",m," "), new r("",v,'">'), new r("",s,'="'), new r(" ",s,"."), new r(".com/",s,""), new r(" the ",s," of the "), new r("",v,"'"), new r("",s,". This "), new r("",s,","), new r(".",s," "), new r("",v,"("), new r("",v,"."), new r("",s," not "), new r(" ",s,'="'), new r("",s,"er "), new r(" ",m," "), new r("",s,"al "), new r(" ",m,""), new r("",s,"='"), new r("",m,'"'), new r("",v,". "), new r(" ",s,"("), new r("",s,"ful "), new r(" ",v,". "), new r("",s,"ive "), new r("",s,"less "), new r("",m,"'"), new r("",s,"est "), new r(" ",v,"."), new r("",m,'">'), new r(" ",s,"='"), new r("",v,","), new r("",s,"ize "), new r("",m,"."), new r("\xc2\xa0",s,""), new r(" ",s,","), new r("",v,'="'), new r("",m,'="'), new r("",s,"ous "), new r("",m,", "), new r("",v,"='"), new r(" ",v,","), new r(" ",m,'="'), new r(" ",m,", "), new r("",m,","), new r("",m,"("), new r("",m,". "), new r(" ",m,"."), new r("",m,"='"), new r(" ",m,". "), new r(" ",v,'="'), new r(" ",m,"='"), new r(" ",v,"='")];
                        n.kTransforms = N,
                        n.kNumTransforms = N.length,
                        n.transformDictionaryWord = function(e, t, n, r, s) {
                            var a, d = N[s].prefix, f = N[s].suffix, u = N[s].transform, c = u < b ? 0 : u - 11, l = 0, p = t;
                            c > r && (c = r);
                            for (var h = 0; h < d.length; )
                                e[t++] = d[h++];
                            for (n += c,
                            r -= c,
                            u <= w && (r -= u),
                            l = 0; l < r; l++)
                                e[t++] = i.dictionary[n + l];
                            if (a = t - r,
                            u === v)
                                o(e, a);
                            else if (u === m)
                                for (; r > 0; ) {
                                    var y = o(e, a);
                                    a += y,
                                    r -= y
                                }
                            for (var g = 0; g < f.length; )
                                e[t++] = f[g++];
                            return t - p
                        }
                    },
                    "node_modules/base64-js/index.js": function(e, t, n) {
                        "use strict";
                        function r(e) {
                            var t = e.length;
                            if (t % 4 > 0)
                                throw new Error("Invalid string. Length must be a multiple of 4");
                            return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
                        }
                        function o(e) {
                            return 3 * e.length / 4 - r(e)
                        }
                        function i(e) {
                            var t, n, o, i, s, a, d = e.length;
                            s = r(e),
                            a = new c(3 * d / 4 - s),
                            o = s > 0 ? d - 4 : d;
                            var f = 0;
                            for (t = 0,
                            n = 0; t < o; t += 4,
                            n += 3)
                                i = u[e.charCodeAt(t)] << 18 | u[e.charCodeAt(t + 1)] << 12 | u[e.charCodeAt(t + 2)] << 6 | u[e.charCodeAt(t + 3)],
                                a[f++] = i >> 16 & 255,
                                a[f++] = i >> 8 & 255,
                                a[f++] = 255 & i;
                            return 2 === s ? (i = u[e.charCodeAt(t)] << 2 | u[e.charCodeAt(t + 1)] >> 4,
                            a[f++] = 255 & i) : 1 === s && (i = u[e.charCodeAt(t)] << 10 | u[e.charCodeAt(t + 1)] << 4 | u[e.charCodeAt(t + 2)] >> 2,
                            a[f++] = i >> 8 & 255,
                            a[f++] = 255 & i),
                            a
                        }
                        function s(e) {
                            return f[e >> 18 & 63] + f[e >> 12 & 63] + f[e >> 6 & 63] + f[63 & e]
                        }
                        function a(e, t, n) {
                            for (var r, o = [], i = t; i < n; i += 3)
                                r = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2],
                                o.push(s(r));
                            return o.join("")
                        }
                        function d(e) {
                            for (var t, n = e.length, r = n % 3, o = "", i = [], s = 16383, d = 0, u = n - r; d < u; d += s)
                                i.push(a(e, d, d + s > u ? u : d + s));
                            return 1 === r ? (t = e[n - 1],
                            o += f[t >> 2],
                            o += f[t << 4 & 63],
                            o += "==") : 2 === r && (t = (e[n - 2] << 8) + e[n - 1],
                            o += f[t >> 10],
                            o += f[t >> 4 & 63],
                            o += f[t << 2 & 63],
                            o += "="),
                            i.push(o),
                            i.join("")
                        }
                        n.byteLength = o,
                        n.toByteArray = i,
                        n.fromByteArray = d;
                        for (var f = [], u = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", p = 0, h = l.length; p < h; ++p)
                            f[p] = l[p],
                            u[l.charCodeAt(p)] = p;
                        u["-".charCodeAt(0)] = 62,
                        u["_".charCodeAt(0)] = 63
                    }
                };
                for (var n in t)
                    t[n].folder = n.substring(0, n.lastIndexOf("/") + 1);
                var r = function(e) {
                    var n = [];
                    return e = e.split("/").every(function(e) {
                        return ".." == e ? n.pop() : "." == e || "" == e || n.push(e)
                    }) ? n.join("/") : null,
                    e ? t[e] || t[e + ".js"] || t[e + "/index.js"] : null
                }
                  , o = function(e, t) {
                    return e ? r(e.folder + "node_modules/" + t) || o(e.parent, t) : null
                }
                  , i = function(e, t) {
                    var n = t.match(/^\//) ? null : e ? t.match(/^\.\.?\//) ? r(e.folder + t) : o(e, t) : r(t);
                    if (!n)
                        throw "module not found: " + t;
                    return n.exports || (n.parent = e,
                    n(i.bind(null, n), n, n.exports = {})),
                    n.exports
                };
                return i(null, e)
            },
            decompress: function(e) {
                this.exports || (this.exports = this.require("decompress.js"));
                try {
                    return this.exports(e)
                } catch (e) {}
            },
            hasUnityMarker: function(e) {
                var t = "UnityWeb Compressed Content (brotli)";
                if (!e.length)
                    return !1;
                var n = 1 & e[0] ? 14 & e[0] ? 4 : 7 : 1
                  , r = e[0] & (1 << n) - 1
                  , o = 1 + (Math.log(t.length - 1) / Math.log(2) >> 3);
                if (commentOffset = n + 1 + 2 + 1 + 2 + (o << 3) + 7 >> 3,
                17 == r || commentOffset > e.length)
                    return !1;
                for (var i = r + (6 + (o << 4) + (t.length - 1 << 6) << n), s = 0; s < commentOffset; s++,
                i >>>= 8)
                    if (e[s] != (255 & i))
                        return !1;
                return String.fromCharCode.apply(null, e.subarray(commentOffset, commentOffset + t.length)) == t
            }
        }
    };
    return new Promise(function(e, t) {
        c.SystemInfo.hasWebGL ? c.SystemInfo.hasWasm ? (1 == c.SystemInfo.hasWebGL && c.print('Warning: Your browser does not support "WebGL 2.0" Graphics API, switching to "WebGL 1.0"'),
        c.startupErrorHandler = t,
        n(0),
        c.postRun.push(function() {
            n(1),
            delete c.startupErrorHandler,
            e(h)
        }),
        u()) : t("Your browser does not support WebAssembly.") : t("Your browser does not support WebGL.")
    }
    )
}
