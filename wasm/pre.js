var initialized = false
var initListeners = []

var stdin = ''
var inBuffer = []
var outBuffer = []
var errBuffer = []

function toByteArray(str) {
    return Array.from(new TextEncoder("utf-8").encode(str))
}

function fromByteArray(data) {
    var array = new Uint8Array(data)
    return new TextDecoder().decode(array)
}

// Note about Emscripten, even though the module is now named 'jq', pre.js still uses Module, but post.js uses 'jq'
Module = Object.assign(
    {
        noInitialRun: true,
        noExitRuntime: true,
        onRuntimeInitialized: function () {
            initialized = true
            initListeners.forEach(function (cb) {
                cb()
            })
        },
        print: function (c) {
            // if (c) {
            //     outBuffer.push(c)
            // }
        },
        printErr: function (c) {
            // if (c) {
            //     errBuffer.push(c)
            // }
        },
        preRun: function () {
            FS.init(
                function input() {
                    if (inBuffer.length) {
                        return inBuffer.pop()
                    }

                    if (!stdin) return null
                    inBuffer = toByteArray(stdin)
                    stdin = ''
                    inBuffer.push(null)
                    inBuffer.reverse()
                    return inBuffer.pop()
                },
                function output(c) {
                    if (c) {
                        outBuffer.push(c)
                    }
                },
                function error(c) {
                    if (c) {
                        errBuffer.push(c)
                    }
                }
            )
        }
    },
    Module
)
