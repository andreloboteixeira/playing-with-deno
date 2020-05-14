// use converter: https://wasdk.github.io/WasmFiddle/?pkku4
const mod = new WebAssembly.Module(await Deno.readFile("factorial.wasm"));
const {
    exports: { factorial }
} = new WebAssembly.Instance(mod);

console.log(factorial(5));